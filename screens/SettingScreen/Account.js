import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
// import Header from '../../components/Header'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LikeProduct from './LikeProduct'



const Account = ({ ...props }) => {
    console.log('This is the account props', props.user)
    const data = props.user.user
    const navigation = useNavigation()
    return (
        <View style={styles.page}>
            <View style={{ paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h3 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Setting')} style={{ marginBottom: SIZES.h3 }}>
                    <Image source={icons.setting} style={styles.settingBtn} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.imageRadius}>
                        <Image source={images.profile2} style={{ height: SIZES.h1 * 3, width: SIZES.h1 * 3, borderRadius: 100 }} />
                    </View>
                    <View style={{ marginLeft: SIZES.h3 }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.black }}>{data.fullname}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>@{data.username}</Text>
                    </View>
                    {/* <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate('EditProfile', { data })}>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Edit Profile</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ marginTop: SIZES.h3, }}>
                    {/* <Text style={{ ...FONTS.h2, color: COLORS.black }}>{data.fullname}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>@{data.username}</Text> */}
                    <Text style={{ ...FONTS.body3, color: COLORS.black, fontWeight: 'bold' }}>200 Level</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text numberOfLines={3} style={{ ...FONTS.body4, color: COLORS.blue }}>Eyinjueledumare🤡 Style to apply to the view wrapping each screen. You can pass this to override some default styles such as overflow clipping.</Text>
                        {/* <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.navigate('ChangeBio')}>
                            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Change Bio</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.highlightCtn}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.primary, }}>6</Text>
                            <Text style={{ color: COLORS.chocolate, ...FONTS.body3 }}> Posts</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.primary, }}>191</Text>
                            <Text style={{ color: COLORS.chocolate, ...FONTS.body3 }}>Follower</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.primary }}>150</Text>
                            <Text style={{ color: COLORS.chocolate, ...FONTS.body3 }}>Following</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={icons.star} style={{ height: SIZES.h2 * 0.95, width: SIZES.h2 * 0.95 }} />
                            <Text style={{ color: COLORS.chocolate, ...FONTS.body3 }}>Novice</Text>
                        </View>
                        {/* <View style={{ position: 'absolute', right: 0 }}>
                            <Image source={icons.star} style={{ height: SIZES.h2 * 0.95, width: SIZES.h2 * 0.95 }} />
                        </View> */}
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
        height: SIZES.h1 * 3.0,
        backgroundColor: COLORS.grey2,
        borderRadius: SIZES.h2,
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.h4 * 1.4,
    },
})