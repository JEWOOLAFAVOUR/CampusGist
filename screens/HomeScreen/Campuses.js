import { StyleSheet, Text, View, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import Slider from './Slider'
import { homeData } from './homeData'
import { useNavigation } from '@react-navigation/native'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import PostList from './PostList'
import { getCampusesPosts } from '../../api/post2'
import GoBack from '../../components/GoBack'
import Roller from '../../components/Roller'
import RenderEmpty from '../../components/RenderEmpty'


let pageNo = 0;
const limit = 15;

const Campuses = () => {
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [latestPost, setLatestPost] = useState([])
    const [reachedEnd, setReachedEnd] = useState(false)
    const [busy, setBusy] = useState(false);
    const [load, setLoad] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    const fetchLatestPosts = async () => {
        setLoad(true)
        const { error, posts } = await getCampusesPosts(limit, pageNo);
        setLoad(false)
        console.log('this is campus post', posts)
        if (error) return console.log(error)

        // console.log('post', posts)

        setLatestPost(posts.slice(0, 25))
    }

    const fetchMorePosts = async () => {
        console.log('runnings')
        if (reachedEnd || busy) return;

        pageNo += 1;
        setBusy(true)
        const { error, posts, postCount } = await getCampusesPosts(limit, pageNo);
        setBusy(false)
        if (error) return console.log(error)

        if (postCount === latestPost.length) return setReachedEnd(true)
        setLatestPost([...latestPost, ...posts])
    }

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoad(true); // Set the loader to be visible
                await Promise.all([
                    fetchLatestPosts(),
                ]);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setTimeout(() => {
                    setLoad(false); // Set the loader to be hidden after 2 seconds
                }, 5000);
            }
        };
        fetchAllData();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchLatestPosts();
        setRefreshing(false);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchLatestPosts();
        });
        return unsubscribe;
    }, [navigation]);
    const navigation = useNavigation();
    return (
        <View style={styles.page}>
            {load ? <Roller visible={true} /> : null}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <GoBack />
                <Text style={{ marginLeft: SIZES.h1, ...FONTS.h1, color: COLORS.primary }}><Text style={{ color: COLORS.orange }}>CG </Text>Campus</Text>
            </View>
            <View style={{ marginBottom: SIZES.base * 0.8 }} />
            <FlatList
                // ListHeaderComponent={Slider}
                keyExtractor={(item) => item.id}
                ListHeaderComponentStyle={{ marginBottom: SIZES.h5 }}
                ListHeaderComponent={<Text numberOfLines={3} style={{ ...FONTS.body3, color: COLORS.black, marginVertical: SIZES.base }}><Text style={{ fontWeight: 'bold' }}>Campus</Text> - Live happening in several campuses.</Text>}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={RenderEmpty}
                data={latestPost}
                // renderItem={({ item }) => <RenderItem data={item} />}
                renderItem={({ item }) => <PostList data={item} />}
                // onEndReached={async () => await fetchMorePosts()}
                // onEndReachedThreshold={1}
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
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
    }
}

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(Campuses)

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
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.h5,
        paddingHorizontal: SIZES.width * 0.05
    },
})