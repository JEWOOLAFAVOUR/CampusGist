import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import Slider from './Slider'
import { homeData } from './homeData'
import { useNavigation } from '@react-navigation/native'
import { getLatestPosts, getSinglePost, getStories } from '../../api/post'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import PostList from './PostList'
import PropTypes from 'prop-types'
import * as newActions from '../../redux/actions/newsAction'


let pageNo = 0;
const limit = 50;

let pageNo1 = 0;
const limit1 = 10;

const trendingData = [
    {
        id: 1,
        image: images.profile3,
        name: 'EYINJUdddhddhdhdhdh',
    }, {
        id: 2,
        image: images.profile2,
        name: 'BBC NEWS',
    }, {
        id: 3,
        image: images.slide3,
        name: 'impact_tv',
    }, {
        id: 4,
        image: images.slide4,
        name: 'bleedingpen',
    }, {
        id: 5,
        image: images.image1,
        name: 'JSON_TV',
    }, {
        id: 6,
        image: images.image2,
        name: 'LACADEMON',
    }, {
        id: 7,
        image: images.profile2,
        name: 'ADE_TV',
    }, {
        id: 8,
        image: images.profile3,
        name: 'TOP-WORRLD',
    }, {
        id: 9,
        image: images.slide2,
        name: 'Don Mike',
    },
];
const AllGist = ({ ...props }) => {
    // console.log('first', props)
    const { accessToken, user, updatePostDetails, posts } = props;
    // const loadingPost = 
    console.log('news', posts)
    const homePostData = posts;

    const kaka = () => {
        homePostData
    }
    console.log('data cool', homePostData)
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [latestPost, setLatestPost] = useState([])
    const [reachedEnd, setReachedEnd] = useState(false)
    const [busy, setBusy] = useState(false)
    const [stories, setStories] = useState([])

    console.log('story content', stories[0])

    const fetchLatestPosts = async () => {
        const { error, posts } = await getLatestPosts(limit, pageNo);
        console.log('this is latest post', posts)
        if (error) return console.log(error)

        // console.log('post', posts)

        setLatestPost(posts)

        // REDUX ACTION DOWN
        updatePostDetails(latestPost)
        // console.log('updatePostNew', posts)

    }

    const fetchStories = async () => {
        const { error, stories } = await getStories(limit1, pageNo1);
        console.log('this is the story data', stories.story)
        if (error) return console.log('sta-err', error)

        setStories(stories)
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

    // const fetchSinglePost = async (slug) => {
    //     const { error, post } = await getSinglePost(slug)
    //     console.log('first jv', post)

    //     if (error) console.log('singlepost error', error)
    //     navigation.navigate('PostDetail', { post, accessToken })

    // }

    const handlePostPress = (post) => {
        navigation.navigate('PostDetail', {})
    }

    useEffect(() => {
        fetchLatestPosts();
        fetchStories();
        kaka();
        homePostData;
    }, [])

    const navigation = useNavigation();

    const renderHeader = () => {
        // const getThumbnail = (uri) => {
        //     if (uri) return { uri }

        //     return images.profile2
        // }
        return (
            <View style={{}}>
                <Text style={{ fontSize: SIZES.h2 * 1.3, fontFamily: 'Roboto-Medium', color: COLORS.black }}>Trending</Text>
                <Text style={{ ...FONTS.body3a, color: COLORS.chocolate }}>Some of the top trending news on stories from arround the campuses.</Text>
                {/* STORIES  */}
                <View style={{ marginVertical: SIZES.h4 }}>
                    <FlatList
                        horizontal={true}
                        data={trendingData}
                        // data={stories}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Story', { name: item.name, image: item.image })} style={{ marginRight: SIZES.base }}>
                                    {/* <Image source={{ uri: `"${item.story?.url}"` }} style={{ height: SIZES.h1 * 2.2, width: SIZES.h1 * 2.2, borderRadius: 100, }} /> */}
                                    <Image source={images.profile3} style={{ height: SIZES.h1 * 2.2, width: SIZES.h1 * 2.2, borderRadius: 100, }} />
                                    {/* <Text>{item.story?.url}</Text> */}
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
            {/* <Slider /> */}
            <View style={{ paddingHorizontal: SIZES.width * 0.03, marginTop: SIZES.h4, marginBottom: SIZES.h1 * 2 }}>
                <FlatList
                    // ListHeaderComponent={Slider}
                    ListHeaderComponent={renderHeader}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponentStyle={{ marginBottom: SIZES.h5 }}
                    showsVerticalScrollIndicator={false}
                    data={homePostData}
                    // renderItem={({ item }) => <RenderItem data={item} />}
                    renderItem={({ item }) => <PostList data={item} />}
                    // onEndReached={async () => await fetchMorePosts()}
                    onEndReachedThreshold={1}
                    ListFooterComponent={() => {
                        return reachedEnd ? <Text style={{ color: COLORS.orange, textAlign: 'center', paddingVertical: 50 }}>You reached to end!</Text> : null
                    }}
                />
            </View>
        </View>
    )
}

AllGist.prototype = {
    post: PropTypes.array.isRequired,
    updatePostDetails: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
        posts: state.news.posts
    }
}

const mapDispatchToProps = (dispatch) => ({
    updatePostDetails: (posts) => dispatch(newActions.updatePostDetails(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllGist)

const styles = StyleSheet.create({
    gistCtn: {
        height: SIZES.h1 * 4.7,
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















    // const RenderItem = ({ data }) => {
    //     const { thumbnail } = data;

    //     const getThumbnail = (uri) => {
    //         if (uri) return { uri }

    //         return images.profile2
    //     }
    //     return (
    //         <View style={styles.gistCtn}>
    //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                 <Image source={getThumbnail(thumbnail)} style={{ height: SIZES.h1 * 3.5, width: SIZES.width * 0.29, resizeMode: 'cover', borderTopLeftRadius: SIZES.h5 }} />
    //                 <View style={{ flex: 1, marginLeft: SIZES.h4 }}>
    //                     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SIZES.base / 2.5 }}>
    //                         <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
    //                             <Text style={{ ...FONTS.body4, color: COLORS.black }}>{data.author}</Text>
    //                             <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>&#8226;</Text>
    //                             <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>{dateFormat(data.createdAt, 'mediumDate')}</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity style={{ marginRight: SIZES.base, padding: SIZES.base * 0.9 }}>
    //                             <Image source={icons.horizontalmenu} style={{ height: SIZES.radius * 1, width: SIZES.h2 * 1 }} />
    //                         </TouchableOpacity>
    //                     </View>
    //                     <View style={{ flex: 1 }}>
    //                         <TouchableOpacity onPress={() => fetchSinglePost(data.slug)} style={{ maxWidth: '90%', }}>
    //                             <Text numberOfLines={3} style={{ ...FONTS.body3a, fontWeight: 'bold', color: COLORS.black }}>{data.title}</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //             </View>
    //             <View style={{ paddingHorizontal: SIZES.base, flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base * 0.5 }}>
    //                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                     <Image source={icons.comment} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.black }} />
    //                     <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base * 0.5 }}>10</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.h2, flex: 1 }}>
    //                     <Image source={icons.bookmark} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.black }} />
    //                     <Text style={{ ...FONTS.h5, color: COLORS.black, marginLeft: SIZES.base * 0.5 }}>Save</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                     <Image source={icons.thumb} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.primary }} />
    //                     <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base }}>5</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View >
    //     );
    // };
