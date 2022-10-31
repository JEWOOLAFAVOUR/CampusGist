import { StyleSheet, Text, View, ToastAndroid, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';

const EditProfile = () => {
    const ToastMessage = () => {
        ToastAndroid.show("Edited successfully!", ToastAndroid.SHORT);
    }
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const editProfileData = [
        {
            id: 1,
            title: 'Name',
            defaultValue: 'Oluwasegun Boluwatife',
            placeholder: 'Oluwasegun Boluwatife'
        }, {
            id: 2,
            title: 'Username',
            defaultValue: 'oluwasegun123',
            placeholder: 'oluwasegun123'
        }, {
            id: 3,
            title: 'Website',
            defaultValue: '',
            placeholder: 'Website'
        }, {
            id: 4,
            title: 'Bio',
            defaultValue: '',
            placeholder: 'Bio'
        },
    ];
    return (
        <View style={styles.page}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10 }}>
                    <Image source={icons.close} style={{ height: SIZES.h1, width: SIZES.h1 }} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h3, color: COLORS.black }}>Edit Profile</Text>
                <TouchableOpacity onPress={() => { ToastMessage(); navigation.goBack() }} style={{ paddingLeft: 10 }}>
                    <Image source={icons.circlecheck} style={{ height: SIZES.h1, width: SIZES.h1 }} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: SIZES.h1 * 1.2 }}>
                <Image source={images.profile4} style={{ height: SIZES.h1 * 2.8, width: SIZES.h1 * 2.8, borderRadius: 100 }} />
                <TouchableOpacity style={{ marginTop: SIZES.base }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.blue }}>Change Profile Photo</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={editProfileData}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginBottom: SIZES.h4 }}>
                            <Text style={{ fontSize: SIZES.h3 * 1.1, color: COLORS.black, fontWeight: 'bold' }}>{item.title}</Text>
                            <TextInput defaultValue={item.defaultValue} placeholder={item.placeholder} style={styles.textInput} />
                            <View style={{ height: 1.5, backgroundColor: '#cdcdcd', marginTop: -10 }} />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.05,
        paddingTop: SIZES.h3
    },
    container: {
        borderWidth: 1,
        paddingVertical: -3
    },
    textInput: {
        ...FONTS.body3,
        color: COLORS.blue
    },
})