import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

const Home = ({ navigation }) => {
    const [profilePic, setProfilePic] = useState(require('../assets/profile2.jpg'))

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Class1')}>
                <Text style={{ fontSize: 40, color: 'blue', fontWeight: 'bold' }}>Welcome to Home</Text>

            </TouchableOpacity>
            <Image source={require('../assets/profile2.jpg')} style={{ height: 300, width: 300 }} />


            <TouchableOpacity>
                <Text>Set Image</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})