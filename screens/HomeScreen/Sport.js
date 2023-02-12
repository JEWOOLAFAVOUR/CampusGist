import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Sport = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    return (
        <View>
            <Text>Sport</Text>
        </View>
    )
}

export default Sport

const styles = StyleSheet.create({})