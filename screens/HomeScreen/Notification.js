import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';

const Notification = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const list = [
        { id: 1, title: 'All', },
        { id: 2, title: 'Follow', },
        { id: 3, title: 'Bookmark', },
    ];
    const notificationData1 = [
        {
            id: 1,
            name: 'Meghan',
            type: 'follow',
            profilePic: images.profile2,
            time: '2 min ago',
        }, {
            id: 2,
            name: 'James',
            type: 'posted',
            details: "has posted new politics news 'Top 10 incredible in the world'",
            time: '4 hours ago',
            profilePic: images.image1,
            thumbnail: images.profile3,
        }, {
            id: 20,
            name: 'James',
            type: 'follow',
            details: "has posted new politics news 'Top 10 incredible in the world'",
            time: '4 hours ago',
            profilePic: images.image1,
            thumbnail: images.profile3,
        }, {
            id: 3,
            name: 'Dawson',
            type: 'reply-comment',
            comment: 'Cool thing',
            profilePic: images.profile3,
            time: '23 hours ago',
            profilePic: images.profile4,
            thumbnail: images.profile3,
        }, {
            id: 4,
            name: 'Dolapo',
            type: 'make-comment',
            comment: 'What a nice idea',
            time: '3 days ago',
        }, {
            id: 200,
            name: 'James',
            type: 'reply-comment',
            details: "has posted new politics news 'Top 10 incredible in the world'",
            time: '4 hours ago',
            profilePic: images.image1,
            thumbnail: images.profile3,
        }, {
            id: 30,
            name: 'James',
            type: 'posted',
            details: "has posted new politics news 'Top 10 incredible in the world'",
            time: '4 hours ago',
            profilePic: images.image1,
            thumbnail: images.profile3,
        }, {
            id: 23,
            name: 'James',
            type: 'follow',
            details: "has posted new politics news 'Top 10 incredible in the world'",
            time: '4 hours ago',
            profilePic: images.image1,
            thumbnail: images.profile3,
        }, {
            id: 25,
            name: 'James',
            type: 'make-comment',
            details: "has posted new politics news 'Top 10 incredible in the world'",
            time: '4 hours ago',
            profilePic: images.image1,
            thumbnail: images.profile3,
        },
    ];
    const [categoryIndex, setCategoryIndex] = useState(0)

    const NotificationDraft = ({ data }) => {
        return (
            <View>
                {/* FOLLOWING TEMPLATE */}
                {
                    data.type == 'follow' &&
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: SIZES.h5 * 0.9 }}>
                        <Image source={images.profile2} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100 }} />
                        <View style={{ flex: 1, marginLeft: SIZES.h5 * 1.2 }}>
                            <Text numberOfLines={1} style={{ ...FONTS.body3, color: 'black' }}><Text style={{ fontWeight: 'bold' }}>Meghan</Text> started following you</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>2 min ago</Text>
                        </View>
                        <TouchableOpacity style={[styles.followCtn, { marginLeft: SIZES.base * 0.8 }]}>
                            <Text style={{ ...FONTS.body4, color: 'white' }}>+</Text>
                            <Text style={{ ...FONTS.body4, color: 'white' }}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                }
                {/* POSTED TEMPLATE */}
                {
                    data.type == 'posted' &&
                    <View style={{ flexDirection: 'row', marginVertical: SIZES.h5 * 0.9 }}>
                        <Image source={images.slide2} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100 }} />
                        <View style={{ flex: 1, marginLeft: SIZES.h5 * 1.2 }}>
                            <Text numberOfLines={3} style={{ ...FONTS.body3, color: 'black' }}><Text style={{ fontWeight: 'bold' }}>James</Text> has posted new politics news <Text style={{ color: COLORS.chocolate }}>"Top 10 incredible in the world"</Text></Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>4 hour ago</Text>
                        </View>
                        <View style={{ marginLeft: SIZES.h2 }}>
                            <Image source={images.profile6} style={{ height: SIZES.h1 * 1.7, width: SIZES.h1 * 1.7, borderRadius: 10 }} />
                        </View>
                    </View>
                }
                {/* REPLE-COMMENT TEMPLATE */}
                {
                    data.type == 'reply-comment' &&
                    <View style={{ flexDirection: 'row', marginVertical: SIZES.h5 * 0.9 }}>
                        <Image source={images.slide3} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100 }} />
                        <View style={{ flex: 1, marginLeft: SIZES.h5 * 1.2 }}>
                            <Text numberOfLines={3} style={{ ...FONTS.body3, color: 'black' }}><Text style={{ fontWeight: 'bold' }}>Armani</Text> reply to your comment</Text>
                            <Text numberOfLines={1} style={{ ...FONTS.body3, color: 'black' }}>"Cool thing"</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>8 hour ago</Text>
                        </View>
                        <View style={{ marginLeft: SIZES.h2 }}>
                            <Image source={images.restaurant3} style={{ height: SIZES.h1 * 1.7, width: SIZES.h1 * 1.7, borderRadius: 10 }} />
                        </View>
                    </View>
                }
                {/* MAKE COMMENT TEMPLATE */}
                {
                    data.type == 'make-comment' &&
                    <View style={{ flexDirection: 'row', marginVertical: SIZES.h5 * 0.9 }}>
                        <Image source={images.slide4} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100 }} />
                        <View style={{ flex: 1, marginLeft: SIZES.h5 * 1.2 }}>
                            <Text numberOfLines={3} style={{ ...FONTS.body3, color: 'black' }}><Text style={{ fontWeight: 'bold' }}>Dawson</Text> has comment to your news</Text>
                            <Text numberOfLines={1} style={{ ...FONTS.body3, color: 'black' }}>"What a nice idea"</Text>
                            <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>05/02/2023</Text>
                        </View>
                        <View style={{ marginLeft: SIZES.h2 }}>
                            <Image source={images.profile3} style={{ height: SIZES.h1 * 1.7, width: SIZES.h1 * 1.7, borderRadius: 10 }} />
                        </View>
                    </View>
                }
            </View>
        )
    }

    return (
        <View style={styles.page}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: SIZES.h5 }}>
                <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: SIZES.h1 * 0.9, color: COLORS.primary, fontWeight: 'bold' }}>Notification</Text>
            <Text style={{ color: COLORS.black, fontSize: SIZES.body3a, fontFamily: 'Roboto-Medium' }}>You have <Text style={{ color: COLORS.orange }}>0 notifications</Text> today.</Text>
            {/* LIST  */}
            <View style={{}}>
                <FlatList
                    data={list}
                    contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => setCategoryIndex(index)} style={[styles.listCtn, categoryIndex == index && styles.selectedCat]}>
                                <Text style={{ ...FONTS.body3, color: categoryIndex == index ? COLORS.white : COLORS.primary, fontWeight: 'bold' }}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            {/* TODAY NOTIFICATION  */}
            <ScrollView>
                <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.primary }}>Today</Text>
                <FlatList
                    data={notificationData1}
                // renderItem={({ item }) => <NotificationDraft data={item} />}
                />
                <Text style={{ ...FONTS.body3, color: COLORS.black }}>You have 0 notification.</Text>
            </ScrollView>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.04,
        paddingTop: SIZES.h5,
    },
    listCtn: {
        height: SIZES.h1 * 1.3,
        width: SIZES.h1 * 3.2,
        backgroundColor: COLORS.white,
        marginVertical: SIZES.h3,
        borderRadius: SIZES.h1,
        justifyContent: 'center',
        alignItems: 'center',
    }, selectedCat: {
        height: SIZES.h1 * 1.3,
        width: SIZES.h1 * 3.2,
        backgroundColor: COLORS.primary,
        marginTop: SIZES.h3,
        marginBottom: SIZES.h5,
        borderRadius: SIZES.h1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    followCtn: {
        height: SIZES.h1 * 1.3,
        width: SIZES.h1 * 2.3,
        backgroundColor: COLORS.orange,
        borderRadius: SIZES.h1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})