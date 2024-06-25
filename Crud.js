import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from './quries';

const Crud = () => {
  const { loading, error, data } = useQuery(GET_ITEMS);
  const [addItem] = useMutation(ADD_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }],
  });
  const [updateItem] = useMutation(UPDATE_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }],
  });
  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }],
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = () => {
    addItem({ variables: { name, description } })
      .then(() => {
        setName('');
        setDescription('');
      })
      .catch(error => console.error(error));
  };

  const handleUpdateItem = (id) => {
    updateItem({ variables: { id, name, description } })
      .then(() => {
        setSelectedItem(null);
        setName('');
        setDescription('');
      })
      .catch(error => console.error(error));
  };

  const handleDeleteItem = (id) => {
    deleteItem({ variables: { id } })
      .catch(error => console.error(error));
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item.id);
    setName(item.name);
    setDescription(item.description);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (

    <View style={styles.container}>
      <FlatList
        data={data.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.heading}>Name:</Text>
            <Text>{item.name}</Text>
            <Text style={styles.heading}>Description:</Text>
            <Text>{item.description}</Text>
            <View style={styles.buttonGroup}>
              <Button
                title="Update"
                onPress={() => handleSelectItem(item)}
              />
              <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
            </View>
          </View>
        )}
      />
    
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      {selectedItem ? (
        <TouchableOpacity style={styles.button} onPress={() => handleUpdateItem(selectedItem)}>
          <Text style={styles.buttonText}>Update Item</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Crud;
