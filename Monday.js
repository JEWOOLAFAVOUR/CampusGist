import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const App = () => {

    const TextInputView = ({ title, value, setValue }) => {
        return (
            <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 16, color: '#000', marginBottom: 5 }}>{title}</Text>
                <View style={styles.textInput}>
                    <TextInput
                        value={value}
                        onChangeText={(value) => setValue(value)}
                    />
                </View>
            </View>
        )
    }

    const Home = ({ navigation }) => {
        const [phone, setPhone] = useState('')
        const [password, setPassword] = useState('')
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [age, setAge] = useState('')

        const handleSubmit = () => {
            // console.log('davidddddddddd')
            const data = {
                phone,
                password,
                firstName,
                lastName,
                age,
            }
            navigation.navigate('AboutMe', { data })
            console.log('data', data)
        }

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 20 }}>
                <Text style={{ fontSize: 30, color: '#000', marginBottom: 20, fontWeight: 'bold' }}>FORM CLASS </Text>
                <TextInputView title='Mobile number or email' value={phone} setValue={setPhone} />
                <TextInputView title='Password' value={password} setValue={setPassword} />
                <TextInputView title='FirstName' value={firstName} setValue={setFirstName} />
                <TextInputView title='LastName' value={lastName} setValue={setLastName} />
                <TextInputView title='Age' value={age} setValue={setAge} />

                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
                    <Text style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}>Submit</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 30 }} ></View>
            </ScrollView>
        )

    }
    const AboutMe = ({ route }) => {
        console.log('data coming from route', route)
        const data = route.params.data
        return (
            <View>
                <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Phone - {data.phone}</Text>
                <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Password - {data.password}</Text>
                <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>FirstName - {data.firstName}</Text>
                <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>LastName - {data.lastName}</Text>
                <Text style={{ fontSize: 16, color: 'red', fontWeight: 'bold' }}>Age - {data.age}</Text>
            </View>
        )
    }
    const Stack = createNativeStackNavigator()
    // const Home = () => <View></View>
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Homedd' component={Home} />
                <Stack.Screen name='AboutMe' component={AboutMe} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}
export default App

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10
        // marginTop: 10,
    },
    button: {
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
})
