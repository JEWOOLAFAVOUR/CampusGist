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


import { StatusBar, BackHandler } from 'react-native';
import React, { useEffect, useRef } from 'react';
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
    const navigationRef = useRef(null);

    const backAction = () => {
        const currentRoute = navigationRef.current.getCurrentRoute();
        console.log('current route:', currentRoute);

        const isHomeTab = currentRoute.name === 'HomeP';
        console.log('isHomeTab:', isHomeTab);

        const routes = navigationRef.current.getRootState().routeNames;
        console.log('routes in stack:', routes);

        if (isHomeTab) {
            BackHandler.exitApp();
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);
    return (
        <Provider store={reduxStore}>
            <PersistGate persistor={reduxPersistStore}>
                <StatusBar backgroundColor={COLORS.primary} />
                <NavigationContainer ref={navigationRef} theme={MyLightTheme}>
                    <AuthStack />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App

// const styles = StyleSheet.create({})




// import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
// import React, { useState } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import icons from './constants/icons'

// const App = () => {
//     const TextInputView = ({ title, value, setValue, eye }) => {
//         const [press, setPress] = useState(false)
//         return (
//             <View style={{ marginBottom: 10 }}>
//                 <Text style={{ fontSize: 16, color: '#000', marginBottom: 5 }}>{title}</Text>
//                 <View style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}>
//                     <TextInput
//                         value={value}
//                         onChangeText={(value) => setValue(value)}
//                         style={{ flex: 1 }}
//                         secureTextEntry={press}
//                     />
//                     {eye ?
//                         <TouchableOpacity onPress={() => setPress(!press)}>
//                             <Image source={icons.eye} style={{ height: 20, width: 20 }} />
//                         </TouchableOpacity>
//                         : null
//                     }
//                 </View>
//             </View>
//         )
//     }

//     const Home = ({ navigation }) => {
//         const [phone, setPhone] = useState('')
//         const [e, setE] = useState('')
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
//                 <TextInputView title='Password' value={password} setValue={setPassword} eye={true} />
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
//     const AboutMe = ({ route, navigation }) => {
//         const [name, setName] = useState('')
//         const [error, setError] = useState(false)
//         const [pE, setPE] = useState(false)

//         const [i, setI] = useState('')
//         const [password, setPassword] = useState('')
//         // console.log(name)

//         const handleSubmit = () => {
//             if (name.trim() === '' || password.trim() === '') {
//                 setError(true)
//             } else if (name.length < 5 || password.length < 5) {
//                 setError(false)
//                 setPE(true)
//             } else {
//                 setPE(false)
//                 const data = {
//                     name,
//                     password
//                 }
//                 navigation.navigate('Succes', { data })
//             }
//         }

//         const handleName = (text) => {
//             if (text.length < 3) {
//                 setName(text)
//                 setI('Please name must be up to 3 letters')
//             } else {
//                 setName(text)
//                 setI('')
//             }
//         }

//         return (
//             <View style={{ marginHorizontal: 20, marginTop: 20 }}>
//                 {/* NAME  */}
//                 <View style={{ marginBottom: 10 }}>
//                     <Text style={{ fontSize: 16, color: '#000', marginBottom: 5 }}>Name</Text>
//                     <View style={[styles.textInput]}>
//                         <TextInput
//                             placeholder='Enter name'
//                             placeholderTextColor={'brown'}
//                             value={name}
//                             onChangeText={handleName}
//                             keyboardType='email-address'
//                         />
//                     </View>
//                 </View>
//                 {/* PASSWORD  */}
//                 {/* <View style={{ marginBottom: 10 }}>
//                     <Text style={{ fontSize: 16, color: '#000', marginBottom: 5 }}>Password</Text>
//                     <View style={[styles.textInput]}>
//                         <TextInput
//                             placeholder='Enter name'
//                             placeholderTextColor={'brown'}
//                             value={password}
//                             onChangeText={(text) => setPassword(text)}
//                             keyboardType='phone-pad'
//                         />
//                     </View>
//                 </View> */}

//                 <Text style={{ fontSize: 13, color: 'red' }}>{i}</Text>

//                 {error ?
//                     // <Text style={{ fontSize: 13, color: 'red' }}>Please input a name/password!</Text>
//                     <Text style={{ fontSize: 13, color: 'red' }}>Please name must be up to 10 letters</Text>
//                     : null
//                 }
//                 {pE ?
//                     <Text style={{ fontSize: 13, color: 'red' }}>Please input name/password greater than 5</Text>
//                     : null
//                 }
//                 <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
//                     <Text style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}>Submit</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }

//     const Succes = ({ route }) => {
//         const data = route.params.data.name
//         return (
//             <View style={{ flex: 1, backgroundColor: '#0fff', justifyContent: 'center' }}>
//                 <Text style={{ fontSize: 30, color: '#000', fontWeight: 'bold', textAlign: 'center' }}>WELCOME {data}</Text>
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
//                 <Stack.Screen name='Succes' component={Succes} />
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


// <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Phone - {data.phone}</Text>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Password - {data.password}</Text>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>FirstName - {data.firstName}</Text>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>LastName - {data.lastName}</Text>
//                 <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Age - {data.age}</Text>