import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Image,
} from 'react-native';

const Register = ({navigation}:any) => {

    return (
        <View style={styles.container}>
            {/* Background Image Section */}
            <ImageBackground
                source={require('../../assets/icons/AFLBG.png')} // Replace with your background image file
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Logo Image */}
                <Image
                    source={require('../../assets/icons/Logo3.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </ImageBackground>

            {/* Register Now Section */}
            <View style={styles.registerSection}>
                <Text style={styles.sectionTitle}>Register Now To</Text>
                <Text style={styles.sectionTitle}>Continue .</Text>
            </View>

            <Text style={styles.sectionDescription}>
                    Specify The User Type To Proceed
            </Text>
            {/* Buttons Section */}
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={styles.buttonLeft}
                    onPress={() => navigation.navigate('UserRegn')}
                >
                    <Image source={require('../../assets/icons/case.png')} style={{height:20,width:20}} />
                    <Text style={styles.buttonText}>Job Seeker</Text>
                </Pressable>
                <Pressable
                    style={styles.buttonRight}
                    onPress={() => navigation.navigate('OrganizationRegn')}
                >
                    <Image source={require('../../assets/icons/team.png')} style={{height:20,width:20}} />
                    <Text style={styles.buttonText}>Organization</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    backgroundImage: {
        flex:0.95,
        height: '80%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 130,
        position: 'absolute',
        top: '24%',
    },
    registerSection: {
        flex:0.2,
        position: 'absolute',
        top: '70%',
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexWrap:'wrap',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'left',
        
    },
    sectionDescription: {
        fontSize: 16,
        color: '#000',
        fontWeight:'800',
        textAlign: 'left',
        padding:20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    buttonLeft: {
        flex:0.5,
        flexDirection:'row',
        marginRight: 10,
        backgroundColor: 'white',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,

    },
    buttonRight: {
        flex:0.5,
        flexDirection:'row',
        marginLeft: 10,
        backgroundColor: 'white',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,

    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Register;

