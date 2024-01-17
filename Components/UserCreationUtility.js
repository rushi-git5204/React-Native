import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';

const YourComponent = (props) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from your API
    fetch('https://9c4e-117-236-144-188.ngrok-free.app/api/employees/getallusers')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setOriginalData(jsonData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleItemPress = (item) => {
    if (
      selectedRecord &&
      selectedRecord.employeeCode === item.employeeCode
    ) {
      props.navigation.navigate('UserCreation', {
        editRecordData: selectedRecord,
      });
    } else {
      setSelectedRecord(item);
    }
  };

  const handleSearch = useCallback(() => {
    if (searchQuery === '') {
      // If search query is empty, reset data to original data
      setData(originalData);
    } else {
      // Perform search logic here and update the data state
      const filteredData = originalData.filter((item) =>
        item.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filteredData);
    }
  }, [searchQuery, originalData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.item}>
        <Text>{`Employee Code: ${item.employeeCode}`}</Text>
        <Text>{`User Name: ${item.userName}`}</Text>
        <Text>{`Mobile No: ${item.mobileNo}`}</Text>
        <Text>{`Email ID: ${item.emailId}`}</Text>
        <Text>{`User Type: ${item.userType}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View style={styles.buttonContainer}>
          <Button
            title="Add"
            onPress={() => props.navigation.navigate('UserCreation')}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Back"
            onPress={() => props.navigation.navigate('Login')}
            color="black"
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by User Name"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch();
          }}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.employeeCode.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    width: '20%',
    alignSelf: 'center',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 6,
    maxWidth: '70%',
    maxHeight: 40,
  },
});

export default YourComponent;
