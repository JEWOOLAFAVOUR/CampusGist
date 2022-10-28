import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './screens/AuthScreen/AuthStack';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './redux/store';

export const reduxPersistStore = persistStore(reduxStore);

const App = () => {
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistStore}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})