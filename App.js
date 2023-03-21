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




// import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'

// const App = () => {

//     const TextInputView = ({ title, value, setValue }) => {
//         return (
//             <View style={{ marginBottom: 10 }}>
//                 <Text style={{ fontSize: 16, color: '#000', marginBottom: 5 }}>{title}</Text>
//                 <View style={styles.textInput}>
//                     <TextInput
//                         value={value}
//                         onChangeText={(value) => setValue(value)}
//                     />
//                 </View>
//             </View>
//         )
//     }

//     const Home = ({ navigation }) => {
//         const [phone, setPhone] = useState('')
//         const [password, setPassword] = useState('')
//         const [firstName, setFirstName] = useState('')
//         const [lastName, setLastName] = useState('')
//         const [age, setAge] = useState('')

//         const handleSubmit = () => {
//             // console.log('davidddddddddd')
//             const data = {
//                 phone,
//                 password,
//                 firstName,
//                 lastName,
//                 age,
//             }
//             navigation.navigate('AboutMe', { data })
//             console.log('data', data)
//         }

//         return (
//             <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 20 }}>
//                 <Text style={{ fontSize: 30, color: '#000', marginBottom: 20, fontWeight: 'bold' }}>FORM CLASS </Text>
//                 <TextInputView title='Mobile number or email' value={phone} setValue={setPhone} />
//                 <TextInputView title='Password' value={password} setValue={setPassword} />
//                 <TextInputView title='FirstName' value={firstName} setValue={setFirstName} />
//                 <TextInputView title='LastName' value={lastName} setValue={setLastName} />
//                 <TextInputView title='Age' value={age} setValue={setAge} />

//                 <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
//                     <Text style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}>Submit</Text>
//                 </TouchableOpacity>
//                 <View style={{ marginBottom: 30 }} ></View>
//             </ScrollView>
//         )

//     }
//     const AboutMe = ({ route }) => {
//         console.log('data coming from route', route)
//         const data = route.params.data
//         return (
//             <View>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Phone - {data.phone}</Text>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Password - {data.password}</Text>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>FirstName - {data.firstName}</Text>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>LastName - {data.lastName}</Text>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Age - {data.age}</Text>
//             </View>
//         )
//     }
//     const Stack = createNativeStackNavigator()
//     // const Home = () => <View></View>
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen name='Homedd' component={Home} />
//                 <Stack.Screen name='AboutMe' component={AboutMe} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )

// }
// export default App

// const styles = StyleSheet.create({
//     textInput: {
//         height: 40,
//         borderWidth: 1,
//         paddingHorizontal: 10
//         // marginTop: 10,
//     },
//     button: {
//         height: 50,
//         backgroundColor: 'blue',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 30
//     },
// })
