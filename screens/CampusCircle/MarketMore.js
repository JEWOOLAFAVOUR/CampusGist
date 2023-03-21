import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { oldMarketData } from './CampusCircleData';
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { getAllMarket, getMarketById } from '../../api/campuscircle';
import Roller from '../../components/Roller';



const MarketMore = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    const [market, setMarket] = useState([])
    const [load, setLoad] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [k, setk] = useState(true)


    console.log('lllllllllllll', market)

    const categoryData = [
        { id: 1, image: images.pic1, title: 'Hostels', },
        { id: 2, image: images.pic2, title: 'Fashion', },
        { id: 3, image: images.pic3, title: 'Electronics', },
        { id: 4, image: images.pic4, title: 'Services', },
        // { id: 5, image: images.restaurant1, title: 'Meat', },
        // { id: 6, image: images.restaurant2, title: 'Noddles', },
    ];

    const getMarket = async () => {
        const response = await getAllMarket()
        console.log('market data', response)
        setMarket(response?.market)
        // if (error) return console.log('market-error', error)
    }

    const fetchMarketById = async (marketId) => {
        try {
            setk(true)
            const response = await getMarketById(marketId)
            console.log('single market data', response)
            setk(false)
            navigation.navigate('MarketDetail', { response })
        } catch (err) {
            console.log('fetch-mark-id erro', err)
        }

    }
    const handleRefresh = () => {
        setRefreshing(true);
        getMarket();
        setRefreshing(false);
    };


    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                getMarket(),
            ])
            setLoad(false)
        }
        fetchData()
    }, [])
    const getImage = (uri) => {
        if (uri) return { uri };

        return images.restaurant2
    }
    const _renderHeader = () => {
        return (
            <View style={{ marginBottom: SIZES.h5 }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={categoryData}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginRight: SIZES.base * 0.8 }}>
                                <Image source={item.image} style={{
                                    height: SIZES.h1 * 2.5, width: SIZES.h1 * 3.5, borderRadius: SIZES.base
                                }} />
                                <Text style={{ ...FONTS.body4, textAlign: 'center', color: COLORS.black }}>{item.title}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
    const _renderEmpty = () => {
        return (
            <View style={{}}>
                <ActivityIndicator color={COLORS.orange} size={40} />
                <Text style={{ ...FONTS.body3a, }}>Loading foods</Text>
            </View>
        )
    }
    return (
        <View style={styles.page}>
            {load ? <Roller visible={true} /> : null}
            {k ? <Roller visible={true} /> : null}
            <Text style={{ ...FONTS.body1, color: COLORS.orange, fontWeight: 'bold', marginBottom: SIZES.h5, }}>CG Market</Text>
            <FlatList
                data={market}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={_renderHeader}
                ListEmptyComponent={_renderEmpty}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: SIZES.h4 }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => fetchMarketById(item._id)} style={styles.container}>
                            <Image source={getImage(item.pictures?.url)} style={styles.marketImg} />
                            <View style={{ marginLeft: SIZES.h5 }}>
                                <Text numberOfLines={1} style={{ ...FONTS.body2, color: COLORS.black, fontWeight: 'bold' }}>N{item.price}</Text>
                                <Text numberOfLines={1} style={{ ...FONTS.body3b, color: COLORS.black }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                refreshControl={
                    <RefreshControl
                        colors={['#9Bd35A', '#689F38']}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
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
        height: SIZES.height * 0.3,
        width: SIZES.width * 0.47,
        // borderRadius: SIZES.h4,
        backgroundColor: COLORS.grey2,
        elevation: 3,
    },
    marketImg: {
        height: SIZES.height * 0.23,
        width: SIZES.width * 0.47,
    },
})



{/* <View>
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
                            </View> */}