import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllGist from './AllGist'
import World from './World'
import Magazine from './Magazine'
import Business from './Business'

const { width, height } = Dimensions.get('window');

const Home = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
        <View
            style={{
                // paddingHorizontal: SIZES.width * 1,
                width,
                height,
                backgroundColor: COLORS.white,
            }}>
            <View style={{ marginBottom: -1, flexDirection: 'row', alignItems: 'center', marginTop: SIZES.h5, justifyContent: 'space-between', paddingHorizontal: SIZES.width * 0.05 }}>
                <Text style={{ ...FONTS.body1, fontWeight: 'bold', color: COLORS.primary }}>CampusGist</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Image source={icons.search} style={{ height: SIZES.h1, width: SIZES.h1, marginRight: SIZES.h3 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={images.profile4} style={{ height: SIZES.h1, width: SIZES.h1, borderRadius: 100 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // tabBarShowLabel: true,
                    tabBarIndicatorStyle: {
                        backgroundColor: COLORS.orange,
                        height: 3.5,
                        borderRadius: SIZES.radius,
                    },
                })}
            >
                <Tab.Screen name="AllGist" component={AllGist} />
                <Tab.Screen name="Business" component={Business} />
                <Tab.Screen name="Magazine" component={Magazine} />
                <Tab.Screen name="World" component={World} />
            </Tab.Navigator >
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})