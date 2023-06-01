import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONTS, icons, SIZES } from '../constants';

// Stack Screens
import HomeStack from '../screens/HomeScreen/HomeStack';
import CampusCircleStack from '../screens/CampusCircle/CampusCircleStack';
import SettingStack from '../screens/SettingScreen/SettingStack';
import Home from '../screens/HomeScreen/Home';
import Forum from '../screens/ForumScreen/Forum';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            // initialRouteName="AccountHome"
            screenOptions={({ route }) => ({
                // tabBarShowLabel: false,
                tabBarStyle: {
                    ...FONTS.h5,
                    // color: focused ? COLORS.orange : COLORS.brown
                },
                tabBarStyle: {
                    height: SIZES.h1 * 1.8,
                    backgroundColor: COLORS.white,
                    borderTopWidth: 1,
                },
                tabBarIcon: ({ focused, size, colour }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? icons.home : icons.home
                        size = focused ? SIZES.h3 : SIZES.h3,
                            colour = focused ? COLORS.orange : COLORS.brown
                    }
                    else if (route.name === 'Forum') {
                        iconName = focused ? icons.about : icons.about
                        size = focused ? SIZES.h3 : SIZES.h3,
                            colour = focused ? COLORS.orange : COLORS.brown
                    }
                    else if (route.name === 'Market') {
                        iconName = focused ? icons.cart2 : icons.cart1
                        size = focused ? SIZES.h3 : SIZES.h3,
                            colour = focused ? COLORS.orange : COLORS.brown
                    }
                    else if (route.name === 'Account') {
                        iconName = focused ? icons.person : icons.person
                        size = focused ? SIZES.h3 : SIZES.h3,
                            colour = focused ? COLORS.orange : COLORS.brown
                    }
                    return <Image source={iconName} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: colour }} />
                },
                headerShown: false
            })}
        >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Forum' component={Forum} />
            <Tab.Screen name='Market' component={CampusCircleStack} />
            <Tab.Screen name='Account' component={SettingStack} />
        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({})