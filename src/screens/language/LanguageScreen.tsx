// LanguageScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
} from 'react-native';
import { useProfileContext } from '../../context/ProfileContext';

const LanguageScreen = ({ navigation }: any) => {
    const { setSelectedLanguage } = useProfileContext(); // Get the setter function

    const [languages, setLanguages] = useState([
        { id: '1', name: 'English', oral: '8', written: '8', flag: '🇬🇧' },
        { id: '2', name: 'Odia', oral: '7', written: '7', flag: '🇮🇳' },
        { id: '3', name: 'Hindi', oral: '9', written: '9', flag: '🇮🇳' },
    ]);

    const handleDelete = (id:any) => {
        Alert.alert(
            'Delete Language',
            'Are you sure you want to delete this language?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setLanguages((prevLanguages) =>
                            prevLanguages.filter((lang) => lang.id !== id)
                        );
                    },
                },
            ]
        );
    };

    const handleSelectLanguage = (language:any) => {
        setSelectedLanguage(language.name); // Update the selected language in the context
        navigation.goBack(); // Navigate back to the profile screen
    };

    const renderLanguage = ({ item }: any) => (
        <View style={styles.languageCard}>
            <Text style={styles.languageText}>
                {item.flag} {item.name}
            </Text>
            <Text style={styles.levelText}>Oral: Level {item.oral}</Text>
            <Text style={styles.levelText}>Written: Level {item.written}</Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
            >
                <Text style={styles.deleteButtonText}>🗑</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => handleSelectLanguage(item)}
            >
                <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.header}>Language</Text>
            </View>

            <FlatList
                data={languages}
                keyExtractor={(item) => item.id}
                renderItem={renderLanguage}
                contentContainerStyle={styles.listContainer}
            />

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 18,
        color: '#000',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    listContainer: {
        paddingBottom: 20,
    },
    languageCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 15,
        backgroundColor: '#FFF',
        marginBottom: 10,
    },
    languageText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
    },
    levelText: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        marginLeft: 10,
    },
    deleteButtonText: {
        fontSize: 18,
        color: '#FF0000',
    },
    selectButton: {
        marginLeft: 10,
        backgroundColor: '#000080',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    selectButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#000080',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LanguageScreen;
