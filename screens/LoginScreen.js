import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      Alert.alert('Login Successful');
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Please enter email and password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>IoT Rainwater Irrigation System</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // 
          autoCapitalize="none"        // 
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Optional (safe to keep UI only) */}
        <TouchableOpacity>
          <Text style={styles.forgot}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signup}>
            Don't have an account? <Text style={{ color: '#4caf50' }}>Sign Up</Text>
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
    fontSize: 20,
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
  loginBtn: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgot: {
    color: '#2196f3',
    textAlign: 'center',
    marginTop: 10,
  },
  signup: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 15,
  },
});