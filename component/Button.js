import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from './theme'
import { useNavigation } from '@react-navigation/native'

const Button = ({ title, dolapo, textColor, size }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={dolapo} style={styles.btnCtn}>
            <Text style={{ color: textColor, fontSize: size, fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btnCtn: {
        height: SIZES.big * 1.3,
        width: '100%',
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})