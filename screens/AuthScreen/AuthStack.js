import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types'

// SCREENS
import SplashScreen from './SplashScreen';
import Login from './Login';
import Register from './Register';
import Onboarding from './Onboarding';
import BottomTab from '../../navigator/BottomTab';
import PostClick from '../HomeScreen/PostClick';
import { connect } from 'react-redux';

const AuthStack = ({ ...props }) => {
    const { isOnboardingDisabled } = props;
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator /*initialRouteName={isOnboardingDisabled ? 'Splash' : 'Onboarding'} */ initialRouteName='Bottom' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Splash' component={SplashScreen} />
            <Stack.Screen name='Bottom' component={BottomTab} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Onboarding' component={Onboarding} />

            {/* TESTING  */}
            <Stack.Screen name='PostClick' component={PostClick} />
        </Stack.Navigator>
    )
}

AuthStack.propTypes = {
    isOnboardingDisabled: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        isOnboardingDisabled: state.auth.isOnboardingDisabled
    }
}

export default connect(mapStateToProps)(AuthStack)

const styles = StyleSheet.create({})