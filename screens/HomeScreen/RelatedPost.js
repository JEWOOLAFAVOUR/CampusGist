import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getSimilerPost, getSinglePost } from '../../api/post'

const RelatedPost = ({ postId }) => {
    const navigation = useNavigation()
    const [posts, setPosts] = useState([])

    // const handleOnPress = async ({ slug }) => {
    //     const { error, post } = await getSinglePost(slug)
    //     console.log('first jv', post)

    //     if (error) console.log('singlepost error', error)
    //     navigation.navigate('PostDetail', { post })
    // }

    const fetchSimilerPosts = async () => {
        const { error, posts } = await getSimilerPost(postId)
        if (error) console.log('similar post error', error)

        setPosts([...posts])
    }

    useEffect(() => {
        fetchSimilerPosts()
    }, [postId])

    return (
        <View>
            <FlatList
                data={posts}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Image />
                            <View>
                                <Text>Hello World</Text>
                            </View>
                        </View>
                    )
                }}
            />
            <Text>COlll</Text>
        </View>
    )
}

export default RelatedPost

const styles = StyleSheet.create({})