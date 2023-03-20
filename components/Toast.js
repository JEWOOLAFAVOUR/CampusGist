import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants'


const Toast = ({ message, type }) => {
    const [isVisible, setIsVisible] = useState(false);
    let color;

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) {
        return null;
    }

    if (type === 'success') {
        color = '#6BBF59'; // or any other color you prefer for success
    } else if (type === 'fail') {
        color = '#EE3B3B'; // or any other color you prefer for fail
    }

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            {/* <Text style={[styles.message, { color: type === 'error' ? '#fff' : '#000' }]}> */}
            <Text style={[styles.message, { color: type === 'error' ? '#fff' : '#fff' }]}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        ...FONTS.body3,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.white
    },
});

export default Toast;
