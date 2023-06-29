import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
// import Header from '../../components/Header'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LikeProduct from '../SettingScreen/LikeProduct';
import { followUser, unFollowUser } from '../../api/newfeatures/feature1';
import Toast from 'react-native-toast-message';

const ProfilePage = ({ route }) => {
    // console.log('route comign', route)
    // console.log('This is the account props', props)
    const data = route.params?.data;
    const [isFollow, setIsFollow] = useState(data?.isFollowing);
    const userId = data?._id;
    console.log('data from route', data)
    const avatar = data?.avatar?.url
    const navigation = useNavigation()
    const [totalFollowers, setTotalFollowers] = useState(data?.totalFollowers)


    const getImage = (uri) => {
        if (uri) return { uri };

        return images.avatar;
    }

    const handleToggleFollow = async (userId) => {
        // Check if the post is currently liked or not
        if (isFollow) {
            // Perform the unlike operation
            const data = await unFollowUser(userId);
            setIsFollow(false)
            Toast.show({
                type: 'success',
                text1: 'Successfully Unfollow',
                visibilityTime: 1000,
            });
            // setLiked(false);
            setTotalFollowers(totalFollowers - 1);
            console.log('response from toggle', data);
        } else {
            // Perform the like operation
            const data = await followUser(userId);
            setTotalFollowers(totalFollowers + 1);
            setIsFollow(!isFollow)
            Toast.show({
                type: 'success',
                text1: 'Successfully Follow',
                visibilityTime: 1000,
            });
            // setLiked(true);
            // setLikeCount(likeCount + 1);
            console.log('response from toggle', data);
        }
    };

    // const handleFollow = async (userId) => {
    //     const { status, error } = await followUser(userId);
    //     // const { status, error } = await unFollowUser(userId);
    //     if (error) return console.log('error while following', error)

    //     console.log('kkkk', status)
    // }

    return (
        <View style={styles.page}>
            <View style={{ paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.base, }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: SIZES.base * 0.1, height: SIZES.h1 * 1.2, width: SIZES.h1 * 1.2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1 }} />
                </TouchableOpacity>
                {/* NAME START */}
                <View style={styles.container}>
                    <View style={styles.imageRadius}>
                        <Image source={getImage(avatar)} style={{ height: SIZES.h1 * 2.55, width: SIZES.h1 * 2.55, borderRadius: 100 }} />
                    </View>
                    <View style={{ marginLeft: SIZES.h4, flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.black, textTransform: 'capitalize' }}>{`${data.firstName}`}</Text>
                            <Text style={{ ...FONTS.h2, color: COLORS.black, textTransform: 'capitalize' }}>{` ${data.lastName}`}</Text>
                        </View>
                        <Text style={{ ...FONTS.body4, color: COLORS.chocolate, textTransform: 'lowercase' }}>@{data?.username}</Text>
                    </View>
                    {/* FOLLOW CTN */}
                    <TouchableOpacity onPress={() => handleToggleFollow(userId)} style={styles.followCtn}>
                        <Text style={{ ...FONTS.body3a, color: COLORS.white, }}>{isFollow ? "Following" : "Follow"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: SIZES.base, }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>{data?.level} - {data?.gender}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* <Text numberOfLines={2} style={{ ...FONTS.body4, color: COLORS.blue }}>Eyinjueledumare🤡 Style to apply to the view wrapping each screen. You can pass this to override some default styles such as overflow clipping.</Text> */}
                        <Text numberOfLines={2} style={{ ...FONTS.body4, color: COLORS.blue }}>bio - {data.bio}</Text>
                        {/* <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.navigate('ChangeBio')}>
                            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Change Bio</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.highlightCtn}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.primary, }}>0</Text>
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}> Posts</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.primary, }}>{totalFollowers}</Text>
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Follower</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.primary }}>{data?.totalFollowing}</Text>
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Following</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={icons.star} style={{ height: SIZES.h2 * 0.7, width: SIZES.h2 * 0.7 }} />
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>{data.rank}</Text>
                        </View>
                    </View>
                </View>
                {/* NEW IMPLEMENTATION  */}

            </View>
            <View>
                <LikeProduct />
            </View>
        </View >
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    editProfileBtn: {
        height: SIZES.h1 * 1,
        width: SIZES.h1 * 3,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    imageRadius: {
        height: SIZES.h1 * 2.7,
        width: SIZES.h1 * 2.7,
        borderRadius: 100,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.primary
    },
    changeBtn: {
        height: SIZES.h1 * 0.9,
        width: SIZES.h1 * 3,
        // backgroundColor: 'red',
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: SIZES.base * 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingBtn: {
        height: SIZES.h2 * 1,
        width: SIZES.h2 * 1,
        alignSelf: 'flex-end'
    },
    highlightCtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.h5,
        height: SIZES.h1 * 2.2,
        backgroundColor: COLORS.grey2,
        borderRadius: SIZES.h2,
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.h4 * 1.4,
    },
    followCtn: {
        height: SIZES.h1 * 1.1,
        width: SIZES.h1 * 2.6,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
    },
})