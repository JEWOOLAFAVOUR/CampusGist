import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { circleData, hotFoodData, oldMarketData } from './CampusCircleData'
import { useNavigation } from '@react-navigation/native'
import { getFood, getMarket, getBanner } from '../../api/post'
import { SliderBox } from 'react-native-image-slider-box';
import Slide from './Slide'
import { getAllMarket, getAllRestaurant, getMarketById, getRestaurantById } from '../../api/campuscircle'
import Roller from '../../components/Roller'

let pageNo = 0;
const limit = 10;


const CampusCircle = () => {
    const navigation = useNavigation()

    const [banner, setBanner] = useState([])
    const [market, setMarket] = useState([])
    console.log('mmmmmmaaaaaaaaaaaaa', market)
    const [restaurant, setRestaurant] = useState([])
    const [showSpinner, setShowSpinner] = useState(false);
    const [load, setLoad] = useState(true)
    const [k, setk] = useState(true)
    const [refreshing, setRefreshing] = useState(false);


    const fetchRestaurant = async () => {
        const { error, restaurants } = await getAllRestaurant()
        if (error) return console.log('restaurant-error', error)

        console.log('restaurants-data', restaurants)
        setRestaurant(restaurants)

    }


    // const fetchMarket = async () => {
    //     const { error, markets } = await getMarket(limit, pageNo);
    //     console.log('this is the market data', markets)
    //     if (error) return console.log('sta-err', error)

    //     setMarket(markets)
    // }

    const getMarket = async () => {
        const response = await getAllMarket()
        console.log('market data', response)
        setMarket(response?.market)
        // if (error) return console.log('market-error', error)
    }

    const fetchBanner = async () => {
        const { error, banners } = await getBanner(limit, pageNo);
        console.log('this is the banner data', banners)
        if (error) return console.log('sta-err', error)

        setBanner(banners)
    }

    const handleRefresh = () => {
        setRefreshing(true);
        fetchBanner();
        fetchRestaurant();
        getMarket();
        setRefreshing(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                // fetchMarket(),
                fetchBanner(),
                fetchRestaurant(),
                getMarket(),
            ])
            setLoad(false)
        }
        fetchData()
    }, [])

    // const fetchRestaurantById = async (postId) => {
    //     const { error, restaurant } = await getRestaurantById(postId)
    //     console.log('single-restaurant', restaurant)
    //     navigation.navigate('RestaurantDetail', { restaurant })
    //     if (error) return console.log('single-restaurant error', error)
    // }

    const fetchRestaurantById = async (postId) => {
        try {
            setLoad(true); // Set the loader to be visible
            const { error, restaurant } = await getRestaurantById(postId);
            console.log('single-restaurant', restaurant);
            navigation.navigate('RestaurantDetail', { restaurant });
            if (error) {
                console.log('single-restaurant error', error);
            }
            setLoad(false)
        } catch (error) {
            console.error('Error fetching restaurant: ', error);
        } finally {
            setLoad(false); // Set the loader to be hidden
        }
    };

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

    const _renderEmpty = () => {
        return (
            <View style={{}}>
                <ActivityIndicator color={COLORS.orange} size={40} />
                <Text style={{ ...FONTS.body3a, }}>Loading foods</Text>
            </View>
        )
    }

    const getImage = (uri) => {
        if (uri) return { uri };

        return images.restaurant2
    }

    const CampusHeader = () => {
        const getImage = (uri) => {
            if (uri) return { uri };

            return images.restaurant2
        }
        return (
            <View>
                <View style={{ paddingHorizontal: SIZES.width * 0.03, paddingTop: SIZES.base * 0.9 }}>
                    {/* BANNER  */}
                    <Image source={images.image6} style={{ height: SIZES.width / 2.3, width: SIZES.width }} />
                    {/* BANNER CLOSE  */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SIZES.base }}>
                        <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.primary, }}>Hot Food</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('HotMore')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.body3a, color: COLORS.orange }}>see more foods</Text>
                            <Image source={icons.arrowright} style={{ height: SIZES.h5, width: SIZES.h5 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* FOOD CODE  */}
                <View style={{ marginLeft: SIZES.h5 * 1.2 }}>
                    <FlatList
                        // data={hotFoodData}
                        data={restaurant}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        ListEmptyComponent={_renderEmpty}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => fetchRestaurantById(item.id)} key={item.id} style={styles.hotCtn}>
                                    <Image source={getImage(item.thumbnail)}
                                        style={{
                                            height: SIZES.h1 * 3.5, width: SIZES.h1 * 4.9, borderTopRightRadius: SIZES.base,
                                            borderTopLeftRadius: SIZES.base, alignSelf: 'center'
                                        }} />
                                    <View style={{ paddingHorizontal: SIZES.base }}>
                                        <Text numberOfLines={1} style={{ ...FONTS.body4, marginTop: SIZES.base * 0.8, color: COLORS.black, fontWeight: 'bold' }}>{item.name}</Text>
                                        <Text style={{ ...FONTS.body5, color: COLORS.grey }}>Highly recommended</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={icons.star} style={{ height: SIZES.h5, width: SIZES.h5, tintColor: COLORS.orange }} />
                                                <Image source={icons.star} style={{ height: SIZES.h5, width: SIZES.h5, tintColor: COLORS.orange }} />
                                                <Image source={icons.star} style={{ height: SIZES.h5, width: SIZES.h5, tintColor: COLORS.orange }} />
                                                <Image source={icons.star} style={{ height: SIZES.h5, width: SIZES.h5, tintColor: COLORS.orange }} />
                                            </View>
                                            <Text style={{ color: COLORS.black, ...FONTS.body4, marginLeft: SIZES.base }}>32 Reviews</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.width * 0.03, marginTop: SIZES.h5, marginBottom: SIZES.base / 1.5 }}>
                    <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.primary, }}>Old Market</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('MarketMore')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body3a, color: COLORS.orange }}>visit market</Text>
                        <Image source={icons.arrowright} style={{ height: SIZES.h5, width: SIZES.h5 }} />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    const _renderFooter = () => {
        return (
            <View style={{ paddingHorizontal: SIZES.width * 0.02, }}>
                <FlatList
                    // data={oldMarketData.slice(1, 11)}
                    data={market.slice(0, 10)}
                    numColumns={2}
                    // ListEmptyComponent={_renderEmpty}
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
                />
                <TouchableOpacity onPress={() => navigation.navigate('MarketMore')} style={styles.seeMoreCtn}>
                    <Text style={{ ...FONTS.body3, color: COLORS.white }}>See More</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1, }}>
            {load ? <Roller visible={true} /> : null}
            {k ? <Roller visible={true} /> : null}
            <Text style={{ ...FONTS.body2c, fontWeight: 'bold', color: COLORS.orange, marginLeft: SIZES.width * 0.03, marginBottom: SIZES.base * 0.8, marginTop: SIZES.base }}>Campus Circle</Text>
            <FlatList
                ListHeaderComponent={CampusHeader}
                ListFooterComponent={_renderFooter}
                // ListFooterComponentStyle={{ marginTop: 200 }}
                // data={oldMarketData}
                // ListEmptyComponent={_renderEmpty}
                refreshControl={
                    <RefreshControl
                        colors={[COLORS.primary, COLORS.blue]}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            // data={market}

            />
            <View style={{ marginBottom: SIZES.h1 * 2.2 }} />
        </View>
    )
}

export default CampusCircle

const styles = StyleSheet.create({
    circleCtn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: SIZES.h1 * 1.3,
        width: SIZES.width * 0.295,
        borderWidth: 1.5,
        borderColor: COLORS.chocolateBackground,
        marginTop: SIZES.h4,
        borderRadius: SIZES.base * 0.5,
        paddingHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.chocolateBa
    },
    hotCtn: {
        height: SIZES.h1 * 6.3,
        width: SIZES.h1 * 5,
        borderWidth: 1.5,
        marginTop: SIZES.h5,
        marginRight: SIZES.h5 * 1.2,
        borderColor: COLORS.chocolateBackground,
        borderRadius: SIZES.base,
    },
    mainCtn: {
        height: SIZES.h1 * 4.7,
        paddingHorizontal: SIZES.h4,
        marginHorizontal: SIZES.width * 0.055,
        borderRadius: SIZES.h4,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: COLORS.grey2,
        marginTop: SIZES.h5,
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
    seeMoreCtn: {
        height: SIZES.h1 * 1.4,
        width: SIZES.h1 * 5,
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.h3,
        alignSelf: 'center',
        marginTop: SIZES.h5,
        marginBottom: SIZES.h2,
    },
})



// {
//     return (
//         <TouchableOpacity onPress={() => navigation.navigate('MarketDetail', { data: item })} style={styles.mainCtn}>
//             <Image source={images.image5}
//                 style={{ marginTop: SIZES.h5 * 0.9, height: SIZES.h1 * 4.0, width: SIZES.h1 * 4.0, borderRadius: SIZES.h4, /* borderTopLeftRadius: SIZES.base, borderBottomLeftRadius: SIZES.base */ }} />
//             <View style={{ flex: 1, marginLeft: SIZES.h4, marginTop: SIZES.h5 }}>
//                 <Text numberOfLines={1} style={{ fontSize: SIZES.body1 * 0.6, fontWeight: '700', fontFamily: 'Roboto-Regular', color: COLORS.black }}>{item.marketTitle}</Text>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base * 0.3 }}>
//                     <Image source={icons.location} style={{ height: SIZES.h4, width: SIZES.h4, marginRight: SIZES.base * 0.5 }} />
//                     <Text numberOfLines={1} style={{ ...FONTS.body4, color: COLORS.black }}>Alexandra Cty, Alabama</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: SIZES.h5 }}>
//                         <Image source={icons.star} style={{ height: SIZES.h5 * 1, width: SIZES.h5 * 1, tintColor: COLORS.orange, marginLeft: 3 }} />
//                         <Image source={icons.star} style={{ height: SIZES.h5 * 1, width: SIZES.h5 * 1, tintColor: COLORS.orange, marginLeft: 3 }} />
//                         <Image source={icons.star} style={{ height: SIZES.h5 * 1, width: SIZES.h5 * 1, tintColor: COLORS.orange, marginLeft: 3 }} />
//                         <Image source={icons.star} style={{ height: SIZES.h5 * 1, width: SIZES.h5 * 1, tintColor: COLORS.orange, marginLeft: 3 }} />
//                     </View>
//                     <Text style={{ ...FONTS.body5, color: COLORS.black, marginLeft: SIZES.base }}>High Recommended</Text>
//                 </View>
//                 <Text style={{ ...FONTS.h2, color: COLORS.indigo }}>{item.price}</Text>
//             </View>
//         </TouchableOpacity>
//     )
// }