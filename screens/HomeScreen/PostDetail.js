import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import RelatedPost from './RelatedPost';

const copy = `# h1 Heading 8-)
 
**This is some bold text!**
 
This is normal text
`;

const PostDetail = ({ route }) => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    console.log('this is route', route)
    const post = route.params?.post;

    const getImage = (uri) => {
        if (uri) return { uri };

        return images.profile6
    }

    // const rules = {
    //     paragraph
    // }

    if (!post) return null;

    const { title, thumbnail, tags, createdAt, author, content } = post;

    return (
        <View>
            <StatusBar />
            <View>
                <View style={styles.headerCtn}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10, paddingVertical: 4 }}>
                        <Image source={icons.arrowleft} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 10, paddingVertical: 4 }}>
                        <Image source={icons.verticalmenu} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8 }} />
                    </TouchableOpacity>
                </View>
                {/* <View style={{ height: 1.5, elevation: 2, backgroundColor: '#cdcdcd' }} /> */}
            </View>

            {/* ScrollView */}
            <ScrollView>
                <View style={{}}>
                    <Image source={getImage(thumbnail)} style={{ height: SIZES.height / 2.4, width: SIZES.width }} />
                    {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundIconCtn}>
                    <Image source={icons.arrowleft} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                </TouchableOpacity> */}
                </View>

                {/* BODY  */}
                <View style={{ paddingHorizontal: SIZES.width * 0.02, marginTop: SIZES.base }}>
                    <Text style={{ ...FONTS.body2c, color: COLORS.black, fontWeight: 'bold', }}>Desire that they cannot foresee the pain and trouble</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity>
                                <Image source={images.profile4} style={{ width: SIZES.h1, height: SIZES.h1, borderRadius: 100 }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ marginLeft: SIZES.h5, ...FONTS.body3b, color: COLORS.black, fontWeight: 'bold' }}>{author}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {
                                tags.map((tag, index) => (
                                    <Text key={tag + index} style={{ ...FONTS.body3b, color: COLORS.black }}>#{tag}</Text>
                                ))
                            }
                        </View>

                    </View>
                    <Markdown>
                        {content}
                    </Markdown>

                    {/* RELATED POST  */}
                    {/* <RelatedPost postId={post.id} /> */}
                </View>
            </ScrollView>
        </View>
    )
}

export default PostDetail

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