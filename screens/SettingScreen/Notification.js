import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header';
import { COLORS } from '../../constants';


const Notification = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    return (
        <View style={styles.page}>
            <Header title='Notification' />
            <Text>Notification</Text>
        </View>
    )
}

export default Notification
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})