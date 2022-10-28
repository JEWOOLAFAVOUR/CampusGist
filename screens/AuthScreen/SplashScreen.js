import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FONTS } from '../../constants'
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, images } from '../../constants';
const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();

    const theme = useTheme();
    const { background, dark } = theme;

    const hideSplashScreen = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        setTimeout(() => {
            hideSplashScreen()
            navigation.navigate('Login');
        }, 1000);
    }, []);

    const renderSplash = () => {
        return (
            <View style={styles.splash}>
                <View style={styles.childView}>
                    <Image source={dark ? images.image2 : images.image1} style={{ height: 150, width: 150, resizeMode: 'contain' }} />
                </View>
            </View>
        )
    }
    return (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center', padding: Platform.OS === 'ios' ? 20 : 0,
            backgroundColor: background,
        }}>
            {isVisible === true ? renderSplash() : null}
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainContainer: {

    },
    splash: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    childView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})