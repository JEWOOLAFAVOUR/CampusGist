import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import dateFormat from 'dateformat'
import { getSinglePost } from '../../api/post';
import { useNavigation } from '@react-navigation/native';
import { handleLike, handleUnlike } from '../../api/post';
import { connect } from 'react-redux'
// import moment from 'moment/moment';
import moment from 'moment';
import Roller from '../../components/Roller';
import Toast from '../../components/Toast';
import NetInfo from '@react-native-community/netinfo';




const PostList = ({ data, ...props }) => {
    const [commentRec, setCommentRec] = useState(data.comment)
    const [loveRec, setLoveRec] = useState(data.like)
    const [click, setClick] = useState(false)
    const navigation = useNavigation()
    const { thumbnail } = data;
    const [liked, setLiked] = useState(data.like);
    const [likeCount, setLikeCount] = useState(data.like);

    const [k, setK] = useState(false)
    const [commentErr, setCommentErr] = useState(false)


    // access token
    const accessToken = props.accessToken

    const getThumbnail = (uri) => {
        if (uri) return { uri }

        return images.image6
    }

    const handleToggle = async (postId, accessToken) => {
        console.log('access token testing', accessToken)
        console.log('firstdddddddd', postId)


        const data = await handleLike(postId, accessToken)
        // setLiked(!liked + 1)
        setLiked(!liked)
        setLikeCount(liked ? likeCount - 1 : likeCount + 1)

        console.log('erroe for toogle', data)
        // console.log('data hhhh', message)

    }

    const withNetworkCheck = (fn) => async (...args) => {
        try {
            const { isConnected } = await NetInfo.fetch();
            if (!isConnected) {
                // Handle the case where the device is offline
                // setCommentErr(false);
                // setCommentErr(true);
                // const ToastMessage = () => {
                ToastAndroid.show("You're offline!", ToastAndroid.SHORT);
                // }
                return;
            }
            return await fn(...args);
        } catch (error) {
            console.log('Error checking network connectivity', error);

        }
    };

    const fetchSinglePost = withNetworkCheck(async (slug) => {
        try {
            setK(true)
            const { error, post, success } = await getSinglePost(slug)
            console.log('first jv', post, success)

            setK(false)

            if (error) console.log('singlepost error', error)
            if (success === true) {
                navigation.navigate('PostDetail', { post })
            } else {
                ToastAndroid.show("Check Internet Connectivity!", ToastAndroid.SHORT);
            }
        } catch (error) {
            // Log any errors that occur during the fetch
            console.error('Error fetching single post: ', error);
        }
    })



    // Assume createdAt is the ISO-8601 timestamp string you receive from your backend
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

    // console.log(formattedTime, 'forrrrrrr'); // Outputs a string in the format "X days ago", "X hours ago", "X minutes ago", or "just now"
    //  ago", "X minutes ago", or "just now"

    return (
        <TouchableOpacity key={data.id} activeOpacity={1} onPress={() => fetchSinglePost(data.slug)} style={styles.listCtn}>
            {k ? <Roller visible={true} /> : null}
            {commentErr && <Toast message="Network Error" type="fail" />}

            <View style={{ flex: 1, marginLeft: SIZES.h4, marginRight: SIZES.base * 0.3, marginTop: SIZES.base, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.base / 2 }}>
                        <Image source={images.avatar} style={{ height: SIZES.h1 * 0.85, width: SIZES.h1 * 0.85, borderRadius: 100 }} />
                        <Text style={{ color: COLORS.grey, fontSize: SIZES.body4, fontFamily: 'Roboto-Medium', marginBottom: 2, marginLeft: SIZES.base }}>Admin</Text>
                    </View>

                </View>
                <View>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { slug: data.slug })}> */}
                    <Text numberOfLines={3} style={{ color: COLORS.black, fontSize: SIZES.body4 * 1.1, fontFamily: 'Roboto-Medium', fontWeight: '600' }}>{data.title}</Text>
                </View>
                {/* REACTION  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: SIZES.base * 0.5 }}>
                    <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>{formattedTime}</Text>
                    {/* <Text style={{ marginHorizontal: SIZES.base }}>-</Text>
                    <TouchableOpacity onPress={() => setCommentRec(commentRec + 1)} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.base * 1.5 }}>
                        <Image source={icons.comment2} style={{ height: SIZES.h4 * 1.2, width: SIZES.h4 * 1.2, }} />
                        <Text style={{ marginLeft: SIZES.base * 0.8 }}>{commentRec}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleToggle(data.id, accessToken)} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.base * 1.5 }}>
                        <Image source={liked ? icons.love1 : icons.love2} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.orange }} />
                        <Text style={{ marginLeft: SIZES.base * 0.8 }}>{likeCount}</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            <View style={{ marginRight: SIZES.base }}>
                {/* <TouchableOpacity style={styles.followCtn}>
                    <Text style={{ ...FONTS.body5, color: COLORS.orange }}>Following</Text>
                </TouchableOpacity> */}
                <View style={{ justifyContent: 'center', marginLeft: SIZES.base * 1.1, borderWidth: 1, borderRadius: SIZES.h4 * 0.9, borderColor: COLORS.chocolateBackground }}>
                    <Image source={getThumbnail(data.thumbnail)} style={{ height: SIZES.h1 * 2.7, width: SIZES.h1 * 3.4, borderRadius: SIZES.h4 * 0.9 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
    }
}

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(PostList)


const styles = StyleSheet.create({
    listCtn: {
        flex: 1,
        height: SIZES.h1 * 3.95,
        borderWidth: 2,
        backgroundColor: COLORS.grey2,
        borderColor: COLORS.grey2,
        marginBottom: SIZES.base,
        flexDirection: 'row',
        borderRadius: SIZES.h5,
        alignItems: 'center',
    },
    gistCtn: {
        height: SIZES.h1 * 4.7,
        // borderWidth: 1,
        borderRadius: SIZES.h5,
        // flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f3f3f3',
        marginHorizontal: 0,
        marginBottom: SIZES.h5,
    },
    followCtn: {
        borderWidth: 1,
        height: SIZES.h2 * 1.1,
        width: SIZES.h1 * 2.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.h5,
        borderColor: COLORS.orange,
        alignSelf: 'flex-end',
        marginBottom: SIZES.base * 0.9,
        marginTop: SIZES.base * 0.2,
    },
})