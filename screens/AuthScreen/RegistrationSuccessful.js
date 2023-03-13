import React, { useState } from 'react'
import { View, Text, BackHandler, Alert, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { COLORS, icons, images, FONTS, SIZES } from '../../constants';

const RegistrationSuccessful = () => {
    const handleSubmit = () => {

    }
    return (
        <View style={styles.page}>
            <View style={{ flex: 1 }}>
                <Image source={images.successful} style={{ height: SIZES.height * 0.4, width: SIZES.width * 0.7, alignSelf: 'center' }} />
                <Text style={{ maxWidth: '80%', ...FONTS.body3, color: COLORS.primary, alignSelf: 'center', textAlign: 'center', marginTop: SIZES.h2, }}>Congratulation! Your account is registered in this application.</Text>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.btnCtn}>
                <Text style={{ ...FONTS.body3a, color: COLORS.white, marginRight: SIZES.h4 }}>Thank You</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegistrationSuccessful

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.05,
        paddingTop: SIZES.h1 * 4,
    },
    btnCtn: {
        height: SIZES.h1 * 1.8,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.h3,
        justifyContent: 'center',
        paddingHorizontal: SIZES.h2,
        alignItems: 'center',
        marginBottom: SIZES.h2 * 2,
        marginHorizontal: SIZES.width * 0.02,
    },
})