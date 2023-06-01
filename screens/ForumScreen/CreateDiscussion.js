import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const CreateDiscussion = () => {
    const navigation = useNavigation();
    const CloseCreate = () => {
        navigation.goBack();
        ToastAndroid.show("Discussion cancelled", ToastAndroid.SHORT);
    }
    return (
        <View style={styles.page}>
            {/* HEADER  */}
            <View style={{ marginBottom: SIZES.h2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => CloseCreate()}>
                    <Image source={icons.close} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.body1, color: COLORS.primary, fontWeight: 'bold', letterSpacing: 2 }}>NEW DISCUSSIONS</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                </View>
            </View>
            {/* CREATE DISCUSSION */}
            <View style={{ marginBottom: SIZES.h2, }}>
                <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>Create Discussion</Text>
                <View style={{ marginTop: SIZES.h3 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.avatar} style={{ height: SIZES.h1 * 1.7, width: SIZES.h1 * 1.7, borderRadius: 100 }} />
                            <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold', marginLeft: SIZES.h5 * 0.9 }}>John Smith</Text>
                        </View>
                        <View style={styles.puclicCtn}>
                            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Public</Text>
                            <Image source={icons.arrowright2} style={{ width: SIZES.h4, height: SIZES.h4, }} />
                        </View>
                    </View>
                </View>
                <TextInput placeholder='Type your question/queres here...' placeholderTextColor={COLORS.chocolate}
                    style={{ ...FONTS.h3, color: COLORS.black }} />
            </View>
            {/* BUTTON  */}
            <TouchableOpacity style={styles.discussionCtn}>
                <Text style={{ ...FONTS.body3, color: COLORS.white, letterSpacing: 1.3, fontWeight: 'bold' }}>CREATE DISCUSSION</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateDiscussion

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.045,
        paddingTop: SIZES.base,
    },
    puclicCtn: {
        height: SIZES.h1,
        width: SIZES.h1 * 2.3,
        borderRadius: SIZES.base / 1.5,
        backgroundColor: COLORS.grey2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.base * 0.5,
    },
    discussionCtn: {
        height: SIZES.h1 * 1.5,
        width: SIZES.width * 0.7,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.base,

    },
})