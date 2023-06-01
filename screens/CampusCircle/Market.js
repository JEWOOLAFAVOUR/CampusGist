import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { oldMarketData } from './CampusCircleData';
import Modal from 'react-native-modal';
import { getAllMarket, getMarketById } from '../../api/campuscircle';
import { useNavigation } from '@react-navigation/native';
import MarketTemplate from './MarketTemplate';
import Roller from '../../components/Roller';

const Market = () => {
    const navigation = useNavigation();
    const categoryData = [
        { id: 1, title: 'Foods', },
        { id: 2, title: 'Fashion', },
        { id: 3, title: 'Hostel', },
        { id: 4, title: 'Electronics', },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [markets, setMarkets] = useState([]);
    const [load, setLoad] = useState(true)

    const fetchAllMarket = async () => {
        const { markets, error } = await getAllMarket();
        if (error) return console.log('market-error', error)
        console.log('markets data fetched', markets)
        setMarkets(markets)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoad(true)
                await Promise.all([
                    fetchAllMarket(),
                ])
                setLoad(false)
            } catch (error) {
                console.error('Error fetching data: ', error);
                setLoad(false)
            }
        }
        fetchData()
    }, [])

    const closeModal = () => {
        setIsModalVisible(false);
        clearInterval(intervalId);
    };

    const handleRefresh = () => {
        fetchAllMarket();
    }

    const RenderHeader = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: SIZES.width * 0.04, marginVertical: SIZES.base * 0.5 }}>
                    <Text style={{ ...FONTS.body2, color: COLORS.black, fontWeight: 'bold' }}>Categories</Text>
                    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <Text style={{ ...FONTS.body2b, color: COLORS.orange }}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={categoryData}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <>{item.id === 1 ?
                                <TouchableOpacity style={styles.categoryCtn} onPress={() => navigation.navigate('HotMore', { title: item.title, })}>
                                    <Text style={{ ...FONTS.body4, color: COLORS.white, }}>{item.title}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.categoryCtn} onPress={() => navigation.navigate('MarketCategory', { title: item.title })}>
                                    <Text style={{ ...FONTS.body4, color: COLORS.white, }}>{item.title}</Text>
                                </TouchableOpacity>
                            }
                            </>
                        )
                    }}
                />
            </View>
        )
    }
    const RenderFooter = () => {
        return (
            <View style={{ marginHorizontal: SIZES.width * 0.025, paddingTop: SIZES.h5 * 0.7, }}>
                <Text style={{ ...FONTS.body2c, color: COLORS.orange, fontWeight: 'bold', marginBottom: SIZES.base / 1.2 }}>Today's markets</Text>
                <FlatList
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    // data={oldMarketData.length > 0 ? oldMarketData.slice(0, 10) : []}
                    data={markets.length > 0 ? markets.slice(0, 10) : []}
                    renderItem={({ item }) => <MarketTemplate item={item} />}
                />
                <View style={{ marginBottom: SIZES.h1 * 2.2 }} />
            </View>
        )
    }
    return (
        <View style={styles.page}>
            {load ? <Roller visible={true} /> : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.width * 0.03, justifyContent: 'space-between', marginBottom: SIZES.base }}>
                <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Marketplace</Text>
                <TouchableOpacity>
                    <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.black }} />
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={RenderHeader}
                ListFooterComponent={RenderFooter}
                refreshControl={
                    <RefreshControl
                        colors={[COLORS.primary, COLORS.blue]}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />
            {/* MODAL LIFE  */}
            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                <View style={{ backgroundColor: 'white', paddingTop: SIZES.h3 }}>
                    <View style={{ paddingHorizontal: SIZES.h3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...FONTS.body2, color: COLORS.black, }}>Change Category</Text>
                            <TouchableOpacity onPress={() => closeModal()}>
                                <Image source={icons.close} style={{ height: SIZES.h3 * 1.2, width: SIZES.h3 * 1.2, tintColor: COLORS.black }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 1.4, backgroundColor: COLORS.chocolateBackground, marginVertical: SIZES.h4 * 1.1 }} />
                    <FlatList
                        data={categoryData}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('MarketCategory', { title: item.title })}>
                                    <View style={{ marginHorizontal: SIZES.h1 }}>
                                        <Text style={{ ...FONTS.h3, color: COLORS.black, }}>{item.title}</Text>
                                    </View>
                                    <View style={{ height: 1.4, backgroundColor: COLORS.chocolateBackground, marginVertical: SIZES.h4 * 1.1 }} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </Modal >
        </View>
    )
}

export default Market

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.base,
    },
    categoryCtn: {
        height: SIZES.h1 * 2.8,
        width: SIZES.h1 * 3.2,
        backgroundColor: COLORS.chocolate,
        borderRadius: SIZES.base,
        marginLeft: SIZES.h5,
        // marginLeft: SIZES.width * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
    },
})