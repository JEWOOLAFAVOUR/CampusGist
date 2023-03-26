import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import PostDetail from './PostDetail';
import ProfilePage from './ProfilePage';
import Notification from './Notification';
import Story from './Story';
import ViewAllComment from './ViewAllComment';
import Technology from './Technology';
import Entertainment from './Entertainment';
import Sport from './Sport';
import Lifestyle from './Lifestyle';
import Religion from './Religion';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';


const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    const navigation = useNavigation();
    const showBottomTabBar = useRoute().state?.index === 0;

    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarVisible: showBottomTabBar,
        });
    }, [navigation, showBottomTabBar]);
    return (
        <View
            style={{
                width,
                height,
            }}>
            <Stack.Navigator
                // initialRouteName="Profile"
                screenOptions={{
                    headerShown: false
                }}

            >
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                {/* 
                <Stack.Screen
                    name='ProfilePage'
                    component={ProfilePage}
                /> */}
                <Stack.Screen
                    name='Notification'
                    component={Notification}
                />
                <Stack.Screen
                    name='Story'
                    component={Story}
                />
                {/* <Stack.Screen
                    name='ViewAllComment'
                    component={ViewAllComment}
                /> */}
                {/* NEW FEATURES  */}
                <Stack.Screen
                    name='Technology'
                    component={Technology}
                />
                <Stack.Screen
                    name='Entertainment'
                    component={Entertainment}
                />
                <Stack.Screen
                    name='Sport'
                    component={Sport}
                />
                <Stack.Screen
                    name='Lifestyle'
                    component={Lifestyle}
                />
                <Stack.Screen
                    name='Religion'
                    component={Religion}
                />
                {/* <Stack.Screen
                    name='PostDetail'
                    component={PostDetail}
                    options={{ tabBarVisible: true }}
                /> */}

            </Stack.Navigator>
        </View>
    );
};

export default HomeStack

const styles = StyleSheet.create({});
