import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Switch, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import Saved from './Saved'
import ContactUs from './ContactUs'
import AboutUs from './AboutUs'
// import Notification from './Notification'

const Setting = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    const settingData1 = [
        {
            id: 1,
            title: 'Dark mode',
            iconName: icons.moon,
        },
    ];
    const settingData2 = [
       /* {
            id: 1,
            title: 'Notification',
            iconName: icons.bell,
            // onPress: Notification,
        }, {
            id: 2,
            title: 'Saved',
            iconName: icons.bookmark,
            onPress: Saved,
        }, {
            id: 3,
            title: 'Setting',
            iconName: icons.setting,
        }, */{
            id: 4,
            title: 'Contact Us',
            iconName: icons.contact,
            onPress: ContactUs,
        }, {
            id: 5,
            title: 'About Us',
            iconName: icons.about,
            onPress: AboutUs,
        }, {
            id: 6,
            title: 'Signout',
            iconName: icons.logout,
        },
    ];
    const RenderHeader = () => {
        return (
            <View style={styles.headerCtn}>
                <Image source={images.profile4} style={styles.profileImage} />
                <View style={{ marginLeft: SIZES.h5, flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontSize: SIZES.h3, fontWeight: 'bold', color: COLORS.blue }}>Oluwasegun Boluwatife</Text>
                    <Text style={{ fontSize: SIZES.h4 * 1.2, color: COLORS.blue }}>oluwasegun123</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.editCtn}>
                    <Text style={{ ...FONTS.body3, color: COLORS.white }}>Edit</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const RenderFooter = () => {
        return (
            <View style={{ paddingHorizontal: SIZES.width * 0.055, }}>
                <Text style={{ ...FONTS.body2a, color: COLORS.blue, marginBottom: SIZES.h3 }}>Summary</Text>
                {
                    settingData2.map((data, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate(data.onPress)} activeOpacity={0.3} key={index} style={[styles.container, { marginHorizontal: 0 }]}>
                                <View style={styles.iconCtn}>
                                    <Image source={data.iconName} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                                </View>
                                <Text style={{ flex: 1, marginLeft: SIZES.h1, ...FONTS.h3, color: COLORS.blue }}>{data.title}</Text>
                                <Image source={icons.arrowright} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    return (
        <View style={styles.page}>
            <Text style={{ ...FONTS.body2c, fontWeight: 'bold', alignSelf: 'center', color: COLORS.blue }}>Settings</Text>
            <View style={{ height: 2, backgroundColor: COLORS.chocolateBackground, marginTop: SIZES.base, marginBottom: SIZES.h4 }} />
            {/* <View style={{ paddingHorizontal: SIZES.width * 0.055 }}> */}
            <View style={{ marginTop: SIZES.h1 }} />
            <FlatList
                // ListHeaderComponent={RenderHeader}
                ListFooterComponent={RenderFooter}
                ListHeaderComponentStyle={{ marginBottom: SIZES.h1 }}
                data={settingData1}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.2} style={styles.container}>
                            <View style={styles.iconCtn}>
                                <Image source={item.iconName} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                            </View>
                            <Text style={{ flex: 1, marginLeft: SIZES.h1, ...FONTS.h3, color: COLORS.blue }}>{item.title}</Text>
                            <Switch />
                            {/* <Image source={icons.arrowright} style={{ height: SIZES.h2, width: SIZES.h2 }} /> */}
                        </TouchableOpacity>
                    )
                }}
            />
            {/* </View> */}
            <View style={{ marginBottom: SIZES.h1 * 2 }} />
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.h5
    },
    headerCtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SIZES.width * 0.055,
        marginTop: SIZES.base,
        height: SIZES.h1 * 3,
        borderWidth: 0.5,
        borderColor: COLORS.blue,
        paddingHorizontal: SIZES.width * 0.03,
        borderRadius: SIZES.base,
    },
    editCtn: {
        height: SIZES.h1,
        width: SIZES.h1 * 2.1,
        backgroundColor: COLORS.blue,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        height: SIZES.h1 * 2.1,
        width: SIZES.h1 * 2.1,
        borderRadius: 100,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SIZES.width * 0.055,
        marginBottom: SIZES.h5,
        height: SIZES.h1 * 1.8,
        borderWidth: 0.5,
        borderColor: COLORS.blue,
        paddingHorizontal: SIZES.width * 0.03,
        borderRadius: SIZES.base,
    },
    iconCtn: {
        height: SIZES.h1 * 1.2,
        width: SIZES.h1 * 1.1,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.chocolate,
    },
})