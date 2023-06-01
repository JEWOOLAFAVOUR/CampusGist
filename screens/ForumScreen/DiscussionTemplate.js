import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const DiscussionTemplate = ({ data }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DiscussionDetail', { data })} style={[styles.container]}>
            <View style={{}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={data.profileImage} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100, }} />
                    <View style={{ marginLeft: SIZES.base, flex: 1 }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold' }}>{data.userName}</Text>
                        <View style={{ marginTop: SIZES.base / 2, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ paddingHorizontal: SIZES.base / 1.8, backgroundColor: 'red', borderRadius: SIZES.base / 2, ...FONTS.body5, color: COLORS.white, textTransform: 'uppercase' }}>{data.category}</Text>
                            <Text style={{ ...FONTS.body5, marginLeft: SIZES.base, color: COLORS.black }}>{data.time}</Text>
                        </View>
                    </View>
                    {/* <Image source={icons.horizontalmenu} style={{ height: SIZES.base, }} /> */}
                </View>
            </View>
            <Text numberOfLines={3} style={{/* flex: 1, */marginVertical: SIZES.h5, ...FONTS.body3a, color: COLORS.black, marginTop: SIZES.base * 0.8 }}>{data.forumTopic}</Text>

            {/* REACTION  */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Image source={icons.love} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, marginRight: SIZES.base / 1.7 }} />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.body5, color: COLORS.black }}>{data.reaction}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.h4, }}>
                    <Image source={icons.comment} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, marginRight: SIZES.base / 1.7 }} />
                    <Text style={{ ...FONTS.body5, color: COLORS.black }}>{data.comment} Comments</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DiscussionTemplate

const styles = StyleSheet.create({
    container: {
        // height: SIZES.height * 0.25,
        borderRadius: SIZES.h5,
        borderWidth: 1,
        borderColor: COLORS.chocolateBackground,
        paddingHorizontal: SIZES.h3 * 1.3,
        paddingVertical: SIZES.h4,
        justifyContent: 'center',
        marginBottom: SIZES.h4,
        // backgroundColor: COLORS.grey2,
        // alignItems: 'center'
    },
})