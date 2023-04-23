import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
// import Header from '../../components/Header'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LikeProduct from '../SettingScreen/LikeProduct';

const ProfilePage = ({ route }) => {
    // console.log('route comign', route)
    // console.log('This is the account props', props)
    const data = route.params?.data;
    console.log('data from route', data)
    const avatar = data?.avatar?.url
    const navigation = useNavigation()

    const getImage = (uri) => {
        if (uri) return { uri };

        return images.avatar;
    }

    return (
        <View style={styles.page}>
            <View style={{ paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h4 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: SIZES.h2, height: SIZES.h1 * 1.2, width: SIZES.h1 * 1.2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1 }} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.imageRadius}>
                        <Image source={getImage(avatar)} style={{ height: SIZES.h1 * 3, width: SIZES.h1 * 3, borderRadius: 100 }} />
                    </View>
                    <View style={{ marginLeft: SIZES.h3 }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.black }}>{`${data.firstName} ${data.lastName} `}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.chocolate, textTransform: 'lowercase' }}>@{data?.username}</Text>
                    </View>
                </View>
                <View style={{ marginTop: SIZES.h3, }}>
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
                            <Text style={{ ...FONTS.h3, color: COLORS.primary, }}>{data.followers}</Text>
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Follower</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.primary }}>{data.following}</Text>
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Following</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={icons.star} style={{ height: SIZES.h2 * 0.7, width: SIZES.h2 * 0.7 }} />
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>{data.rank}kk</Text>
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
        height: SIZES.h1 * 3.15,
        width: SIZES.h1 * 3.15,
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
        marginTop: SIZES.h4,
        height: SIZES.h1 * 2.5,
        backgroundColor: COLORS.grey2,
        borderRadius: SIZES.h2,
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.h4 * 1.4,
    },
})