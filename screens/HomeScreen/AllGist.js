import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, RefreshControl, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import Slider from './Slider'
import { homeData } from './homeData'
import { useNavigation } from '@react-navigation/native'
import { getFeaturedPosts, getLatestPosts, getSinglePost, getStories } from '../../api/post'
import dateFormat from 'dateformat'
import { connect, useDispatch } from 'react-redux'
import PostList from './PostList'
import PropTypes from 'prop-types'
import * as newActions from '../../redux/actions/newsAction'
import Roller from '../../components/Roller'
import reduxStore from '../../redux/store'
import moment from 'moment'
import NetInfoProvider from '../../components/NetInfoProvider'
import NetInfo from '@react-native-community/netinfo';
import RenderEmpty from '../../components/RenderEmpty'

let pageNo = 0;
const limit = 50;

let pageNo1 = 0;
const limit1 = 10;

const AllGist = ({ ...props }) => {
  // console.log('first', props)

  const dispatch = useDispatch()

  const [featuredPosts, setFeaturedPosts] = useState([])
  const [latestPost, setLatestPost] = useState([])
  const [reachedEnd, setReachedEnd] = useState(false)
  const [busy, setBusy] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [commentErr, setCommentErr] = useState(false)

  // console.log('latest postttttt', latestPost)
  // console.log('featured postttttt', featuredPosts)
  const [load, setLoad] = useState(true);
  // const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(true)
  const [k, setK] = useState(false)

  // const fetchFeaturePost = async () =>{
  //     try{
  // const { isConnected } = await NetInfo.fetch();
  // const state = reduxStore.getState();
  // const existingPosts = await state.news.featuredPost;
  // if(!isConnected){
  //     setFeaturedPosts(existingPosts)
  // }
  //     const { error, posts } = await getFeaturedPosts();
  //     console.log('this is featured post', posts)
  //     if (error)  console.log('feature-post-error',error)

  //     if(isConnected){
  //     setFeaturedPosts(posts)
  //     console.log('.........featured online')
  //     }


  //     if(isConnected){
  //         const filterFeaturedPost = posts.filter(post => !existingPosts.some(p => p.id === post.id));
  //         if (filterFeaturedPost.length > 0) {
  //             const allPosts = [...existingPosts, ...filterFeaturedPost];
  //             dispatch(newActions.updateFeaturedPost(allPosts));
  //           }
  //     }

  // } catch (error) {
  //     console.error('Error fetching featured post: ', error);
  //   }
  // }

  // const fetchLatestPosts = async () => {
  //   try {
  //     const { isConnected } = await NetInfo.fetch();
  //     const state = reduxStore.getState();
  //         const existingPosts = await state.news.posts;
  //         // console.log('existingggggggggg',existingPosts)
  //     if(!isConnected){
  //         setLatestPost(existingPosts)
  //     }
  //     const { error, posts } = await getLatestPosts(limit, pageNo);
  //     console.log('this is latest post', posts);
  //     // if (error) return console.log('djjdjd',error);
  //     if (error)  console.log('djjdjd',error);

  //     if (isConnected) {
  //       setLatestPost(posts);
  //       console.log('online....................')
  //     }

  //     // Filter out any posts that already exist in the store
  //     if(isConnected){
  //     const filteredPosts = posts.filter(post => !existingPosts.some(p => p.id === post.id));

  //     // Add the filtered posts to the store
  //     if (filteredPosts.length > 0) {
  //       const allPosts = [...existingPosts, ...filteredPosts];
  //       dispatch(newActions.updatePostDetails(allPosts));
  //     }
  // }

  //     // Update the latest posts in the store
  //     // reduxStore.dispatch(newActions.updateLatestPosts(posts));
  //   } catch (error) {
  //     console.error('Error fetching latest post: ', error);
  //   }
  // };

  const fetchFeaturePost = async () => {
    try {
      const { isConnected } = await NetInfo.fetch();
      const state = reduxStore.getState();
      const existingPosts = await state.news.featuredPost || [];
      if (!isConnected) {
        // Sort the existing posts in descending order based on their creation date
        existingPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFeaturedPosts(existingPosts.slice(0, 4));
      } else {
        const featurePostsPromise = getFeaturedPosts();
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject('Request timed out');
          }, 10000);
        });
        const { error, posts } = await Promise.race([
          featurePostsPromise,
          timeoutPromise
        ]);
        // console.log('kkkkkkkkkkkkkkkkkkkk', posts)

        if (error) {
          console.log('Error fetching featured post: ', error);
          // setFeaturedPosts(existingPosts);
          // Display an error message to the user
        } else {
          posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setFeaturedPosts(posts.slice(0, 4));
          // console.log('kkkkkkkkkkkkkkkkkkkk', posts)
          // Sort the existing posts in descending order based on their creation date
          existingPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          const filteredPosts = posts.filter(
            post => !existingPosts.some(p => p.id === post.id)
          );
          if (filteredPosts.length > 0) {
            const allPosts = [...existingPosts, ...filteredPosts];
            allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            dispatch(newActions.updateFeaturedPost(allPosts));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching featured post: ', error);
      const state = reduxStore.getState();
      const existingPosts = state.news.featuredPost;

      setFeaturedPosts(existingPosts.slice(0, 4));
    } /* finally{
      const state = reduxStore.getState();
      const existingPosts = state.news.featuredPost;

      setFeaturedPosts(existingPosts.slice(0,4));
    } */
  };


  const fetchLatestPosts = async () => {
    try {
      const { isConnected } = await NetInfo.fetch();
      const state = reduxStore.getState();
      const existingPosts = state.news.posts || [];

      if (!isConnected) {
        // Sort the existing posts in descending order based on their creation date
        existingPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestPost(existingPosts.slice(0, 30));
      } else {
        const latestPostsPromise = getLatestPosts(limit, pageNo);
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject('Request timed out');
          }, 10000);
        });
        const { error, posts } = await Promise.race([latestPostsPromise, timeoutPromise]);
        if (error) {
          console.log('Error fetching latest posts: ', error);
          // Display an error message to the user
        } else {
          // Sort the fetched posts in descending order based on their creation date
          posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLatestPost(posts.slice(0, 30));

          // Sort the existing posts in descending order based on their creation date
          existingPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          const filteredPosts = posts.filter((post) => !existingPosts.some((p) => p.id === post.id));

          if (filteredPosts.length > 0) {
            const allPosts = [...existingPosts, ...filteredPosts];
            allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            dispatch(newActions.updatePostDetails(allPosts));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching latest posts: ', error);
      const state = reduxStore.getState();
      const existingPosts = state.news.posts || [];
      setLatestPost(existingPosts.slice(0, 30));
    }
    /* finally {
        // Set the latest posts to the existing posts if an error occurs or the request times out
        const state = reduxStore.getState();
        const existingPosts = state.news.posts;
  
        setLatestPost(existingPosts);
      } */
  };

  // const fetchLatestPosts = async () => {
  //   try {
  //     const { isConnected } = await NetInfo.fetch();
  //     const state = reduxStore.getState();
  //     const existingPosts = await state.news.posts;
  //     if (!isConnected) {
  //       // Sort the existing posts in descending order based on their creation date
  //       existingPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //       setLatestPost(existingPosts);
  //     } else {
  //       const latestPostsPromise = getLatestPosts(limit, pageNo);
  //       const timeoutPromise = new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           reject('Request timed out');
  //         }, 10000);
  //       });
  //       const { error, posts } = await Promise.race([
  //         latestPostsPromise,
  //         timeoutPromise
  //       ]);
  //       if (error) {
  //         // console.log('Error fetching latest posts: ', error);
  //         setLatestPost(existingPosts)
  //         // Display an error message to the user
  //       } else {
  //         // Sort the fetched posts in descending order based on their creation date
  //         posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  //         setLatestPost(posts);

  //         // Sort the existing posts in descending order based on their creation date
  //         existingPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  //         const filteredPosts = posts.filter(post => !existingPosts.some(p => p.id === post.id));

  //         if (filteredPosts.length > 0) {
  //             const allPosts = [...existingPosts, ...filteredPosts];

  //             // Sort all the posts in descending order based on their creation date
  //             allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  //             dispatch(newActions.updatePostDetails(allPosts));
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching latest posts: ', error);
  //   }
  // };


  useEffect(() => {
    fetchLatestPosts()
    fetchFeaturePost()
  }, [])


  const handleRefresh = () => {
    setRefreshing(true);
    fetchFeaturePost();
    fetchLatestPosts();
    setRefreshing(false);
  };

  const withNetworkCheck = (fn) => async (...args) => {
    try {
      const { isConnected } = await NetInfo.fetch();
      if (!isConnected) {
        // Handle the case where the device is offline
        ToastAndroid.show("You're offline!", ToastAndroid.SHORT);

        return;
      }
      return await fn(...args);
    } catch (error) {
      console.log('Error checking network connectivity', error);

    }
  };

  const fetchSinglePost = withNetworkCheck(async (slug) => {
    try {
      // Set the loading state to true
      setK(true)
      // Call the API to get the post
      const { error, post, success } = await getSinglePost(slug);
      setK(false)
      // If there was an error, log it
      if (error) {
        console.log('fetch-single-post-error', error);
        return;
      }
      if (success === true) {
        navigation.navigate('PostDetail', { post });
      } else {
        ToastAndroid.show("Check Internet Connectivity!", ToastAndroid.SHORT);
      }
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching single post: ', error);
    }/* finally {
          // Set the loading state to false, regardless of whether the fetch succeeded or failed
          setK(false)
          
        }
        */
  })

  //   useEffect(()=>{
  //     fetchLatestPosts()
  //   }, [])

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoad(true); // Set the loader to be visible
        await Promise.all([
          fetchLatestPosts(),
          fetchFeaturePost(),
        ]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setTimeout(() => {
          setLoad(false); // Set the loader to be hidden after 2 seconds
        }, 4000);
      }
    };
    fetchAllData();
  }, []);

  const navigation = useNavigation();

  const NewsToday = () => {
    const getImage = (uri) => {
      if (uri) return { uri };
      return images.image6;
    }
    const _renderTemlate = ({ item }) => {
      // Assume createdAt is the ISO-8601 timestamp string you receive from your backend
      const createdAt = item?.createdAt
      // console.log(createdAt, 'llllllllllllll')

      // Use Moment.js to parse the createdAt string with the ISO 8601 format
      const createdAtMoment = moment(createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ');

      // Use Moment.js to calculate the time difference between the createdAt timestamp and the current time
      const timeDiff = moment.duration(moment().diff(createdAtMoment));

      // Use the time difference to determine the appropriate format for the output string
      let formattedTime;

      if (timeDiff.asDays() > 7) {
        // If the post was created more than a week ago, display the date in the format "YYYY-MM-DD"
        formattedTime = moment(createdAtMoment).format('YYYY-MM-DD');
      } else if (timeDiff.asDays() > 1) {
        // If the post was created more than a day ago but less than a week ago, display the time in the format "X days ago"
        formattedTime = moment(createdAtMoment).fromNow();
      } else if (timeDiff.asHours() >= 1) {
        // If the post was created within the last day but more than an hour ago, display the time in the format "X hours ago"
        formattedTime = moment(createdAtMoment).subtract(moment().utcOffset(), 'minutes').fromNow();
      } else if (timeDiff.asMinutes() >= 1) {
        // If the post was created within the last hour but more than a minute ago, display the time in the format "X minutes ago"
        formattedTime = moment(createdAtMoment).local().fromNow();
      } else {
        // If the post was created within the last minute, display the time as "just now"
        formattedTime = 'just now';
      }
      return (
        <TouchableOpacity onPress={() => fetchSinglePost(item.slug)} activeOpacity={0.7} style={styles.latestCtn}>
          <View>
            <Image source={getImage(item.thumbnail)} style={{ height: SIZES.height * 0.23, width: SIZES.width * 0.649, borderTopLeftRadius: SIZES.h4, borderTopRightRadius: SIZES.h4 }} />
            <View style={{ position: 'absolute', bottom: 5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.base }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{ height: SIZES.base, width: SIZES.base, backgroundColor: 'yellow', borderRadius: 100, }} />
                <Text style={{ ...FONTS.body4, fontWeight: 'bold', color: COLORS.white, marginLeft: SIZES.base }}>gist</Text>
              </View>
              <Text style={{ ...FONTS.body4, fontWeight: 'bold', color: COLORS.white }}>{formattedTime}</Text>
            </View>
          </View>
          <Text numberOfLines={2} style={{ marginTop: SIZES.base * 0.7, color: COLORS.black, fontSize: SIZES.body4 * 1.1, fontFamily: 'Roboto-Medium', fontWeight: '600', marginHorizontal: SIZES.base, }}>{item.title}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <Text style={{ ...FONTS.body2b, fontWeight: 'bold', color: COLORS.primary, marginBottom: SIZES.base * 0.9 }}>Gists Today</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={featuredPosts}
          ListEmptyComponent={RenderEmpty}
          renderItem={({ item }) => <_renderTemlate item={item} />}
        />
        <Text style={{ ...FONTS.body2b, fontWeight: 'bold', color: COLORS.primary, marginBottom: SIZES.h5, marginTop: SIZES.base * 0.7, marginBottom: SIZES.base * 0.05 }}>Latest Gists</Text>
      </View>
    )
  }

  const renderHeader = () => {
    const categoryData = [
      {
        id: 1,
        title: 'Technology',
        iconName: icons.technology,
        onPress: () => { },
        // onPress: () =>navigation.navigate('Technology'),
      }, {
        id: 2,
        title: 'Entertainment',
        iconName: icons.entertainment,
        onPress: () => { },
        // onPress: () =>navigation.navigate('Entertainment'),
      }, {
        id: 3,
        title: 'Campus',
        iconName: icons.campus,
        test: true,
        onPress: () => navigation.navigate('Campuses'),
      }, {
        id: 4,
        title: 'Sport',
        iconName: icons.sport,
        // test: true,
        onPress: () => { },
        // onPress: () =>navigation.navigate('Sport'),
      }, {
        id: 5,
        title: 'LifeStyle',
        iconName: icons.lifestyle,
        onPress: () => {
          // dispatch(newActions.clearNews());
        },
        // onPress: () =>navigation.navigate('Lifestyle'),
      },
    ];
    return (
      <View style={{}}>
        {/* <NetInfoProvider/> */}
        <Text style={{ ...FONTS.body3, color: COLORS.orange, marginBottom: SIZES.base / 2 }}>Categories</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          // contentContainerStyle={{backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}
          data={categoryData}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={item.onPress} style={{ marginRight: SIZES.h2 * 1, marginTop: SIZES.base / 4, marginBottom: SIZES.base * 0.5 }}>
                <View style={[styles.categoryCtn, { backgroundColor: item.test ? COLORS.semiblue : COLORS.grey3 }]}>
                  <Image source={item.iconName} style={{ height: SIZES.h2 * 1.3, width: SIZES.h2 * 1.3, tintColor: item.test ? COLORS.white : COLORS.chocolate }} />
                </View>
                <Text style={{ textAlign: 'center', ...FONTS.body5, color: COLORS.blue }}>{item.title}</Text>
              </TouchableOpacity>
            )
          }}
        />
        <NewsToday />
      </View>
    )
  }


  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* <Slider /> */}
      {/* {load ? <Roller visible={true} /> : null}
      {loading && <Roller visible={true} />}
      {k ? <Roller visible={true} /> : null} */}
      {commentErr && <Toast message="Network Error" type="fail" />}
      <View style={{ paddingHorizontal: SIZES.width * 0.03, marginTop: SIZES.h4, marginBottom: SIZES.h1 * 2 }}>
        <FlatList
          // ListHeaderComponent={Slider}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item) => item.id}
          ListHeaderComponentStyle={{ marginBottom: SIZES.h5 }}
          showsVerticalScrollIndicator={false}
          // data={homePostData}
          data={latestPost}
          ListEmptyComponent={RenderEmpty}
          // renderItem={({ item }) => <RenderItem data={item} />}
          // renderItem={({item})=> <NewsToday data={item}/>}
          renderItem={({ item }) => <PostList data={item} />}
          // onEndReached={async () => await fetchMorePosts()}
          onEndReachedThreshold={1}
          ListFooterComponent={() => {
            return reachedEnd ? <Text style={{ color: COLORS.orange, textAlign: 'center', paddingVertical: 50 }}>You reached to end!</Text> : null
          }}
          refreshControl={
            <RefreshControl
              colors={[COLORS.primary, COLORS.blue]}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
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
  categoryCtn: {
    height: SIZES.h1 * 1.4,
    width: SIZES.h1 * 1.6,
    borderRadius: SIZES.base,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey3,
  },
  latestCtn: {
    height: SIZES.height * 0.293,
    width: SIZES.width * 0.65,
    borderRadius: SIZES.h4,
    marginRight: SIZES.h4,
    // borderWidth: 1,
    backgroundColor: COLORS.grey2,
  },
})

// const fetchMorePosts = async () => {
//     console.log('runnings')
//     if (reachedEnd || busy) return;

//     pageNo += 1;
//     setBusy(true)
//     const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
//     setBusy(false)
//     if (error) return console.log(error)

//     if (postCount === latestPost.length) return setReachedEnd(true)

//     // console.log('post', posts)

//     setLatestPost([...latestPost, ...posts])
// }