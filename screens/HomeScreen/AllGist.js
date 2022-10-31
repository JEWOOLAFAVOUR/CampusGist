import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { COLORS, SIZES, images, icons, FONTS } from '../../constants'
import Slider from './Slider'
import { homeData } from './homeData'
import { useNavigation } from '@react-navigation/native'

const AllGist = () => {
    const navigation = useNavigation();
    const RenderItem = ({ data }) => {
        return (
            <View style={styles.gistCtn}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={data.postImage} style={{ height: SIZES.h1 * 3.5, width: SIZES.width * 0.27, resizeMode: 'cover', borderTopLeftRadius: SIZES.h5 }} />
                    <View style={{ flex: 1, marginLeft: SIZES.h4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: SIZES.base / 2.5 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3 }}>
                                <Text style={{ ...FONTS.body4, color: COLORS.black }}>{data.postUploader}</Text>
                                <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>&#8226;</Text>
                                <Text style={{ ...FONTS.body4, color: COLORS.black, marginLeft: SIZES.base * 0.7 }}>{data.postDate}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: SIZES.base, padding: SIZES.base * 0.9 }}>
                                <Image source={icons.horizontalmenu} style={{ height: SIZES.radius * 1, width: SIZES.h2 * 1 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => navigation.navigate(data.onPress)} style={{ maxWidth: '90%', }}>
                                <Text numberOfLines={3} style={{ ...FONTS.body3a, fontWeight: 'bold', color: COLORS.black }}>{data.postContent}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: SIZES.base, flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base * 0.5 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={icons.comment} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.black }} />
                        <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base }}>{data.postCommentNum}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: SIZES.h3, flex: 1 }}>
                        <Image source={icons.bookmark} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.black }} />
                        <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={icons.eye} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.black }} />
                        <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft: SIZES.base }}>{data.postReaction}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    };
    return (
        <View style={{ backgroundColor: COLORS.white }}>
            {/* <Slider /> */}
            <View style={{ paddingHorizontal: SIZES.width * 0.03, marginTop: SIZES.h4, marginBottom: SIZES.h1 * 2 }}>
                <FlatList
                    ListHeaderComponent={Slider}
                    ListHeaderComponentStyle={{ marginBottom: SIZES.h5 }}
                    showsVerticalScrollIndicator={false}
                    data={homeData}
                    renderItem={({ item }) => <RenderItem data={item} />}
                />
            </View>
        </View>
    )
}

export default AllGist

const styles = StyleSheet.create({
    gistCtn: {
        height: SIZES.h1 * 4.8,
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