import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, icons } from '../../constants';

const Register = () => {
    const navigation = useNavigation();
    const { colors: { background } } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: SIZES.width * 0.05 }}>
            <ScrollView>
                <View style={{ marginTop: SIZES.h1 * 1.5, marginBottom: SIZES.h1 * 2 }}>
                    <Text style={{ ...FONTS.navTitle, color: COLORS.black }}>Register</Text>
                    <Text style={{ ...FONTS.body3, }}>Sign in to access more features.</Text>
                </View>
                <View style={styles.inputCtn}>
                    <TextInput placeholder='Enter Name' style={{ ...FONTS.body3 }} />
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
                </View>
                {/* BUTTON  */}
                <View style={{ marginTop: SIZES.h1 * 1.2 }}>
                    <TouchableOpacity style={styles.btnCtn}>
                        <Text style={{ ...FONTS.body2a, color: COLORS.white }}>Register</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: SIZES.h1 * 1.3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>I am already a member,</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                                <Text style={{ ...FONTS.h3a, color: COLORS.primary }}>  Sign In</Text>
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

export default Register

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