import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import RelatedPost from './RelatedPost';
import dateFormat from 'dateformat';
import commentData from './commentData';
import CommentSection from './CommentSection';
import { Formik } from 'formik';
import * as yup from 'yup';
import { addComment, getSinglePost, toggleLike } from '../../api/post';
import { connect } from 'react-redux'


import { handleLike, handleUnlike } from '../../api/post';

const copy = `# h1 Heading 8-)
 
**This is some bold text!**
 
This is normal text
`;

const commentValidationSchema = yup.object().shape({
    comment: yup
        .string('Please enter a comment')
        .required('comment is required'),
})

const PostDetail = ({ route, ...props }) => {
    const navigation = useNavigation();
    const [clicked, setClicked] = useState(false)
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    // useEffect(() => { route }, [])
    console.log('this is props', props)
    // const post = route.params?.post;
    const { post } = route.params;
    const accessToken = props.accessToken
    // console.log('first', accessToken)
    // console.log('first', token)

    // const [post, setPost] = useState({})
    // const token = route.params?.accessToken;
    // const token = route.params.token
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2M3M2NhMGZmNDNiNGIwNTk0ZWQ0MyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzYzNDAyMjksImV4cCI6MTY3NjQyNjYyOX0.wc_B1hnKRQSVmkr474_yZKT-vvH2gUwiKXEeOuDnMUI";
    console.log('token', accessToken)

    const getImage = (uri) => {
        if (uri) return { uri };

        return images.image2
    }

    if (!post) return null;

    const { title, thumbnail, tags, createdAt, author, content, id, like } = post;
    // const [liked, setLiked] = useState(like);
    // const [cool, setCool] = useState(false)
    const [liked, setLiked] = useState(like);
    const [likeCount, setLikeCount] = useState(like);

    console.log('post details', post)

    const postId = id;
    console.log('first', postId)

    const handleToggle = async (postId, accessToken) => {
        console.log('access token testing', accessToken)
        console.log('firstdddddddd', postId)


        const data = await handleLike(postId, accessToken)
        // setLiked(!liked + 1)
        setLiked(!liked)
        setLikeCount(liked ? likeCount - 1 : likeCount + 1)

        console.log('erroe for toogle', data)
        // console.log('data hhhh', message)

    }

    const [test, setTest] = React.useState(false)
    return (
        <KeyboardAvoidingView enabled={true} behavior='height' style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <StatusBar />
                {/* HEADER SECTION */}
                <View style={{ backgroundColor: COLORS.primary }}>
                    <View style={styles.headerCtn}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: SIZES.h2, paddingVertical: SIZES.h5 }}>
                            <Image source={icons.arrowleft} style={{ tintColor: COLORS.white, height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingLeft: 10, paddingVertical: 4 }}>
                            <Image source={icons.verticalmenu} style={{ tintColor: COLORS.white, height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ height: 1.5, elevation: 1, backgroundColor: '#cdcdcd' }} /> */}
                </View>

                {/* ScrollView */}
                {/* <View> */}
                <ScrollView key={id} style={{ flex: 1 }}>


                    {/* BODY  */}
                    <View style={{ paddingHorizontal: SIZES.width * 0.03, marginTop: SIZES.base }}>
                        <Text numberOfLines={3} style={{ ...FONTS.body2c, color: COLORS.black, fontWeight: 'bold', }}>{title}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SIZES.h4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Image source={images.profile4} style={{ width: SIZES.h1, height: SIZES.h1, borderRadius: 100 }} />
                                    </View>
                                    <View onPress={() => navigation.navigate('ProfilePage')}>
                                        <Text style={{ marginLeft: SIZES.h5, ...FONTS.body3b, color: COLORS.black }}>{author}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {/* <Text style={{ ...FONTS.body3a, color: COLORS.black, marginRight: SIZES.base / 2 }}>{dateFormat(createdAt, 'shortTime')}</Text>
                            <Text style={{ ...FONTS.body3a, color: COLORS.black }}>{dateFormat(createdAt, 'mediumDate')}</Text> */}
                                <TouchableOpacity onPress={() => setClicked(!clicked)} style={styles.followCtn}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: COLORS.white, ...FONTS.body3a, marginRight: SIZES.base * 0.7 }}>+</Text>
                                        <Text style={{ color: COLORS.white, ...FONTS.body3a }}>{clicked ? 'Following' : 'Follow'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {
                                tags.map((tag, index) => (
                                    <Text key={tag + index} style={{ ...FONTS.body3b, color: COLORS.black }}>#{tag}</Text>
                                ))
                            }
                        </View> */}

                        </View>
                        <View style={{ marginTop: SIZES.h4, marginBottom: SIZES.h4, }}>
                            <Image source={getImage(thumbnail)} style={{ height: SIZES.height / 2.9, width: SIZES.width * 0.94 }} />
                        </View>

                        <Markdown>
                            {content}
                        </Markdown>

                        {/* TOGGLE LIKE */}
                        <TouchableOpacity onPress={() => handleToggle(postId, accessToken)} style={styles.tooglelikeCtn}>
                            <Image source={icons.thumb} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                            <Text style={{ color: COLORS.white, ...FONTS.h3, marginLeft: SIZES.base }}>{likeCount}</Text>
                        </TouchableOpacity>
                        {/* RELATED POST  */}
                        {/* <RelatedPost postId={post.id} /> */}
                    </View>

                    {/* COMMENT SECTION */}
                    <View style={{ marginBottom: SIZES.h2 }}>
                        <View style={{ paddingHorizontal: SIZES.width * 0.05, flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.h4 * 1.3 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    <View style={{ height: SIZES.h3 * 0.95, width: 3, backgroundColor: COLORS.orange, marginRight: SIZES.h5 }} />
                                    <Text style={{ ...FONTS.h2, color: COLORS.blue, fontWeight: 'bold' }}>Comments</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('ViewAllComment')}>
                                    <Text style={{ ...FONTS.body3a, color: COLORS.orange }}>view all(26)</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            commentData.map((data, index) => <CommentSection item={data} index />)
                        }
                    </View>
                </ScrollView>
                {/* </View> */}
                {/* COMMENT BOX SECTION */}
                <View style={{ bottom: test ? 20 : 0 }}>
                    <Formik
                        validationSchema={commentValidationSchema}
                        initialValues={{
                            comment: ''
                        }}
                        onSubmit={async (values) => {
                            console.log('comment submitted', values, accessToken)
                            addComment(postId, values, accessToken)
                                .then(res => {
                                    console.log('response', res)
                                })
                                .catch(err => {
                                    console.log('comment error', err.response.data?.error)
                                    console.log('Error', err.response.data?.error)
                                })
                        }}
                    >
                        {({ handleSubmit, isValid, values, errors, handleChange, touched }) => {
                            useEffect(() => {
                                if (touched.comment) {
                                    setTest(!test)
                                }
                            }, [touched])

                            return (
                                <>
                                    <View style={styles.commentSection}>
                                        <View style={styles.textInputCtn}>
                                            <Image source={images.profile4} style={{ height: SIZES.h1, width: SIZES.h1, borderRadius: 100 }} />
                                            <TextInput
                                                name='comment'
                                                onChangeText={handleChange('comment')}
                                                numberOfLines={3}
                                                placeholder='Well, I think...'
                                                style={{ paddingHorizontal: SIZES.h5, flex: 1, ...FONTS.body3 }}
                                            />
                                            {/* BUTTON */}
                                            <TouchableOpacity onPress={handleSubmit}>
                                                <Image source={icons.send} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                            )
                        }}
                    </Formik>

                </View>
            </View>
        </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)

const styles = StyleSheet.create({
    roundIconCtn: {
        height: SIZES.h1 * 1.3,
        width: SIZES.h1 * 1.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: COLORS.white,
        position: 'absolute',
        top: SIZES.h4,
        left: SIZES.h4,
    },

    headerCtn: {
        paddingHorizontal: SIZES.width * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SIZES.base,
        justifyContent: 'space-between'
    },
    commentSection: {
        height: SIZES.h1 * 2,
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        // borderTopWidth: 1,
        justifyContent: 'space-between',
        // paddingHorizontal: SIZES.h5,
    },
    textInputCtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: SIZES.h1 * 1.7,
        backgroundColor: '#cdcdcd',
        borderRadius: SIZES.h5,
        width: SIZES.width * 0.8,
        marginHorizontal: SIZES.h5,
        paddingHorizontal: SIZES.base
    },
    sendCtn: {
        height: SIZES.h1 * 1.3,
        width: SIZES.h1 * 1.5,
        backgroundColor: COLORS.blue,
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooglelikeCtn: {
        height: SIZES.h1 * 1.9,
        width: SIZES.width * 0.6,
        backgroundColor: COLORS.orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.h1 * 0.9,
        alignSelf: 'center',
        flexDirection: 'row',
        marginVertical: SIZES.h5
    },
    followCtn: {
        height: SIZES.h1 * 1.1,
        width: SIZES.h1 * 3.2,
        backgroundColor: COLORS.orange,
        borderRadius: SIZES.h1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

// import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
// import React, { useEffect } from 'react'
// import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
// import { useNavigation } from '@react-navigation/native'

// const PostDetail = () => {
//     const navigation = useNavigation();
//     useEffect(() => {
//         navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
//         return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
//     }, [navigation]);
//     const RenderHeader = () => {
//         return (
//             <View>
//                 <View style={styles.headerCtn}>
//                     <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10, paddingVertical: 4 }}>
//                         <Image source={icons.arrowleft} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={{ paddingLeft: 10, paddingVertical: 4 }}>
//                         <Image source={icons.verticalmenu} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{ height: 1.5, elevation: 2, backgroundColor: '#cdcdcd' }} />
//             </View>
//         )
//     }
//     const PostContent = () => {
//         return (
//             <View style={{ paddingHorizontal: SIZES.width * 0.03, paddingTop: SIZES.base }}>
//                 <Text style={{ ...FONTS.body1, fontWeight: 'bold', color: COLORS.black }}>Nigeria Should Leave This Road To Venezuela</Text>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base / 2 }}>
//                     <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Image source={images.profile4} style={{ height: SIZES.h1, width: SIZES.h1, borderRadius: 100 }} />
//                         <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.h5 }}>Thenews-chronicle</Text>
//                     </TouchableOpacity>
//                     <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base }}>Oct 31, 2022</Text>
//                 </View>
//                 <View style={{ paddingTop: SIZES.h5 }}>
//                     <Image source={images.profile4} style={{ height: SIZES.width / 1.8, width: SIZES.width * 0.94 }} />
//                 </View>
//             </View>
//         )
//     }
//     return (
//         <View style={{ flex: 1, backgroundColor: COLORS.white }}>
//             <RenderHeader />
//             <View style={{ flex: 1 }}>
//                 <FlatList
//                     ListHeaderComponent={PostContent}
//                     data={''}
//                 />
//             </View>
//             <View style={styles.commentSection}>
//                 <View style={styles.textInputCtn}>
//                     <Image source={images.profile4} style={{ height: SIZES.h1, width: SIZES.h1, borderRadius: 100 }} />
//                     <TextInput numberOfLines={3} placeholder='Well, I think...' style={{ paddingHorizontal: SIZES.h5, flex: 1 }} />
//                 </View>
//                 <TouchableOpacity style={styles.sendCtn}>
//                     <Image source={icons.send} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.white }} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default PostDetail

// const styles = StyleSheet.create({
//     headerCtn: {
//         paddingHorizontal: SIZES.width * 0.03,
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: SIZES.base,
//         justifyContent: 'space-between'
//     },
//     commentSection: {
//         height: SIZES.h1 * 1.8,
//         backgroundColor: '#f2f2f2',
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderTopWidth: 1,
//         justifyContent: 'space-between',
//         paddingHorizontal: SIZES.h5,
//     },
//     textInputCtn: {
//         // flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: SIZES.h1 * 1.3,
//         backgroundColor: '#cdcdcd',
//         borderRadius: SIZES.h5,
//         width: SIZES.width * 0.8,
//         // marginLeft: SIZES.h5,
//         paddingHorizontal: SIZES.base
//     },
//     sendCtn: {
//         height: SIZES.h1 * 1.3,
//         width: SIZES.h1 * 1.5,
//         backgroundColor: COLORS.blue,
//         borderRadius: SIZES.radius,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// })