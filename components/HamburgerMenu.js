// components/HamburgerMenu.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function HamburgerMenu({ isVisible, onClose, onNavigate }) {
  const [animation] = useState(new Animated.Value(0));

  // Animate menu slide in/out
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  const menuTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 0], // slide from left
  });

  const menuItems = ['Dashboard', 'Settings', 'Report', 'About', 'Help'];

  return (
    <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuTranslateX }] }]}>
      
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => {
            onNavigate(item);
            onClose(); // close menu after navigation
          }}
        >
          <Text style={styles.menuText}>{item}</Text>
        </TouchableOpacity>
      ))}
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
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 1000,
    elevation: 5,
  },
  closeButton: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10, // added horizontal padding
    borderRadius: 8,       // optional: makes each button a bit rounded
    marginBottom: 5,       // space between menu items
    backgroundColor: 'rgba(65, 68, 65, 0.49)', // subtle hover effect
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 5, // extra inner padding for text
  },
});