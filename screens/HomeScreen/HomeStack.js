import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import PostDetail from './PostDetail';
import ProfilePage from './ProfilePage';
import Notification from './Notification';
import Story from './Story';
import ViewAllComment from './ViewAllComment';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

const HomeStack = () => {
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
                }}>
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='PostDetail'
                    component={PostDetail}
                />
                <Stack.Screen
                    name='ProfilePage'
                    component={ProfilePage}
                />
                <Stack.Screen
                    name='Notification'
                    component={Notification}
                />
                <Stack.Screen
                    name='Story'
                    component={Story}
                />
                <Stack.Screen
                    name='ViewAllComment'
                    component={ViewAllComment}
                />
            </Stack.Navigator>
        </View>
    );
};

export default HomeStack

const styles = StyleSheet.create({});
