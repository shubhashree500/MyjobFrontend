import React, { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Image, Pressable, Text, FlatList, ScrollView, PanResponder, Animated } from 'react-native';
import RangeSlider from 'rn-range-slider';
import CheckBox from '@react-native-community/checkbox';



type City = { id: number; name: string };
const Filter = () => {
  const navigation = useNavigation();
 
  
 // Animated width for the progress bar
 const [low, setLow] = useState(18); // Example: $18k
 const [high, setHigh] = useState(25);

  const renderThumb = () => <View style={styles.thumb} />;
  const renderRail = () => <View style={styles.rail} />;
  const renderRailSelected = () => <View style={styles.railSelected} />;
  const renderNotch = () => <></>;

  const renderLabel = (value:any) => (
    <View style={styles.label}>
      <Text style={styles.labelText}>{value}k</Text>
    </View>
  );
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false); // First dropdown visibility
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false); // Second dropdown visibility
  const [selectedOption1, setSelectedOption1] = useState(null); // Selected option for the first dropdown
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false); // Second dropdown visibility
  const [selectedOption3, setSelectedOption3] = useState(null); // Track selected radio button
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null); 
  const [isPositionLevelExpanded, setIsPositionLevelExpanded] = useState(false);
  const [selectedPositionLevel, setSelectedPositionLevel] = useState(null); // Control collapsible visibility
  
  
  const options = [
    { id: 1, label: 'Recent' },
    { id: 2, label: 'Last week' },
    { id: 3, label: 'Last Month' },
    { id: 4, label: 'Anytime' },
  ];
  const optionworkplace = [
    { id: 1, label: 'On-site' },
    { id: 2, label: 'Hybrid' },
    { id: 3, label: 'Remote' },
   
  ];

  const options3 = [
    { id: 1, label: 'No Exprences' },
    { id: 2, label: 'Less then one year' },
    { id: 3, label: '1-3 year' },
    { id: 4, label: '3-5 year' },
    { id: 5, label: '5-10 year' },
    { id: 6, label: 'More than 10' },
  ];
  

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
    setIsDropdownOpen2(false); // Close the second dropdown when the first is toggled
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    setIsDropdownOpen1(false); // Close the first dropdown when the second is toggled
  };
  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
    setIsDropdownOpen1(false); // Close the first dropdown when the second is toggled
  };

  const handleSelectOption1 = (id:any) => {
    setSelectedOption1(id);
    setIsDropdownOpen1(false); // Close dropdown after selection
  };

  const handleSelectOption2 = (id:any) => {
    setSelectedOption2(id);
    setIsDropdownOpen2(false); // Close dropdown after selection
  };
  const handleSelectOption3 = (id:any) => {
    setSelectedOption3(id);
    setIsDropdownOpen3(false); // Close dropdown after selection
  };
  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };
  const handleButtonClick = (buttonName:any) => {
    setSelectedButton(buttonName); // Update the selected button
  };
  const handlePositionLevelClick = (buttonName:any) => setSelectedPositionLevel(buttonName);
  const togglePositionLevel = () => setIsPositionLevelExpanded(!isPositionLevelExpanded);


  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  const cities = [
    { id: 1, label: "New York" },
    { id: 2, label: "Los Angeles" },
    { id: 3, label: "Chicago" },
    { id: 4, label: "Houston" },
    { id: 5, label: "Phoenix" },
    { id: 6, label: "San Francisco" },
    { id: 7, label: "Miami" },
    { id: 8, label: "Seattle" },
    { id: 9, label: "Boston" },
    { id: 10, label: "Dallas" },
  ];

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const toggleCitySelection = (city: City) => {
    if (selectedCities.some((item) => item.id === city.id)) {
      setSelectedCities(selectedCities.filter((item) => item.id !== city.id));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };
//Specialization
const [dropdownVisible2, setDropdownVisible2] = useState<boolean>(false); // Boolean for dropdown visibility
const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);


  const specializations = [
    { id: 1, label: "Software Engineering" },
    { id: 2, label: "Data Science" },
    { id: 3, label: "Artificial Intelligence" },
    { id: 4, label: "Machine Learning" },
    { id: 5, label: "Cybersecurity" },
    { id: 6, label: "Cloud Computing" },
    { id: 7, label: "Database Management" },
    { id: 8, label: "Network Engineering" },
    { id: 9, label: "Blockchain" },
    { id: 10, label: "DevOps" },
  ];

  const toggleDropdown4 = () => setDropdownVisible2((prev) => !prev);

  const toggleSpecializationSelection = (specialization:any) => {
    if (selectedSpecializations.includes(specialization)) {
      setSelectedSpecializations(
        selectedSpecializations.filter((item) => item !== specialization)
      );
    } else {
      setSelectedSpecializations([...selectedSpecializations, specialization]);
    }
  };

  const [isPressed, setIsPressed] = useState(false);
  const resetSelections = () => {
    setSelectedSpecializations([]);
    setSelectedCities([]);
    setSelectedOption1(null);
    setSelectedOption2(null);
    setSelectedOption3(null);
    setIsExpanded(false);
    setSelectedButton(null);
    
  };

  
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>

        <Pressable onPress={() => navigation.navigate('Specialization')}>
          <Image source={require('../../../assets/icons/blackBack.png')} style={styles.backImage} />
        </Pressable>
        <View style={styles.headerView}>
            <Text style={styles.headingtext}>Filter</Text>
                 
                      
           </View>         
        
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Category */}
        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Category</Text>
            <View style={styles.inputContainer}>
            <TextInput
                            placeholder="California, USA"
                            placeholderTextColor="#ccc"
                            style={styles.textInput}
                        /> 
                        </View>
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Sub Category</Text>
            <View style={styles.inputContainer}>
            <TextInput
                            placeholder="Subcategory"
                            placeholderTextColor="#ccc"
                            style={styles.textInput}
                        /> 
                        </View>
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Location</Text>
            <View style={styles.inputContainer}>
            <TextInput
                            placeholder="Location"
                            placeholderTextColor="#ccc"
                            style={styles.textInput}
                        /> 
                        </View>
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Salary</Text>
            {/* <Text style={styles.textTitle}>${low}</Text> */}
            <View style={styles.sliderContainer}>
            <RangeSlider
        style={styles.slider}
        min={0}
        max={100}
        step={1}
        low={low}
        high={high}
        onValueChanged={(low, high) => {
          setLow(low);
          setHigh(high);
        }}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        
      />

<View style={styles.valueLabels}>
          <Text style={styles.valueText}>{low}k</Text>
          <Text style={styles.valueText}>{high}k</Text>
        </View>
      </View>
      {/* <Text style={styles.textTitle}>${high}</Text> */}
            {/* <RangeSlider /> */}
          {/* <Text style={styles.value}>${}</Text> */}
            
        </View>

        <View style={styles.textContainer}>
      {/* Dropdown Header */}
      <Pressable style={styles.dropdownHeader} onPress={toggleDropdown1}>
        <Text style={styles.headerText}>
          {selectedOption1
            ? options.find((option) => option.id === selectedOption1)?.label
            : 'Last update'}
        </Text>
        <Text style={styles.arrow}>{isDropdownOpen1 ? '▲' : '▼'}</Text>
      </Pressable>

      {/* Dropdown Body */}
      {isDropdownOpen1 && (
        <View style={styles.dropdownBody}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              style={styles.radioOption}
              onPress={() => handleSelectOption1(option.id)}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedOption1 === option.id && styles.radioButtonSelected,
                ]}
              />
              <Text style={styles.radioLabel}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
    <View style={styles.horizontalLine} />
       
        <View style={styles.textContainer}>
      {/* Dropdown Header */}
      <Pressable style={styles.dropdownHeader} onPress={toggleDropdown2}>
        <Text style={styles.headerText}>
          {selectedOption2
            ? optionworkplace.find((option) => option.id === selectedOption2)?.label
            : 'Types of workplace'}
        </Text>
        <Text style={styles.arrow}>{isDropdownOpen2 ? '▲' : '▼'}</Text>
      </Pressable>

      {/* Dropdown Body */}
      {isDropdownOpen2 && (
        <View style={styles.dropdownBody}>
          {optionworkplace.map((option) => (
            <Pressable
              key={option.id}
              style={styles.radioOption}
              onPress={() => handleSelectOption2(option.id)}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedOption2 === option.id && styles.radioButtonSelected,
                ]}
              />
              <Text style={styles.radioLabel}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
    <View style={styles.horizontalLine} />

    <View style={styles.textContainer}>
    <Pressable style={styles.headerbutton} onPress={toggleCollapse}>
        <Text style={styles.headerText}>Job Type</Text>
        <Text style={styles.arrow}>{isExpanded ? '▲' : '▼'}</Text>
      </Pressable>

      {/* Collapsible Body */}
     {isExpanded && (
        <View style={styles.body}>
          {/* Buttons in a Row */}
          <View style={styles.buttonRow}>
            {['Full-Time', 'Part-Time', 'Contract', 'Freelance'].map((buttonName) => (
              <Pressable
                key={buttonName}
                style={[
                  styles.button,
                  selectedButton === buttonName && styles.selectedButton,
                ]}
                onPress={() => handleButtonClick(buttonName)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === buttonName && styles.selectedButtonText,
                  ]}
                >
                  {buttonName}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
     <View style={styles.horizontalLine} />
     <View style={styles.textContainer}>
    <Pressable style={styles.headerbutton} onPress={togglePositionLevel}>
        <Text style={styles.headerText}>Position Level</Text>
        <Text style={styles.arrow}>{isPositionLevelExpanded ? '▲' : '▼'}</Text>
      </Pressable>

      {/* Collapsible Body */}
     {isPositionLevelExpanded && (
        <View style={styles.body}>
          {/* Buttons in a Row */}
          <View style={styles.buttonRow}>
            {['Entry-Level', 'Mid-Level', 'Senior-Level', 'Executive'].map((buttonName) => (
              <Pressable
                key={buttonName}
                style={[
                  styles.button,
                  selectedPositionLevel === buttonName && styles.selectedButton,
                ]}
                onPress={() => handlePositionLevelClick(buttonName)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedPositionLevel === buttonName && styles.selectedButtonText,
                  ]}
                >
                  {buttonName}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>

     <View style={styles.horizontalLine} />

      <View style={styles.textContainer}>
      
      
      <Pressable style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.headerText}>
          {selectedCities.length > 0
            ? selectedCities.join(", ")
            : "Select Cities"}
        </Text>
        <Text style={styles.arrow}>{dropdownVisible ? "▲" : "▼"}</Text>
      </Pressable>

      {dropdownVisible && (
        <View style={[styles.dropdownMenu, { maxHeight: 200 }]}>
        <FlatList
          data={cities}
          keyExtractor={(item):any => item.id.toString()}
          renderItem={({ item, index }) => (
            <View>
              <Pressable
                style={styles.dropdownItem}
                onPress={() => toggleCitySelection(item.label)}
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedCities.includes(item.label) && styles.checkboxSelected,
                  ]}
                />
                <Text style={styles.label}>{item.label}</Text>
              </Pressable>
              {index < cities.length - 1 && <View style={styles.divider} />}
            </View>
          )}
          nestedScrollEnabled={true} // Enable nested scrolling
            showsVerticalScrollIndicator={true} 
        />
      </View>
      
      )}
    </View>

    <View style={styles.horizontalLine} />
    <View style={styles.textContainer}>
      {/* Dropdown Header */}
      <Pressable style={styles.dropdownHeader} onPress={toggleDropdown3}>
        <Text style={styles.headerText}>
          {selectedOption3
            ? options3.find((option) => option.id === selectedOption3)?.label
            : 'Experience'}
        </Text>
        <Text style={styles.arrow}>{isDropdownOpen3 ? '▲' : '▼'}</Text>
      </Pressable>

      {/* Dropdown Body */}
      {isDropdownOpen3 && (
        <View style={styles.dropdownBody}>
          {options3.map((option) => (
            <Pressable
              key={option.id}
              style={styles.radioOption}
              onPress={() => handleSelectOption3(option.id)}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedOption3 === option.id && styles.radioButtonSelected,
                ]}
              />
              <Text style={styles.radioLabel}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
    <View style={styles.horizontalLine} />


    <View style={styles.textContainer}>
      
      
    <Pressable style={styles.dropdownHeader} onPress={toggleDropdown4}>
        <Text style={styles.headerText}>
          {selectedSpecializations.length > 0
            ? selectedSpecializations.join(", ")
            : "Select Specializations"}
        </Text>
        <Text style={styles.arrow}>{dropdownVisible2 ? "▲" : "▼"}</Text>
      </Pressable>

      {dropdownVisible2 && (
        <View style={styles.dropdownMenu}>
          <FlatList
            data={specializations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View>
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => toggleSpecializationSelection(item.label)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedSpecializations.includes(item.label) &&
                        styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.label}>{item.label}</Text>
                </Pressable>
                {/* {index < specializations.length - 1 && <View style={styles.divider} />} */}
              </View>
            )}
            nestedScrollEnabled={true} // Enable scrolling for FlatList
            showsVerticalScrollIndicator={true} // Optional: Show vertical scrollbar
          />
        </View>
      )}
    </View>

    <View style={styles.bottomNav}>
      <Pressable
            onPressIn={() => setIsPressed(true)} // Change background to orange on press
            onPressOut={() => setIsPressed(false)}
              
              style={[styles.button,styles.resetButton, isPressed && styles.selectedButton]}
              onPress={() => navigation.navigate('AddEducationForm')}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.applyButton]}
              onPress={() => navigation.navigate('NoSearches')}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </Pressable>

      </View>
      </ScrollView>
       
     

      {/* Bottom Navigation */}
      
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    height: 100,
    top:20,
    position: 'relative',
    paddingHorizontal: 20,
  },
  backImage: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  textTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  headerView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  headingtext:{
    fontSize: 20,
    marginLeft: 20,
  },
  headerText:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon:{
    height: 20,
    width: 20,
    position: 'absolute',
    top: 20,
    left: 10,
  },
  inputWrapper: {
    flexDirection: 'row', // Align input and button horizontally
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1, // Makes sure the input takes up all available space
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:10
  },
  textInput: {
    fontSize: 16,
    left:5,
    color: '#333',
  },
 
  
  slider: {
    width: '100%',
    height: 50,
    
    
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b5998',
    // borderBlockColor:"white",
    borderColor:"white"
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e0',
  },
  railSelected: {
    height: 4,
    backgroundColor: '#FF7518',
    borderRadius: 2,
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    // backgroundColor: '#3b5998',
    borderRadius: 5,
  },
  labelText: {
    color: 'black',
    fontSize: 12,
  },
  valueLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
    padding:10
  },
  valueText: {
    fontSize: 16,
    fontWeight: "500",
  },
  sliderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
 
  arrow: {
    fontSize: 16,
    color: '#333',
  },
  dropdownBody: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#FF7518', // Orange when selected
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20, // Space between the dropdowns
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 5,
    
    marginBottom:20
    
  },
  textContainer:{
 

  },
  barContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  bar: {
    height: '100%',
    backgroundColor: 'black',
  },
  value: {
    fontSize: 16,
    marginTop: 10,
  },
  body: {
    marginTop: 10,
    width: '100%',
    padding: 8,
    borderRadius: 5,
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#C0C0C0', // Orange button
    padding: 10,
    marginVertical: 3,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  headerbutton:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Space between buttons
    flexWrap: 'wrap', // Wrap buttons if they exceed the row width
  },
   selectedButton: {
    backgroundColor: '#FF7518', // Orange background for selected button
  },
   selectedButtonText: {
    color: '#fff', // White text for selected button
  },
   checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  dropdown: {
    padding: 10,
   
  },
  dropdownText: {
    color: "black",
    fontSize: 16,
  },
  dropdownMenu: {
    marginTop: 10,
    maxHeight: 150,
    paddingVertical: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  label1: {
    fontSize: 16,
    marginLeft: 10,
    
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#8888aa",
  },
  checkboxSelected: {
    backgroundColor: "#ffaa00",
    borderColor: "#ffaa00",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  bottomNav: {
    flex: .2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopColor: '#EEEEEE',
    marginBottom:5,
    marginTop:5,
    width:'100%'
  },
  resetButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ccc",
    width:'40%',
  },
  applyButton: {
    backgroundColor: "#007BFF",
    marginLeft: 5,
    width:'50%',
  },
 
  
});

export default Filter;
