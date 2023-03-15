import { StyleSheet, Text, View, TouchableOpacity, Image, ToastAndroid, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import Header from '../../components/Header'
import FormButton from '../../components/FormButton';
import { useNavigation } from '@react-navigation/native';
import { updateUserBioAndLevel } from '../../api/auth';

const ChangeBio = ({ }) => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    const ToastMessage = () => {
        ToastAndroid.show("Edited successfully!", ToastAndroid.SHORT);
    }
    const [bio, setBio] = useState('')

    const handleSubmit = async () => {
        console.log('bioooo', bio)
        const data = await updateUserBioAndLevel()
        console.log('coming data', data)
    }
    return (
        <View style={styles.page}>
            {/* HEADER SECTION */}
            <View style={{ backgroundColor: COLORS.primary }}>
                <View style={styles.headerCtn}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10, paddingVertical: 4 }}>
                        <Image source={icons.arrowleft} style={{ tintColor: COLORS.white, height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 10, paddingVertical: 4 }}>
                        <Image source={icons.verticalmenu} style={{ tintColor: COLORS.white, height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1.5, elevation: 1, backgroundColor: '#cdcdcd' }} />
            </View>
            {/* OTHER SECTION  */}
            <View style={{ marginTop: SIZES.h3, paddingHorizontal: SIZES.width * 0.03, flex: 1 }}>
                <Text style={{ color: COLORS.black, ...FONTS.body1, fontWeight: 'bold' }}>Change Your Bio</Text>
                <Text style={{ color: COLORS.chocolate, ...FONTS.body3 }}>Write something about you to share in public.</Text>
                {/* TEXTINPUT */}
                <View style={styles.inputCtn}>
                    <TextInput
                        multiline placeholder='Enter your bio'
                        style={{ ...FONTS.body3a, color: COLORS.black }}
                        value={bio}
                        onChangeText={value => setBio(value)}
                    />
                </View>

            </View>
            <View style={{ marginBottom: SIZES.h1 * 2, paddingHorizontal: SIZES.width * 0.03, }}>
                <FormButton onPress={() => handleSubmit()} title="Update Bio" />
            </View>
        </View>
    )
}

export default ChangeBio

const styles = StyleSheet.create({
    page: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    headerCtn: {
        paddingHorizontal: SIZES.width * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SIZES.base,
        justifyContent: 'space-between',
    },
    inputCtn: {
        height: SIZES.h1 * 1.7,
        justifyContent: 'center',
        paddingHorizontal: SIZES.base * 0.9,
        borderWidth: 1.7,
        borderColor: COLORS.chocolate,
        marginTop: SIZES.base,
    },
})