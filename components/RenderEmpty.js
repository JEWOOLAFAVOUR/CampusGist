import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FONTS, images, SIZES, COLORS } from '../constants'

const RenderEmpty = () => {
    return (
        <View>
            <Image source={images.pic3} style={{ height: SIZES.h1 * 4, width: SIZES.h1 * 4 }} />
            <Text style={{ ...FONTS.body2, color: COLORS.black, fontStyle: 'italic' }}>Loading...</Text>
        </View>
    )
}

export default RenderEmpty

const styles = StyleSheet.create({})