import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, FlatList, Platform, Keyboard, ActivityIndicator } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
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
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';


import { handleLike, handleUnlike } from '../../api/post';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from '../../components/Toast';
import NetInfoProvider from '../../components/NetInfoProvider';
import { styless } from './cool';

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


    const { post } = route.params;

    const [postData, setPostData] = useState([post])

    const [comment3, setComment3] = useState(post?.comments)
    // console.log('iiiiiiiiiiiiiiiii', comment3)

    console.log('new possst', postData)

    const accessToken = props.accessToken
    const avatar = props.user?.avatar?.url
    console.log(avatar, 'kdkdkk')

    const getImage = (uri) => {
        if (uri) return { uri };

        return images.image6;
    }

    if (!post) return null;

    const { title, thumbnail, tags, author, content, id, like } = post;
    const [liked, setLiked] = useState(like);
    const [likeCount, setLikeCount] = useState(like);
    const [seeMore, setSeeMore] = useState(false)
    const [comment, setComment] = useState('')
    const [select, setSelect] = useState(false)
    const [pop, setPop] = useState(false)
    const [commentErr, setCommentErr] = useState(false)
    const [p, setP] = useState(false)
    const [processing, setProcessing] = useState(false)


    // const handleSubmit = async (postId) => {

    //     console.log('submitted comment', comment)

    //     if (comment.trim() === '') {
    //         setSelect(false)
    //     }
    //     const response = await addComment(postId, comment)
    //     if (response?.message === 'Comment added successfully') {
    //         setComment('')
    //         setPop(false)
    //         setComment3(current => [...comment3, response?.data])
    //     }
    //     if (response?.error)
    //         console.log('comment response', response)
    //     setCommentErr(false)
    //     setCommentErr(true)
    // }

    /*  const handleSubmit = async (postId) => {
          try {
              const { isConnected } = await NetInfo.fetch();
              if (isConnected) {
                  console.log('submitted comment', comment);
                  if (comment.trim() === '') {
                      setSelect(false);
                  }
                  const response = await addComment(postId, comment);
                  if (response?.message === 'Comment added successfully') {
                      setComment('');
                      setPop(false);
                      setComment3(current => [...comment3, response?.data]);
                  }
                  if (response?.error) {
                      console.log('comment response', response);
                  }
                  setCommentErr(false);
                  setCommentErr(true);
              } else {
                  // Handle the case where the device is offline
                  setP(false)
                  setP(true)
              }
          } catch (error) {
              console.log('Error fetching network connectivity status', error);
              // Handle the error case
          }
      };
  */

    const withNetworkCheck = (fn) => async (...args) => {
        try {
            const { isConnected } = await NetInfo.fetch();
            if (!isConnected) {
                // Handle the case where the device is offline
                setCommentErr(false);
                setCommentErr(true);
                return;
            }
            return await fn(...args);
        } catch (error) {
            console.log('Error checking network connectivity', error);

        }
    };

    const handleSubmit = withNetworkCheck(async (postId) => {
        setProcessing(true)
        console.log('submitted comment', comment);
        if (comment.trim() === '') {
            setSelect(false);
        }
        const response = await addComment(postId, comment);
        if (response?.message === 'Comment added successfully') {
            setComment('');
            setPop(false);
            setComment3(current => [...comment3, response?.data]);
        }
        if (response?.error) {
            console.log('comment response', response);
            setCommentErr(false);
            setCommentErr(true);
        }
        setProcessing(false)
    });


    // console.log('post details', post)

    const postId = id;
    // console.log('first', postId)

    const handleToggle = async (postId) => {
        const data = await handleLike(postId)
        setLiked(!liked)
        setLikeCount(liked ? likeCount - 1 : likeCount + 1)

        console.log('data from toogle', data)
    }

    // Assume createdAt is the ISO-8601 timestamp string you receive from your backend
    const createdAt = post?.createdAt
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

    const [test, setTest] = React.useState(false)
    return (
        <View style={{ flex: 1, paddingBottom: Keyboard.keyboardHeight }}>
            <StatusBar />
            {/* HEADER SECTION */}
            {p && <Toast message='Please connect to the  internet' type='fail' />}
            <View style={{ backgroundColor: COLORS.primary }}>
                <View style={styles.headerCtn}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: SIZES.h2, paddingVertical: SIZES.h5 }}>
                        <Image source={icons.arrowleft2} style={{ tintColor: COLORS.white, height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 10, paddingVertical: 4 }}>
                        <Image source={icons.verticalmenu} style={{ tintColor: COLORS.white, height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ height: 1.5, elevation: 1, backgroundColor: '#cdcdcd' }} /> */}
            </View>
            <FlatList
                data={postData}
                renderItem={({ item }) => {
                    return (
                        <View key={id} style={{}}>
                            {/* BODY  */}
                            <View style={{ paddingHorizontal: SIZES.width * 0.03, marginTop: SIZES.base }}>
                                <TouchableOpacity onPress={() => setSeeMore(!seeMore)}>
                                    <Text numberOfLines={seeMore ? 5 : 3} style={{ ...FONTS.body2c, color: COLORS.black, fontWeight: 'bold', }}>{item.title}</Text>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SIZES.h4 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity /* onPress={() => navigation.navigate('ProfilePage')} */ style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View>
                                                <Image source={images.avatar} style={{ width: SIZES.h1, height: SIZES.h1, borderRadius: 100 }} />
                                            </View>
                                            <View onPress={() => navigation.navigate('ProfilePage')}>
                                                <Text style={{ marginLeft: SIZES.h5, ...FONTS.body3b, color: COLORS.black }}>{item.author}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {/* {/* <Text style={{ ...FONTS.body3a, color: COLORS.black, marginRight: SIZES.base / 2 }}>{dateFormat(createdAt, 'shortTime')}</Text> */}
                                        <Text style={{ ...FONTS.body3, color: COLORS.black }}>{formattedTime}</Text>
                                        {/* <TouchableOpacity onPress={() => setClicked(!clicked)} style={styles.followCtn}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: COLORS.white, ...FONTS.body3a, marginRight: SIZES.base * 0.7 }}>+</Text>
                                                <Text style={{ color: COLORS.white, ...FONTS.body3a }}>{clicked ? 'Following' : 'Follow'}</Text>
                                            </View>
                                        </TouchableOpacity> */}
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
                                    <Image source={getImage(item.thumbnail)} style={{ resizeMode: 'cover', height: SIZES.height / 2.9, width: SIZES.width * 0.94 }} />
                                </View>

                                <Markdown style={{ ...styless, paragraph: { marginTop: 0, marginBottom: 0 }, text: { fontFamily: 'Roboto-Regular', color: COLORS.grey, lineHeight: SIZES.h1, } }}>
                                    {item.content}
                                </Markdown>


                                {/* TOGGLE LIKE */}
                                {/* <TouchableOpacity onPress={() => handleToggle(postId)} style={styles.tooglelikeCtn}>
                                    <Image source={icons.thumb} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                                    <Text style={{ color: COLORS.white, ...FONTS.h3, marginLeft: SIZES.base }}>{likeCount}</Text>
                                </TouchableOpacity> */}
                                {/* RELATED POST  */}
                                {/* <RelatedPost postId={post.id} /> */}
                            </View>

                            {/* COMMENT SECTION */}
                            <View style={{ marginBottom: SIZES.h3, marginTop: SIZES.h1 }}>
                                <View style={{ paddingHorizontal: SIZES.width * 0.05, flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.h4 * 1.3 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                            <View style={{ height: SIZES.h3 * 0.95, width: 3, backgroundColor: COLORS.orange, marginRight: SIZES.h5 }} />
                                            <Text style={{ ...FONTS.h3a, color: COLORS.blue, fontWeight: 'bold' }}>Comments</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => navigation.navigate('ViewAllComment', { data: item.comments })}>
                                            <Text style={{ ...FONTS.body3a, color: COLORS.orange }}>view all({item.commentlength})</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* {
                                    commentData.map((data, index) => <CommentSection item={data} index />)
                                } */}
                                <FlatList
                                    data={comment3}
                                    renderItem={({ item }) => <CommentSection data={item} />}
                                />
                            </View>
                        </View>
                    )
                }}
            />

            {/* </View> */}
            {/* COMMENT BOX SECTION */}
            <View style={{}}>
                {commentErr && <Toast message="Network Error" type="fail" />}

                <View style={styles.commentSection}>
                    <View style={styles.textInputCtn}>
                        <Image source={images.avatar} style={{ height: SIZES.h1, width: SIZES.h1, borderRadius: 100 }} />
                        <TextInput
                            value={comment}
                            onChangeText={value => {
                                setComment(value)
                                if (value.trim().length > 0) {
                                    setPop(true)
                                } else {
                                    setPop(false)
                                }
                            }}
                            numberOfLines={3}
                            placeholder='Well, I think...'
                            style={{ paddingHorizontal: SIZES.base, flex: 1, ...FONTS.body3 }}
                        />
                        {/* BUTTON */}

                    </View>
                    <View>
                        {processing ? (
                            <View style={[styles.sendBox, { backgroundColor: COLORS.chocolate }]}>
                                <ActivityIndicator color={COLORS.white} size={SIZES.h1 * 0.9} />
                            </View>
                        ) : (
                            <View>
                                {
                                    pop ?
                                        <TouchableOpacity
                                            onPress={() => handleSubmit(postId)}
                                            style={[styles.sendBox,]}
                                        // disabled={!commentText} // Disable the button if the comment input is empty
                                        >
                                            <Image source={icons.send2} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.white }} />
                                        </TouchableOpacity>
                                        :
                                        <View
                                            // onPress={() => handleSubmit(postId)}
                                            style={[styles.sendBox, { backgroundColor: COLORS.chocolate }]}
                                        // disabled={!commentText} // Disable the button if the comment input is empty
                                        >
                                            <Image source={icons.send2} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.white }} />
                                        </View>


                                }
                            </View>
                        )}
                    </View>
                    {/* Note that I added the disabled prop to the TouchableOpacity component to disable the button if the comment input is empty. You may want to modify this behavior depending on your requirements. */}







                </View>
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
        marginLeft: SIZES.base,
        marginRight: SIZES.base / 2,
        paddingHorizontal: SIZES.base / 2
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
        width: SIZES.h1 * 3.3,
        backgroundColor: COLORS.orange,
        borderRadius: SIZES.h1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendBox: {
        height: SIZES.h1 * 1.8,
        width: SIZES.h1 * 1.8,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.h1,
        marginRight: SIZES.base,
    },
})

// I'm having a issue in my naviation in react native

// the flow
// Home => PostDetail => Poster Account

// When I get to Poster Account and Press the  back button, it navigate to "Home"


// But because of the Input in PostDetail I structed the stack in another way
// Stack Navigator for App is where "PostDetail" is

// And The "Home" is in Bottom Tab

// And the "PostDetails" is in Home Stack all screens in home is in "HomeStack", can you help

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