import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AuthContext } from '../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsHolder: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default function SignUpScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.inputsHolder}>
            <Text>Чтобы зарегистрироваться, придумайте ИМЯ и ПАРОЛЬ</Text>
              <TextInput
                style={styles.input}
                placeholder="имя"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Button title="ЗАРЕГИСТРИРОВАТЬ" onPress={() => signUp({ username, password })} />
            </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}
