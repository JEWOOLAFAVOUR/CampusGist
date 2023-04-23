import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import GoBack from '../../components/GoBack';
import { SIZES, COLORS, FONTS, images, icons } from '../../constants';
import { getEachFood } from '../../api/post';
import { color } from 'react-native-reanimated';
import { likeMenuItem } from '../../api/campuscircle';
import { connect } from 'react-redux'

const RestaurantDetail = ({ route, ...props }) => {
    console.log('hhhhhhhhhhhhhh', route.params?.restaurant?.menu)
    const menuLike = route.params?.restaurant?.menu
    const [select, setSelect] = useState(true)
    const [favourite, setFavourite] = useState(true)
    const data = route.params.restaurant;
    const restaurantId = data.id
    // console.log('data', data.menu)
    const [restaurantItem, setRestaurantItem] = useState(data.menu)
    console.log('restaurant menu', restaurantItem)
    // const [menu, setMenu] = useState()
    const navigation = useNavigation();

    const accessToken = props.accessToken
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const getImage = (uri) => {
        if (uri) return { uri };

        return images.restaurant2
    }
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

    const [liked, setLiked] = useState('like');
    const [likeCount, setLikeCount] = useState('like');

    const handleToogle = async (restaurantId, hello, accessToken) => {
        setSelect(!select)
        console.log('hekko', hello)
        const data = await likeMenuItem(restaurantId, hello, accessToken)
        console.log('message', data)
    }

    let hello;
    const _renderHeader = () => {
        return (
            <View>
                <View>
                    <View style={{ borderBottomWidth: 1, borderColor: COLORS.chocolateBackground }}>
                        <Image source={getImage(data.thumbnail.url)} style={{ height: SIZES.height * 0.29, width: '100%' }} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 10, top: 20, }}>
                        <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFavourite(!favourite)} style={{ position: 'absolute', right: 10, top: 20 }}>
                        <Image source={favourite ? icons.love2 : icons.love1} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: SIZES.width * 0.03, paddingTop: SIZES.h3 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body2c, color: COLORS.black, fontWeight: 'bold' }}>({data.name})</Text>
                        <Text style={{ ...FONTS.body2c, color: COLORS.orange, fontWeight: 'bold' }}> - {data?.contact?.phone}</Text>
                    </View>
                    <View style={{ marginVertical: SIZES.base }}>
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
                            <Text style={{ ...FONTS.body3a, color: COLORS.black }}>₦</Text>
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
                data={restaurantItem}
                // data={favouritesFoodData}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.favouritesCtn}>
                            <Image source={getImage(item.thumbnail.url)} style={{ height: SIZES.height * 0.11, width: SIZES.height * 0.11 }} />
                            <View style={{ marginLeft: SIZES.base, flex: 1 }}>
                                <Text numberOfLines={1} style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.black }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>N</Text>
                                    {
                                        item.tags.map((data, index) => {
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
                                        <Text style={{ ...FONTS.body5, color: COLORS.black, marginRight: SIZES.base / 2 }}>4.5</Text>
                                        <Image source={icons.star} style={{ height: SIZES.h5, width: SIZES.h5, tintColor: 'orange', }} />
                                    </View>
                                    <View style={{ marginLeft: SIZES.base, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.clock} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.chocolate, }} />
                                        <Text style={{ ...FONTS.body5, color: COLORS.black, marginLeft: SIZES.base / 2 }}>{item.cookingTime}</Text>
                                    </View>
                                </View>
                                <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold' }}>₦{item.price}</Text>
                            </View>
                            {/* <TouchableOpacity onPress={() => handleToogle(restaurantId, hello = item._id, accessToken)} style={{ alignItems: 'center', marginTop: SIZES.base * 1.6, marginLeft: SIZES.base }}>
                                <Text style={{ ...FONTS.body3, color: COLORS.black }}>{item.likeCount}</Text>
                                <Image source={select ? icons.love2 : icons.love1} style={{ height: SIZES.h2 * 0.8, width: SIZES.h2 * 0.8, tintColor: select ? COLORS.red : COLORS.black }} />
                            </TouchableOpacity> */}
                        </View>
                    )


                    return (
                        <View style={styles.favouritesCtn}>
                            <Image source={item.foodImage} style={{ height: SIZES.height * 0.11, width: SIZES.height * 0.11 }} />
                            <View style={{ marginLeft: SIZES.base, flex: 1 }}>
                                <Text numberOfLines={1} style={{ ...FONTS.body3, fontWeight: 'bold', color: COLORS.black }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>N</Text>
                                    {/* {
                                        item.tag.map((data, index) => {
                                            return (
                                                <View key={index}>
                                                    <Text numberOfLines={1} style={{ ...FONTS.body4, color: COLORS.black }}> - {data}</Text>
                                                </View>
                                            )
                                        })
                                    } */}
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ ...FONTS.body5, color: COLORS.black, marginRight: SIZES.base / 2 }}>{item.review}</Text>
                                        <Image source={icons.star} style={{ height: SIZES.h5, width: SIZES.h5, tintColor: 'orange', }} />
                                    </View>
                                    <View style={{ marginLeft: SIZES.base, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.clock} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.chocolate, }} />
                                        <Text style={{ ...FONTS.body5, color: COLORS.black, marginLeft: SIZES.base / 2 }}>{item.cookingTime}</Text>
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

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
    }
}

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail)


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












