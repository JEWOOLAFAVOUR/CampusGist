import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { images, COLORS, SIZES, FONTS } from '../../constants';
import dateFormat from 'dateformat'
import { useNavigation } from '@react-navigation/native';

const SearchResult = ({ route }) => {
    const navigation = useNavigation()
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const { title, createdAt, author, thumbnail } = route
    const searchResultData = route?.params;
    console.log('item', searchResultData)
    const [result, setResult] = useState()


    const getImage = (uri) => {
        if (uri) return { uri };

        return images.profile6
    }
    return (
        <View style={styles.page}>
            <FlatList
                data={searchResultData}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <Image source={getImage(thumbnail)} style={{ height: SIZES.h1 * 3.5, width: SIZES.width * 0.27, resizeMode: 'cover' }} />
                            <View style={{ flex: 1, marginLeft: SIZES.h5, marginTop: SIZES.base }}>
                                <Text style={{ ...FONTS.h3, color: COLORS.black }}>{item.title}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>{dateFormat(item.createdAt, 'mediumDate')}</Text>
                                    <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>&#8226;</Text>
                                    <Text style={{ marginLeft: SIZES.base * 0.7, ...FONTS.body4, color: COLORS.black }}>{item.author}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default SearchResult

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.02,
        paddingTop: SIZES.h3
    },
    container: {
        flexDirection: 'row',
        // alignItems: 'center',
        flex: 1,
        marginBottom: SIZES.h4

    }
})