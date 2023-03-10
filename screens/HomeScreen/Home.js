import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllGist from './AllGist'
import Technology from './Technology'
import Entertainment from './Entertainment'
import Campuses from './Campuses'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

const Home = ({ ...props }) => {
    const navigation = useNavigation();
    const { accessToken } = props
    // console.log('accessToken Home', accessToken)
    useEffect(() => {
        // console.log('props at home', props)
    }, [])

    const Tab = createMaterialTopTabNavigator();
    return (
        <View
            style={{
                // paddingHorizontal: SIZES.width * 1,
                width,
                height,
                backgroundColor: COLORS.white,
            }}>
            <StatusBar backgroundColor={COLORS.primary} />
            <View style={{ marginBottom: 0, flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base, justifyContent: 'space-between', paddingHorizontal: SIZES.width * 0.05 }}>
                <Text style={{ ...FONTS.body1, fontWeight: 'bold', color: COLORS.primary }}>CampusGist</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginRight: SIZES.h3 }}>
                        <Image source={icons.search} style={{ height: SIZES.h2 * 1, width: SIZES.h2 * 1 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={{ flexDirection: 'row' }}>
                        <View style={{ marginTop: SIZES.base * 0.6, marginRight: SIZES.base * 0.8 }}>
                            <Image source={icons.bell} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8, tintColor: COLORS.black }} />
                        </View>
                        <View style={styles.notificationBell}>
                            <Text style={{ color: COLORS.white, ...FONTS.h5 }}>6</Text>
                        </View>
                        {/* <TouchableOpacity>
                        <Image source={images.profile4} style={{ height: SIZES.h1, width: SIZES.h1, borderRadius: 100 }} />
                    </TouchableOpacity> */}
                    </TouchableOpacity>
                </View>
            </View>
            <AllGist />
            {/* <Tab.Navigator
                screenOptions={({ route }) => ({
                    // tabBarShowLabel: true,
                    tabBarIndicatorStyle: {
                        backgroundColor: COLORS.orange,
                        height: 3.5,
                        borderRadius: SIZES.radius,
                    },
                })}
            >
                <Tab.Screen name="AllGist" hello={accessToken} component={AllGist} />
                <Tab.Screen name="Campuses" component={Campuses} />
                <Tab.Screen name="Entertainment" component={Entertainment} />
                <Tab.Screen name="Technology" component={Technology} />
            </Tab.Navigator> */}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
    }
}

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    notificationBell: {
        height: SIZES.h3,
        width: SIZES.h3,
        backgroundColor: COLORS.orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        position: 'absolute',
        top: 2,
        right: 2,
        marginLeft: 30
    },
})