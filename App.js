import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './screens/AuthScreen/AuthStack';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './redux/store';
import constants from './redux/constants';
import axios from 'axios';

const { MyDarkTheme, MyLightTheme, BASE_URL } = constants;

export const reduxPersistStore = persistStore(reduxStore);

const App = () => {
  const setUrlConfig = () => {
    console.log('called setUrlConfig');
    axios.defaults.baseURL = BASE_URL;
  }
  useEffect(() => {
    setUrlConfig();
  })
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistStore}>
        <NavigationContainer theme={MyLightTheme}>
          <AuthStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})










// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Home from './DAVIDCLASS/Home'
// import Login from './DAVIDCLASS/Login'

// const App = () => {

//   const Stack = createNativeStackNavigator()

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name='Facebook'
//           component={Home}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name='Login'
//           component={Login}
//           options={{ headerShown: false }}
//         />

//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App

// const styles = StyleSheet.create({})