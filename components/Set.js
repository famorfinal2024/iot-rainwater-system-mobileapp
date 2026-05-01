import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../data/api';

const Set = ({ currentDate, onDateChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [irrigationDays, setIrrigationDays] = useState(7);
  const [timesPerDay, setTimesPerDay] = useState(3);
  const [irrigationInterval, setIrrigationInterval] = useState(2);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Authentication Error", "Please login first.");
        return;
      }

      const response = await fetch(`${API_URL}/schedule/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
          date: selectedDate,
          irrigation_days: irrigationDays,
          times_per_day: timesPerDay,
          irrigation_interval: irrigationInterval
        })
      });

      const data = await response.json();

      if (response.ok) {
        onDateChange({
          date: selectedDate,
          irrigationDays,
          timesPerDay,
          irrigationInterval
        });

        Alert.alert("Success", "Schedule saved successfully!");
        setIsModalOpen(false);
      } else {
        Alert.alert("Error", JSON.stringify(data));
      }

    } catch (error) {
      Alert.alert("Connection Error", "Failed to connect to backend.");
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={styles.buttonText}>SET SCHEDULE</Text>
      </TouchableOpacity>

      <Modal visible={isModalOpen} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modal}>

            <Text style={styles.title}>Set Irrigation Schedule</Text>

            <Text style={styles.label}>Next Irrigation Date</Text>
            <TextInput
              style={styles.input}
              value={selectedDate}
              placeholder="YYYY-MM-DD"
              onChangeText={setSelectedDate}
            />

            <Text style={styles.label}>Days to Irrigate</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={irrigationDays.toString()}
              onChangeText={(val) =>
                setIrrigationDays(Number(val))
              }
            />

            <Text style={styles.label}>Times Per Day</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={timesPerDay.toString()}
              onChangeText={(val) =>
                setTimesPerDay(Number(val))
              }
            />

            <Text style={styles.label}>Interval (days)</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={irrigationInterval.toString()}
              onChangeText={(val) =>
                setIrrigationInterval(Number(val))
              }
            />

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSave}
              >
                <Text style={styles.btnText}>SAVE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setIsModalOpen(false)}
              >
                <Text style={styles.btnText}>CANCEL</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modal: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },

  label: {
    marginTop: 10,
    fontWeight: '500',
  },

  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },

  row: {
    flexDirection: 'row',
    marginTop: 15,
  },

  saveBtn: {
    backgroundColor: '#2e7d32',
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 5,
  },

  cancelBtn: {
    backgroundColor: '#9e9e9e',
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Set;
