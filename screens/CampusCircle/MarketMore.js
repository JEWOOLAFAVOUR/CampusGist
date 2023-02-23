import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { oldMarketData } from './CampusCircleData';
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'



const MarketMore = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    return (
        <View style={styles.page}>
            <Text style={{ ...FONTS.body1, color: COLORS.orange, fontWeight: 'bold', marginBottom: SIZES.h5, }}>Market</Text>
            <FlatList
                data={oldMarketData}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: SIZES.h4 }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('MarketDetail', { data: item })} style={styles.container}>
                            <View>
                                <Image source={item.marketImage}
                                    style={{ height: SIZES.height * 0.24, width: SIZES.width * 0.47, borderRadius: SIZES.h4, }} />
                                <View style={styles.agentCtn}>
                                    <Text style={{ color: COLORS.white, ...FONTS.body5, fontWeight: 'bold' }}>{item.status}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: SIZES.h5 * 0.9, paddingHorizontal: SIZES.base, flex: 1 }}>
                                <Text style={{ ...FONTS.body2a, color: COLORS.black, fontWeight: 'bold' }}>{item.marketTitle}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Image source={icons.location} style={{ height: SIZES.h4 * 1.1, width: SIZES.h4 * 1.1, tintColor: 'indigo' }} />
                                    <Text numberOfLines={1} style={{ ...FONTS.body4, color: COLORS.chocolate }}>Alexandra City, Alabama</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SIZES.base * 0.8, }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.star} style={{ height: SIZES.h3 * 0.7, width: SIZES.h3 * 0.7, tintColor: COLORS.orange, marginLeft: 3 }} />
                                        <Image source={icons.star} style={{ height: SIZES.h3 * 0.7, width: SIZES.h3 * 0.7, tintColor: COLORS.orange, marginLeft: 3 }} />
                                        <Image source={icons.star} style={{ height: SIZES.h3 * 0.7, width: SIZES.h3 * 0.7, tintColor: COLORS.orange, marginLeft: 3 }} />
                                        <Image source={icons.star} style={{ height: SIZES.h3 * 0.7, width: SIZES.h3 * 0.7, tintColor: COLORS.orange, marginLeft: 3 }} />
                                    </View>
                                    <Text style={{ ...FONTS.h3, color: COLORS.indigo }}>N150,000</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default MarketMore

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.02,
        paddingTop: SIZES.h5,
    },
    container: {
        height: SIZES.height * 0.37,
        width: SIZES.width * 0.47,
        borderRadius: SIZES.h4,
        backgroundColor: COLORS.grey2,
        elevation: 3,
    },
    agentCtn: {
        height: SIZES.h1 * 1.4,
        width: SIZES.h1 * 1.4,
        backgroundColor: COLORS.indigo,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -10,
        left: SIZES.base,
    },
})