import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'

const ChatScreen = ({ route }) => {
    console.log('thus route', route)
    const data = route.params

    const chatData = [
        {
            id: 1,
            user: 'A',
            msg: 'hi',
            time: "08:32 PM",
        }, {
            id: 2,
            user: 'A',
            msg: 'Bro help me urgent 2k?',
            time: "08:34 PM",
        }, {
            id: 3,
            user: 'B',
            msg: "Am good",
            time: "08:32 PM",
        }, {
            id: 4,
            user: 'A',
            msg: "Don't you read my messages😐, did you want a break up, don't you say forever is our deal, 🥺🥺🥺",
            time: "08:32 PM",
        }, {
            id: 5,
            user: 'B',
            msg: "Send your account number😎",
            time: "08:32 PM",
        }, {
            id: 6,
            user: 'A',
            msg: "8051296282, Jewoola Favour - Opay",
            time: "08:32 PM",
        },
    ];
    return (
        <View style={styles.page}>
            <FlatList
                data={chatData}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.container,
                        {
                            alignSelf: item.user === 'A' ? 'flex-start' : 'flex-end',
                            backgroundColor: item.user === 'A' ? '#fff' : 'purple',
                            elevation: item.user === 'A' ? 10 : 0
                        }
                        ]}>
                            <Text style={{ fontSize: 16, color: item.user === 'A' ? '#000' : '#fff' }}>{item.msg}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    container: {
        backgroundColor: 'purple',
        marginBottom: 15,
        padding: 15,
        maxWidth: '70%',
        borderRadius: 5,
    },
})