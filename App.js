import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './screens/AuthScreen/AuthStack';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './redux/store';
import constants from './redux/constants';

const { MyDarkTheme, MyLightTheme } = constants;

export const reduxPersistStore = persistStore(reduxStore);

const App = () => {
  // const setUrlConfig = () => {
  //   console.log('called setUrlConfig');
  //   axios.defaults.baseURL = BASE_PATH;
  // }
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