import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const DiscussionDetail = ({ route }) => {
    const navigation = useNavigation()
    const commentData = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const RenderHeader = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.base * 1.4 }}>
                    <Image source={images.otp} style={{ height: SIZES.h1 * 1.9, width: SIZES.h1 * 1.9, borderRadius: 100, }} />
                    <View style={{ marginLeft: SIZES.base, flex: 1 }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold' }}>David Kempe</Text>
                        <View style={{ marginTop: SIZES.base / 2, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ paddingHorizontal: SIZES.base / 1.8, backgroundColor: 'red', borderRadius: SIZES.base / 2, ...FONTS.body5, color: COLORS.white, textTransform: 'uppercase' }}>COOKING</Text>
                            <Text style={{ ...FONTS.body5, marginLeft: SIZES.base, color: COLORS.black }}>4 hours ago</Text>
                        </View>
                    </View>
                    <Image source={icons.person} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                </View>
                <Text numberOfLines={9} style={{ fontWeight: 'bold', marginVertical: SIZES.h5, ...FONTS.body3, color: COLORS.black, marginTop: SIZES.base * 0.8 }}>How do I know if cheese has gone bad?</Text>
                {/* REACTION  */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image source={icons.love} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, marginRight: SIZES.base / 1.7 }} />
                        </TouchableOpacity>
                        <Text style={{ ...FONTS.body5, color: COLORS.black }}>29</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.h4, }}>
                        <Image source={icons.comment} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, marginRight: SIZES.base / 1.7 }} />
                        <Text style={{ ...FONTS.body5, color: COLORS.black }}>5 Comments</Text>
                    </View>
                </View>
            </View>
        )
    }
    const RenderFooter = () => {
        return (
            <View>
                <FlatList
                    data={commentData}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <View style={[styles.commentCtn, { flex: 1 }]}>
                                    <Image source={images.pic1} style={{ height: SIZES.h1 * 1.5, width: SIZES.h1 * 1.5, borderRadius: 100 }} />
                                    <View style={{ marginLeft: SIZES.body4, flex: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>Karem Ko</Text>
                                            <Text>4 hours ago</Text>
                                        </View>
                                        <Text style={{ ...FONTS.body4, color: COLORS.black }}>Which satelite is known as Earth observation satellite that was launched on 5 Man, 2005?</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
                                            <Image source={icons.love} style={{ height: SIZES.h3, width: SIZES.h3, }} />
                                            <TouchableOpacity style={{ marginLeft: SIZES.h5 }}>
                                                <Text style={{ borderRadius: SIZES.base * 0.6, ...FONTS.body4, paddingHorizontal: SIZES.base, paddingVertical: SIZES.base / 5, backgroundColor: COLORS.primary, color: COLORS.white }}>Reply</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                {/* RULER  */}
                                <View style={{ height: 1, backgroundColor: COLORS.chocolateBackground, marginBottom: SIZES.base, elevation: 0.5 }} />
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
    return (
        <View style={styles.page}>
            <View style={{ paddingHorizontal: SIZES.width * 0.045, paddingTop: SIZES.base, flex: 1 }}>
                <View style={{ marginBottom: SIZES.h3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={icons.arrowleft} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.body1, color: COLORS.primary, fontWeight: 'bold', letterSpacing: 2 }}>DISCUSSIONS</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, marginRight: SIZES.h2 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* STARTING  */}
                <FlatList
                    data={''}
                    ListHeaderComponent={RenderHeader}
                    ListFooterComponent={RenderFooter}
                />
            </View>
            {/* INPUT CTN */}
            <View style={styles.inputCtn}>
                <Image source={images.avatar} style={{ height: SIZES.h1 * 1.1, width: SIZES.h1 * 1.1, borderRadius: 100 }} />
                <View style={styles.boxCtn}>
                    <TextInput placeholder='Post your comment' placeholderTextColor={COLORS.chocolate}
                        style={{ ...FONTS.body3a, color: COLORS.black, }} />
                </View>
            </View>
        </View>
    )
}

export default DiscussionDetail

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    commentCtn: {
        flexDirection: 'row',
        marginBottom: SIZES.h5,
    },
    inputCtn: {
        height: SIZES.h1 * 2.5,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.h3 * 0.8,
        justifyContent: 'space-between',
    },
    boxCtn: {
        height: SIZES.h1 * 1.5,
        width: SIZES.width * 0.81,
        borderWidth: 1.4,
        justifyContent: 'center',
        paddingHorizontal: SIZES.base * 0.6,
        borderRadius: SIZES.base * 0.5,
        borderColor: COLORS.chocolateBackground,
    },
})