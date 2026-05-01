import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = "http://10.0.2.2:8000/api";

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,   // ✅ FIXED (no email confusion)
          password: password,
        }),
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (response.ok) {

        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
        }

        if (data.username) {
          await AsyncStorage.setItem("username", data.username);
        }

        Alert.alert("Success", "Login Successful");

        navigation.replace("Dashboard");

      } else {
        Alert.alert(
          "Login Failed",
          data.detail || JSON.stringify(data)
        );
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      Alert.alert(
        "Network Error",
        "Cannot connect to backend server."
      );
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>
          IoT Rainwater Irrigation System
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#555"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginText}>
            {loading ? "LOGGING IN..." : "LOGIN"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>
            FORGOT PASSWORD?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signup}>
            Don't have an account?{" "}
            <Text style={{ color: '#4caf50' }}>
              Sign Up
            </Text>
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