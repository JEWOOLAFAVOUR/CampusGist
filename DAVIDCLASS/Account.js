import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme';
import FormView from '../component/FormView';

const Account = ({ route }) => {
    console.log('data from touch', route.params)

    const data = route.params;

    console.log(data.people[1].name, 'data all new')
    return (
        <View style={styles.page}>
            <FormView title="Input your name" name="Name" image={require('../assets/profile2.jpg')} />
            <FormView title="Input your email" name="Email" />
            <FormView title="Input your password" name="Password" />
            <FormView title="Input your number" name="Number" />
            <FormView />
        </View >
    )
}

export default Account

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: 20
    },
    btn: {
        height: 60,
        width: '100%',
        backgroundColor: COLORS.chocolateBackground,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 20
    },
})