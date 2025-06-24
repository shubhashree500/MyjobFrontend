"use client"

import { useEffect, useState } from "react"
import config from "../../context/config"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const plusIcon = require("../../assets/icons/Add.png")
const editIcon = require("../../assets/icons/Edit.png")
const SearchIcon = require("../../assets/icons/Search.png")
const crossIcon = require("../../assets/icons/cross.png")

const jobPositions = [
  "Assistant",
  "Associate",
  "Administrative Assistant",
  "Account Manager",
  "Assistant Manager",
  "Commission Sales Associate",
  "Sales Attendant",
  "Accountant",
  "Sales Advocate",
  "Analyst",
]

const workplaceTypes = [
  {
    id: "1",
    title: "Onsite",
    description: "Employees come to work",
  },
  {
    id: "2",
    title: "Hybrid",
    description: "Employees work directly on site or off-site",
  },
  {
    id: "3",
    title: "Remote",
    description: "Employees working off site",
  },
]

const locations = [
  "Califon, United States",
  "California, United States",
  "California City, United States",
  "Dallas, United States",
  "Denver, United States",
  "Detroit, United States",
  "Houston, United States",
]

const companies = [
  {
    id: "1",
    name: "Google",
    industry: "Internet",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "2",
    name: "Apple",
    industry: "Electronic goods",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "3",
    name: "Amazon",
    industry: "Internet",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "4",
    name: "Dribbble",
    industry: "Design",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "5",
    name: "Twitter",
    industry: "Internet",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "6",
    name: "Facebook",
    industry: "Internet",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "7",
    name: "Microsoft",
    industry: "Computer software",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "8",
    name: "Allianz",
    industry: "Financial services",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "9",
    name: "Adobe",
    industry: "Computer software",
    logo: require("../../assets/icons/google.png"),
  },
  {
    id: "10",
    name: "AXA",
    industry: "Insurance",
    logo: require("../../assets/icons/google.png"),
  },
]

const employmentTypes = [
  { id: "1", title: "Full time" },
  { id: "2", title: "Part time" },
  { id: "3", title: "Contract" },
  { id: "4", title: "Internship" },
]

const FormField = ({
  label,
  onPress,
  value,
  required,
}: {
  label: string
  onPress: () => void
  value?: string
  required?: boolean
}) => (
  <TouchableOpacity style={styles.fieldContainer} onPress={onPress}>
    <View>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={styles.requiredAsterisk}>*</Text>}
      </Text>
      {value && <Text style={styles.fieldValue}>{value}</Text>}
    </View>
    {value ? <Image source={editIcon} style={styles.editIcon} /> : <Image source={plusIcon} style={styles.plusIcon} />}
  </TouchableOpacity>
)

const RadioButton = ({
  selected,
  onPress,
  title,
  description,
}: {
  selected: boolean
  onPress: () => void
  title: string
  description: string
}) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View style={styles.radioContent}>
      <Text style={styles.radioTitle}>{title}</Text>
      <Text style={styles.radioDescription}>{description}</Text>
    </View>
    <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
      {selected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
)

const LocationModal = ({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean
  onClose: () => void
  onSelect: (location: string) => void
}) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLocations = locations.filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image source={crossIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Location</Text>
          <View style={styles.searchContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Text style={styles.clearSearch}>x</Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            data={filteredLocations}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.locationItem}
                onPress={() => {
                  onSelect(item)
                  onClose()
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  )
}

const SectorModal = ({ visible, onClose, onSave, initialSectors }: any) => {
  const [sectors, setSectors] = useState<any[]>([])
  const [selectedSectors, setSelectedSectors] = useState<string[]>(initialSectors || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSectors = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${config.apiUrl}/sectorDetails/getall`)
        const sectorsData = Array.isArray(response.data.data)
          ? response.data.data.map((sector: any) => ({
              id: sector.sectorId,
              name: sector.name,
            }))
          : []
        setSectors(sectorsData)
      } catch (error) {
        console.error("Error fetching sectors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSectors()
  }, [])

  const handleSectorSelect = (sectorName: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sectorName) ? prev.filter((sector) => sector !== sectorName) : [...prev, sectorName],
    )
  }

  const handleSave = () => {
    const selectedSectorObjects = sectors.filter((sector) => selectedSectors.includes(sector.name))
    onSave(selectedSectorObjects)
    onClose()
  }

  const filteredSectors = sectors.filter((sector) => sector.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image source={crossIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Select Sectors</Text>
          <View style={styles.searchContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Text style={styles.clearSearch}>x</Text>
              </TouchableOpacity>
            )}
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : filteredSectors.length > 0 ? (
            <ScrollView>
              {filteredSectors.map((sector) => (
                <TouchableOpacity
                  key={sector.id}
                  style={[
                    {
                      padding: 10,
                      marginVertical: 5,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderRadius: 5,
                    },
                    selectedSectors.includes(sector.name) && {
                      backgroundColor: "#e6f7ff",
                    },
                  ]}
                  onPress={() => handleSectorSelect(sector.name)}
                >
                  <Text>{sector.name}</Text>
                  {selectedSectors.includes(sector.name) && <Text>✓</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text>No sectors available.</Text>
          )}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const CompanyModal = ({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean
  onClose: () => void
  onSelect: (company: (typeof companies)[0]) => void
}) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Company</Text>
          <View style={styles.searchContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Text style={styles.clearSearch}>x</Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            data={filteredCompanies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.companyItem}
                onPress={() => {
                  onSelect(item)
                  onClose()
                }}
              >
                <Image source={item.logo} style={styles.companyLogo} />
                <View style={styles.companyInfo}>
                  <Text style={styles.companyName}>{item.name}</Text>
                  <Text style={styles.companyIndustry}>Company • {item.industry}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  )
}

const EmploymentTypeModal = ({
  visible,
  onClose,
  selectedType,
  onSelect,
}: {
  visible: boolean
  onClose: () => void
  selectedType: string
  onSelect: (type: string) => void
}) => (
  <Modal visible={visible} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Image source={crossIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.modalTitleEM}>Choose Employee Type</Text>
        <Text style={styles.modalSubtitle}>Determine and choose the type of work according to what you want</Text>
        <View style={styles.radioGroup}>
          {employmentTypes.map((type) => (
            <RadioButton
              key={type.id}
              selected={selectedType === type.title}
              onPress={() => {
                onSelect(type.title)
                onClose()
              }}
              title={type.title}
              description={""}
            />
          ))}
        </View>
      </View>
    </View>
  </Modal>
)

const RequirementsModal = ({ visible, onClose, onSave, initialRequirements }: any) => {
  const [requirements, setRequirements] = useState<string[]>(initialRequirements || [])
  const [newRequirement, setNewRequirement] = useState("")

  const addRequirement = () => {
    if (newRequirement.trim() !== "") {
      setRequirements((prevRequirements) => [...prevRequirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements((prevRequirements) => prevRequirements.filter((_, i) => i !== index))
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image source={crossIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Requirements</Text>
          <TextInput
            style={styles.input}
            value={newRequirement}
            onChangeText={setNewRequirement}
            placeholder="Enter a requirement"
            onSubmitEditing={addRequirement}
          />
          <FlatList
            data={requirements}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.requirementItem}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => removeRequirement(index)}>
                  <Image source={crossIcon} style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              console.log("Saving requirements:", requirements)
              onSave(requirements)
              onClose()
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const SkillsModal = ({ visible, onClose, onSave, initialSkills }: any) => {
  const [skills, setSkills] = useState<any[]>(Array.isArray(initialSkills) ? initialSkills : [])
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialSkills?.map((skill: any) => skill.name) || [])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${config.apiUrl}/skillDetails/getall`)
        const skillsData = response.data.skills.map((skill: any) => ({
          id: skill.skillId,
          name: skill.skillName,
          description: skill.description || "",
        }))
        setSkills(skillsData)
      } catch (error) {
        console.error("Error fetching skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const handleSkillSelect = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((skill) => skill !== skillName) : [...prev, skillName],
    )
  }

  const handleSave = () => {
    const selectedSkillObjects = skills.filter((skill) => selectedSkills.includes(skill.name))
    onSave(selectedSkillObjects)
    onClose()
  }

  const filteredSkills = skills.filter((skills) => skills.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image source={crossIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Select Skills</Text>
          <View style={styles.searchContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Text style={styles.clearSearch}>x</Text>
              </TouchableOpacity>
            )}
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : filteredSkills.length > 0 ? (
            <ScrollView>
              {filteredSkills.map((skill) => (
                <TouchableOpacity
                  key={skill.id}
                  style={[
                    styles.skillItem,
                    selectedSkills.includes(skill.name) && {
                      backgroundColor: "#e6f7ff",
                    },
                  ]}
                  onPress={() => handleSkillSelect(skill.name)}
                >
                  <Text>{skill.name}</Text>
                  {selectedSkills.includes(skill.name) && <Text>✓</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text>No skills available.</Text>
          )}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const YearsOfExperienceModal = ({ visible, onClose, onSave, initialValue }: any) => {
  const [yearsOfExperience, setYearsOfExperience] = useState(initialValue)

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image source={crossIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>Years of Experience</Text>
          <TextInput
            style={styles.input}
            value={yearsOfExperience}
            onChangeText={setYearsOfExperience}
            placeholder="Enter years of experience"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              onSave(yearsOfExperience)
              onClose()
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const AddJobPage = ({ navigation }: any) => {
  const [jobPositionModalVisible, setJobPositionModalVisible] = useState(false)
  const [selectedJobPosition, setSelectedJobPosition] = useState("")
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)
  const [selectedWorkplace, setSelectedWorkplace] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [locationModalVisible, setLocationModalVisible] = useState(false)
  const [companyModalVisible, setCompanyModalVisible] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<(typeof companies)[0] | null>(null)
  const [employmentTypeModalVisible, setEmploymentTypeModalVisible] = useState(false)
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("")
  const [description, setDescription] = useState("")
  const [requirements, setRequirements] = useState([])
  const [yearsOfExperience, setYearsOfExperience] = useState("")
  const [skills, setSkills] = useState([])
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [skillsModalVisible, setSkillsModalVisible] = useState(false)
  const [sectorModalVisible, setSectorModalVisible] = useState(false)
  const [selectedSectors, setSelectedSectors] = useState([])
  const [requirementsModalVisible, setRequirementsModalVisible] = useState(false)
  const [yearsOfExperienceModalVisible, setYearsOfExperienceModalVisible] = useState(false)

  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible(!isDescriptionVisible)
  }

  const [jobPositions, setJobPositions] = useState<string[]>([])
  const [filteredJobPositions, setFilteredJobPositions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (jobPositionModalVisible) {
      fetchJobPositions()
    }
  }, [jobPositionModalVisible])

  const fetchJobPositions = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${config.apiUrl}/designation/getall`)
      console.log(response.data)
      const positions = response.data.map((position: { degName: string }) => position.degName)
      setJobPositions(positions)
      setFilteredJobPositions(positions)
    } catch (err) {
      setError("Failed to fetch job positions")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredJobPositions(jobPositions)
    } else {
      const filtered = jobPositions.filter((position) => position.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredJobPositions(filtered)
    }
  }, [searchQuery, jobPositions])

  const getAllAsyncStorageData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const stores = await AsyncStorage.multiGet(keys)

      stores.forEach(([key, value]) => {
        console.log(`${key}: ${value}`)
      })

      return stores // Returns an array of key-value pairs
    } catch (error) {
      console.error("Error fetching AsyncStorage data:", error)
    }
  }

  const handlePostJob = async () => {
    const compId = await AsyncStorage.getItem("userId")
    console.log("compId", compId)
    try {
      const jobData = {
        compId: compId,
        // companyName: selectedCompany?.name,
        degName: selectedJobPosition,
        jobDescription: description,
        jobLocation: selectedLocation,
        jobType: selectedEmploymentType,
        requirements: requirements,
        secName: selectedSectors[0]?.name,
        skills: skills,
        workPlaceType: selectedWorkplace,
        yearsOfExperience: yearsOfExperience,
      }

      console.log(jobData)

      const response = await axios.post(`${config.apiUrl}/postedjob/create`, jobData)

      if (response.status === 201) {
        // Job posted successfully
        navigation.navigate("JobShare", { jobData })
      } else {
        // Handle error
        console.error("Failed to post job")
      }
    } catch (error) {
      console.error("Error posting job:", error)
    }
  }

  useEffect(() => {
    getAllAsyncStorageData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("OrganizationHomeScreen")}>
          <Image source={crossIcon} style={styles.closeIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePostJob}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Add a job</Text>

        <FormField
          label="Sector Name"
          onPress={() => setSectorModalVisible(true)}
          value={selectedSectors.map((sector: { name: any }) => sector.name).join(", ")}
        />
        <FormField label="Job position" onPress={() => setJobPositionModalVisible(true)} value={selectedJobPosition} />
        <FormField label="Type of workplace" onPress={() => setWorkplaceModalVisible(true)} value={selectedWorkplace} />
        <FormField label="Job location" onPress={() => setLocationModalVisible(true)} value={selectedLocation} />
        {/* <FormField
          label="Company"
          onPress={() => setCompanyModalVisible(true)}
          value={selectedCompany?.name}
        /> */}
        <FormField
          label="Employment type"
          onPress={() => setEmploymentTypeModalVisible(true)}
          value={selectedEmploymentType}
        />
        <FormField
          label="Skills"
          onPress={() => setSkillsModalVisible(true)}
          value={Array.isArray(skills) && skills.length > 0 ? skills.map((skill) => skill.name).join(", ") : ""}
        />
        <FormField
          label="Requirements"
          onPress={() => setRequirementsModalVisible(true)}
          value={requirements.join(", ")}
        />
        <FormField
          label="Years of Experience"
          onPress={() => setYearsOfExperienceModalVisible(true)}
          value={yearsOfExperience}
        />
        <View style={styles.fieldContainer}>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>Description</Text>
            {!isDescriptionVisible && description && <Text style={styles.fieldValue}>{description}</Text>}
          </View>
          <TouchableOpacity onPress={toggleDescriptionVisibility}>
            <Image source={description ? editIcon : plusIcon} style={description ? styles.editIcon : styles.plusIcon} />
          </TouchableOpacity>
        </View>
        {isDescriptionVisible && (
          <View style={styles.descriptionInputContainer}>
            <TextInput
              style={styles.descriptionInput}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter job description"
            />
          </View>
        )}
      </ScrollView>

      {/* Job Position Modal */}
      <Modal visible={jobPositionModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setJobPositionModalVisible(false)}>
                <Image source={crossIcon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Job Position</Text>
            <View style={styles.searchContainer}>
              <Image source={SearchIcon} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery !== "" && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Text style={styles.clearSearch}>x</Text>
                </TouchableOpacity>
              )}
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>{error}</Text>
            ) : (
              <FlatList
                data={filteredJobPositions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.jobItem}
                    onPress={() => {
                      setSelectedJobPosition(item)
                      setJobPositionModalVisible(false)
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={workplaceModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.workplaceModalHeader}>
              <TouchableOpacity onPress={() => setWorkplaceModalVisible(false)}>
                <Image source={crossIcon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.workplaceModalTitle}>Choose the type of workplace</Text>
            <Text style={styles.workplaceModalSubtitle}>
              Decide and choose the type of place to work according to what you want
            </Text>
            <View style={styles.radioGroup}>
              {workplaceTypes.map((type) => (
                <RadioButton
                  key={type.id}
                  selected={selectedWorkplace === type.title}
                  onPress={() => {
                    setSelectedWorkplace(type.title)
                    setWorkplaceModalVisible(false)
                  }}
                  title={type.title}
                  description={type.description}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      <LocationModal
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onSelect={(location) => {
          setSelectedLocation(location)
          setLocationModalVisible(false)
        }}
      />

      <CompanyModal
        visible={companyModalVisible}
        onClose={() => setCompanyModalVisible(false)}
        onSelect={(company) => {
          setSelectedCompany(company)
          setCompanyModalVisible(false)
        }}
      />

      <EmploymentTypeModal
        visible={employmentTypeModalVisible}
        onClose={() => setEmploymentTypeModalVisible(false)}
        selectedType={selectedEmploymentType}
        onSelect={setSelectedEmploymentType}
      />

      <SkillsModal
        visible={skillsModalVisible}
        onClose={() => setSkillsModalVisible(false)}
        onSave={setSkills}
        initialSkills={skills}
      />

      <RequirementsModal
        visible={requirementsModalVisible}
        onClose={() => setRequirementsModalVisible(false)}
        onSave={setRequirements}
        initialRequirements={requirements}
      />

      <YearsOfExperienceModal
        visible={yearsOfExperienceModalVisible}
        onClose={() => setYearsOfExperienceModalVisible(false)}
        onSave={setYearsOfExperience}
        initialValue={yearsOfExperience}
      />

      <SectorModal
        visible={sectorModalVisible}
        onClose={() => setSectorModalVisible(false)}
        onSave={setSelectedSectors}
        initialSectors={selectedSectors}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postButton: {
    fontSize: 16,
    color: "#ff9800",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 16,
  },
  fieldValue: {
    fontSize: 16,
    color: "#666",
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: "#ff9800",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff    backgroundColor: 'rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalHeader: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  modalTitleEM: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  clearSearch: {
    fontSize: 18,
    color: "#666",
    padding: 4,
  },
  jobItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  requiredAsterisk: {
    color: "#ff9800",
    marginLeft: 4,
  },
  fieldValuew: {
    fontSize: 14,
    color: "#666",
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: "#ff9800",
  },
  workplaceModalHeader: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  workplaceModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  workplaceModalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  radioGroup: {
    marginTop: 16,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  radioContent: {
    flex: 1,
  },
  radioTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  radioDescription: {
    fontSize: 14,
    color: "#666",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#ff9800",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff9800",
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 18,
    color: "#666",
  },
  locationList: {
    flex: 1,
  },
  locationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  locationText: {
    fontSize: 16,
  },
  companyList: {
    flex: 1,
  },
  companyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  companyIndustry: {
    fontSize: 14,
    color: "#666",
  },
  descriptionInputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 8,
  },
  descriptionInput: {
    flex: 1,
    fontSize: 16,
    color: "#666",
    textAlignVertical: "top",
    paddingRight: 24,
    marginBottom: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  skillItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  removeButton: {
    color: "red",
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#ff9800",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  requirementItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
})

export default AddJobPage

