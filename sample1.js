import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React from 'react'

const App = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                <Text style={{ fontSize: 20, color: 'black' }}>Facebook</Text>
            </View>
            {/* BOX TO PUT  */}
            <View style={styles.box}>
                <Text style={{ color: 'black', fontSize: 18 }}>By proceeding, you agree to MTN's Term which includes letting Facebook Request and recieve your phone number. Change settings.</Text>
            </View>
            {/* INPUT SECTION  */}
            <View>
                <Text style={{ color: 'black', fontSize: 16, marginTop: 10, marginLeft: 10 }}>Mobile number or email</Text>
                <View style={styles.box2}>
                    <TextInput />
                </View>
            </View>
            <View>
                <Text style={{ color: 'black', fontSize: 16, marginTop: 10, marginLeft: 10 }}>Password</Text>
                <View style={styles.box2}>
                    <TextInput />
                </View>
            </View>
            {/* BUTTON SPACE  */}
            <View style={{ marginHorizontal: 10, marginVertical: 12 }}>
                <Button title='Log In' color={'blue'} />
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    box: {
        height: 75,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 10

    },
    box2: {
        height: 40,
        // width: 00,
        borderWidth: 1,
        marginHorizontal: 10,
        backgroundColor: '#f8f8f8'
    }
})







