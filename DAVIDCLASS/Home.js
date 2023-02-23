import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'

const Home = ({ navigation }) => {
    // const name = 'Favour';
    const [name, setName] = useState('Favour');

    const [firstName, setFirstName] = useState('Moses');

    const studentData = []

    const people = [
        { id: 1, name: 'Dolapo', dept: 'CSC' },
        { id: 2, name: 'David' },
        { id: 3, name: 'Damola' },
        { id: 4, name: 'Favour' },
        { id: 5, name: 'Samuel' },
        { id: 6, name: 'Akin' },
        { id: 7, name: 'Angel' },
    ]

    const handleOnpress = (id) => {
        console.log(id)

        setPeople((person) => {
            return person.filter(cool => cool.id != id)
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'red'} barStyle='light-content' />
            <TouchableOpacity onPress={() => setFirstName('Akin')}>
                <Text style={{ fontSize: 30, color: 'blue' }}>My name is {firstName}</Text>
            </TouchableOpacity>

            {/* EXAMPLE USING FLATLIST  */}
            <View style={{ marginTop: 50 }}>
                <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={people}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Accountl', { item })}
                                style={styles.container}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Accountl', { people })} style={{ height: 50, backgroundColor: 'red' }}>
                    <Text style={{ fontSize: 30, color: 'white', textAlign: 'center' }}>PRESS ME</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: 120,
        backgroundColor: 'pink',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 20,
        marginBottom: 30
    },
})