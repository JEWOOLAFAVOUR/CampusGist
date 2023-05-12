import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { getMarketByCategory } from '../../api/campuscircle'
import { useNavigation } from '@react-navigation/native'

const MarketCategory = ({ route }) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState(route?.params?.title)
    const [categoryMarket, setCategoryMarket] = useState([]);

    const getMarket = async () => {
        const response = await getMarketByCategory()
        const { market, error } = response;
        if (error) return console.log('market-error', error)

        console.log('market data', response)
        setCategoryMarket(market)
    }

    useEffect(() => {
        getMarket();
    }, [])

    return (
        <View style={styles.page}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCtn}>
                    <Image source={icons.arrowleft} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.primary }} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h1, color: COLORS.primary, marginLeft: SIZES.h2, }}>CG - {title}</Text>
            </View>
        </View>
    )
}

export default MarketCategory

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.03,
        paddingTop: SIZES.h5,
    },
    backCtn: {
        height: SIZES.h1 * 1.6,
        width: SIZES.h1 * 1.6,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        // marginBottom: SIZES.base,
        // marginTop: SIZES.h3,
    },
})