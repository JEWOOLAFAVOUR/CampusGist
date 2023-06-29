import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons, images } from '../constants';

const HomeScreen = ({ navigation }) => {
    // if(item.status === true){

    // }else{

    // }

    const homeData = [
        {
            id: 1,
            image: images.amala,
            name: "Jewoola Favour",
            message: "Perfect! Will check",
            time: "08:34PM",
            status: true,
            userPresence: ['online', 'offline', 'away'],
            unreadMsg: 0,
        }, {
            id: 2,
            image: images.jollof,
            name: "Adedolapo Kabiru",
            message: "Thanks Bro Favour, I love the name",
            time: "08:34PM",
            status: false,
            userPresence: ['online', 'offline', 'away'],
            unreadMsg: 4,
        }, {
            id: 31,
            image: images.electronics,
            name: "Muritala David",
            message: "Finish and let me go and eat!🤔🤨",
            time: "08:34PM",
            status: false,
            userPresence: ['online', 'offline', 'away'],
            unreadMsg: 2,
        }, {
            id: 451,
            image: images.meat,
            name: "Tinubu Adedamola",
            message: "I'm not ready to graduate June 30",
            time: "08:34PM",
            status: true,
            userPresence: ['online', 'offline', 'away'],
            unreadMsg: 0,
        }, {
            id: 571,
            image: images.noodles,
            name: "David Patience",
            message: "Boyfriend, Food is ready ooo. Wetin una dey do for tech school self😥",
            time: "08:34PM",
            status: false,
            userPresence: ['online', 'offline', 'away'],
            unreadMsg: 0,
        },
    ];
    return (
        <View style={styles.page}>
            <FlatList
                data={homeData}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', {
                            name: item.name,
                            image: item.image,
                            status: item.status,
                        })} style={styles.container}>
                            <View>
                                <Image source={item.image} style={{ height: 55, width: 55, borderRadius: 100, borderWidth: 2, borderColor: 'white' }} />
                                <View style={[styles.greenDot, { backgroundColor: item.status ? 'green' : 'red' }]} />
                            </View>
                            <View style={{ marginLeft: 10, flex: 1 }}>
                                <Text style={{ fontSize: 17, color: '#000', fontWeight: 'bold' }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    {item.unreadMsg === 0 ?
                                        <Image source={icons.circlecheck} style={{ marginRight: 4, height: 10, width: 10, tintColor: '#000' }} />
                                        : null
                                    }
                                    <Text numberOfLines={1} style={{ fontSize: 14, color: '#000' }}>{item.message}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 12, color: '#000' }}>{item.time}</Text>

                                {item.unreadMsg >= 1 &&
                                    <View style={styles.unreadCtn}>
                                        <Text style={{ fontSize: 12, color: '#fff', }}>{item.unreadMsg}</Text>
                                    </View>
                                }




                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        paddingHorizontal: 15,
    },
    unreadCtn: {
        height: 20,
        width: 20,
        borderRadius: 100,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    greenDot: {
        height: 10,
        width: 10,
        backgroundColor: 'green',
        borderRadius: 100,
        position: 'absolute',
        right: 3,
        bottom: 5
    },
})