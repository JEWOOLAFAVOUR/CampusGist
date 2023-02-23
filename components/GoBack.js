import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES, icons } from '../constants'
import { useNavigation } from '@react-navigation/native'

const GoBack = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: SIZES.base * 0.6 }}>
            <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1 }} />
        </TouchableOpacity>
    )
}

export default GoBack

const styles = StyleSheet.create({})