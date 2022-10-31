import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, icons } from '../../constants';

const Login = () => {
    const navigation = useNavigation();
    const { colors: { background } } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: SIZES.width * 0.05 }}>
            <ScrollView>
                <View style={{ marginTop: SIZES.h1 * 1.5, marginBottom: SIZES.h1 * 2 }}>
                    <Text style={{ ...FONTS.navTitle, color: COLORS.black }}>Welcome</Text>
                    <Text style={{ ...FONTS.body3, }}>Sign in to access more features.</Text>
                </View>
                <View style={styles.inputCtn}>
                    <TextInput placeholder='Enter Email' keyboardType='email-address' style={{ ...FONTS.body3 }} />
                </View>
                <View>
                    <View style={[styles.inputCtn, { marginBottom: 0, flexDirection: 'row', alignItems: 'center' }]}>
                        <TextInput placeholder='Enter Password' style={{ ...FONTS.body3, flex: 1 }} />
                        <TouchableOpacity>
                            <Image source={icons.key} style={{ height: SIZES.h3, width: SIZES.h3 }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: SIZES.base }}>
                        <Text style={{ textAlign: 'right', color: COLORS.primary, ...FONTS.h4 }}>Forget Password</Text>
                    </TouchableOpacity>
                </View>
                {/* BUTTON  */}
                <View style={{ marginTop: SIZES.h1 * 1.2 }}>
                    <TouchableOpacity style={styles.btnCtn}>
                        <Text style={{ ...FONTS.body2a, color: COLORS.white }}>Login</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: SIZES.h1 * 1.3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>I am new user,</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                                <Text style={{ ...FONTS.h3a, color: COLORS.primary }}>  Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    inputCtn: {
        height: SIZES.h1 * 1.9,
        borderWidth: 1.5,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        marginBottom: SIZES.h1,
        borderColor: COLORS.brown
    },
    btnCtn: {
        height: SIZES.h1 * 1.8,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center'
    },
})