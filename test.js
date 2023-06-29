import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from './constants';
import OtpInputs from 'react-native-otp-inputs';

const Test = () => {
    const [input, setInput] = useState('')

    const handleSubmit = () => {
        if (input.trim() === "") {
            console.log('Please enter the OTP FIELD')
        } else {
            navigation.navigate('HomeScreen', { input })
        }
        // THE BODY WILL BE SENT TO THE API TO VERIFY THE OTP
    }
    const TextLOgo = ({ david }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image />
                {
                    david ?
                        <Text>Search</Text>
                        :
                        <TextInput placeholder='Seaarch' />
                }
                <Image />
            </TouchableOpacity>
        )
    }
    const A = () => {
        return <TextLOgo david={true} />
    }
    const B = () => {
        return <TextLOgo />
    }

    return (
        <View style={styles.container}>
            <OtpInputs
                handleChange={(k) => setInput(k)}
                numberOfInputs={4}
            />
            <TouchableOpacity onPress={() => handleSubmit()}>
                <Text>DONE</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
})