import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import GoBack from '../../components/GoBack';
import { SIZES, COLORS, FONTS, images, icons } from '../../constants';
import { getEachFood } from '../../api/post';
import { useState } from 'react';


const RestaurantDetail = ({ route }) => {
    const [select, setSelect] = useState(true)
    const [favourite, setFavourite] = useState(true)
    const data = route.params.restaurant;
    console.log('data', data)

    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    // const [data, setData] = useState({})
    // // const slug = route.params.slug
    // console.log('food object', data)

    // const fetchSingleFood = async (slug = route.params.slug) => {
    //     const { error, food } = await getEachFood(slug)
    //     setData(food)
    //     console.log('food each', food)
    //     if (error) console.log('singlepost error', error)

    // }

    // useEffect(() => {
    //     fetchSingleFood()
    // }, [])

    const favouritesFoodData = [
        {
            id: 1,
            foodImage: images.restaurant1,
            foodTitle: "McDonald's (835 MARKET ST)",
            review: '4.0',
            cookingPeriod: '25 - 30 min',
            price: 2000,
            tag: ['American', 'Burger', 'Fastfood'],
        }, {
            id: 2,
            foodImage: images.restaurant2,
            foodTitle: "La Fortaleza",
            review: '4.0',
            cookingPeriod: '35 - 50 min',
            price: 2000,
            tag: ['American', 'Pizza', 'For the whole family'],
        }, {
            id: 3,
            foodImage: images.restaurant3,
            foodTitle: "White Castle",
            review: '4.0',
            cookingPeriod: '25 - 30 min',
            price: 2000,
            tag: ['American', 'Burger', 'For the whole family'],
        }, {
            id: 4,
            foodImage: images.restaurant4,
            foodTitle: "The Rock Bar  Grill",
            review: '4.0',
            cookingPeriod: '25 - 30 min',
            price: 2000,
            tag: ['American', 'Burger', 'Fastfood'],
        }, {
            id: 5,
            foodImage: images.restaurant1,
            foodTitle: "The Rock Bar  Grill",
            review: '4.0',
            cookingPeriod: '25 - 30 min',
            price: 2000,
            tag: ['American', 'Burger', 'Fastfood'],
        }, {
            id: 6,
            foodImage: images.restaurant2,
            foodTitle: "The Rock Bar  Grill",
            review: '4.0',
            cookingPeriod: '25 - 30 min',
            price: 2000,
            tag: ['American', 'Burger', 'Fastfood'],
        },
    ];

    const category = [{ id: 1, title: 'Hamburgeres', }, { id: 2, title: 'Mediterrancia', }, { id: 3, title: 'Italiana', }]

    const _renderHeader = () => {
        return (
            <View>
                <View>
                    <Image source={images.restaurant1} style={{ height: SIZES.height * 0.27, width: '100%' }} />
                    {/* <View style={{}}> */}
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 10, top: 20, }}>
                        <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFavourite(!favourite)} style={{ position: 'absolute', right: 10, top: 20 }}>
                        <Image source={favourite ? icons.love2 : icons.love1} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
                <View style={{ paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h3 }}>
                    <Text style={{ ...FONTS.body1, color: COLORS.black, fontWeight: 'bold' }}>McDonald's</Text>
                    <Text style={{ ...FONTS.body1, color: COLORS.orange, fontWeight: 'bold' }}>({data.name})</Text>
                    <View style={{ marginVertical: SIZES.h4 }}>
                        <FlatList
                            data={category.slice(0, 3)}
                            numColumns={3}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.categoryCtn}>
                                        <Text style={{ ...FONTS.body4, color: COLORS.black }}>{item.title}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={icons.star} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.chocolate }} />
                            <Text style={{ ...FONTS.body3a, color: COLORS.black, marginLeft: SIZES.base / 2 }}>4.5</Text>
                            <Text style={{ ...FONTS.body3a, color: COLORS.black, marginLeft: SIZES.base / 2 }}>(370)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={icons.clock} style={{ marginRight: SIZES.base / 2, height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.chocolate }} />
                            <Text style={{ ...FONTS.body3a, color: COLORS.black }}>Opens: <Text style={{ fontWeight: 'bold' }}>9:00am - 9:00pm</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.body3a, color: COLORS.black }}>N</Text>
                        </View>
                    </View>
                    <Text style={{ ...FONTS.body3b, color: COLORS.black, fontWeight: 'bold', marginVertical: SIZES.h5 }}>Your Favorities</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.page}>
            <FlatList
                ListHeaderComponent={_renderHeader}
                data={favouritesFoodData}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.favouritesCtn}>
                            <Image source={item.foodImage} style={{ height: SIZES.height * 0.11, width: SIZES.height * 0.11 }} />
                            <View style={{ marginLeft: SIZES.base, flex: 1 }}>
                                <Text numberOfLines={1} style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.black }}>{item.foodTitle}</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>N</Text>
                                    {
                                        item.tag.map((data, index) => {
                                            return (
                                                <View key={index}>
                                                    <Text numberOfLines={1} style={{ ...FONTS.body4, color: COLORS.black }}> - {data}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ ...FONTS.body5, color: COLORS.black, marginRight: SIZES.base / 2 }}>{item.review}</Text>
                                        <Image source={icons.star} style={{ height: SIZES.h5, width: SIZES.h5, tintColor: 'orange', }} />
                                    </View>
                                    <View style={{ marginLeft: SIZES.base, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.clock} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.chocolate, }} />
                                        <Text style={{ ...FONTS.body5, color: COLORS.black, marginLeft: SIZES.base / 2 }}>{item.cookingPeriod}</Text>
                                    </View>
                                </View>
                                <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold' }}>N{item.price}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setSelect(!select)} style={{ alignSelf: 'flex-start', marginTop: SIZES.base * 1.6, marginLeft: SIZES.base }}>
                                <Image source={select ? icons.love2 : icons.love1} style={{ height: SIZES.h2 * 0.8, width: SIZES.h2 * 0.8, tintColor: COLORS.black }} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default RestaurantDetail

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        // paddingHorizontal: SIZES.width * 0.05,
        // paddingTop: SIZES.h4,
    },
    categoryCtn: {
        height: SIZES.h1 * 0.9,
        width: SIZES.h1 * 3.4,
        backgroundColor: COLORS.grey2,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.h4
    },
    favouritesCtn: {
        height: SIZES.height * 0.13,
        backgroundColor: COLORS.grey2,
        // borderWidth: 1,
        marginBottom: SIZES.h5,
        paddingHorizontal: SIZES.width * 0.035,
        flexDirection: 'row',
        alignItems: 'center'
    },
})