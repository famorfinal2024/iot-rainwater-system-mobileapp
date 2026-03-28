import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const IrrigationButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Manual irrigation started!")}
      >
        <Text style={styles.buttonText}>Start Manual Irrigation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10, alignItems: 'center' },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default IrrigationButton;