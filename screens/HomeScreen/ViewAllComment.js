import { StyleSheet, Text, Image, TouchableOpacity, View, FlatList } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import CommentSection from './CommentSection';
import commentData from './commentData'

const data = commentData
// console.log('dataaa', data)

const ViewAllComment = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <View style={{ marginBottom: SIZES.h1, paddingHorizontal: SIZES.width * 0.05, }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1, }} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.body1, color: COLORS.primary, fontWeight: 'bold' }}>Comments</Text>
                <Text style={{ ...FONTS.body3b, color: COLORS.orange }}>26 Comments</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <CommentSection item={item} />}
            />
        </View>
    )
}

export default ViewAllComment

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.h3 * 0.8,
    },
})