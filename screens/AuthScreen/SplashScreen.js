import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../constants'

const SplashScreen = () => {
    return (
        <View>
            <Text style={{ ...FONTS.h1 }}>SplashScreen</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})