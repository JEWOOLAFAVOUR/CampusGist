import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import Slider from './Slider'
import { homeData } from './homeData'
import { useNavigation } from '@react-navigation/native'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import PostList from './PostList'
import { getEntertainmentPosts } from '../../api/post2'


let pageNo = 0;
const limit = 5;

const Entertainment = ({ ...props }) => {
    const { accessToken, user } = props;
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [latestPost, setLatestPost] = useState([])
    const [reachedEnd, setReachedEnd] = useState(false)
    const [busy, setBusy] = useState(false)

    const fetchLatestPosts = async () => {
        const { error, posts } = await getEntertainmentPosts(limit, pageNo);
        console.log('this is latest post', posts)
        if (error) return console.log(error)

        // console.log('post', posts)

        setLatestPost(posts)
    }

    const fetchMorePosts = async () => {
        console.log('runnings')
        if (reachedEnd || busy) return;

        pageNo += 1;
        setBusy(true)
        const { error, posts, postCount } = await getEntertainmentPosts(limit, pageNo);
        setBusy(false)
        if (error) return console.log(error)

        if (postCount === latestPost.length) return setReachedEnd(true)

        // console.log('post', posts)

        setLatestPost([...latestPost, ...posts])
    }
    const handlePostPress = (post) => {
        navigation.navigate('PostDetail', {})
    }

    useEffect(() => {
        fetchLatestPosts()
    }, [])

    const navigation = useNavigation();
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
                    // renderItem={({ item }) => <RenderItem data={item} />}
                    renderItem={({ item }) => <PostList data={item} />}
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

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
    }
}

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(Entertainment)

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