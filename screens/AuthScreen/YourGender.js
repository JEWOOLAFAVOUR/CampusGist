import { View, Text, BackHandler, Alert, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react'
import { COLORS, icons, images, FONTS, SIZES } from '../../constants'


const YourGender = ({ navigation, route }) => {
    console.log('route coming 2', route)
    return (
        <View style={styles.page}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.skipCtn}>
                    <Text style={{ ...FONTS.body5, color: COLORS.white }}>Skip</Text>
                </TouchableOpacity>
                <View style={{ marginTop: SIZES.h1 * 2, marginBottom: SIZES.h1 * 2 }}>
                    <Text style={{ ...FONTS.body1, color: COLORS.black, textAlign: 'center', marginBottom: SIZES.base }}>What is your gender?</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.black, maxWidth: '50%', textAlign: 'center', alignSelf: 'center' }}>We will use this data to give you a better diet type for you.</Text>
                </View>
                {/* MALE AND FEMALE BUTTON */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={[styles.genderCtn, { backgroundColor: 'lightblue' }]}>
                        <Image source={images.pic1} style={{ height: SIZES.h1, width: SIZES.h1 }} />
                        <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.white, marginTop: SIZES.h4 }}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.genderCtn, { backgroundColor: 'pink' }]}>
                        <Image source={images.pic1} style={{ height: SIZES.h1, width: SIZES.h1 }} />
                        <Text style={{ ...FONTS.body2, fontWeight: 'bold', color: COLORS.white, marginTop: SIZES.h4 }}>Female</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('LevelBio')} style={styles.nextCtn}>
                <Image source={icons.arrowright} style={{ height: SIZES.h3 * 0.9, width: SIZES.h3 * 0.9, tintColor: COLORS.white }} />
            </TouchableOpacity>
        </View>
    )
}

export default YourGender

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.h3,
        paddingHorizontal: SIZES.width * 0.07,
    },
    skipCtn: {
        height: SIZES.h1 * 1.7,
        width: SIZES.h1 * 2.9,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.h2,
        alignSelf: 'flex-end',
    },
    genderCtn: {
        height: SIZES.height * 0.23,
        width: SIZES.width * 0.4,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.h3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextCtn: {
        height: SIZES.h1 * 2,
        width: SIZES.h1 * 2,
        borderRadius: 100,
        backgroundColor: '#8c55f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.h1 * 1,
        alignSelf: 'center',
        marginRight: SIZES.width * 0.05
        // position: 'absolute',
        // bottom: 0,
    },
})