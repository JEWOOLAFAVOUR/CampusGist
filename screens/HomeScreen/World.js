import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

const World = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Text>World</Text>
        </View>
    )
}

export default World

const styles = StyleSheet.create({})