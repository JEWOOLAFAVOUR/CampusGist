import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const FormView = ({ title, name, image }) => {
    return (
        <View>
            <Text style={{ fontSize: 25, marginBottom: 10, color: 'black' }}>{name}</Text>
            <View style={styles.btn}>
                <TextInput placeholderTextColor={'black'} placeholder={title}
                    style={{ fontSize: 20 }} />

                <Image source={image} style={{ height: 200, width: 200 }} />
            </View>
        </View>
    )
}

export default FormView

const styles = StyleSheet.create({
    btn: {
        height: 60,
        width: '100%',
        backgroundColor: COLORS.chocolateBackground,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 20
    },
})