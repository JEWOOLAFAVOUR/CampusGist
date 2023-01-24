import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'

const CircleListDetails = ({ navigation, route }) => {
    const data = route.params?.item;
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    return (
        <View style={styles.page}>
            <Text style={{ ...FONTS.body2c, fontWeight: 'bold', color: COLORS.orange, marginBottom: SIZES.base * 0.8 }}>{data.title}</Text>
            <Text style={{ ...FONTS.body3a, color: COLORS.black }}>{data.description}</Text>
        </View>
    )
}

export default CircleListDetails

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.05,
        paddingTop: SIZES.h4,
    },
})