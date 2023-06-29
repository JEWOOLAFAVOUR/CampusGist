import { StatusBar, BackHandler } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './screens/AuthScreen/AuthStack';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import reduxStore from './redux/store';
import constants from './redux/constants';
import axios from 'axios';
import { COLORS } from './constants';
import AppStack from './navigator/AppStack';
const { MyLightTheme, BASE_URL } = constants;
import Toast from 'react-native-toast-message'

export const reduxPersistStore = persistStore(reduxStore);

const App = () => {
    const setUrlConfig = () => {
        console.log('called setUrlConfig');
        axios.defaults.baseURL = BASE_URL;
    }
    useEffect(() => {
        setUrlConfig();
    })
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Provider store={reduxStore}>
                <PersistGate persistor={reduxPersistStore}>
                    <StatusBar backgroundColor={COLORS.primary} />
                    <NavigationContainer theme={MyLightTheme}>
                        <Stack.Navigator initialRouteName='AuthStack' screenOptions={{ headerShown: false }}>
                            <Stack.Screen name='AuthStack' component={AuthStack} />
                            <Stack.Screen name='Main' component={AppStack} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
            <Toast />
        </>
    )
}

export default App



// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import HomeScreen from './Chats/HomeScreen'
// import ChatScreen from './Chats/ChatScreen'

// const App = () => {
//     const Stack = createNativeStackNavigator();
//     return (
//         <NavigationContainer>
//             <Stack.Navigator screenOptions={{ headerShown: false }}>
//                 <Stack.Screen name='HomeScreen' component={HomeScreen} />
//                 <Stack.Screen name='ChatScreen' component={ChatScreen} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

// export default App

// const styles = StyleSheet.create({})