import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, FONTS, icons, images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { getUserById } from '../../api/auth'

const CommentSection = ({ data }) => {
    console.log('itemcccccccc', data?.user_id?._id)
    const userId = data?.user_id?._id;
    const navigation = useNavigation();
    // const [loveRec, setLoveRec] = useState(item.numOfReaction)
    const [loveRec, setLoveRec] = useState(2)
    const [click, setClick] = useState(false)
    const [seeMore, setSeeMore] = useState(false)

    const getUserClick = async (userId) => {
        console.log('userrrrrrrrr', userId)
        const data = await getUserById(userId)
        console.log('result from user fetch', data)
        if (data.verified === true) {
            navigation.navigate('ProfilePage', { data })
        } else {
            console.log('hellooo')
        }

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => getUserClick(userId)} style={styles.imageCtn}>
                <Image source={images.pic1} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginLeft: SIZES.h5 }}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}> */}
                    <TouchableOpacity onPress={() => getUserClick(userId)}>
                        <Text style={{ ...FONTS.body4, color: COLORS.black, fontWeight: '700' }}>{data?.user_id?.username}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSeeMore(!seeMore)}>
                        <Text numberOfLines={seeMore ? 0 : 2} style={{ ...FONTS.body3a, color: COLORS.black }}>{data?.comment}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body4, flex: 1 }}>{data?.createdAt}</Text>
                        <TouchableOpacity style={styles.replyCtn}>
                            <Text style={{ color: COLORS.black }}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setLoveRec(loveRec + 1) & setClick(!click)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, marginRight: SIZES.base * 0.9, fontWeight: 'bold' }}>{loveRec}</Text>
                    <Image source={click ? icons.love1 : icons.love2} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.orange }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CommentSection

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginBottom: SIZES.h5,
        paddingHorizontal: SIZES.width * 0.05
    },
    imageCtn: {
        height: SIZES.h1 * 1.8,
        width: SIZES.h1 * 1.8,
        borderWidth: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    replyCtn: {
        height: SIZES.h2 * 1.1,
        width: SIZES.h1 * 1.7,
        backgroundColor: '#e2e2e3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.base * 0.7,
        marginLeft: SIZES.base
    }
})