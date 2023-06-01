import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CampusCircle from './CampusCircle';
import HotMore from './HotMore';
import OldMarket from './OldMarket';
import CircleListDetails from './CircleListDetails';
import RestaurantDetail from './RestaurantDetail';
import MarketDetail from './MarketDetail';
import MarketMore from './MarketMore';
import Market from './Market';
import MarketCategory from './MarketCategory';


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
                initialRouteName="Marketp"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen
                    name='CampusCircle'
                    component={CampusCircle}
                />
                <Stack.Screen
                    name='Marketp'
                    component={Market}
                />
                {/* <Stack.Screen
                    name='HotMore'
                    component={HotMore}
                /> */}
                <Stack.Screen
                    name='OldMarket'
                    component={OldMarket}
                />
                <Stack.Screen
                    name='CircleListDetails'
                    component={CircleListDetails}
                />
                {/* <Stack.Screen
                    name='RestaurantDetail'
                    component={RestaurantDetail}
                /> */}
                {/* <Stack.Screen
                    name='MarketCategory'
                    component={MarketCategory}
                /> */}
                {/* <Stack.Screen
                    name='MarketDetail'
                    component={MarketDetail}
                />
                <Stack.Screen
                    name='MarketMore'
                    component={MarketMore}
                /> */}
            </Stack.Navigator>
        </View>
    );
};

export default CampusCircleStack

const styles = StyleSheet.create({});
