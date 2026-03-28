// screens/SignupScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (name && email && password) {
      Alert.alert('Signup Successful');
      navigation.replace('Login');
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#555"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={{ color: '#4caf50' }}>Login</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b5e20',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#2e2e2e',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    color: '#4caf50',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  signupBtn: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 15,
  },
});