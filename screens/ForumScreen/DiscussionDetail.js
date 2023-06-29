import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { createDiscussionComment, getDiscussionComments } from '../../api/forum'
import Toast from 'react-native-toast-message';
import { getUserById } from '../../api/auth'

const DiscussionDetail = ({ route }) => {
    const navigation = useNavigation()
    const data = route.params?.data;
    const discussionId = data?.id;
    const [forumComments, setForumComments] = useState([])
    const commentData = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const [comment, setComment] = useState('')
    const [userId, setUserId] = useState('')
    console.log('lllllllll', comment)

    const fetchDiscussionComments = async () => {
        const { comments, error } = await getDiscussionComments(data?.id);
        if (error) return console.log('market-error', error)
        setForumComments(comments)
        console.log('forum comments fetched', comments)
    }

    useEffect(() => {
        fetchDiscussionComments();
    }, [])

    const getImage = (uri) => {
        if (uri) return { uri };
        return images.avatar;
    }

    const handleSubmitComment = async (discussionId, comment) => {
        if (comment.trim() === "") {
            Toast.show({
                type: 'error',
                text1: 'Input a comment to continue!',
                visibilityTime: 1000,
            });
        } else {
            console.log('kkkkkkkkkk', comment)
            const { data, message, error, status } = await createDiscussionComment(discussionId, comment);
            if (error) return console.log('Adding comment error', error)
            if (status === true) {
                Toast.show({
                    type: 'success',
                    text1: 'Comment Added 👋',
                    visibilityTime: 1000,
                });
                setComment('')
            }
            console.log('adding comment success', data, message)
        }
    }

    const getUser = async () => {
        if (userId === "") {
            console.log('')
        } else {
            const response = await getUserById(userId);
            console.log('resssssssss', response)
            const data = response
            navigation.navigate('ProfilePage', { data })
        }
    }

    const RenderHeader = () => {
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
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.base * 1.4 }}>
                    <TouchableOpacity onPress={() => getUser(setUserId(data?.author?._id))}>
                        <Image source={getImage(data?.author?.avatar)} style={{ height: SIZES.h1 * 1.9, width: SIZES.h1 * 1.9, borderRadius: 100, }} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: SIZES.base, flex: 1 }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold' }}>{`${data?.author?.firstName} ${data?.author?.lastName}`}</Text>
                        <View style={{ marginTop: SIZES.base / 2, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ paddingHorizontal: SIZES.base / 1.8, backgroundColor: 'red', borderRadius: SIZES.base / 2, ...FONTS.body5, color: COLORS.white, textTransform: 'uppercase' }}>{data?.category?.name}</Text>
                            <Text style={{ ...FONTS.body5, marginLeft: SIZES.base, color: COLORS.black }}>{formattedTime}</Text>
                        </View>
                    </View>
                    <Image source={icons.person} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                </View>
                <Text numberOfLines={9} style={{ fontWeight: 'bold', marginVertical: SIZES.h5, ...FONTS.body3, color: COLORS.black, marginTop: SIZES.base * 0.8 }}>{data?.title}</Text>
                {/* REACTION  */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image source={icons.love} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, marginRight: SIZES.base / 1.7 }} />
                        </TouchableOpacity>
                        <Text style={{ ...FONTS.body5, color: COLORS.black }}>{data?.reactions}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.h4, }}>
                        <Image source={icons.comment} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, marginRight: SIZES.base / 1.7 }} />
                        <Text style={{ ...FONTS.body5, color: COLORS.black }}>{data?.comments} Comments</Text>
                    </View>
                </View>
            </View>
        )
    }
    const RenderFooter = () => {
        return (
            <View>
                <FlatList
                    data={forumComments}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <View style={[styles.commentCtn, { flex: 1 }]}>
                                    <TouchableOpacity onPress={() => getUser(setUserId(item?.user_id?._id))}>
                                        <Image source={getImage(data?.author?.avatar)} style={{ height: SIZES.h1 * 1.5, width: SIZES.h1 * 1.5, borderRadius: 100 }} />
                                    </TouchableOpacity>
                                    <View style={{ marginLeft: SIZES.body4, flex: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>{`${item?.user_id?.firstName} ${item?.user_id?.lastName}`}</Text>
                                            <Text> - 4 hours ago</Text>
                                        </View>
                                        <Text style={{ ...FONTS.body4, color: COLORS.black }}>{item.comment}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={icons.love} style={{ height: SIZES.h3, width: SIZES.h3, }} />
                                                <Text>{item.reactions}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => navigation.navigate('CommentReplies', { item })} style={{ marginLeft: SIZES.h5 }}>
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
                    <TextInput placeholder='Post your comment'
                        placeholderTextColor={COLORS.chocolate}
                        value={comment}
                        onChangeText={(value) => setComment(value)}
                        style={{ ...FONTS.body3a, color: COLORS.black, flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => handleSubmitComment(discussionId, comment)}>
                        <Image source={icons.send} style={{ height: SIZES.h3, width: SIZES.h3 }} />
                    </TouchableOpacity>
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
        // justifyContent: 'space-between',
        paddingHorizontal: SIZES.base * 0.6,
        borderRadius: SIZES.base * 0.5,
        borderColor: COLORS.chocolateBackground,
        flexDirection: 'row',
        alignItems: 'center',
    },
})