import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONTS, icons, SIZES } from '../constants';

// Stack Screens
import HomeStack from '../screens/HomeScreen/HomeStack';
import CampusCircleStack from '../screens/CampusCircle/CampusCircleStack';
import SettingStack from '../screens/SettingScreen/SettingStack';
import Home from '../screens/HomeScreen/Home';

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
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        ...FONTS.h5,
                    },
                    tabBarStyle: {
                        height: SIZES.h1 * 2.05,
                        backgroundColor: COLORS.white,
                        borderTopWidth: 1,
                    },
                    tabBarIcon: ({ focused, size, colour }) => {
                        let iconName;
                        if (route.name === 'HomeP') {
                            iconName = focused ? icons.home : icons.home
                            size = focused ? SIZES.h1 : SIZES.h1,
                                colour = focused ? COLORS.orange : COLORS.brown
                        }/* else if (route.name === 'SearchP') {
                            iconName = focused ? icons.search : icons.search
                            size = focused ? SIZES.h1 : SIZES.h1,
                                colour = focused ? COLORS.orange : COLORS.brown
                        }*/
                        else if (route.name === 'CampusCircleP') {
                            iconName = focused ? icons.circle : icons.circle
                            size = focused ? SIZES.h1 : SIZES.h1,
                                colour = focused ? COLORS.orange : COLORS.brown
                        }
                        else if (route.name === 'AccountP') {
                            iconName = focused ? icons.person : icons.person
                            size = focused ? SIZES.h1 : SIZES.h1,
                                colour = focused ? COLORS.orange : COLORS.brown
                        }
                        return <Image source={iconName} style={{ height: SIZES.h1 * 0.9, width: SIZES.h1 * 0.9, tintColor: colour }} />
                    },
                    headerShown: false
                })}
            >
                <Tab.Screen name='HomeP' component={Home} />
                <Tab.Screen name='CampusCircleP' component={CampusCircleStack} />
                <Tab.Screen name='AccountP' component={SettingStack} />
            </Tab.Navigator>
        </View>
    )
}

export default BottomTab

const styles = StyleSheet.create({})