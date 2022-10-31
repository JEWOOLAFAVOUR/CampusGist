import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Switch } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const Setting = () => {
    const navigation = useNavigation();
    const settingData1 = [
        {
            id: 1,
            title: 'Dark mode',
            iconName: icons.moon,
        }, {
            id: 2,
            title: 'Notification',
            iconName: icons.notification,
        },
    ];
    const settingData2 = [
        {
            id: 1,
            title: 'News by location',
            iconName: icons.location,
        }, {
            id: 2,
            title: 'Offline reading',
            iconName: icons.clock,
        }, {
            id: 3,
            title: 'Language',
            iconName: icons.notification,
        }, {
            id: 4,
            title: 'Block content and sources',
            iconName: icons.block,
        }, {
            id: 5,
            title: 'Help',
            iconName: icons.question,
        }, {
            id: 6,
            title: 'SIgnout',
            iconName: icons.notification,
        },
    ];
    const RenderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
                <Image source={images.profile4} style={styles.profileImage} />
                <View style={{ marginLeft: SIZES.h5, flex: 1 }}>
                    <Text style={{ fontSize: SIZES.h3, fontWeight: 'bold', color: COLORS.blue }}>Oluwasegun Boluwatife</Text>
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
            <View>
                <Text style={{ ...FONTS.body2a, color: COLORS.blue, marginBottom: SIZES.h3 }}>Summary</Text>
                {
                    settingData2.map((data, index) => {
                        return (
                            <TouchableOpacity activeOpacity={0.6} key={index} style={styles.container}>
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
            <Text style={{ ...FONTS.body2c, alignSelf: 'center', color: COLORS.blue }}>Settings</Text>
            <FlatList
                ListHeaderComponent={RenderHeader}
                ListFooterComponent={RenderFooter}
                ListHeaderComponentStyle={{ marginBottom: SIZES.h1 }}
                data={settingData1}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.6} style={styles.container}>
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
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.06,
        paddingTop: SIZES.h5
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
        marginBottom: SIZES.h2
    },
    iconCtn: {
        height: SIZES.h1 * 1.1,
        width: SIZES.h1 * 1.1,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.blue,
    },
})