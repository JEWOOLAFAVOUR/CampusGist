import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler, Alert, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, icons, images, FONTS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                'Exit App',
                'Do you want to exit the app?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel'
                    },
                    {
                        text: 'Exit',
                        onPress: () => BackHandler.exitApp()
                    }
                ],
                { cancelable: false }
            );
            return true;
        };

        const removeListener = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            backAction();
        });

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                navigation.goBack();
                return true;
            }
        );

        return () => backHandler.remove();
    }, [navigation]);
    return (
        <View style={styles.page}>
            <Image source={images.pic4} style={{ height: SIZES.height * 0.5, width: SIZES.width * 1, }} />
            {/* SECOND PART */}
            <View style={{ marginTop: SIZES.h1 * 1.5, flex: 1 }}>
                <Text style={{ ...FONTS.navTitle, color: COLORS.primary, textAlign: 'center', marginBottom: SIZES.base / 2 }}>Welcome!</Text>
                <Text style={{ ...FONTS.body3a, color: COLORS.primary, textAlign: 'center' }}>You are only a few steps away from Gist</Text>
            </View>
            <View style={{ marginBottom: SIZES.h4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: SIZES.h4 }}>
                    <Text style={{ ...FONTS.body3a, color: COLORS.primary }}>Already a member? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>Login</Text>
                    </TouchableOpacity>
                </View>
                {/* THE BUTTON */}
                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.clickBtn}>
                    <Image source={icons.mail} style={{ tintColor: '#ad554b', width: SIZES.h2 * 0.9, height: SIZES.h2 * 0.9, position: 'absolute', left: 17, }} />
                    <Text style={{ ...FONTS.body4, color: COLORS.white, textAlign: 'center' }}>Register with email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterWithPhone')} style={[styles.clickBtn, { backgroundColor: '#1774eb' }]}>
                    <Image source={icons.call} style={{ tintColor: COLORS.white, width: SIZES.h2 * 0.8, height: SIZES.h2 * 0.8, position: 'absolute', left: 17, }} />
                    <Text style={{ ...FONTS.body4, color: COLORS.white, textAlign: 'center' }}>Continue with Phone number</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    clickBtn: {
        height: SIZES.h1 * 1.9,
        backgroundColor: '#111747',
        marginHorizontal: SIZES.h2,
        borderRadius: SIZES.h3,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },

})