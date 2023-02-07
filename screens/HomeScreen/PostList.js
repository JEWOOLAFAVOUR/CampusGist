import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import dateFormat from 'dateformat'
import { getSinglePost } from '../../api/post';
import { useNavigation } from '@react-navigation/native';


const PostList = ({ data }) => {
    const [commentRec, setCommentRec] = useState(6)
    const [loveRec, setLoveRec] = useState(6)
    const [click, setClick] = useState(false)
    const navigation = useNavigation()
    const { thumbnail } = data;

    const getThumbnail = (uri) => {
        if (uri) return { uri }

        return images.profile2
    }


    const fetchSinglePost = async (slug) => {
        const { error, post } = await getSinglePost(slug)
        console.log('first jv', post)
        navigation.navigate('PostDetail', { post })
        if (error) console.log('singlepost error', error)

    }
    // useEffect(() => {
    //     fetchSinglePost()
    // }, [])
    return (
        <View style={styles.listCtn}>
            <View style={{ justifyContent: 'center', marginLeft: SIZES.base * 1.1 }}>
                <Image source={images.profile2} style={{ height: SIZES.h1 * 3.7, width: SIZES.h1 * 3.7, borderRadius: SIZES.h4 * 0.9 }} />
            </View>
            <View style={{ flex: 1, marginHorizontal: SIZES.h4, marginTop: SIZES.base, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: COLORS.grey, fontSize: SIZES.body3, fontFamily: 'Roboto-Regular', marginBottom: 2 }}>Life_Updates</Text>
                    <Image source={images.profile2} style={{ height: SIZES.h1, width: SIZES.h1, borderRadius: 100 }} />
                </View>
                <TouchableOpacity onPress={() => fetchSinglePost(data.slug)}>
                    <Text numberOfLines={2} style={{ color: COLORS.black, fontSize: SIZES.body3 * 1.2, fontFamily: 'Roboto-Medium', fontWeight: '700' }}>{data.title}</Text>
                </TouchableOpacity>
                {/* REACTION  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: SIZES.base * 0.9 }}>
                    <Text>4 hours ago</Text>
                    <Text style={{ marginHorizontal: SIZES.base }}>-</Text>
                    <TouchableOpacity onPress={() => setCommentRec(commentRec + 1)} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: SIZES.base * 1.5 }}>
                        <Image source={icons.comment2} style={{ height: SIZES.h3 * 1.1, width: SIZES.h3 * 1.1, }} />
                        <Text style={{ marginLeft: SIZES.base * 0.8 }}>{commentRec}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLoveRec(loveRec + 1) & setClick(!click)} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.base * 1.5 }}>
                        <Image source={click ? icons.love1 : icons.love2} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.orange }} />
                        <Text style={{ marginLeft: SIZES.base * 0.8 }}>{loveRec}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    // return (
    //     <View style={styles.gistCtn}>
    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             <Image source={getThumbnail(thumbnail)} style={{ height: SIZES.h1 * 3.5, width: SIZES.width * 0.29, resizeMode: 'cover', borderTopLeftRadius: SIZES.h5 }} />
    //             <View style={{ flex: 1, marginLeft: SIZES.h4 }}>
    //                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SIZES.base / 2.5 }}>
    //                     <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
    //                         <Text style={{ ...FONTS.body4, color: COLORS.black }}>{data.author}</Text>
    //                         <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>&#8226;</Text>
    //                         <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>{dateFormat(data.createdAt, 'mediumDate')}</Text>
    //                     </TouchableOpacity>
    //                     <TouchableOpacity style={{ marginRight: SIZES.base, padding: SIZES.base * 0.9 }}>
    //                         <Image source={icons.horizontalmenu} style={{ height: SIZES.radius * 1, width: SIZES.h2 * 1 }} />
    //                     </TouchableOpacity>
    //                 </View>
    //                 <View style={{ flex: 1 }}>
    //                     <TouchableOpacity onPress={() => fetchSinglePost(data.slug)} style={{ maxWidth: '90%', }}>
    //                         <Text numberOfLines={3} style={{ ...FONTS.body3a, fontWeight: 'bold', color: COLORS.black }}>{data.title}</Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </View>
    //         <View style={{ paddingHorizontal: SIZES.base, flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base * 0.5 }}>
    //             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                 <Image source={icons.comment} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.black }} />
    //                 <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base * 0.5 }}>10</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.h2, flex: 1 }}>
    //                 <Image source={icons.bookmark} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.black }} />
    //                 <Text style={{ ...FONTS.h5, color: COLORS.black, marginLeft: SIZES.base * 0.5 }}>Save</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                 <Image source={icons.thumb} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.primary }} />
    //                 <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base }}>5</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View >
    // );
};

export default PostList

const styles = StyleSheet.create({
    listCtn: {
        flex: 1,
        height: SIZES.h1 * 4.3,
        borderWidth: 2,
        backgroundColor: COLORS.grey2,
        borderColor: COLORS.grey2,
        marginBottom: SIZES.h5,
        flexDirection: 'row',
        borderRadius: SIZES.h5,
        // alignItems: 'center',
    },







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