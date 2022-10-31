import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'

const Search = () => {
    const trendData = [
        {
            id: 1,
            trendHashtag: '#dropbox',
            numOfTrend: '3,059',
        }, {
            id: 2,
            trendHashtag: 'Tems',
            numOfTrend: '1,908',
        }, {
            id: 3,
            trendHashtag: 'Abuja',
            numOfTrend: '700',
        }, {
            id: 4,
            trendHashtag: '#PayCMPayPM',
            numOfTrend: '240',
        }, {
            id: 5,
            trendHashtag: 'Rust',
            numOfTrend: '78',
        },
    ];
    const RenderHeader = () => {
        return (
            <View style={styles.searchCtn}>
                <Image source={images.profile4} style={{ height: SIZES.h1 * 1.2, width: SIZES.h1 * 1.2, borderRadius: 100 }} />
                <View style={styles.searchInputCtn}>
                    <TextInput placeholder='Search CampusGist' placeholderTextColor={COLORS.black} style={{ ...FONTS.body3a, color: COLORS.black }} />
                </View>
                <Image source={icons.setting} style={{ height: SIZES.h2 * 1.2, width: SIZES.h2 * 1.2 }} />
            </View>
        )
    }
    const GoingOn = () => {
        return (
            <View style={{ marginTop: SIZES.h5 }}>
                <Image source={images.image2} style={{ height: SIZES.width / 2, width: SIZES.width }} />
                <View style={{ marginTop: SIZES.h4, marginBottom: SIZES.h3, paddingHorizontal: SIZES.width * 0.03 }}>
                    <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.black }}>Trends for you</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <RenderHeader />
            <View style={{}}>
                <FlatList
                    ListHeaderComponent={GoingOn}
                    data={trendData}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.container}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ flex: 1, color: COLORS.brown, ...FONTS.body3 }}>Trending</Text>
                                    <TouchableOpacity style={{ padding: 5 }}>
                                        <Image source={icons.verticalmenu} style={{ height: SIZES.h3, width: SIZES.h3 }} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ ...FONTS.h3 }}>{item.trendHashtag}</Text>
                                <Text style={{ ...FONTS.body4 }}>{item.numOfTrend} Fleets</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    searchCtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.h3,
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.width * 0.04,
    },
    searchInputCtn: {
        height: SIZES.h1 * 1.5,
        width: SIZES.width * 0.68,
        borderWidth: 1,
        borderRadius: SIZES.h5,
        paddingHorizontal: SIZES.base * 0.8,
        borderColor: '#cdcdcd',
    },
    container: {
        paddingHorizontal: SIZES.width * 0.03,
        marginBottom: SIZES.h3,
    },
})