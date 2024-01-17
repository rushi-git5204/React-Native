// HelpComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import PaginationComponent from './common/DataTablePagination ';
import DataTableSearch from './common/DataTableSearch ';

const HelpComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [titleForId, setTitleForId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonPress = () => {
    setModalVisible(true);
  };

  const handleRecordPress = (record) => {
    setSelectedRecord(record);
    setInputValue(record.id.toString());
    setTitleForId(record.title);
    setModalVisible(false);
  };

  const handleIdInputChange = (text) => {
    setInputValue(text);
    const record = apiData.find(item => item.id.toString() === text);
    if (record) {
      setTitleForId(record.title);
    } else {
      setTitleForId('');
      setSelectedRecord('');
    }
  };

  const paginatedData = apiData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const filteredData = paginatedData.filter(
    (item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter ID"
          value={inputValue}
          onChangeText={handleIdInputChange}
          keyboardType="numeric"
        />
        <Button title='...' onPress={handleButtonPress} />
        {inputValue && !selectedRecord && (
        <View style={styles.selectedRecordContainer}>
          <Text>{` ${titleForId}`}</Text>
        </View>
      )}
      </View>

     

      <Modal isVisible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          {/* DataTableSearch for search functionality */}
          <DataTableSearch onSearch={setSearchTerm} />

          <Text style={styles.modalTitle}>Help Section</Text>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleRecordPress(item)}>
                <View style={styles.modalItem}>
                  <Text>{`ID: ${item.id}`}</Text>
                  <Text>{`Title: ${item.title}`}</Text>
                  
                </View>
              </TouchableOpacity>
            )}
          />

          <View style={styles.paginationAndCloseContainer}>
            <PaginationComponent
              totalPages={Math.ceil(apiData.length / itemsPerPage)}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {selectedRecord && (
        <View style={styles.selectedRecordContainer}>
          <Text>{`${selectedRecord.title}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
  },
  input: {
    width: '60%',
    height:35,
    marginBottom: 10,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop:10,
    borderColor: 'red',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
  },
  selectedRecordContainer: {
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    
    width: '80%',
    marginBottom: 10,
  },
  paginationAndCloseContainer: {
    flexDirection: 'row',
   
    marginTop: 20,
  },
});

export default HelpComponent;
