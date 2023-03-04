import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import Slider from './Slider'
import { homeData } from './homeData'
import { useNavigation } from '@react-navigation/native'
import { getFeaturedPosts, getLatestPosts, getSinglePost, getStories } from '../../api/post'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import PostList from './PostList'
import PropTypes from 'prop-types'
import * as newActions from '../../redux/actions/newsAction'


let pageNo = 0;
const limit = 50;

let pageNo1 = 0;
const limit1 = 10;

const AllGist = ({ ...props }) => {
    // console.log('first', props)
    const { accessToken, user, updatePostDetails, posts } = props;
    // const loadingPost = 
    console.log('news', posts)
    const homePostData = posts;

    const kaka = () => {
        homePostData
    }
    console.log('data from storage', homePostData)
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [latestPost, setLatestPost] = useState([])
    const [reachedEnd, setReachedEnd] = useState(false)
    const [busy, setBusy] = useState(false)

    console.log('featured 1', featuredPosts)

    const fetchFeaturePost = async () =>{
        const { error, posts } = await getFeaturedPosts();
        console.log('this is featured post', posts)
        if (error) return console.log('feat',error)
        setFeaturedPosts(posts)
    }

    const fetchLatestPosts = async () => {
        const { error, posts } = await getLatestPosts(limit, pageNo);
        console.log('this is latest post', posts)
        if (error) return console.log(error)

        setLatestPost(posts)

        // REDUX ACTION DOWN
        updatePostDetails(latestPost)
        // console.log('updatePostNew', posts)

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

    const handlePostPress = (post) => {
        navigation.navigate('PostDetail', {})
    }
    const fetchSinglePost = async (slug) => {
        const { error, post } = await getSinglePost(slug)
        console.log('first jv', post)
        navigation.navigate('PostDetail', { post })
        if (error) console.log('singlepost error', error)

    }
    useEffect(() => {
        fetchLatestPosts();
        kaka();
        fetchFeaturePost();
        homePostData;
    }, [])

    const navigation = useNavigation();

    const NewsToday =({data})=>{
        const newsTodayData = [
            {
                id: 1,
                title: 'Research Shows Americans Cautions but Ready To Travel',
                category: 'Travel',
                time: '4 mins ago',
                thumbnail: images.restaurant1,
            },{
                id: 2,
                title: 'Peter Obi Worried Over Fuel Shortages, Scarcity Of New Naira Notes',
                category: 'Tecnnology',
                time: '30 mins ago',
                thumbnail: images.restaurant2,
            },{
                id: 3,
                title: 'Nigeria Should Leave This Road To Venezuela',
                category: 'Lifestyle',
                time: '1 hours ago',
                thumbnail: images.restaurant3,
            },{
                id: 4,
                title: 'Nigeria Should Leave This Road To Venezuela',
                category: 'Lifestyle',
                time: '3 hours ago',
                thumbnail: images.slide1,
            },{
                id: 5,
                title: 'Nigeria Should Leave This Road To Venezuela',
                category: 'Lifestyle',
                time: '12 hours ago',
                thumbnail: images.restaurant3,
            },
        ];
        const getImage = (uri) => {
            if (uri) return { uri };
    
            return images.image2
        }
        return(
            <View>
                <Text style={{...FONTS.body2b, fontWeight: 'bold', color: COLORS.primary, marginBottom: SIZES.base}}>Gists Today</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={featuredPosts}
                     renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={()=>fetchSinglePost(item.slug)} activeOpacity={0.7} style={styles.latestCtn}>
                                <View>
                                    <Image source={getImage(item.thumbnail)} style={{height: SIZES.height * 0.23, width: SIZES.width*0.649, borderTopLeftRadius: SIZES.h4, borderTopRightRadius: SIZES.h4}}/>
                                    <View style={{position: 'absolute', bottom: 5, flexDirection: 'row', alignItems:'center', paddingHorizontal: SIZES.base}}>
                                        <View style={{flexDirection:'row', alignItems: 'center', flex: 1}}>
                                            <View style={{height: SIZES.base, width: SIZES.base, backgroundColor: 'yellow', borderRadius: 100,}}/>
                                            <Text style={{...FONTS.body4, fontWeight: 'bold', color: COLORS.white, marginLeft: SIZES.base}}>sport</Text>
                                        </View>
                                        <Text style={{...FONTS.body4, fontWeight: 'bold', color: COLORS.white}}>4 mins ago</Text>
                                    </View>
                                </View>
                                <Text numberOfLines={2} style={{marginTop: SIZES.base * 0.7,color: COLORS.black, fontSize: SIZES.body4 * 1.1, fontFamily: 'Roboto-Medium', fontWeight: '600', marginHorizontal: SIZES.base,}}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                <Text style={{...FONTS.body2b, fontWeight: 'bold', color: COLORS.primary, marginBottom: SIZES.h5, marginTop: SIZES.base * 0.8, marginBottom: SIZES.base * 0.1}}>Latest Gists</Text>
            </View>
        )
    } 

    const renderHeader = () => {
        const categoryData = [
            {
                id: 1,
                title: 'Technology',
                iconName: icons.contact,
                onPress: () =>navigation.navigate('Technology'),
            },{
                id: 2,
                title: 'Entertainment',
                iconName: icons.moon,
                onPress: () =>navigation.navigate('Entertainment'),
            },{
                id: 3,
                title: 'Sport',
                iconName: icons.bookmark,
                test: true,
                onPress: () =>navigation.navigate('Sport'),
            },{
                id: 4,
                title: 'LifeStyle',
                iconName: icons.mail,
                onPress: () =>navigation.navigate('Lifestyle'),
            },{
                id: 5,
                title: 'Religion',
                iconName: icons.thumb,
                onPress: () =>navigation.navigate('Religion'),
            },
        ];
        return (
            <View style={{}}>
                <FlatList 
                     showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    // contentContainerStyle={{backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}
                data={categoryData}
                renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={item.onPress} style={{marginRight: SIZES.h2, marginTop:SIZES.base * 0.5, marginBottom:SIZES.base * 0.5}}>
                                <View style={[styles.categoryCtn, {backgroundColor: item.test ? COLORS.semiblue : COLORS.grey3}]}>
                                    <Image source={item.iconName} style={{height: SIZES.h2 * 1.1, width: SIZES.h2 * 1.1, tintColor: item.test ? COLORS.white : COLORS.chocolate}}/>
                                </View>
                                <Text style={{textAlign: 'center',...FONTS.body5, color: COLORS.black}}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    />
                <NewsToday/>
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
                    // data={homePostData}
                    data={latestPost}
                    // renderItem={({ item }) => <RenderItem data={item} />}
                        // renderItem={({item})=> <NewsToday data={item}/>}
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
    },
    categoryCtn:{
        height: SIZES.h1 * 1.5,
        width: SIZES.h1 * 1.65,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: COLORS.grey3,
    },
    latestCtn:{
        height: SIZES.height * 0.293,
        width: SIZES.width * 0.65,
        borderRadius: SIZES.h4, 
        marginRight: SIZES.h4,
        // borderWidth: 1,
        backgroundColor: COLORS.grey2,
    },
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




    // OLD RENDER ITEM 
    // <Text style={{ fontSize: SIZES.h2 * 1.3, fontFamily: 'Roboto-Medium', color: COLORS.black }}>Trending</Text>
    //             <Text style={{ ...FONTS.body3a, color: COLORS.chocolate }}>Some of the top trending news on stories from arround the campuses.</Text>
    //             {/* STORIES  */}
    //             <View style={{ marginVertical: SIZES.h4 }}>
    //                 <FlatList
    //                     horizontal={true}
    //                     data={trendingData}
    //                     // data={stories}
    //                     showsHorizontalScrollIndicator={false}
    //                     renderItem={({ item }) => {
    //                         return (
    //                             <TouchableOpacity onPress={() => navigation.navigate('Story', { name: item.name, image: item.image })} style={{ marginRight: SIZES.base }}>
    //                                 {/* <Image source={{ uri: `"${item.story?.url}"` }} style={{ height: SIZES.h1 * 2.2, width: SIZES.h1 * 2.2, borderRadius: 100, }} /> */}
    //                                 <Image source={images.profile3} style={{ height: SIZES.h1 * 2.2, width: SIZES.h1 * 2.2, borderRadius: 100, }} />
    //                                 {/* <Text>{item.story?.url}</Text> */}
    //                             </TouchableOpacity>
    //                         )
    //                     }}
    //                 />
    //             </View>