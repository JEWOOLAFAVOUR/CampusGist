import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { circleData, hotFoodData, oldMarketData } from './CampusCircleData'
import { useNavigation } from '@react-navigation/native'
import { getFood, getMarket, getBanner } from '../../api/post'

let pageNo = 0;
const limit = 10;


const CampusCircle = () => {
    const navigation = useNavigation()

    const [banner, setBanner] = useState([])
    const [food, setFood] = useState([])
    const [market, setMarket] = useState([])

    const fetchFood = async () => {
        const { error, foods } = await getFood(limit, pageNo);
        console.log('this is the food data', foods)
        if (error) return console.log('sta-err', error)

        setFood(foods)
    }

    const fetchMarket = async () => {
        const { error, markets } = await getMarket(limit, pageNo);
        console.log('this is the market data', markets)
        if (error) return console.log('sta-err', error)

        setMarket(markets)
    }

    const fetchBanner = async () => {
        const { error, banners } = await getBanner(limit, pageNo);
        console.log('this is the banner data', banners)
        if (error) return console.log('sta-err', error)

        setBanner(banners)
    }

    useEffect(() => {
        fetchFood();
        fetchMarket();
        fetchBanner();
    }, [])

    const CampusHeader = () => {
        return (
            <View>
                <View style={{ paddingHorizontal: SIZES.width * 0.03, paddingTop: SIZES.base * 0.9 }}>
                    <Text style={{ ...FONTS.body2c, fontWeight: 'bold', color: COLORS.orange, marginBottom: SIZES.h2 }}>Campus Circle</Text>
                    <Image source={images.image2} style={{ height: SIZES.width / 2.1, width: SIZES.width }} />
                    <View style={{ marginTop: SIZES.base, marginBottom: SIZES.h5 }}>
                        <FlatList
                            numColumns={3}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            data={circleData}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('CircleListDetails', { item })} key={item.id} style={styles.circleCtn}>
                                        <Image source={item.iconName} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                                        <Text style={{ color: COLORS.black, ...FONTS.body3a }}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.body2c, color: COLORS.primary, fontWeight: 'bold' }}>Hot Food</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('HotMore')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.body3a }}>more foods</Text>
                            <Image source={icons.arrowright} style={{ height: SIZES.h5, width: SIZES.h5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginLeft: SIZES.h5 * 1.2 }}>
                    <FlatList
                        // data={hotFoodData}
                        data={food}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('FoodDetail')} key={item.id} style={styles.hotCtn}>
                                    <Image source={images.restaurant1}
                                        style={{
                                            height: SIZES.h1 * 3.5, width: SIZES.h1 * 4.9, borderTopRightRadius: SIZES.base,
                                            borderTopLeftRadius: SIZES.base, alignSelf: 'center'
                                        }} />
                                    <View style={{ paddingHorizontal: SIZES.base }}>
                                        <Text style={{ ...FONTS.body3, marginTop: SIZES.base * 0.8, color: COLORS.black, fontWeight: 'bold' }}>{item.title}</Text>
                                        <Text style={{ ...FONTS.body4, color: COLORS.grey }}>Highly recommended</Text>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.width * 0.03, marginTop: SIZES.h3 * 0.9 }}>
                    <Text style={{ ...FONTS.body2c, color: COLORS.primary, fontWeight: 'bold' }}>Old Market</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('OldMarket')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body3a }}>visit market</Text>
                        <Image source={icons.arrowright} style={{ height: SIZES.h5, width: SIZES.h5 }} />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1, }}>
            <FlatList
                ListHeaderComponent={CampusHeader}
                // ListFooterComponentStyle={{ marginTop: 200 }}
                data={oldMarketData}
                // data={market}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('MarketDetail')} style={styles.mainCtn}>
                            <Image source={images.profile2}
                                style={{ height: SIZES.h1 * 5.05, width: SIZES.h1 * 4, borderTopLeftRadius: SIZES.base, borderBottomLeftRadius: SIZES.base }} />
                            <View style={{ flex: 1, marginLeft: SIZES.h4, marginRight: SIZES.h4 }}>
                                <Text style={{ marginTop: SIZES.base, ...FONTS.body1, fontFamily: 'Roboto-Regular', color: COLORS.black }}>{item.marketTitle}</Text>
                                <Text numberOfLines={2} style={{ ...FONTS.body3, color: COLORS.black }}>{item.marketDetails}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
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
        height: SIZES.h1 * 5.1,
        // width: SIZES.h1 * 4,
        borderWidth: 1,
        marginHorizontal: SIZES.width * 0.055,
        borderRadius: SIZES.base,
        flexDirection: 'row',
        // alignItems: 'center',
        flex: 1,
        borderColor: COLORS.chocolateBackground,
        marginTop: SIZES.h5,
    },
})