import * as React from 'react';
import { Button, Text, View, ScrollView, Alert, StyleSheet } from 'react-native';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../App'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function HomeScreen({navigation, route}) {
  const { signOut } = React.useContext(AuthContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="ios-log-out" size={32} color="green" onPress={signOut} />
      ),
      headerLeft: () => (
        <Ionicons name="ios-add" size={32} color="green" onPress={()=> navigation.navigate('Adding')} />
      ),
    });
  }, [navigation, signOut]);

  return (
    <ScrollView 
      style={styles.container}
      horizontal={true}
      contentInset={{ left: 100 }}
      >
      <Card type='о здравии' username={route.params?.username} {...{navigation}} />
      <Card type='о упокоении' username={route.params?.username} {...{navigation}}/>
    </ScrollView>
  );
}
