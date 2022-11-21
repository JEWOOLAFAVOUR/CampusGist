import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS, icons } from '../../constants'

const CommentSection = ({ item, index }) => {
    return (
        <View key={index} style={styles.container}>
            <View style={styles.imageCtn}>
                <Image source={item.profilePic} style={{ height: SIZES.h1 * 1.8, width: SIZES.h1 * 1.8, borderRadius: 100 }} />
            </View>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginLeft: SIZES.h5 }}>
                    <Text style={{ ...FONTS.body3a, color: COLORS.black, fontWeight: '700' }}>{item.userName}</Text>
                    <Text numberOfLines={2} style={{ ...FONTS.body3, color: COLORS.black }}>{item.comment}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...FONTS.body3a }}>{item.createdAt}</Text>
                        <TouchableOpacity style={styles.replyCtn}>
                            <Text style={{ color: COLORS.black }}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, marginRight: SIZES.base * 0.9, fontWeight: 'bold' }}>{item.numOfReaction}</Text>
                    <Image source={icons.notification} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                </View>
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
        paddingHorizontal: SIZES.width * 0.03
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