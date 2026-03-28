import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        value={searchTerm}
        onChangeText={handleSearch}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10, paddingHorizontal: 20 },
  input: {
    backgroundColor: '#f0f2f5',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default SearchBar;