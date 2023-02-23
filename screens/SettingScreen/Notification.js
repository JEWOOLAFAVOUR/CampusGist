import { StyleSheet, Text, View, Switch, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'


const Notification = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    return (
        <View style={styles.page}>
            <Text>Notification</Text>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    page: {
        backgroundColor: COLORS.white,

    },
})