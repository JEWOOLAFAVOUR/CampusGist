import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CampusCircle from './CampusCircle';
import HotMore from './HotMore';
import OldMarket from './OldMarket';
import CircleListDetails from './CircleListDetails';
import FoodDetail from './FoodDetail';
import MarketDetail from './MarketDetail';


const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

const CampusCircleStack = () => {
    return (
        <View
            style={{
                width,
                height,
            }}>
            <Stack.Navigator
                initialRouteName="CampusCircle"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name='CampusCircle'
                    component={CampusCircle}
                />
                <Stack.Screen
                    name='HotMore'
                    component={HotMore}
                />
                <Stack.Screen
                    name='OldMarket'
                    component={OldMarket}
                />
                <Stack.Screen
                    name='CircleListDetails'
                    component={CircleListDetails}
                />
                <Stack.Screen
                    name='FoodDetail'
                    component={FoodDetail}
                />
                <Stack.Screen
                    name='MarketDetail'
                    component={MarketDetail}
                />
            </Stack.Navigator>
        </View>
    );
};

export default CampusCircleStack

const styles = StyleSheet.create({});
