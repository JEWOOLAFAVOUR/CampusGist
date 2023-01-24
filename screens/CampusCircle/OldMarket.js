import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const OldMarket = ({ navigation }) => {
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    return (
        <View>
            <Text>OldMarket</Text>
        </View>
    )
}

export default OldMarket

const styles = StyleSheet.create({})