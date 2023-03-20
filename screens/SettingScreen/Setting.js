import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Switch, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/actions/authAction'
import { clearNews } from '../../redux/actions/newsAction'

const Setting = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    const settingData = [
        {
            id: 1,
            title: 'Edit Profile',
            iconName: icons.bell,
            onPress: () => navigation.navigate('EditProfile'),
        }, {
            id: 2,
            title: 'Edit Bio',
            iconName: icons.bell,
            onPress: () => navigation.navigate('ChangeBio'),

        }, {
            id: 3,
            title: 'Notification',
            iconName: icons.bell,
            onPress: () => navigation.navigate('SNotification'),
            // onPress: Notification,
        }, {
            id: 4,
            title: 'FAQ',
            iconName: icons.bell,
            // onPress: Notification,
        }, {
            id: 5,
            title: 'Dark Mode',
            iconName: icons.bell,
            // onPress: Notification,
        }, {
            id: 6,
            title: 'Logout',
            iconName: icons.bell,
            onPress: () => {
                dispatch(logoutUser())
                dispatch(clearNews());

                navigation.replace('WelcomeScreen')
            },
        },
    ];
    const _renderHeader = () => {
        return (
            <View style={styles.container}>
                <View style={styles.imageRadius}>
                    <Image source={images.profile2} style={{ height: SIZES.h1 * 3, width: SIZES.h1 * 3, borderRadius: 100 }} />
                </View>
                <View style={{ marginLeft: SIZES.h3 }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.black }}>Jewoola Favour Gbemi</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>@favour28</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.page}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: SIZES.h2 * 1.5 }}>
                <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1, }} />
            </TouchableOpacity>
            <_renderHeader />
            <FlatList
                // ListHeaderComponent={_renderHeader}
                data={settingData}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={item.onPress} style={styles.boxCtn}>
                            <Image source={item.iconName} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8, }} />
                            <Text style={{ ...FONTS.body3, color: COLORS.black, marginTop: SIZES.base * 0.8 }}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.h4,
        paddingHorizontal: SIZES.width * 0.07,
    },
    boxCtn: {
        height: SIZES.h1 * 4.3,
        width: SIZES.width * 0.415,
        // borderWidth: 1,
        marginBottom: SIZES.h5,
        borderRadius: SIZES.h3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.grey2,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.h2,
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
})