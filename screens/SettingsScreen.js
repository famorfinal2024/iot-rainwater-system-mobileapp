import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Here you can configure your irrigation system settings.</Text>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e8f5e9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#2e7d32' },
  backBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backText: { color: '#fff', fontWeight: 'bold' },
});