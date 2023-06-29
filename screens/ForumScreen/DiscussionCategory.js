import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import DiscussionTemplate from './DiscussionTemplate'
import { getAllDiscussion } from '../../api/forum'


const DiscussionCategory = ({ route }) => {
    const categoryName = route?.params?.forumName;
    console.log('category name coming', categoryName)
    const navigation = useNavigation()
    const [forumData, setForumData] = useState([])
    const [refreshing, setRefreshing] = useState(false);


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
    const handleRefresh = () => {
        setRefreshing(true);
        fetchAllDiscussion();
        // fetchAllCategory();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchAllDiscussion();
    }, [])

    const RenderHeader = () => {
        return (
            <View></View>
        )
    }
    return (
        <View style={styles.page}>
            <View style={{ marginBottom: SIZES.base, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SIZES.width * 0.04, }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={icons.arrowleft} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.body1, color: COLORS.primary, fontWeight: 'bold', letterSpacing: 2, textTransform: 'uppercase' }}>{categoryName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, marginRight: SIZES.h1 }} />
                        <Text style={{ ...FONTS.body5, color: COLORS.black, }}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('CreateDiscussion')}>
                        <Image source={icons.create} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                        <Text style={{ ...FONTS.body5, color: COLORS.black, }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={forumData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <DiscussionTemplate data={item} />}
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

export default DiscussionCategory

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.base,
        paddingBottom: SIZES.h4,
    },
})