import { StyleSheet, Text, View, StatusBar, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const Sample = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    return (
        <ScrollView>
            <View style={styles.page}>
                <StatusBar backgroundColor={'white'} barStyle="dark-content" />
                <Text style={{ fontSize: 20, color: 'black', textAlign: 'center', marginBottom: 10 }}>Facebook</Text>
                {/* FOR THE NEXT BOX  */}
                <View style={styles.box1}>
                    <Text style={{ fontSize: 19, }}>By proceeding, you agree to <Text style={{ color: 'blue' }}>MTN's Terms,</Text> wic includes letting Facebook request and recieve your pone number.<Text style={{ color: "blue" }}> Change settings</Text></Text>
                </View>
                {/* INPUT FACE  */}
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ top: 10 }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>Mobile number or email address</Text>
                        <TextInput style={styles.box2} />
                    </View>
                    <View style={{ top: 25, marginBottom: 40 }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>Password</Text>
                        <TextInput style={styles.box2} />
                    </View>
                    <Button title='Log In' color={'blue'} />

                    <TouchableOpacity>
                        <Text style={{ fontSize: 18, color: 'blue', marginTop: 16 }}>Forgotten Password?</Text>
                    </TouchableOpacity>
                    {/* PLEASE TAKE NOTE HERE  */}
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 1.5, backgroundColor: '#CECFCD', width: 120 }} />
                        <Text style={{ color: 'black', fontSize: 15, marginHorizontal: 10 }}>or</Text>
                        <View style={{ height: 1.5, backgroundColor: '#CECFCD', width: 120 }} />
                    </View>
                    {/* NEXT NO QUESTION EVERYONE UNDERSTAND  */}
                    {/* <View style={{ alignItems: 'center' }}> */}
                    <TouchableOpacity>
                        <View style={styles.boxD}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>Create New Account</Text>
                        </View>
                    </TouchableOpacity>
                    {/* </View> */}
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'black', marginTop: 30 }}>English (UK)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'blue', marginTop: 15 }}>Hausa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'blue', marginTop: 15 }}>Francias (France)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'blue', marginTop: 15 }}>Japan Languages...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'blue', marginTop: 15 }}>Gana Languages...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'blue', marginTop: 15 }}>French Languages...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'blue', marginTop: 15 }}>Spanish Languages...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'blue', marginTop: 15 }}>France</Text>
                    </TouchableOpacity>
                </View>

            </View >
        </ScrollView>
    )
}

export default Sample

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    box1: {
        borderWidth: 1,
        height: 80,
        borderColor: 'blue',
        backgroundColor: '#f6f5fa',
        justifyContent: 'center'
    },
    box2: {
        height: 40,
        borderWidth: 1,
    },
    boxD: {
        height: 40,
        width: 200,
        backgroundColor: 'green',
        justifyContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        alignSelf: 'center'
    },
})