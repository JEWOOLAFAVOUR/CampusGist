import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, FONTS, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const CommentSection = ({ item, index }) => {
    const navigation = useNavigation();
    const [loveRec, setLoveRec] = useState(item.numOfReaction)
    const [click, setClick] = useState(false)
    return (
        <View key={index} style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')} style={styles.imageCtn}>
                <Image source={item.profilePic} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginLeft: SIZES.h5 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
                        <Text style={{ ...FONTS.body3a, color: COLORS.black, fontWeight: '700' }}>{item.userName}</Text>
                    </TouchableOpacity>
                    <Text numberOfLines={2} style={{ ...FONTS.body3, color: COLORS.black }}>{item.comment}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body3a }}>{item.createdAt}</Text>
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