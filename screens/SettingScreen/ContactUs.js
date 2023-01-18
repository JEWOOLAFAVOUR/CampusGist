import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { COLORS } from '../../constants';

const ContactUs = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    return (
        <View style={styles.page}>
            <Header title='Contact Us' />
            <Text>ContactUs</Text>
        </View>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})