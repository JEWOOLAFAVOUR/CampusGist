import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { oldMarketData } from './CampusCircleData';

const Market = () => {
    const categoryData = [
        { id: 1, title: 'Foods', },
        { id: 2, title: 'Health', },
        { id: 3, title: 'Health', },
        { id: 4, title: 'Health', },
    ];
    const RenderTemplate = ({ item }) => {
        return (
            <TouchableOpacity style={styles.container}>
                <Image source={item.marketImage} style={styles.marketImg} />
                <View style={{ marginLeft: SIZES.h5 }}>
                    <Text numberOfLines={1} style={{ ...FONTS.body2, color: COLORS.black, fontWeight: 'bold' }}>₦{item.price}</Text>
                    <Text numberOfLines={1} style={{ ...FONTS.body3b, color: COLORS.black }}>{item.marketTitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const _renderHeader = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: SIZES.width * 0.04, marginVertical: SIZES.base * 0.5 }}>
                    <Text style={{ ...FONTS.body2, color: COLORS.black, fontWeight: 'bold' }}>Categories</Text>
                    <TouchableOpacity>
                        <Text style={{ ...FONTS.body3, color: COLORS.orange }}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={categoryData}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.categoryCtn}>
                                <Text style={{ ...FONTS.body3, color: COLORS.white, }}>{item.title}</Text>
                            </View>
                        )
                    }}
                />
                <View style={{ marginHorizontal: SIZES.width * 0.04, paddingTop: SIZES.h5 * 0.7, }}>
                    <Text style={{ ...FONTS.body2c, color: COLORS.orange, fontWeight: 'bold', marginBottom: SIZES.base / 2 }}>Today's markets</Text>
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        data={oldMarketData.length > 0 ? oldMarketData.slice(0, 10) : []}
                        renderItem={({ item }) => <RenderTemplate item={item} />}
                    />
                </View>
            </View>
        )
    }
    const _renderFooter = () => {
        return (
            <View style={{ marginHorizontal: SIZES.width * 0.04, paddingTop: SIZES.h5 * 0.7, }}>

                <Text style={{ ...FONTS.body2c, color: COLORS.orange, fontWeight: 'bold', marginBottom: SIZES.base / 2 }}>Odler markets</Text>
                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={oldMarketData.length > 0 ? oldMarketData.slice(0, 10) : []}
                    renderItem={({ item }) => <RenderTemplate item={item} />}
                />
            </View>
        )
    }
    return (
        <View style={styles.page}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.width * 0.03, justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h1, color: COLORS.black }}>Marketplace</Text>
                <TouchableOpacity>
                    <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.black }} />
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={_renderHeader}
                ListFooterComponent={_renderFooter}
                renderItem={({ item }) => { }}
            />
        </View>
    )
}

export default Market

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.base,
    },
    categoryCtn: {
        height: SIZES.h1 * 3.1,
        width: SIZES.h1 * 3.1,
        backgroundColor: COLORS.chocolate,
        borderRadius: SIZES.base,
        marginLeft: SIZES.h5,
        // marginLeft: SIZES.width * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: SIZES.height * 0.3,
        width: SIZES.width * 0.45,
        // borderRadius: SIZES.h4,
        backgroundColor: COLORS.grey2,
        elevation: 3,
        marginBottom: SIZES.h5
    },
    marketImg: {
        height: SIZES.height * 0.23,
        width: SIZES.width * 0.45,
    },
})