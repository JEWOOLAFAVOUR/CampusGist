import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import Slider from './Slider'
import { homeData } from './homeData'
import { useNavigation } from '@react-navigation/native'
import { getLatestPosts, getSinglePost } from '../../api/post'

let pageNo = 0;
const limit = 5;

const AllGist = () => {
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [latestPost, setLatestPost] = useState([])
    const [reachedEnd, setReachedEnd] = useState(false)
    const [busy, setBusy] = useState(false)

    const fetchLatestPosts = async () => {
        const { error, posts } = await getLatestPosts(limit, pageNo);
        if (error) return console.log(error)

        console.log('post', posts)

        setLatestPost(posts)
    }

    const fetchMorePosts = async () => {
        console.log('runnings')
        if (reachedEnd || busy) return;

        pageNo += 1;
        setBusy(true)
        const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
        setBusy(false)
        if (error) return console.log(error)

        if (postCount === latestPost.length) return setReachedEnd(true)

        // console.log('post', posts)

        setLatestPost([...latestPost, ...posts])
    }

    const fetchSinglePost = async (slug) => {
        const { error, post } = await getSinglePost(slug)
        console.log('first jv', post)

        if (error) console.log('singlepost error', error)
        navigation.navigate('PostDetail', { post })

    }

    const handlePostPress = (post) => {
        navigation.navigate('PostDetail', {})
    }

    useEffect(() => {
        fetchLatestPosts()
    }, [])

    const navigation = useNavigation();


    const RenderItem = ({ data }) => {
        const { thumbnail } = data;

        const getThumbnail = (uri) => {
            if (uri) return { uri }

            return images.profile4
        }
        return (
            <View style={styles.gistCtn}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={getThumbnail(thumbnail)} style={{ height: SIZES.h1 * 3.5, width: SIZES.width * 0.27, resizeMode: 'cover', borderTopLeftRadius: SIZES.h5 }} />
                    <View style={{ flex: 1, marginLeft: SIZES.h4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SIZES.base / 2.5 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                                <Text style={{ ...FONTS.body4, color: COLORS.black }}>{data.author}</Text>
                                <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>&#8226;</Text>
                                <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>{data.createdAt}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: SIZES.base, padding: SIZES.base * 0.9 }}>
                                <Image source={icons.horizontalmenu} style={{ height: SIZES.radius * 1, width: SIZES.h2 * 1 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => fetchSinglePost(data.slug)} style={{ maxWidth: '90%', }}>
                                <Text numberOfLines={3} style={{ ...FONTS.body3a, fontWeight: 'bold', color: COLORS.black }}>{data.title}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: SIZES.base, flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base * 0.5 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={icons.comment} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.black }} />
                        <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base }}>{data.postCommentNum}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.h3, flex: 1 }}>
                        <Image source={icons.bookmark} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.black }} />
                        <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={icons.eye} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.black }} />
                        <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base }}>{data.postReaction}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    };
    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            {/* <Slider /> */}
            <View style={{ paddingHorizontal: SIZES.width * 0.03, marginTop: SIZES.h4, marginBottom: SIZES.h1 * 2 }}>
                <FlatList
                    // ListHeaderComponent={Slider}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponentStyle={{ marginBottom: SIZES.h5 }}
                    showsVerticalScrollIndicator={false}
                    data={latestPost}
                    renderItem={({ item }) => <RenderItem data={item} />}
                    onEndReached={async () => await fetchMorePosts()}
                    onEndReachedThreshold={1}
                    ListFooterComponent={() => {
                        return reachedEnd ? <Text style={{ color: COLORS.orange, textAlign: 'center', paddingVertical: 50 }}>You reached to end!</Text> : null
                    }}
                />
            </View>
        </View>
    )
}

export default AllGist

const styles = StyleSheet.create({
    gistCtn: {
        height: SIZES.h1 * 4.8,
        // borderWidth: 1,
        borderRadius: SIZES.h5,
        // flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f3f3f3',
        marginHorizontal: 0,
        marginBottom: SIZES.h5,
        // justifyContent: 'center'
        // alignItems: 'center',

    }
})