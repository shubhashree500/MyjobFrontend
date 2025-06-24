import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable,
    Alert,
} from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import config from "../../../context/config";

const AddWorkExperience = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [CTC, setCTC] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [description, setDescription] = useState("");
    const [experience, setExperience] = useState("");
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const navigation = useNavigation();

    const handleSave = async () => {
        const accessToken =await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');
        const updatedDetails = {
            jobRole:jobTitle ,
            companyName: company,
            experience:experience,
            ctc:CTC,
        };

        try {
            const response = await axios.put(`${config.apiUrl}/professionalDetails/update/${userId}`, updatedDetails, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Update successful:', response.data);
            Alert.alert("Success", "Work experience added successfully");
            navigation.goBack();
        } catch (error:any) {
            console.error('Error updating professional details:', error.response?.data || error.message);
            Alert.alert("Error", "Failed to add work experience. Please try again.");
        }
    };




    const calculateExperience = () => {
        if (startDate && endDate) {
            // Validate date range
            if (startDate > endDate) {
                setExperience("Invalid date range");
                return;
            }

            // Calculate total months of difference
            const totalMonths =
                (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth());

            // Calculate years and months
            const years = Math.floor(totalMonths / 12);
            const months = totalMonths % 12;

            // Update the experience state
            setExperience(`${years} year(s) and ${months} month(s)`);
        }
    };

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const handleStartDateConfirm = (date: Date) => {
        setStartDate(date);
        hideStartDatePicker();
        calculateExperience();
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleEndDateConfirm = (date: Date) => {
        setEndDate(date);
        hideEndDatePicker();
        calculateExperience();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../assets/icons/blackBack.png')}
                    />
                </Pressable>
            </View>
            <Text style={styles.title}>Add work experience</Text>
            <Text style={styles.label}>Job Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your job title"
                placeholderTextColor="#999"
                value={jobTitle}
                onChangeText={setJobTitle}
            />

            <Text style={styles.label}>Company</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter company name"
                placeholderTextColor="#999"
                value={company}
                onChangeText={setCompany}
            />

            <View>
                <View style={styles.row}>
                    <View style={styles.halfContainer}>
                        <Text style={styles.label}>Start Date</Text>
                        <TouchableOpacity onPress={showStartDatePicker}>
                            <Text style={styles.dateInput}>
                                {startDate ? startDate.toLocaleDateString() : 'Select Date'}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isStartDatePickerVisible}
                            mode="date"
                            onConfirm={handleStartDateConfirm}
                            onCancel={hideStartDatePicker}
                        />
                    </View>

                    <View style={styles.halfContainer}>
                        <Text style={styles.label}>End Date</Text>
                        <TouchableOpacity onPress={showEndDatePicker}>
                            <Text style={styles.dateInput}>
                                {endDate ? endDate.toLocaleDateString() : 'Select Date'}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isEndDatePickerVisible}
                            mode="date"
                            onConfirm={handleEndDateConfirm}
                            onCancel={hideEndDatePicker}
                        />
                    </View>
                </View>

                {experience && (
                    <Text style={styles.result}>Experience: {experience}</Text>
                )}
            </View>

            <Text style={styles.label}>CTC</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter previous company CTC"
                placeholderTextColor="#999"
                value={CTC}
                onChangeText={setCTC}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Write additional information here"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                multiline={true}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        left: '24%'
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color: "#000",
    },
    dateInput: {
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color: "#000",
        textAlign: 'center',
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    halfContainer: {
        width: "48%",
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    saveButton: {
        backgroundColor: "#1e0f6a",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    result: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
});

export default AddWorkExperience;