import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import AddingScreen from './screens/AddingScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

export const AuthContext = React.createContext();

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'USER_NOT_FIND':
          return {
            ...prevState,
            modalOpened: true,
          };
        case 'CLOSE_SIGN_IN_MODAL':
          return {
            ...prevState,
            modalOpened: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      modalOpened: false,
    }
  );


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        const myKey = 'apiKey=sKw_oqVSmdk0cj8XolfkSyap__JKRPLt';
        const myCollection = 'members';
        fetch(`https://api.mlab.com/api/1/databases/sinodik/collections/${myCollection}?${myKey}`)
            .then(data => data.json())
            .then(users => {
                const isSigned = users.find(u=>(u.username === data.username) && (u.password === data.password));
                isSigned ? dispatch({ type: 'SIGN_IN', token: data }) : dispatch({ type: 'USER_NOT_FIND'});
            })
            .catch(err=>alert(err));
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        const myKey = 'apiKey=sKw_oqVSmdk0cj8XolfkSyap__JKRPLt';
        const myCollection = 'members';
        const rawResponse = await fetch(`https://api.mlab.com/api/1/databases/sinodik/collections/${myCollection}?${myKey}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "username" : data.username, "password": data.password})
        });
        const content = await rawResponse.json();

        console.log(content);
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_UP', token: data });
      },
      closeSignInModal: () => dispatch({ type: 'CLOSE_SIGN_IN_MODAL' }),
      openModal: state.modalOpened,
    }),
    [state.modalOpened]
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              initialParams={{ modalOpened: state.modalOpened }}
              options={{
                title: 'ВХОД',
            // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                title: 'РЕГИСТРАЦИЯ',
              }} />
              </>
          ) : (
            // User is signed in
            <>
              <Stack.Screen name="Home"
                            component={HomeScreen}
                            initialParams={{ username: state.userToken.username }}
                            options={{ headerTitle: state.userToken.username}} />
              <Stack.Screen name="Adding"
                            options={{ headerTitle: "новая запись"}}
                            component={AddingScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
