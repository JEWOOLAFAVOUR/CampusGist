import { StyleSheet, Text, BackHandler, Alert, View, Dimensions, Image, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllGist from './AllGist'
import Technology from './Technology'
import Entertainment from './Entertainment'
import Campuses from './Campuses'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NetInfoProvider from '../../components/NetInfoProvider'

const { width, height } = Dimensions.get('window');

const Home = ({ ...props }) => {
    const navigation = useNavigation();

    const Tab = createMaterialTopTabNavigator();
    const navigationRef = React.createRef();
    const backAction = () => {
        const currentRoute = navigationRef.current.getCurrentRoute();
        const isHomeTab = currentRoute.name === 'HomeP';

        if (isHomeTab) {
            BackHandler.exitApp();
            return true;
        } else {
            return false;
        }
    };

    return (
        <View
            style={{
                // paddingHorizontal: SIZES.width * 1,
                width,
                height,
                backgroundColor: COLORS.white,
            }}>
            <StatusBar backgroundColor={COLORS.primary} />
            <NetInfoProvider />
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
                            <Text style={{ color: COLORS.white, ...FONTS.h5 }}>0</Text>
                        </View>
                        {/* <TouchableOpacity>
                        <Image source={images.profile4} style={{ height: SIZES.h1, width: SIZES.h1, borderRadius: 100 }} />
                    </TouchableOpacity> */}
                    </TouchableOpacity>
                </View>
            </View>
            <AllGist />
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