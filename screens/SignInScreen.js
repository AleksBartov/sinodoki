import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Modal } from 'react-native';
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

export default function SignInScreen({ navigation, route }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn, openModal, closeSignInModal } = React.useContext(AuthContext);

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.inputsHolder}>
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
              <Button title="ВОЙТИ" onPress={() => signIn({ username, password })} />
            </View>
            <Button title="РЕГИСТРАЦИЯ" onPress={() => navigation.navigate('SignUp')} />
            <Modal
              animationType="slide"
              transparent={true}
              visible={openModal}
              >
              <View style={{ marginTop: 22, justifyContent: 'flex-start', width: 200, height: 200, backgroundColor: 'red'}}>
                <Text>неверные имя пользователя или пароль</Text>
                <Button title="X" onPress={() => closeSignInModal()} />
              </View>
            </Modal>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}
