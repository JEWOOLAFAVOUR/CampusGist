import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropTypes from 'prop-types';

// SCREENS
import SplashScreen from './SplashScreen';
import Login from './Login';
import Register from './Register';
import Onboarding from './Onboarding';
import BottomTab from '../../navigator/BottomTab';
import { connect } from 'react-redux';
import PostDetail from '../HomeScreen/PostDetail';
import VerifyEmail from './VerifyEmail';
import WelcomeScreen from './WelcomeScreen';
import RegisterWithPhone from './RegisterWithPhone';
import YourGender from './YourGender';
import LevelBio from './LevelBio';
import RegistrationSuccessful from './RegistrationSuccessful';
import ViewAllComment from '../HomeScreen/ViewAllComment';
import ProfilePage from '../HomeScreen/ProfilePage';
import MarketDetail from '../CampusCircle/MarketDetail';
import MarketMore from '../CampusCircle/MarketMore';
import HomeStack from '../HomeScreen/HomeStack';
import Technology from '../HomeScreen/Technology';
import Campuses from '../HomeScreen/Campuses';

const AuthStack = ({ ...props }) => {
  const { isOnboardingDisabled } = props;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={isOnboardingDisabled ? 'Splash' : 'Onboarding'}
      /* initialRouteName='Login' */ screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Bottom" component={BottomTab} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterWithPhone" component={RegisterWithPhone} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="YourGender" component={YourGender} />
      <Stack.Screen name="LevelBio" component={LevelBio} />
      {/* home  */}
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="ViewAllComment" component={ViewAllComment} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name='Technology' component={Technology} />
      <Stack.Screen name='Campuses' component={Campuses} />
      {/* home  */}
      <Stack.Screen name="RegistrationSuccessful" component={RegistrationSuccessful} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      {/* campus circle  */}
      <Stack.Screen name="MarketDetail" component={MarketDetail} />
      <Stack.Screen name="MarketMore" component={MarketMore} />


      {/* jjjj */}
      {/* <Stack.Screen name="HomeStack" component={HomeStack} /> */}

    </Stack.Navigator>
  );
};

AuthStack.propTypes = {
  isOnboardingDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    isOnboardingDisabled: state.auth.isOnboardingDisabled,
  };
};

export default connect(mapStateToProps)(AuthStack);

const styles = StyleSheet.create({});
