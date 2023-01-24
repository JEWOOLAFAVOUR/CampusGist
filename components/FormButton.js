import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../constants'

const FormButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default FormButton

const styles = StyleSheet.create({
    container: {
        height: SIZES.h1 * 1.5,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',

    },
})