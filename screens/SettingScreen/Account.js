import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
// import Header from '../../components/Header'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LikeProduct from './LikeProduct'
import ImagePicker from 'react-native-image-crop-picker';
import { updateUserProfilePic } from '../../api/auth';

const Account = ({ ...props }) => {
    console.log('This is the account props', props)
    const data = props?.user
    console.log('data from pros', data)
    const navigation = useNavigation()



    // const handleChoosePhoto = async (userId) => {
    //     console.log('post idddd', userId)
    //     const data = await updateUserProfilePic(userId)
    //     console.log('ddhdddh', data)
    //     // ImagePicker.openPicker({
    //     //     width: 300,
    //     //     height: 300,
    //     //     cropping: true
    //     // }).then(image => {
    //     //     const formData = new FormData();
    //     //     formData.append('profilePicture', {
    //     //         uri: image.path,
    //     //         type: image.mime,
    //     //         name: 'profilePicture.jpg'
    //     //     });



    //     // });

    // };
    // const handleChoosePhoto = async (userId) => {
    //     try {
    //         const image = await ImagePicker.openPicker({
    //             width: 300,
    //             height: 300,
    //             cropping: true,
    //             mediaType: 'photo'
    //         });

    //         const formData = new FormData();
    //         formData.append('file', {
    //             uri: image.path,
    //             type: image.mime,
    //             name: 'avatar.jpg'
    //         });

    //         const response = await updateUserProfilePic(userId, formData);
    //         console.log('responseeeeeeeeeeee', response); // handle the response from the server
    //     } catch (error) {
    //         console.log('errrrrrrrrrr', error);
    //     }
    // };
    const handleChoosePhoto = async (userId) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(async (image) => {
            console.log(image);
            const formData = new FormData();
            formData.append("file", {
                uri: image.path,
                type: image.mime,
                name: `photo_${Date.now()}`
            });
            const response = await updateUserProfilePic(userId, formData);
            console.log('response:', response); // handle the response from the server
        });
    }

    const getImage = (uri) => {
        if (uri) return { uri };

        return images.image2
    }

    return (
        <View style={styles.page}>
            <View style={{ paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h4 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Setting')} style={{ marginBottom: SIZES.h5 }}>
                    <Image source={icons.setting} style={styles.settingBtn} />

                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.imageRadius}>
                        <Image source={getImage(data?.avatar?.url)} style={{ height: SIZES.h1 * 3, width: SIZES.h1 * 3, borderRadius: 100 }} />
                    </View>
                    <View style={{ marginLeft: SIZES.h3 }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.black }}>{`${data?.firstName} ${data?.lastName} `}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.chocolate, textTransform: 'lowercase' }}>@{data?.username}</Text>
                    </View>
                    {/* FOR EDIT PROFILE ICON  */}
                    {/* <TouchableOpacity onPress={() => handleChoosePhoto(data.id)} style={styles.editProfileBtn}>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Edit Profile</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ marginTop: SIZES.h3, }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>200 Level - {data?.gender}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* <Text numberOfLines={2} style={{ ...FONTS.body4, color: COLORS.blue }}>Eyinjueledumare🤡 Style to apply to the view wrapping each screen. You can pass this to override some default styles such as overflow clipping.</Text> */}
                        <Text numberOfLines={2} style={{ ...FONTS.body4, color: COLORS.black }}>bio - {data?.bio}</Text>
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
                            <Text style={{ ...FONTS.h3, color: COLORS.primary, }}>{data?.followers}</Text>
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Follower</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.primary }}>{data?.following}</Text>
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Following</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={icons.star} style={{ height: SIZES.h2 * 0.7, width: SIZES.h2 * 0.7 }} />
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>{data?.rank}</Text>
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

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
    }
}

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(Account)

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