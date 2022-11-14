import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import React from 'react';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONTS, icons, SIZES } from '../constants';

// Stack Screens
import HomeStack from '../screens/HomeScreen/HomeStack';
import SearchStack from '../screens/SearchScreen/SearchStack';
import NotificationStack from '../screens/NotificationScreen/NotificationStack';
import SettingStack from '../screens/SettingScreen/SettingStack';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <View
            style={{
                width,
                height,
            }}>
            <Tab.Navigator
                // initialRouteName="AccountHome"
                screenOptions={({ route }) => ({
                    tabBarShowLabel: true,
                    tabBarStyle: {
                        ...FONTS.h5,
                    },
                    tabBarStyle: {
                        height: 55,
                        backgroundColor: COLORS.white,
                        borderTopWidth: 1,
                    },
                    tabBarIcon: ({ focused, size, colour }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? icons.home : icons.home
                            size = focused ? SIZES.h2 : SIZES.h2,
                                colour = focused ? COLORS.primary : COLORS.brown
                        } else if (route.name === 'Search') {
                            iconName = focused ? icons.search : icons.search
                            size = focused ? SIZES.h2 : SIZES.h2,
                                colour = focused ? COLORS.primary : COLORS.brown
                        } else if (route.name === 'Notification') {
                            iconName = focused ? icons.notification : icons.notification
                            size = focused ? SIZES.h2 : SIZES.h2,
                                colour = focused ? COLORS.primary : COLORS.brown
                        } else if (route.name === 'Setting') {
                            iconName = focused ? icons.setting : icons.setting
                            size = focused ? SIZES.h2 : SIZES.h2,
                                colour = focused ? COLORS.primary : COLORS.brown
                        }
                        return <Image source={iconName} style={{ height: SIZES.h1 * 0.9, width: SIZES.h1 * 0.9, tintColor: colour }} />
                    },
                    headerShown: false
                })}
            >
                <Tab.Screen name='Home' component={HomeStack} />
                <Tab.Screen name='Search' component={SearchStack} />
                <Tab.Screen name='Notification' component={NotificationStack} />
                <Tab.Screen name='Setting' component={SettingStack} />
            </Tab.Navigator>
        </View>
    )
}

export default BottomTab

const styles = StyleSheet.create({})