import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'

const Class1 = () => {
    const classData = [
        {
            id: 1,
            name: 'David',
            level: 400,
            dept: 'CSE'
        }, {
            id: 2,
            name: 'Dolapo',
            level: 300,
            dept: 'EEE'
        }, {
            id: 3,
            name: 'Damola',
            level: 500,
            dept: 'BCH'
        },
    ];
    const storyData = [
        {
            id: 1,
            image: require('../assets/profile2.jpg'),
            name: 'Ade',
        }, {
            id: 2,
            image: require('../assets/profile2.jpg'),
            name: 'Dotun',
        }, {
            id: 3,
            image: require('../assets/profile2.jpg'),
            name: 'Tayo',
        }, {
            id: 4,
            image: require('../assets/profile2.jpg'),
            name: 'Moses',
        }, {
            id: 5,
            image: require('../assets/profile2.jpg'),
            name: 'David',
        }, {
            id: 6,
            image: require('../assets/profile2.jpg'),
            name: 'Ade',
        }, {
            id: 7,
            image: require('../assets/profile2.jpg'),
            name: 'Ade',
        }, {
            id: 8,
            image: require('../assets/profile2.jpg'),
            name: 'Ade',
        }, {
            id: 9,
            image: require('../assets/profile2.jpg'),
            name: 'Ade',
        }, {
            id: 10,
            image: require('../assets/profile2.jpg'),
            name: 'Ade',
        }, {
            id: 11,
            image: require('../assets/profile2.jpg'),
            name: 'Ade',
        },
    ]
    return (
        <View style={{ padding: 16, }}>
            {/* <FlatList
                data={classData}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.roll}>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{item.level}</Text>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{item.dept}</Text>
                        </View>
                    )
                }}
            /> */}
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={storyData}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginRight: 10 }}>
                            <Image source={item.image} style={{ height: 70, width: 70, borderRadius: 100 }} />
                            <Text>{item.name}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Class1

const styles = StyleSheet.create({
    roll: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    }
})