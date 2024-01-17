import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';

const LoginComponent = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    props.navigation.navigate('Userutility');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./Assets/login.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Login User</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button title="Sign In" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '80%',
    backgroundColor: 'white',
  },
});

export default LoginComponent;
