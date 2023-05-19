import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { getMarketById } from '../../api/campuscircle'
import Roller from '../../components/Roller'
import { useNavigation } from '@react-navigation/native'

const MarketTemplate = ({ item }) => {
    const navigation = useNavigation();
    const [m, setM] = useState(false)

    const fetchMarketById = async (marketId) => {
        try {
            setM(true)
            const response = await getMarketById(marketId)
            // console.log('single market data', response)
            console.log('lllllllllllllllll', response)
            setM(false)
            if (response?.success === true) {
                navigation.navigate('MarketDetail', { response })
            } else {
                ToastAndroid.show("Check Internet Connectivity!", ToastAndroid.SHORT);
            }
        } catch (err) {
            console.log('fetch-mark-id erro', err)
        }
    }
    return (
        <>
            {m ? <Roller visible={true} /> : null}
            <TouchableOpacity onPress={() => fetchMarketById(item?._id)} style={styles.container}>
                <Image source={images.restaurant2} style={styles.marketImg} />
                <View style={{ marginLeft: SIZES.h5 }}>
                    <Text numberOfLines={1} style={{ ...FONTS.body2, color: COLORS.black, fontWeight: 'bold' }}>₦{item.price}</Text>
                    <Text numberOfLines={1} style={{ ...FONTS.body2a, color: COLORS.black }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default MarketTemplate

const styles = StyleSheet.create({
    container: {
        height: SIZES.height * 0.3,
        width: SIZES.width * 0.443,
        // borderRadius: SIZES.h4,
        backgroundColor: COLORS.grey2,
        elevation: 3,
        marginBottom: SIZES.h5
    },
    marketImg: {
        height: SIZES.height * 0.23,
        width: SIZES.width * 0.443,
    },
})