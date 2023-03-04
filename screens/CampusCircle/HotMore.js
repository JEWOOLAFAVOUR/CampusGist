import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'


const HotMore = ({ navigation }) => {
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);


    const [select, setSelect] = useState(true)
    const trendingData = [
        {
            id: 1,
            foodName: 'Barbecue',
            foodImage: images.restaurant1,
            reviewsNumber: 199,
            reviewPoint: 4.7,
            restaurantName: 'Alata',
            price: '1200',
            cookingTime: '20-35min',
        }, {
            id: 2,
            foodName: 'Barbecue',
            foodImage: images.restaurant2,
            reviewsNumber: 199,
            reviewPoint: 4.7,
            restaurantName: 'Lagos Kitchen',
            price: '750',
            cookingTime: '20-35min',
        }, {
            id: 3,
            foodName: 'Barbecue',
            foodImage: images.restaurant3,
            reviewsNumber: 199,
            reviewPoint: 4.7,
            restaurantName: 'Satisfier',
            price: '999',
            cookingTime: '20-35min',
        },
    ];

    const categoryData = [
        { id: 1, image: images.restaurant1, title: 'Jollof Rice', },
        { id: 2, image: images.restaurant2, title: 'Pizza', },
        { id: 3, image: images.restaurant3, title: 'Todas', },
        { id: 4, image: images.restaurant4, title: 'Burger', },
        { id: 5, image: images.restaurant1, title: 'Meat', },
        { id: 6, image: images.restaurant2, title: 'Noddles', },
    ];

    const RenderTemplate = ({ item }) => {
        return (
            <View style={{ marginRight: 10 }}>
                <View>
                    <Image source={item.foodImage} style={{ height: SIZES.height * 0.27, width: SIZES.width * 0.8, borderRadius: SIZES.base }} />
                    <View style={{ position: 'absolute', left: SIZES.base, top: SIZES.base * 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={styles.cookingCtn}>
                            <Text>{item.cookingTime}</Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setSelect(!select)} style={{ position: 'absolute', right: SIZES.base, top: SIZES.base * 0.8, }}>
                        <Image source={select ? icons.love2 : icons.love1} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                    </TouchableOpacity>
                    <View style={styles.priceCtn}>
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>N{item.price}</Text>
                    </View>

                </View>
                {/* FIRST FLEX  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base, justifyContent: 'space-between' }}>
                    <Text style={{ color: COLORS.black, ...FONTS.body3b, fontWeight: 'bold' }}>{item.foodName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={icons.star} style={{ height: SIZES.h5, width: SIZES.h5, tintColor: 'green', marginRight: SIZES.base * 0.3 }} />
                        <Text style={{ color: COLORS.black, ...FONTS.body4, fontWeight: 'bold' }}>{item.reviewPoint}</Text>
                        <Text style={{ color: COLORS.black, ...FONTS.body4 }}>({item.reviewsNumber})</Text>
                    </View>
                </View>
                {/* SECOND FLEX  */}
                <Text style={{ color: COLORS.black, ...FONTS.body3a }}>{item.restaurantName}</Text>
            </View>
        )
    }

    const _renderHeader = () => {
        return (
            <View style={{ paddingLeft: SIZES.width * 0.03 }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={categoryData}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginRight: SIZES.base }}>
                                <Image source={item.image} style={{
                                    height: SIZES.h1 * 2.5, width: SIZES.h1 * 3.6, borderRadius: SIZES.base
                                }} />
                                <Text style={{ ...FONTS.body4, textAlign: 'center', color: COLORS.black }}>{item.title}</Text>
                            </View>
                        )
                    }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: SIZES.width * 0.03 }}>
                    <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.primary, marginTop: SIZES.h4, marginBottom: SIZES.base / 1.1 }}>Recommended Food</Text>
                    <TouchableOpacity>
                        <Image source={icons.arrowright3} style={{ height: SIZES.h1, width: SIZES.h1, }} />
                    </TouchableOpacity>
                </View >
                {/* RECOMMENDED FOOD LIST  */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={trendingData}
                    renderItem={({ item }) => <RenderTemplate item={item} />}
                />
                {/* POPULAR FOOD LIST  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: SIZES.width * 0.03 }}>
                    <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.primary, marginTop: SIZES.base / 2, marginBottom: SIZES.base / 1.1 }}>Popular Food</Text>
                    <TouchableOpacity>
                        <Image source={icons.arrowright3} style={{ height: SIZES.h1, width: SIZES.h1, }} />
                    </TouchableOpacity>
                </View >
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={trendingData}
                    renderItem={({ item }) => <RenderTemplate item={item} />}
                />
            </View >
        )
    }

    return (
        <View style={styles.page}>
            <Text style={{ ...FONTS.body2c, fontWeight: 'bold', color: COLORS.orange, marginBottom: SIZES.h2, marginHorizontal: SIZES.width * 0.03 }}>Campus Market</Text>
            <FlatList
                ListHeaderComponent={_renderHeader}
                data={''}
            />
        </View>
    )
}

export default HotMore

const styles = StyleSheet.create({
    page: {
        flex: 1,
        // paddingHorizontal: SIZES.width * 0.03,
        paddingTop: SIZES.base,
    },
    priceCtn: {
        height: SIZES.h1,
        width: SIZES.width * 0.25,
        borderTopLeftRadius: SIZES.base,
        backgroundColor: COLORS.black,
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cookingCtn: {
        height: SIZES.h1 * 0.8,
        width: SIZES.width * 0.25,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})