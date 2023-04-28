import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import PostDetail from '../screens/HomeScreen/PostDetail';
import ViewAllComment from '../screens/HomeScreen/ViewAllComment';
import ProfilePage from '../screens/HomeScreen/ProfilePage';
import Technology from '../screens/HomeScreen/Technology';
import Campuses from '../screens/HomeScreen/Campuses';
import Notification from '../screens/HomeScreen/Notification';
import Onboarding from '../screens/AuthScreen/Onboarding';
import MarketDetail from '../screens/CampusCircle/MarketDetail';
import MarketMore from '../screens/CampusCircle/MarketMore';

const AppStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Bottom" component={BottomTab} />

            {/* home  */}
            <Stack.Screen name="PostDetail" component={PostDetail} />
            <Stack.Screen name="ViewAllComment" component={ViewAllComment} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen name='Technology' component={Technology} />
            <Stack.Screen name='Campuses' component={Campuses} />
            <Stack.Screen name='Notification' component={Notification} />
            {/* home  */}
            {/* campus circle  */}
            <Stack.Screen name="MarketDetail" component={MarketDetail} />
            <Stack.Screen name="MarketMore" component={MarketMore} />

        </Stack.Navigator>
    )
}

export default AppStack

const styles = StyleSheet.create({})