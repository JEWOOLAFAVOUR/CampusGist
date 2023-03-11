// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import QuizHome from './QUIZPROJECT/QuizHome';
// import Question1 from './QUIZPROJECT/Question1';

// const App = () => {
//   const Stack = createNativeStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false
//         }}
//       // initialRouteName="Question1" 
//       >
//         <Stack.Screen
//           name='QuizHome'
//           component={QuizHome}
//         />
//         <Stack.Screen
//           name='Question1'
//           component={Question1}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App

// const styles = StyleSheet.create({})



















// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import HomeScreen from './QuizScreen/HomeScreen'
// import Slide1 from './QuizScreen/Slide1'
// import Slide2 from './QuizScreen/Slide2'
// import Result from './QuizScreen/Result'

// const App = () => {
//   const Stack = createNativeStackNavigator()
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name='Home'
//           component={HomeScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='Slide1'
//           component={Slide1}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='Slide2'
//           component={Slide2}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='Result'
//           component={Result}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App

// const styles = StyleSheet.create({})















// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import Home from './DAVIDCLASS/Home'
// import Account from './DAVIDCLASS/Account'

// const App = () => {

//   const Tab = createBottomTabNavigator()
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen
//           name='Home'
//           component={Home}
//         />
//         <Tab.Screen
//           name='Account'
//           component={Account}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Home from './DAVIDCLASS/Home'
// import Account from './DAVIDCLASS/Account'

// const App = () => {
//   const Stack = createNativeStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name='Facebook'
//           component={Home}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name='Accountl'
//           component={Account}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './screens/AuthScreen/AuthStack';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './redux/store';
import constants from './redux/constants';
import axios from 'axios';
import { COLORS } from './constants';
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
                <StatusBar backgroundColor={COLORS.primary} />
                <NavigationContainer theme={MyLightTheme}>
                    <AuthStack />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App

const styles = StyleSheet.create({})