import { StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const Ruler = () => {
    return (
        <View style={styles.ruler}></View>
    )
}

export default Ruler

const styles = StyleSheet.create({

    ruler: {
        height: 0.7,
        backgroundColor: COLORS.black,
    },
})