import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const HotMore = ({ navigation }) => {
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    return (
        <View>
            <Text>HotMore</Text>
        </View>
    )
}

export default HotMore

const styles = StyleSheet.create({})