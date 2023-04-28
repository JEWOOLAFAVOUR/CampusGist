
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
import BottomTab from './navigator/BottomTab';
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
    const Stack = createNativeStackNavigator();
    // const navigationRef = useRef(null);

    // const backAction = () => {
    //     const currentRoute = navigationRef.current.getCurrentRoute();
    //     console.log('current route:', currentRoute);

    //     const isHomeTab = currentRoute.name === 'HomeP';
    //     console.log('isHomeTab:', isHomeTab);

    //     const routes = navigationRef.current.getRootState().routeNames;
    //     console.log('routes in stack:', routes);

    //     if (isHomeTab) {
    //         BackHandler.exitApp();
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', backAction);

    //     return () =>
    //         BackHandler.removeEventListener('hardwareBackPress', backAction);
    // }, []);
    return (
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
    )
}

export default App
