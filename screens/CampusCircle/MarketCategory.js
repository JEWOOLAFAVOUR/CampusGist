import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { getMarketByCategory } from '../../api/campuscircle'
import { useNavigation } from '@react-navigation/native'
import MarketTemplate from './MarketTemplate'
import Roller from '../../components/Roller'

const MarketCategory = ({ route }) => {
    const navigation = useNavigation();
    const [categoryId, setCategoryId] = useState(route?.params?.id);
    const [title, setTitle] = useState(route?.params?.title);
    const [load, setLoad] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [categoryMarket, setCategoryMarket] = useState([]);
    console.log('lllllll', categoryMarket)

    const getMarkets = async () => {
        const response = await getMarketByCategory(categoryId)
        const { markets, error } = response;
        if (error) return console.log('market-error', error)

        console.log('market data', markets)
        setCategoryMarket(markets?.markets)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoad(true)
                await Promise.all([
                    getMarkets(),
                ])
                setLoad(false)
            } catch (error) {
                console.error('Error fetching data: ', error);
                setLoad(false)
            }
        }
        fetchData()
    }, [])

    const handleRefresh = () => { getMarkets(); }

    return (
        <>
            {load ? <Roller visible={true} /> : null}
            <View style={styles.page}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCtn}>
                        <Image source={icons.arrowleft} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.primary }} />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.h1, color: COLORS.primary, marginLeft: SIZES.h2, }}>CG - {title}</Text>
                </View>
                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={categoryMarket.length > 0 ? categoryMarket.slice(0, 10) : []}
                    renderItem={({ item }) => <MarketTemplate item={item} />}
                    refreshControl={
                        <RefreshControl
                            colors={[COLORS.primary, COLORS.blue]}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
        </>
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