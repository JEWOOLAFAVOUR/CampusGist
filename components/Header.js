import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: SIZES.base }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: SIZES.h4 }}>
                    <Image source={icons.arrowleft} style={{ height: SIZES.h2 * 1.2, width: SIZES.h2 * 1.2 }} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h2, color: COLORS.black, marginLeft: SIZES.h1 * 2.9 }}>{title}</Text>
            </View>
            <View style={styles.ruler} />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        marginVertical: SIZES.base * 0.5,
    },
    ruler: {
        height: 2,
        backgroundColor: COLORS.orange,
        marginTop: SIZES.base * 0.9,
    }
})