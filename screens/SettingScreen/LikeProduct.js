import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DiscussionTemplate from '../ForumScreen/DiscussionTemplate';

const { width, height } = Dimensions.get('window');

const LikeProduct = () => {
    const data = [{ "author": { "_id": "648a0da1e69d3b576f9809db", "avatar": "", "firstName": "Jewoola", "lastName": "Favour", "username": "Favour28" }, "category": { "_id": "6497a96c98e7e5dd02f07c97", "name": "Trending" }, "comments": 0, "createdAt": "2023-06-26T20:33:23.604Z", "id": "6499f61337480eca770353e7", "likedByCurrentUser": false, "reactions": 0, "title": "Still working on, hope to be done by Saturday " }, { "author": { "_id": "6487ac538376a63b354407c6", "avatar": "", "firstName": "Jewoola", "lastName": "Peace", "username": "Peace28" }, "category": { "_id": "6497a96398e7e5dd02f07c93", "name": "Education" }, "comments": 0, "createdAt": "2023-06-26T19:37:15.934Z", "id": "6499e8e737480eca7703528f", "likedByCurrentUser": false, "reactions": 0, "thumbnail": { "public_id": "wl2rjykehblbomfidtef", "url": "https://res.cloudinary.com/dr0nfchqe/image/upload/v1687779419/wl2rjykehblbomfidtef.jpg" }, "title": "Patience Jonathan Gets Emotional On Condolence Visit To Raymond Dokpesi's Family" }, { "author": { "_id": "6487ac538376a63b354407c6", "avatar": "", "firstName": "Jewoola", "lastName": "Peace", "username": "Peace28" }, "category": { "_id": "6497a96398e7e5dd02f07c93", "name": "Education" }, "comments": 2, "createdAt": "2023-06-26T18:52:05.523Z", "id": "6499de40610bf5d6dcc7b87f", "likedByCurrentUser": false, "reactions": 0, "thumbnail": { "public_id": "pqdwlpziubagybjj7vhy", "url": "https://res.cloudinary.com/dr0nfchqe/image/upload/v1687776709/pqdwlpziubagybjj7vhy.jpg" }, "title": "Test 3" }, { "author": { "_id": "6487ac538376a63b354407c6", "avatar": "", "firstName": "Jewoola", "lastName": "Peace", "username": "Peace28" }, "category": { "_id": "6497a96398e7e5dd02f07c93", "name": "Education" }, "comments": 0, "createdAt": "2023-06-25T18:40:05.662Z", "id": "64988a05610bf5d6dcc7b84e", "likedByCurrentUser": false, "reactions": 0, "title": "Soon Testing " }, { "author": { "_id": "648a0da1e69d3b576f9809db", "avatar": "", "firstName": "Jewoola", "lastName": "Favour", "username": "Favour28" }, "category": { "_id": "6480f38dc48562a546f39ba4", "name": "Cooking" }, "comments": 1, "createdAt": "2023-06-23T21:21:00.048Z", "id": "64960cbcfc353584806cc0b5", "likedByCurrentUser": false, "reactions": 0, "title": "Just to make it 5 cooking " }, { "author": { "_id": "648a0da1e69d3b576f9809db", "avatar": "", "firstName": "Jewoola", "lastName": "Favour", "username": "Favour28" }, "category": { "_id": "6480f38dc48562a546f39ba4", "name": "Cooking" }, "comments": 0, "createdAt": "2023-06-23T04:37:35.316Z", "id": "6495218fd4d0e795bfd77081", "likedByCurrentUser": false, "reactions": 0, "title": "22 21" }, { "author": { "_id": "648a0da1e69d3b576f9809db", "avatar": "", "firstName": "Jewoola", "lastName": "Favour", "username": "Favour28" }, "category": { "_id": "6480f38dc48562a546f39ba4", "name": "Cooking" }, "comments": 2, "createdAt": "2023-06-14T19:30:45.920Z", "id": "648a1565e69d3b576f980add", "likedByCurrentUser": false, "reactions": 0, "title": "Ello uj I've said it before and I will say it again that if you are waiting for me to say it again remember that I said it before. Good morning" }, { "author": { "_id": "648a0da1e69d3b576f9809db", "avatar": "", "firstName": "Jewoola", "lastName": "Favour", "username": "Favour28" }, "category": { "_id": "6480f38dc48562a546f39ba4", "name": "Cooking" }, "comments": 0, "createdAt": "2023-06-14T19:22:41.408Z", "id": "648a1381e69d3b576f980a91", "likedByCurrentUser": false, "reactions": 0, "title": "Hello" }, { "author": { "_id": "648a0da1e69d3b576f9809db", "avatar": "", "firstName": "Jewoola", "lastName": "Favour", "username": "Favour28" }, "category": { "_id": "6480f38dc48562a546f39ba4", "name": "Cooking" }, "comments": 0, "createdAt": "2023-06-14T18:59:54.736Z", "id": "648a0e2ae69d3b576f980a31", "likedByCurrentUser": false, "reactions": 0, "title": "Hello Everyone " }, { "author": null, "category": { "_id": "6480f38dc48562a546f39ba4", "name": "Cooking" }, "comments": 1, "createdAt": "2023-06-07T21:16:17.162Z", "id": "6480f3a1c48562a546f39ba9", "likedByCurrentUser": true, "reactions": 1, "title": "Food One" }];
    const Tab = createMaterialTopTabNavigator();
    const [refreshing, setRefreshing] = useState();
    const Post = () => {
        const RenderEmpty = () => {
            return (
                <View>
                    <Text style={{ fontSize: SIZES.h1 * 1.5, color: COLORS.black, fontFamily: 'Roboto-Medium', marginBottom: 10 }}>You haven't Posted yet</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.black }}>When you post, it'll show up here.</Text>
                </View>
            )
        }
        return (
            <View style={styles.page}>

                <FlatList
                    data={data}
                    ListEmptyComponent={RenderEmpty}
                    renderItem={({ item }) => <DiscussionTemplate data={item} />}
                    refreshControl={
                        <RefreshControl
                            colors={[COLORS.primary, COLORS.blue]}
                            refreshing={refreshing}
                        // onRefresh={handleRefresh}
                        />
                    }
                />
                <View style={{ marginBottom: SIZES.h4, }} />
            </View>
        )
    }
    const Media = () => {
        return (
            <View style={styles.page2}>
                <Text style={{ fontSize: SIZES.h1 * 1.5, color: COLORS.black, fontFamily: 'Roboto-Medium', marginBottom: 10 }}>You don't have any Media yet</Text>
                <Text style={{ ...FONTS.body2, color: COLORS.black }}>When you post, it'll show up here.</Text>
            </View>
        )
    }
    const Saved = () => {
        return (
            <View style={styles.page2}>
                <Text style={{ fontSize: SIZES.h1 * 1.5, color: COLORS.black, fontFamily: 'Roboto-Medium', marginBottom: 10 }}>You haven't Saved yet</Text>
                <Text style={{ ...FONTS.body2, color: COLORS.black }}>When you saved, it'll show up here.</Text>
                {/* <TouchableOpacity>
                    <Text>Posts now</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    return (
        <View
            style={{
                // paddingHorizontal: SIZES.width * 1,
                width,
                height,
                backgroundColor: COLORS.white,
            }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // tabBarShowLabel: true,
                    tabBarIndicatorStyle: {
                        backgroundColor: COLORS.orange,
                        height: 3.0,
                        borderRadius: SIZES.radius,
                    },
                })}
            >
                <Tab.Screen name="Post" component={Post} />
                <Tab.Screen name="Media" component={Media} />
                <Tab.Screen name="Saved" component={Saved} />
            </Tab.Navigator>
        </View>
    )
}

export default LikeProduct

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    page2: {
        flex: 1,
        backgroundColor: COLORS.white,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: SIZES.h1 * 1.5,
        paddingHorizontal: SIZES.h2,
    },
})