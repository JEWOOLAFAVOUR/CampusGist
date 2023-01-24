import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'



const ProfilePage = () => {
    // console.log('This is the account props', props.user)
    // const data = props.user.user
    const navigation = useNavigation()
    return (
        <View style={styles.page}>
            <View>
                <View style={styles.headerCtn}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10, paddingVertical: 4 }}>
                        <Image source={icons.arrowleft} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 10, paddingVertical: 4 }}>
                        <Image source={icons.verticalmenu} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1.5, elevation: 1, backgroundColor: '#cdcdcd' }} />
            </View>
            <View style={{ paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h3 }}>
                {/* <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{ marginBottom: SIZES.h3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image source={icons.arrowleft} style={styles.settingBtn} />
                    <Image source={icons.verticalmenu} style={styles.settingBtn} />
                </TouchableOpacity> */}

                <View style={styles.container}>
                    <View style={styles.imageRadius}>
                        <Image source={images.profile2} style={{ height: SIZES.h1 * 3, width: SIZES.h1 * 3, borderRadius: 100 }} />
                    </View>
                    {/* <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate('EditProfile', { data })}>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>Edit Profile</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ marginTop: SIZES.h3 }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.black }}>Jewoola Favour </Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>@admin</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.body4, color: COLORS.black }}>Mobile App Dev🤡</Text>
                        {/* <TouchableOpacity style={styles.changeBtn} onPress={() => navigation.navigate('ChangeBio')}>
                            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Change Bio</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.h3 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.black, }}>191</Text>
                            <Text style={{ color: COLORS.black, ...FONTS.body3 }}> Follower</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginLeft: SIZES.h1, }}>
                            <Text style={{ ...FONTS.h3, color: COLORS.black }}>191</Text>
                            <Text style={{ color: COLORS.black, ...FONTS.body3 }}> Follower</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 0 }}>
                            <Image source={icons.star} style={{ height: SIZES.h2 * 0.95, width: SIZES.h2 * 0.95 }} />
                        </View>
                    </View>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZES.h4,
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
    },
    headerCtn: {
        paddingHorizontal: SIZES.width * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SIZES.base,
        justifyContent: 'space-between'
    },
})