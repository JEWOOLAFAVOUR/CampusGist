import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, images, icons, SIZES } from '../../constants';
import { SliderBox } from 'react-native-image-slider-box';

const MarketDetail = ({ route }) => {
    const data = route.params.data
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);


    const [cool, setCool] = React.useState([
        images.restaurant1, images.restaurant2, images.restaurant3
    ])
    const testImage = [images.image1, images.profile2, images.image1
    ]

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{}}>
                    <SliderBox
                        images={cool}
                        sliderBoxHeight={300}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor={COLORS.white}
                        inactiveDotColor={COLORS.orange}
                        dotStyle={{ height: 10, width: 10, borderRadius: 2 }}
                        autoplay={true}
                        circleLoop
                        autoplayInterval={5000}
                        ImageComponentStyle={{ height: 280, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                    />
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                        <Image source={icons.arrowleft} style={{ height: SIZES.h1 * 0.7, width: SIZES.h1 * 0.7, tintColor: COLORS.white }} />
                    </TouchableOpacity>
                </View>
                {/* DETAILS */}
                <View style={{ flex: 1, paddingTop: SIZES.h2, paddingHorizontal: SIZES.h2 * 0.8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.body1, fontWeight: 'bold', color: COLORS.black }}>{data.marketTitle}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={icons.star} style={{ height: SIZES.h3 * 0.9, width: SIZES.h3 * 0.9, tintColor: COLORS.orange, marginLeft: 3 }} />
                            <Image source={icons.star} style={{ height: SIZES.h3 * 0.9, width: SIZES.h3 * 0.9, tintColor: COLORS.orange, marginLeft: 3 }} />
                            <Image source={icons.star} style={{ height: SIZES.h3 * 0.9, width: SIZES.h3 * 0.9, tintColor: COLORS.orange, marginLeft: 3 }} />
                            <Image source={icons.star} style={{ height: SIZES.h3 * 0.9, width: SIZES.h3 * 0.9, tintColor: COLORS.orange, marginLeft: 3 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={icons.location} style={{ height: SIZES.h4 * 1.1, width: SIZES.h4 * 1.1, tintColor: 'indigo' }} />
                        <Text style={{ ...FONTS.body3, color: COLORS.chocolate }}>Alexandra City, Alabama</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.body1, fontWeight: 'bold', color: 'indigo' }}>N25000</Text>
                        <View style={styles.saleCtn}>
                            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>For Sale</Text>
                        </View>
                    </View>
                    {/* ABOUT APARTMENT */}
                    <View style={{ marginVertical: SIZES.base }}>
                        <Text style={{ ...FONTS.body2, fontWeight: '700', color: COLORS.black }}>About Apartment</Text>
                        <Text numberOfLines={3} style={{ marginTop: SIZES.base, ...FONTS.body4, color: COLORS.black }}>A paired apartment is two apartment that share a wall and have opposite side entries. The whole building is designed to look like one single large apartment.</Text>
                    </View>
                    {/* SPECIFICATION */}
                    <View style={{ marginVertical: SIZES.base * 0.8 }}>
                        <Text style={{ ...FONTS.body2, fontWeight: '700', color: COLORS.black }}>Specification</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icons.person} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                                    <Text style={{ ...FONTS.h2, color: 'indigo', marginLeft: SIZES.radius * 0.3 }}>5</Text>
                                </View>
                                <Text style={{ ...FONTS.body3b, color: COLORS.grey }}>Bedroom</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icons.person} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                                    <Text style={{ ...FONTS.h2, color: 'indigo', marginLeft: SIZES.radius * 0.3 }}>2</Text>
                                </View>
                                <Text style={{ ...FONTS.body3b, color: COLORS.grey }}>Bathroom</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icons.person} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                                    <Text style={{ ...FONTS.h2, color: 'indigo', marginLeft: SIZES.radius * 0.3 }}>500ft</Text>
                                </View>
                                <Text style={{ ...FONTS.body3b, color: COLORS.grey }}>Square Ft</Text>
                            </View>
                        </View>
                    </View>
                    {/* LISTING AGENT  */}
                    <View style={{}}>
                        <Text style={{ ...FONTS.body2, fontWeight: '600', color: COLORS.indigo }}>Listing Agent</Text>
                        <View style={{ paddingTop: SIZES.h5 * 1.1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.slide2} style={{ width: SIZES.h1 * 1.8, height: SIZES.h1 * 1.8, borderRadius: SIZES.h5, }} />
                            <View style={{ marginLeft: SIZES.h5, flex: 1 }}>
                                <Text style={{ ...FONTS.body2, fontWeight: '700', color: COLORS.black }}>RH HOUSING</Text>
                                <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>Agent</Text>
                            </View>
                            <Image source={icons.person} style={{ height: SIZES.h1, width: SIZES.h1, marginRight: SIZES.h3 }} />
                            <Image source={icons.person} style={{ height: SIZES.h1, width: SIZES.h1 }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* BOOK NOW */}
            <TouchableOpacity style={styles.bookNowCtn}>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>Book Now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MarketDetail

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
        height: 100,
        backgroundColor: 'pink',
        borderRadius: 20,
        padding: 40,
    },
    backArrow: {
        position: 'absolute',
        top: 10, left: 20,
        height: SIZES.h1 * 1.2,
        width: SIZES.h1 * 1.2,
        backgroundColor: COLORS.orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    saleCtn: {
        height: SIZES.h2 * 1.1,
        width: SIZES.h2 * 3.3,
        backgroundColor: 'indigo',
        borderRadius: SIZES.h2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookNowCtn: {
        height: SIZES.h1 * 1.7,
        width: SIZES.h1 * 8.8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'indigo',
        borderRadius: SIZES.h1,
        marginBottom: SIZES.base,
    },
})