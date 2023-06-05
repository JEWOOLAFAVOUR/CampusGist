import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { forumRemoveLike, forumToogleLike } from '../../api/forum'

const DiscussionTemplate = ({ data }) => {
    const postId = data?.id;
    const navigation = useNavigation();
    const [liked, setLiked] = useState(data.likedByCurrentUser);
    const [likeCount, setLikeCount] = useState(data.reactions);

    const handleToggle = async (postId) => {
        // Check if the post is currently liked or not
        if (liked) {
            // Perform the unlike operation
            const data = await forumToogleLike(postId);
            setLiked(false);
            setLikeCount(likeCount - 1);
            console.log('response from toggle', data);
        } else {
            // Perform the like operation
            const data = await forumRemoveLike(postId);
            setLiked(true);
            setLikeCount(likeCount + 1);
            console.log('response from toggle', data);
        }
    };



    const getImage = (uri) => {
        if (uri) return { uri };
        return images.avatar;
    }
    const createdAt = data.createdAt
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
    } else if (timeDiff.asHours() >= 1) {
        // If the post was created within the last day but more than an hour ago, display the time in the format "X hours ago"
        formattedTime = moment(createdAtMoment).subtract(moment().utcOffset(), 'minutes').fromNow();
    } else if (timeDiff.asMinutes() >= 1) {
        // If the post was created within the last hour but more than a minute ago, display the time in the format "X minutes ago"
        formattedTime = moment(createdAtMoment).local().fromNow();
    } else {
        // If the post was created within the last minute, display the time as "just now"
        formattedTime = 'just now';
    }

    // console.log(createdAt, 'llllllllllllll')

    return (
        <TouchableOpacity onPress={() => navigation.navigate('DiscussionDetail', { data })} style={[styles.container]}>
            <View style={{}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={getImage(data?.author?.avatar)} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100, }} />
                    <View style={{ marginLeft: SIZES.base, flex: 1 }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold' }}>{data?.author?.username}</Text>
                        <View style={{ marginTop: SIZES.base / 2, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ paddingHorizontal: SIZES.base / 1.8, backgroundColor: 'red', borderRadius: SIZES.base / 2, ...FONTS.body5, color: COLORS.white, textTransform: 'uppercase' }}>{data?.category?.name}</Text>
                            <Text style={{ ...FONTS.body5, marginLeft: SIZES.base, color: COLORS.black }}>{formattedTime}</Text>
                        </View>
                    </View>
                    {/* <Image source={icons.horizontalmenu} style={{ height: SIZES.base, }} /> */}
                </View>
            </View>
            <Text numberOfLines={3} style={{/* flex: 1, */marginVertical: SIZES.h5, ...FONTS.body3a, color: COLORS.black, marginTop: SIZES.base * 0.8 }}>{data?.title}</Text>

            {/* REACTION  */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleToggle(postId)}>
                        <Image source={liked ? icons.love1 : icons.love2} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, marginRight: SIZES.base / 1.7 }} />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.body5, color: COLORS.black }}>{likeCount}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.h4, }}>
                    <Image source={icons.comment} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, marginRight: SIZES.base / 1.7 }} />
                    <Text style={{ ...FONTS.body5, color: COLORS.black }}>{data.comments} Comments</Text>
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