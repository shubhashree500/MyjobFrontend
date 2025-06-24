// Updated Code
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Linking,
} from 'react-native';
import config from '../../../context/config';

const CampusApplyScreen = ({route, navigation}: any) => {
  const {events} = route.params;
  const [isDescriptionView, setIsDescriptionView] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          {events.organization?.logo ? (
            <Image
              source={{
                uri: `${config.apiUrl}/photo/${events.organization.logo}`,
              }}
              style={styles.logo}
              accessibilityLabel={`${events.organizationName} logo`}
            />
          ) : (
            <Text style={styles.noData}>No logo available</Text>
          )}
          <Text style={styles.title}>
            {events.degName || 'No designation provided'}
          </Text>
          <Text style={styles.companyInfo}>
            {events.organization.organizationName || 'Organization not specified'} •{' '}
            {events.jobLocation || 'Location not specified'} •{' '}
            {events.postedTime || 'Posted time not available'}
          </Text>
        </View>

        {/* Toggle Buttons */}
        <View style={styles.row}>
          <Pressable
            style={[
              styles.button,
              isDescriptionView
                ? styles.descriptionButton
                : styles.inactiveButton,
            ]}
            onPress={() => setIsDescriptionView(true)}
            accessibilityRole="button"
            accessibilityState={{selected: isDescriptionView}}>
            <Text style={styles.buttonText}>Description</Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              !isDescriptionView ? styles.companyButton : styles.inactiveButton,
            ]}
            onPress={() => setIsDescriptionView(false)}
            accessibilityRole="button"
            accessibilityState={{selected: !isDescriptionView}}>
            <Text style={styles.buttonText}>Company</Text>
          </Pressable>
        </View>

        {isDescriptionView ? (
          <>
            {/* Job Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Description</Text>
              <Text style={styles.text} numberOfLines={3}>
                {events.eventDescription || 'No description available'}
              </Text>
              <Pressable accessibilityRole="button">
                <Text style={styles.readMore}>Read more</Text>
              </Pressable>
            </View>

            {/* Requirements */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
              {events.requirements ? (
                (() => {
                  try {
                    let requirementsData = Array.isArray(events.requirements)
                      ? events.requirements
                      : JSON.parse(events.requirements);

                    if (!Array.isArray(requirementsData)) {
                      requirementsData = [requirementsData];
                    }

                    return requirementsData.length > 0 ? (
                      requirementsData.map(
                        (requirement: string, index: number) => (
                          <Text key={index} style={styles.listItem}>
                            • {requirement}
                          </Text>
                        ),
                      )
                    ) : (
                      <Text style={styles.noData}>
                        No eligibility criteria provided
                      </Text>
                    );
                  } catch (error) {
                    return (
                      <Text style={styles.noData}>
                        No eligibility criteria available
                      </Text>
                    );
                  }
                })()
              ) : (
                <Text style={styles.noData}>
                  No eligibility criteria available
                </Text>
              )}
            </View>

            {/* Location */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Venue</Text>
              <Text style={styles.text}>{events.jobLocation}</Text>
              <Image
                source={events.mapImage}
                style={styles.mapImage}
                accessibilityLabel="Event location map"
              />
            </View>

            {/* Additional Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Details</Text>
              {events.informations &&
              Object.entries(events.informations).length > 0 ? (
                Object.entries(events.informations).map(
                  ([key, value]: any, index) => (
                    <View key={index} style={styles.infoRow}>
                      <Text style={styles.infoLabel}>{key}:</Text>
                      <Text style={styles.infoValue}>{value}</Text>
                    </View>
                  ),
                )
              ) : (
                <Text style={styles.noData}>
                  No additional details available
                </Text>
              )}
            </View>

            {/* Facilities and Others */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Perks and Benefits</Text>
              {Array.isArray(events.facilities) &&
              events.facilities.length > 0 ? (
                events.facilities.map((facility: string, index: number) => (
                  <Text key={index} style={styles.listItem}>
                    • {facility}
                  </Text>
                ))
              ) : (
                <Text style={styles.noData}>No perks mentioned</Text>
              )}
            </View>
          </>
        ) : (
          <>
            {/* About Company */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Us</Text>
              {events.organization.description && events.organization.description.trim() !== '' ? (
                <Text style={styles.text}>{events.organization.description}</Text>
              ) : (
                <Text style={styles.noData}>No information available</Text>
              )}
            </View>

            {/* Website */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Official Website</Text>
              {events.organization.website ? (
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(events.organization.website)}>
                  {events.organization.website}
                </Text>
              ) : (
                <Text style={styles.noData}>Website not provided</Text>
              )}
            </View>

            {/* Other Details */}
            {[
              {label: 'Industry', value: events.organization.industry},
              {label: 'Headquarters', value: events.organization.headOffice},
              {label: 'Established', value: events.organization.since},
              {label: 'Specializations', value: events.organization.specialization},
            ].map((item, index) => (
              <View style={styles.section} key={index}>
                <Text style={styles.sectionTitle}>{item.label}</Text>
                {item.value ? (
                  <Text style={styles.text}>{item.value}</Text>
                ) : (
                  <Text style={styles.noData}>Not specified</Text>
                )}
              </View>
            ))}

            {/* Company Gallery */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Gallery</Text>
              {Array.isArray(events.organization.gallery) && events.organization.gallery.length > 0 ? (
                <View style={styles.gallery}>
                  {events.gallery.map((image: any, index: number) => (
                    <Image
                      key={index}
                      style={styles.image}
                      source={image}
                      accessibilityLabel={`Gallery image ${index + 1}`}
                    />
                  ))}
                </View>
              ) : (
                <Text style={styles.noData}>No gallery images available</Text>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.footerContainer}>
        <Pressable
          onPress={() => setIsPressed(!isPressed)}
          style={styles.imageContainer}>
          <Image
            source={require('../../../assets/icons/save.png')}
            style={[
              styles.imageF,
              isPressed && {tintColor: 'blue'},
            ]}
          />
        </Pressable>
        <Pressable
          style={styles.buttonF}
          onPress={() => navigation.navigate('CampusUploadCv', {events})}>
          <Text style={styles.buttonTextF}>APPLY NOW</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backImage: {
    height: 10,
    width: 20,
    position: 'absolute',
    top: 20,
    // bottom: 20,
  },
  logo: {
    width: 60, // Circle width
    height: 60, // Circle height
    marginBottom: 15, // Margin below the logo
    borderRadius: 30, // Makes it a perfect circle
    backgroundColor: '#ffffff', // Optional: Background color of the circle
    shadowColor: '#0072ff', // Shadow color
    shadowOffset: {width: 0, height: 4}, // Shadow offset for a subtle lift
    shadowOpacity: 0.6, // Opacity of the shadow
    shadowRadius: 8, // Blur radius for a smooth shadow
    elevation: 10, // Adds shadow on Android
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 16,
    color: '#6B7280',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 150,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  descriptionButton: {
    backgroundColor: '#e0e0ff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  companyButton: {
    backgroundColor: '#e0e0ff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  inactiveButton: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  readMore: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
    lineHeight: 20,
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 10,
  },
  link: {
    fontSize: 14,
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageF: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
    resizeMode: 'contain',
  },
  buttonF: {
    flex: 1,
    backgroundColor: '#0B053D',
    marginLeft: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonTextF: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  noData: {
    fontSize: 16,
    color: '#000',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default CampusApplyScreen;
