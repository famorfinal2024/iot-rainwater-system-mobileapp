import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { systemInfo, alerts } from '../data/systemData';
import SearchBar from '../components/SearchBar';
import Set from '../components/Set';
import HamburgerMenu from '../components/HamburgerMenu';

export default function DashboardScreen({ navigation }) {
  const [schedule, setSchedule] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleStartIrrigation = () => {
    console.log("Manual irrigation started!");
  };

  // 
  const handleNavigate = (screen) => {
    setMenuVisible(false);        // Close menu
    navigation.navigate(screen);   // Navigate using navigation prop
  };

  const activeSchedule = schedule || systemInfo;

  return (
    <View style={{ flex: 1 }}>

      {/* Overlay */}
      {menuVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
        />
      )}

      {/* Hamburger Menu */}
      <HamburgerMenu
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onNavigate={handleNavigate}
      />

      <ScrollView style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Text style={styles.hamburger}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Irrigation Dashboard</Text>
        </View>

        {/* Search */}
        <SearchBar onSearch={(value) => console.log('Searching:', value)} />

        {/* Water Monitoring */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Water Monitoring</Text>
          <Text>Water Level: {systemInfo.waterLevel}</Text>
          <Text>Tank Status: {systemInfo.tankStatus}</Text>
        </View>

        {/* Irrigation Schedule */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Irrigation Schedule</Text>
          <Text>
            Next Irrigation Date: {activeSchedule.date || activeSchedule.nextIrrigation}
          </Text>
          <Text>Days to Irrigate: {activeSchedule.irrigationDays}</Text>
          <Text>Times Per Day: {activeSchedule.timesPerDay}</Text>
          <Text>Interval: Every {activeSchedule.irrigationInterval} days</Text>

          <Set
            currentDate={new Date().toISOString().split('T')[0]}
            onDateChange={setSchedule}
          />
        </View>

        {/* Alerts */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>System Alerts</Text>
          {alerts.map((alert, index) => (
            <View key={index} style={styles.alertBox}>
              <Text style={styles.alertText}>{alert}</Text>
            </View>
          ))}
        </View>

        {/* Start Irrigation */}
        <TouchableOpacity style={styles.bigButton} onPress={handleStartIrrigation}>
          <Text style={styles.buttonText}>START MANUAL IRRIGATION</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8f5e9',
  },
  header: {
    backgroundColor: '#2e7d32',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  hamburger: {
    fontSize: 24,
    color: '#fff',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 15,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  bigButton: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    margin: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  alertBox: {
    backgroundColor: '#ffe0b2',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  alertText: {
    color: '#e65100',
  },
});