import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, images, icons, SIZES } from '../../constants';
import moment from 'moment';

const MarketDetail = ({ route }) => {
    const data = route.params?.response?.data;
    console.log('route coming', data)

    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const image = [
        { id: 1, marketImg: images.pic3 },
        { id: 2, marketImg: images.image5 },
        { id: 3, marketImg: images.image6 },
        { id: 4, marketImg: images.pic4 },
    ];
    const [more, setMore] = useState(false)
    const getImage = (uri) => {
        if (uri) return { uri };

        return images.restaurant2
    }
    // Assume createdAt is the ISO-8601 timestamp string you receive from your backend
    const createdAt = data?.createdAt
    // console.log(createdAt, 'llllllllllllll')

    // Use Moment.js to parse the createdAt string with the ISO 8601 format
    const createdAtMoment = moment(createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ');

    // Use Moment.js to calculate the time difference between the createdAt timestamp and the current time
    const timeDiff = moment.duration(moment().diff(createdAtMoment));

    // Use the time difference to determine the appropriate format for the output string
    let formattedTime;

    if (timeDiff.asDays() > 7) {
        // If the post was created more than a week ago, display the date in the format "YYYY-MM-DD"
        formattedTime = moment(createdAtMoment).format('YYYY-MM-DD');
    } else if (timeDiff.asDays() > 1) {
        // If the post was created more than a day ago but less than a week ago, display the time in the format "X days ago"
        formattedTime = moment(createdAtMoment).fromNow();
    } else if (timeDiff.asHours() >= 1 && timeDiff.asHours() < 24) {
        // If the post was created within the last day but more than an hour ago, display the time in the format "X hours ago"
        formattedTime = moment(createdAtMoment).subtract(moment().utcOffset(), 'minutes').fromNow();
    } else if (timeDiff.asMinutes() >= 1) {
        // If the post was created within the last hour but more than a minute ago, display the time in the format "X minutes ago"
        formattedTime = moment(createdAtMoment).local().fromNow();
    } else {
        // If the post was created within the last minute, display the time as "just now"
        formattedTime = 'just now';
    }


    const getThumbnail = (uri) => {
        if (uri) return { uri }

        return images.image6
    }
    return (
        <View style={styles.page}>
            {/* HEADER SECTION  */}
            <View style={styles.headerCtn}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: SIZES.base / 2 }}>
                    <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1, marginRight: SIZES.h4, }} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={{ ...FONTS.body2, color: COLORS.black, fontWeight: 'bold', }}>{data.title}</Text>
            </View>
            {/* HEADER END */}
            <ScrollView style={styles.page}>
                {/* <ScrollView horizontal={true}>
                    {
                        image.map((data, index) => {
                            return ( */}
                <View style={{ height: SIZES.height * 0.4, width: SIZES.width * 0.9, borderWidth: 1, borderColor: COLORS.chocolateBackground, marginRight: SIZES.base }}>
                    <Image source={getThumbnail(data?.pictures?.url)} style={{ height: SIZES.height * 0.4, width: SIZES.width * 0.9, }} />
                </View>
                {/* )
                        })
                    }
                </ScrollView> */}
                <View style={{ marginTop: SIZES.base, paddingHorizontal: SIZES.width * 0.03 }}>
                    <TouchableOpacity onPress={() => setMore(!more)}>
                        <Text numberOfLines={more ? 4 : 3} style={{ ...FONTS.body1, fontWeight: 'bold', color: COLORS.black }}>{data.title}</Text>
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.body2c, color: COLORS.orange, fontWeight: 'bold', marginTop: SIZES.base * 1.3 }}>₦{data.price}</Text>
                    <Text style={{ ...FONTS.body3b, color: COLORS.black, }}>Listed {formattedTime}</Text>
                    {/* SEND A MESSAGE  */}
                    <View style={styles.sendMsgCtn}>
                        <Text style={{ ...FONTS.h3a, color: COLORS.black, marginLeft: SIZES.h1 }}>Send seller a message</Text>
                        <View style={styles.curveCtn}>
                            <Text style={{ ...FONTS.body3b, color: COLORS.black, marginLeft: SIZES.base, }}>Is this still available?</Text>
                        </View>
                        <TouchableOpacity style={styles.sendCtn}>
                            <Text style={{ ...FONTS.body2, color: COLORS.white, fontWeight: 'bold' }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    {/* LOCATION  */}
                    <View>
                        <Image source={images.map} style={{ height: SIZES.height * 0.12, width: SIZES.width }} />
                        <Text style={{ ...FONTS.body2c, color: COLORS.primary, fontWeight: 'bold', position: 'absolute', bottom: 2, left: SIZES.width * 0.35 }}>{data?.location}</Text>
                    </View>
                    {/* DESCRIPTION SECTION  */}
                    <View style={{ marginTop: SIZES.base * 1.3 }}>
                        <View style={{ height: 1, backgroundColor: COLORS.chocolate, marginBottom: SIZES.base }} />
                        <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.black }}>Description</Text>
                        <Text style={{ ...FONTS.body3b, color: COLORS.black }}>{data?.description}</Text>
                        <View style={{ height: 1, backgroundColor: COLORS.chocolate, marginTop: SIZES.base }} />
                    </View>
                    {/* SELLERS INFORMATION  */}
                    <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.black, marginTop: SIZES.h5, }}>Seller information</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
                        <Image source={images.pic2} style={{ height: SIZES.h1 * 2.4, width: SIZES.h1 * 2.4, borderRadius: 100 }} />
                        <View style={{ marginLeft: SIZES.h4, }}>
                            <Text style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.black }}>{data?.contact?.name}</Text>
                            <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>{data?.contact?.phone}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: SIZES.h1 }} />
                </View>
            </ScrollView>
        </View>
    )
}

export default MarketDetail

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerCtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.width * 0.03,
        paddingTop: SIZES.h5,
        marginBottom: SIZES.base
    },
    sendMsgCtn: {
        height: SIZES.h1 * 4.7,
        borderWidth: 1.5,
        marginVertical: SIZES.h5,
        borderRadius: 10,
        borderColor: COLORS.chocolate,
        justifyContent: 'center',
    },
    curveCtn: {
        height: SIZES.h1 * 1.4,
        marginHorizontal: SIZES.h3,
        borderWidth: 1,
        borderColor: COLORS.chocolate,
        justifyContent: 'center',
        paddingHorizontal: SIZES.h4,
        borderRadius: SIZES.h1,
        marginTop: SIZES.base / 2,
        backgroundColor: COLORS.grey2,
    },
    sendCtn: {
        height: SIZES.h1 * 1.5,
        marginHorizontal: SIZES.h3,
        backgroundColor: COLORS.blue,
        borderRadius: SIZES.h5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.base,
    },
})
