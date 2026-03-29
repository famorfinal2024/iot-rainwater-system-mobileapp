import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';

export default function HamburgerMenu({ isVisible, onClose, onNavigate }) {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const menuTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 0],
  });

  const menuItems = [
    { label: 'Dashboard', screen: 'Dashboard' },
    { label: 'Settings', screen: 'Settings' },
    { label: 'Report', screen: 'Report' },
    { label: 'About', screen: 'About' },
    { label: 'Help', screen: 'Help' },
  ];

  return (
    <Animated.View
      style={[styles.menuContainer, { transform: [{ translateX: menuTranslateX }] }]}
    >
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              onNavigate(item.screen);
              onClose();
            }}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#2e7d32',
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 1000,
    elevation: 5,
  },
  closeButton: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
  },
});