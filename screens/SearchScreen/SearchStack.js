import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './Search';
import SearchResult from './SearchResult';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

const SearchStack = () => {
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
                    name='Search'
                    component={Search}
                />
                <Stack.Screen
                    name='SearchResult'
                    component={SearchResult}
                />
            </Stack.Navigator>
        </View>
    );
};

export default SearchStack

const styles = StyleSheet.create({});
