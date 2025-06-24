"use client"

import React, { useEffect, useState, useCallback } from "react"
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Text,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Modal from "react-native-modal"
import axios from "axios"
import { debounce } from "lodash"
import config from "../../../context/config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { Root, Popup } from "popup-ui"
import sectorData from "../../../context/Jobs.json"

interface JobData {
  jobId: string
  compId: string
  jobRole: string
  jobLocation: string
  salary: string
  tags: string[]
  logo: string
  degName: string
  secName: string
  skills: string[]
  jobDescription: string
  yearsOfExperience: string
  requirements: string[]
  jobType: string
  workPlaceType: string
  organizationName: string
  headOffice: string
  email: string
  phoneNo: string
  website: string
  about: string
  industry: string
  since: string
  specialization: string
}

interface JobCardProps {
  jobData: JobData
  onApply: (jobData: JobData) => void
}

const JobCard: React.FC<JobCardProps> = ({ jobData, onApply }) => {
  const [savedJobs, setSavedJobs] = useState<any[]>([])
  const [isSaved, setIsSaved] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const fetchSavedJobs = async () => {
        try {
          const userId = await AsyncStorage.getItem("userId")
          if (!userId) {
            console.warn("User not logged in")
            return
          }

          const response = await axios.get(`${config.apiUrl}/SavedJob/get/${userId}`)

          if (response.status === 200 && response.data.success) {
            const jobs = response.data.savedJobs || []
            setSavedJobs(jobs)
            setIsSaved(jobs.some((savedJob: { jobId: string }) => savedJob.jobId === jobData.jobId))
          } else {
            setSavedJobs([])
            setIsSaved(false)
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log("Axios error fetching saved jobs:", error.response?.data || error.message)
          } else if (error instanceof Error) {
            console.error("Unexpected error fetching saved jobs:", error.message)
          } else {
            console.error("An unknown error occurred while fetching saved jobs")
          }
          setSavedJobs([])
          setIsSaved(false)
        }
      }

      fetchSavedJobs()
    }, [jobData.jobId]),
  )

  const getSaveIcon = () => {
    return isSaved
      ? require("../../../assets/icons/MYJOB_LOGO_ICON.png") // Filled save icon
      : require("../../../assets/icons/savela.png") // Empty save icon
  }

  const handleSaveJob = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId")
      if (!userId) {
        Alert.alert("Error", "User not logged in")
        return
      }

      if (isSaved) {
        // Optimistic UI update for job removal
        setIsSaved(false)
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobData.jobId))

        try {
          const response = await axios.delete(`${config.apiUrl}/SavedJob/delete/${userId}/${jobData.jobId}`)

          if (response.status === 200) {
            setSavedJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobData.jobId))
            Popup.show({
              type: "Success",
              title: "Job Removed",
              button: true,
              textBody: "The job has been successfully removed from your saved list.",
              buttonText: "OK",
              callback: () => Popup.hide(),
            })
          } else {
            setIsSaved(true)
            setSavedJobs((prevJobs) => [...prevJobs, jobData])
            Alert.alert("Error", "Failed to remove job")
          }
        } catch (error) {
          // Handle error, but avoid redundant error alerts
          console.error("Error removing job:", error)
          Alert.alert("Error", "An error occurred while removing the job.")
          // Revert optimistic update in case of an error
          setIsSaved(true)
          setSavedJobs((prevJobs) => [...prevJobs, jobData])
        }
      } else {
        // Save the job
        const saveData = {
          jobId: jobData.jobId,
          userId: userId,
          createdBy: 1,
        }

        try {
          const response = await axios.post(`${config.apiUrl}/SavedJob/create`, saveData)

          if (response.status === 200 && response.data.success) {
            setIsSaved(true)
            setSavedJobs((prevJobs) => [...prevJobs, jobData])
            Popup.show({
              type: "Success",
              title: "Job Saved",
              button: true,
              textBody: "The job has been successfully saved to your list.",
              buttonText: "OK",
              callback: () => Popup.hide(),
            })
          } else {
            console.warn("Failed to save job: Unexpected response")
          }
        } catch (error) {
          console.error("Error saving job:", error)
          Alert.alert("Error", "An error occurred while saving the job.")
        }
      }
    } catch (error) {
      console.error("Error saving/removing job:", error)
      Alert.alert("Error", "An unexpected error occurred.")
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.CardHeader}>
        <Image source={{ uri: jobData?.logo }} style={styles.logo} resizeMode="contain" />
        <View style={styles.titleContainer}>
          <Text style={styles.titleJ}>{jobData.degName || "Role"}</Text>
          <Text style={styles.subtitle}>
            {jobData.organizationName || "Unknown Company"} • {jobData.jobLocation || "Unknown Location"}
          </Text>
        </View>
        <Pressable onPress={handleSaveJob}>
          <Image source={getSaveIcon()} style={{ height: 24, width: 24 }} />
        </Pressable>
      </View>

      <Text style={styles.salary}>{jobData.salary}/mo</Text>

      <View style={styles.tagsContainer}>
        {Array.isArray(jobData.tags) && jobData.tags.length > 0 ? (
          jobData.tags.map((tag: string, index: number) => (
            <View style={styles.tag} key={index}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))
        ) : (
          <Text style={{ fontSize: 12, color: "#aaa" }}>No tags available</Text>
        )}

        <Pressable style={styles.applyButton} onPress={() => onApply(jobData)}>
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  )
}

const JobSearchScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [modalType, setModalType] = useState<"job Type" | "job Workplace" | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedWorkplace, setSelectedWorkplace] = useState<string | null>(null)
  const [searchText, setSearchText] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<any>(null)
  const [jobs, setJobs] = useState<JobData[]>([])

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]
  const workplaceTypes = ["Remote", "On-site", "Hybrid"]

  const toggleModal = () => setModalVisible(!isModalVisible)

  const handleButtonPress = (type: "job Type" | "job Workplace") => {
    setModalType(type)
    setModalVisible2(true)
  }

  // Function to search through the JSON data
  const searchLocalData = (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const lowerCaseQuery = query.toLowerCase()
    const designations: any[] = []
    const skills: any[] = []

    // Search through all sectors
    sectorData.sec.forEach((sector) => {
      // Search designations
      sector.designations.forEach((designation) => {
        if (designation.toLowerCase().includes(lowerCaseQuery)) {
          designations.push({
            type: "degName",
            name: designation,
            sector: sector.sector,
          })
        }
      })

      // Search skills
      sector.skills.forEach((skill) => {
        if (skill.toLowerCase().includes(lowerCaseQuery)) {
          skills.push({
            type: "skills",
            name: skill,
            sector: sector.sector,
          })
        }
      })
    })

    // Combine and limit results
    const combinedResults = [...designations, ...skills].slice(0, 10)
    setResults(combinedResults)
    setLoading(false)
  }

  useEffect(() => {
    const searchAPI = debounce(async (query: string) => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setLoading(true)

      // First try to search locally in the JSON data
      searchLocalData(query)

      // If you still want to use the API as a fallback:
      try {
        const response = await axios.get(`${config.apiUrl}/sectorDetails/search`, { params: { query } })

        const { designations = [], skills = [] } = response.data.data || {}

        const formattedResults = [
          ...designations.map((item: any) => ({
            type: "degName",
            name: item.degName || item,
          })),
          ...skills.map((item: any) => ({
            type: "skills",
            name: item.skillName || item,
          })),
        ]

        // If we got results from the API, use them
        if (formattedResults.length > 0) {
          setResults(formattedResults)
        }
      } catch (error) {
        console.error("Error fetching search results:", error)
        // If API fails, we already have local results
      } finally {
        setLoading(false)
      }
    }, 300)

    searchAPI(searchText)

    return () => {
      searchAPI.cancel()
    }
  }, [searchText])

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        let params = {}

        if (selected && selected.name) {
          const key = selected.type === "skills" ? "skills" : "degName"
          const value = selected.name
          params = {
            [key]: value,
          }
        }

        // Apply filters if selected
        if (selectedType) {
          params = { ...params, jobType: selectedType }
        }

        if (selectedWorkplace) {
          params = { ...params, workPlaceType: selectedWorkplace }
        }

        const response = await axios.get(`${config.apiUrl}/postedjob/getAll`, {
          params,
        })

        const transformedData: JobData[] = response.data.data.map((job: any) => ({
          jobId: job.jobId,
          compId: job.organization.compId,
          jobRole: job.jobRole || "Untitled Job",
          jobLocation: job.jobLocation || "Unknown Location",
          salary: job.salary || "Not Disclosed",
          tags: [
            ...(job.jobType ? [job.jobType] : []),
            ...(Array.isArray(job.workPlaceType) ? job.workPlaceType : [job.workPlaceType]),
          ],
          logo: job.organization.logo
            ? `${config.apiUrl}/photo/${job.organization.logo}`
            : "https://via.placeholder.com/150",
          degName: job.degName || "Unknown Name",
          secName: job.secName || "Unknown Sector",
          skills: job.skills || [],
          jobDescription: job.jobDescription || "Unknown Job Description",
          yearsOfExperience: job.yearsOfExperience,
          requirements: job.requirements || [],
          jobType: job.jobType || "Unknown Job Type",
          workPlaceType: job.workPlaceType || "",
          organizationName: job.organization.organizationName,
          headOffice: job.organization.address,
          email: job.organization.email,
          phoneNo: job.organization.phoneNo,
          website: job.organization.website,
          about: job.organization.description,
          industry: job.organization.industry,
          since: job.organization.since,
          specialization: job.organization.specialization,
        }))

        setJobs(transformedData)
      } catch (error) {
        console.error("Error fetching jobs:", error)
        Alert.alert("Error", "Failed to fetch jobs. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [selected, selectedType, selectedWorkplace])

  const handleClearSearch = useCallback(() => {
    setSearchText("")
    setSelected(null)
  }, [])

  const handleSelectItem = (item: any) => {
    setSearchText(item.name || "")
    setSelected(item)
    setResults([])
  }

  const renderResultItem = ({ item }: { item: any }) => (
    <Pressable onPress={() => handleSelectItem(item)} style={styles.dropdownItem}>
      <View style={styles.dropdownItemContent}>
        <Text style={styles.dropdownItemText}>{item.name || "Unknown"}</Text>
        <Text style={[styles.dropdownItemType, { color: item.type === "degName" ? "#007AFF" : "#FF3B30" }]}>
          {item.type === "degName" ? "Designation" : "Skill"}
          {item.sector ? ` • ${item.sector}` : ""}
        </Text>
      </View>
    </Pressable>
  )

  const renderModalContent = () => {
    const options = modalType === "job Type" ? jobTypes : workplaceTypes
    const title = modalType === "job Type" ? "Job type" : "Remote"
    const currentSelection = modalType === "job Type" ? selectedType : selectedWorkplace

    return (
      <View style={styles.modalContent2}>
        <View style={styles.swipeIndicator} />
        <Text style={styles.title}>{title}</Text>

        {options.map((option: string, index: number) => (
          <Pressable
            key={index}
            style={[styles.optionButton, currentSelection === option ? styles.selectedOption : {}]}
            onPress={() => {
              if (modalType === "job Type") {
                setSelectedType(option === selectedType ? null : option)
              } else {
                setSelectedWorkplace(option === selectedWorkplace ? null : option)
              }
            }}
          >
            <Text style={[styles.optionText, currentSelection === option ? styles.selectedOptionText : {}]}>
              {option}
            </Text>
            <Text style={styles.plusIcon}>{currentSelection === option ? "✓" : "+"}</Text>
          </Pressable>
        ))}

        <Pressable style={styles.resultsButton} onPress={() => setModalVisible2(false)}>
          <Text style={styles.resultsButtonText}>Show results</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <Root>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { paddingTop: insets.top }]}
      >
        <View style={styles.contentScrollView}>
          <ImageBackground source={require("../../../assets/icons/Background.png")} style={styles.header}>
            <View style={styles.inputsOverlay}>
              <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={require("../../../assets/icons/whiteback.png")} />
              </Pressable>
              <View style={styles.searchContainer}>
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    zIndex: 2,
                  }}
                >
                  <View style={styles.inputContainer}>
                    <Image source={require("../../../assets/icons/search_12192414.png")} style={styles.icon} />
                    <TextInput
                      style={styles.textInput}
                      value={searchText}
                      onChangeText={setSearchText}
                      placeholder="Search sectors, designations, or skills..."
                      placeholderTextColor="#999"
                    />
                    {searchText !== "" && (
                      <Pressable onPress={handleClearSearch} style={{ marginLeft: 10, padding: 5 }}>
                        <Image source={require("../../../assets/icons/cross.png")} style={{ width: 20, height: 20 }} />
                      </Pressable>
                    )}
                  </View>
                  {loading && <ActivityIndicator style={styles.loadingIndicator} size="small" color="#555" />}
                  {results.length > 0 && (
                    <FlatList
                      data={results}
                      keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                      renderItem={renderResultItem}
                      style={styles.dropdown}
                    />
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Image source={require("../../../assets/icons/Location.png")} style={styles.icon} />
                  <TextInput placeholder="California, USA" placeholderTextColor="#ccc" style={styles.textInput} />
                </View>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.content}>
            <View style={styles.filterContainer}>
              <Pressable style={styles.iconButton} onPress={() => setModalVisible(true)}>
                <Image source={require("../../../assets/icons/Iconfilter.png")} style={styles.iconImage} />
              </Pressable>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
              >
                {[
                  { text: "Types", value: selectedType },
                  { text: "Remote", value: selectedWorkplace },
                ].map((item, index) => (
                  <Pressable
                    key={index}
                    style={[styles.textButton, item.value ? styles.activeTextButton : {}]}
                    onPress={() => handleButtonPress(item.text as "job Type" | "job Workplace")}
                  >
                    <Text style={[styles.textButtonText, item.value ? styles.activeTextButtonText : {}]}>
                      {item.text}
                      {item.value ? `: ${item.value}` : ""}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#130160" />
                <Text style={styles.loadingText}>Loading jobs...</Text>
              </View>
            ) : (
              <FlatList
                data={jobs}
                renderItem={({ item }) => (
                  <JobCard jobData={item} onApply={(jobData) => navigation.navigate("ApplyScreen", { jobData })} />
                )}
                keyExtractor={(item) => item.jobId}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Image source={require("../../../assets/icons/search_12192414.png")} style={styles.emptyIcon} />
                    <Text style={styles.noJobsText}>No jobs found</Text>
                    <Text style={styles.noJobsSubText}>
                      {selected
                        ? `No jobs matching "${selected.name}" were found`
                        : "Try adjusting your search or filters"}
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
          swipeDirection={["down"]}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.swipeIndicator} />
            <Text style={styles.title}>Filters</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Sort by</Text>
                <Text style={styles.filterValue}>Most relevant</Text>
              </View>
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Date posted</Text>
                <Text style={styles.filterValue}>Any time</Text>
              </View>
              {selectedType && (
                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Job Type</Text>
                  <Text style={styles.filterValue}>{selectedType}</Text>
                </View>
              )}
              {selectedWorkplace && (
                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Workplace</Text>
                  <Text style={styles.filterValue}>{selectedWorkplace}</Text>
                </View>
              )}
            </ScrollView>

            <Pressable style={styles.resultsButton} onPress={toggleModal}>
              <Text style={styles.resultsButtonText}>Show results</Text>
            </Pressable>
          </View>
        </Modal>

        <Modal
          isVisible={modalVisible2}
          onBackdropPress={() => setModalVisible2(false)}
          onSwipeComplete={() => setModalVisible2(false)}
          swipeDirection={["down"]}
          style={styles.modal}
        >
          <View style={styles.modalOverlay}>{renderModalContent()}</View>
        </Modal>
      </KeyboardAvoidingView>
    </Root>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  contentScrollView: {
    flex: 1,
  },
  header: {
    height: 230,
    marginTop: -23,
  },
  inputsOverlay: {
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 10,
  },
  searchContainer: {
    gap: 5,
    width: width - 40,
    alignSelf: "center",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 44,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "#130160",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  scrollContainer: {
    paddingRight: 16,
  },
  textButton: {
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  activeTextButton: {
    backgroundColor: "#E0F2FF",
    borderColor: "#007AFF",
    borderWidth: 1,
  },
  textButtonText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  activeTextButtonText: {
    color: "#007AFF",
  },
  jobCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 16,
  },
  CardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes it a circle
    backgroundColor: "#FFFFFF", // White background
    marginRight: 12,
    justifyContent: "center", // Center content (optional)
    alignItems: "center", // Center content (optional)

    // Shadow for iOS
    shadowColor: "#0072ff", // Blue shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, // Slightly increased opacity for visibility
    shadowRadius: 4, // Smooth spread

    // Shadow for Android
    elevation: 6, // Increased elevation for a stronger shadow effect
  },

  titleContainer: {
    flex: 1,
  },
  titleJ: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  salary: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-around",
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2, // Border thickness
    borderColor: "#0072ff", // Border color

    // Shadow for iOS
    shadowColor: "#0072ff", // Custom shadow color
    shadowOffset: { width: 0, height: 4 }, // Increased offset for visibility
    shadowOpacity: 0.5, // Higher opacity for a stronger shadow
    shadowRadius: 6, // Increased radius for a softer spread

    // Shadow for Android
    elevation: 10, // Increased elevation for Android
  },

  tagText: {
    fontSize: 14,
    color: "#555",
  },
  applyButton: {
    backgroundColor: "#32CD32", // Smooth green fallback
    padding: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12, // Slightly more rounded for a modern look
    // Shadow for iOS
    shadowColor: "#2E8B57", // Slightly darker green for shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,

    // Shadow for Android
    elevation: 10,
  },

  applyText: {
    fontSize: 14, // Slightly larger text for emphasis
    fontWeight: "600", // Semi-bold for better readability
    color: "#FFFFFF", // White text for contrast
    textTransform: "uppercase", // Stylish uppercase text
    letterSpacing: 1.2, // Subtle letter spacing for a modern feel
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "90%",
  },
  swipeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "#000",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    color: "#333",
  },
  filterValue: {
    fontSize: 16,
    color: "#007aff",
  },
  resultsButton: {
    backgroundColor: "#007aff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  resultsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 100,
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 25,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: "#007aff",
    backgroundColor: "#E0F2FF",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: "#007aff",
    fontWeight: "600",
  },
  plusIcon: {
    fontSize: 20,
    color: "#666",
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownItemType: {
    fontSize: 12,
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 10,
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    opacity: 0.5,
    marginBottom: 20,
  },
  noJobsText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  noJobsSubText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
  },
})

export default JobSearchScreen

