import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import GoBack from '../../components/GoBack';
import { SIZES, COLORS, FONTS, images, icons } from '../../constants';
import { getEachFood } from '../../api/post';
import { useState } from 'react';


const FoodDetail = ({ route }) => {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const [data, setData] = useState({})
    // const slug = route.params.slug
    console.log('food object', data)

    const fetchSingleFood = async (slug = route.params.slug) => {
        const { error, food } = await getEachFood(slug)
        setData(food)
        console.log('food each', food)
        if (error) console.log('singlepost error', error)

    }

    useEffect(() => {
        fetchSingleFood()
    }, [])
    return (
        <View style={styles.page}>
            <GoBack />
            <Text>{data.title}</Text>
        </View>
    )
}

export default FoodDetail

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: SIZES.width * 0.05,
        paddingTop: SIZES.h4,
    },
})