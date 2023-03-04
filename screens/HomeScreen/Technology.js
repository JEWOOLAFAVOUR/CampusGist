import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import categoryData from './CategoryData';
import PostList from './PostList';
import GoBack from '../../components/GoBack';
import { getTechnologyPosts } from '../../api/post2';

const Technology = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const [post, setPost] = useState([])

    const fetchTechnologyPost = async () => {
        const { error, posts } = await getTechnologyPosts();
        console.log('this is technology post', posts)
        if (error) return console.log(error)

        setPost(posts)

    }

    useEffect(() => {
        fetchTechnologyPost();
    }, [])
    return (
        <View style={styles.page}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <GoBack />
                <Text style={{ marginLeft: SIZES.h1, ...FONTS.h1, color: COLORS.primary }}><Text style={{ color: COLORS.orange }}>CG </Text>Technology</Text>
            </View>
            <View style={{ marginBottom: SIZES.base * 0.8 }} />
            <FlatList
                ListHeaderComponent={<Text numberOfLines={3} style={{ ...FONTS.body3, color: COLORS.black, marginVertical: SIZES.base }}>Eyinjueledumare🤡 Style to apply to the view wrapping each screen. You can pass this to override some default styles such as overflow clipping.</Text>}
                data={post}
                renderItem={({ item }) => <PostList data={item} />}
            />
        </View>
    )
}

export default Technology

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.h5,
        paddingHorizontal: SIZES.width * 0.05
    },
})