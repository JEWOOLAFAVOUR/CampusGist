import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, images, SIZES } from '../../constants'
import { getFeaturedPosts, getLatestPosts } from '../../api/post'

const data = [
    { id: 1, title: 'cool' }
]

let pageNo = 0;
const limit = 5;

const Business = () => {
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [latestPost, setLatestPost] = useState([])

    const getThumbnail = (uri) => {
        if (uri) return { uri }

        return images.profile3
    }

    // const featchFeaturedPosts = async () => {
    //     const { error, posts } = await getFeaturedPosts()
    //     if (error) return console.log('this is the error', error)
    //     console.log('here is the featuredpost', posts)
    //     console.log('first')
    // }


    const fetchLatestPosts = async () => {
        const { error, posts } = await getLatestPosts(limit, pageNo);
        if (error) return console.log(error)

        // console.log('post', posts)

        setLatestPost(posts)
    }


    useEffect(() => {
        fetchLatestPosts()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Text>Helo</Text>
            <FlatList
                data={latestPost}
                // onEndReached={fetchMorePost}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={images.profile4} style={{ height: SIZES.h1 * 2, width: SIZES.h1 * 2 }} />
                            <View style={{}}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Business

const styles = StyleSheet.create({})