import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import discussionData from './discussionData'
import DiscussionTemplate from './DiscussionTemplate'
import { useNavigation } from '@react-navigation/native'
import { getAllDiscussion, getAllForumCategory } from '../../api/forum'
import Toast from 'react-native-toast-message';

const Forum = () => {
    const navigation = useNavigation()
    const [forumData, setForumData] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [categoryData, setCategoryData] = useState([])

    const fetchAllDiscussion = async () => {
        const { discussions, error } = await getAllDiscussion();
        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Error Fetching Posts',
                visibilityTime: 2000,
            });
        }
        setForumData(discussions)
        console.log('forum data fetched', discussions)
    }

    const fetchAllCategory = async () => {
        const { categories, error } = await getAllForumCategory()
        if (error) return console.log('error fetching categories', categories)
        setCategoryData(categories);
        console.log('get all categories', categories)
    }


    const handleRefresh = () => {
        setRefreshing(true);
        fetchAllDiscussion();
        fetchAllCategory();
        setRefreshing(false);
    };


    useEffect(() => {
        fetchAllDiscussion();
        fetchAllCategory();
    }, [])

    const RenderHeader = () => {
        const forumData = [
            {
                id: 1,
                title: 'Cooking',
                topics: 296,
                forumBackground: COLORS.blue,
            }, {
                id: 2,
                title: 'Science',
                topics: 187,
                forumBackground: COLORS.blue,
            }, {
                id: 3,
                title: 'Movies',
                topics: 548,
                forumBackground: COLORS.blue,
            },
        ];

        // useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             // setLoad(true)
        //             await Promise.all([
        //                 fetchAllDiscussion(),
        //             ])
        //             // setLoad(false)
        //         } catch (error) {
        //             console.error('Error fetching data: ', error);
        //             // setLoad(false)
        //         }
        //     }
        //     fetchData()
        // }, [])

        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.body2c, color: COLORS.black, fontWeight: 'bold' }}>Forum</Text>
                    <TouchableOpacity>
                        <Text style={{ ...FONTS.body3a, color: COLORS.primary }}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={categoryData}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.forumCtn}>
                                <Text style={{ ...FONTS.body3, color: COLORS.white }}>{item.name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Image source={icons.person} style={{ height: SIZES.h2 * 0.8, width: SIZES.h2 * 0.8, tintColor: COLORS.white }} />
                                    <Text style={{ ...FONTS.body4, color: COLORS.white, marginLeft: SIZES.base / 2 }}>{item.topics}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <Text style={{ ...FONTS.body2c, color: COLORS.black, fontWeight: 'bold', marginTop: SIZES.h5, marginBottom: SIZES.base }}>Discussions</Text>
            </View>
        )
    }
    return (
        <View style={styles.page}>
            <View style={{ marginBottom: SIZES.base, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image source={icons.call} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                <Text style={{ ...FONTS.body1, color: COLORS.primary, fontWeight: 'bold', letterSpacing: 2 }}>DISCOVER</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, marginRight: SIZES.h2 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateDiscussion')}>
                        <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={forumData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <DiscussionTemplate data={item} />}
                ListHeaderComponent={RenderHeader}
                refreshControl={
                    <RefreshControl
                        colors={[COLORS.primary, COLORS.blue]}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />
        </View>
    )
}

export default Forum

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.04,
        paddingTop: SIZES.base,
    },
    forumCtn: {
        height: SIZES.h1 * 3.3,
        width: SIZES.width * 0.28,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.h5,
        paddingVertical: SIZES.base,
        borderRadius: SIZES.base / 1.5,
        marginTop: SIZES.base,
    },
})