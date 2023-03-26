import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const { width, height } = Dimensions.get('window');

const LikeProduct = () => {
    const Tab = createMaterialTopTabNavigator();
    const Post = () => {
        return (
            <View style={styles.page}>
                <Text style={{ fontSize: SIZES.h1 * 1.5, color: COLORS.black, fontFamily: 'Roboto-Medium', marginBottom: 10 }}>You haven't Posted yet</Text>
                <Text style={{ ...FONTS.body2, color: COLORS.black }}>When you post, it'll show up here.</Text>
            </View>
        )
    }
    const Media = () => {
        return (
            <View style={styles.page}>
                <Text style={{ fontSize: SIZES.h1 * 1.5, color: COLORS.black, fontFamily: 'Roboto-Medium', marginBottom: 10 }}>You don't have any Media yet</Text>
                <Text style={{ ...FONTS.body2, color: COLORS.black }}>When you post, it'll show up here.</Text>
            </View>
        )
    }
    const Saved = () => {
        return (
            <View style={styles.page}>
                <Text style={{ fontSize: SIZES.h1 * 1.5, color: COLORS.black, fontFamily: 'Roboto-Medium', marginBottom: 10 }}>You haven't Saved yet</Text>
                <Text style={{ ...FONTS.body2, color: COLORS.black }}>When you saved, it'll show up here.</Text>
                {/* <TouchableOpacity>
                    <Text>Posts now</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    return (
        <View
            style={{
                // paddingHorizontal: SIZES.width * 1,
                width,
                height,
                backgroundColor: COLORS.white,
            }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // tabBarShowLabel: true,
                    tabBarIndicatorStyle: {
                        backgroundColor: COLORS.orange,
                        height: 3.0,
                        borderRadius: SIZES.radius,
                    },
                })}
            >
                <Tab.Screen name="Post" component={Post} />
                <Tab.Screen name="Media" component={Media} />
                <Tab.Screen name="Saved" component={Saved} />
            </Tab.Navigator>
        </View>
    )
}

export default LikeProduct

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: SIZES.h1 * 1.5,
        paddingHorizontal: SIZES.h2,
    },
})