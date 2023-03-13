import React, { useState } from 'react'
import { View, Text, BackHandler, Alert, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { COLORS, icons, images, FONTS, SIZES } from '../../constants';
import { Dropdown } from 'react-native-element-dropdown';
import { updateUserBioAndLevel } from '../../api/auth';

const LevelBio = ({ navigation }) => {
    const data = [
        { label: '100 Level', value: '1' },
        { label: '200 Level', value: '2' },
        { label: '300 Level', value: '3' },
        { label: '400 Level', value: '4' },
        { label: '500 Level', value: '5' },
        { label: 'Graduate', value: '6' },
        { label: 'Others', value: '7' },
        { label: 'Aspirant', value: '8' },
    ];

    const DropdownComponent = () => {
        const [value, setValue] = useState(null);
        const [isFocus, setIsFocus] = useState(false);

        const renderLabel = () => {
            if (value || isFocus) {
                return (
                    <Text style={[styles.label, isFocus && { color: COLORS.primary }]}>
                        Select Level
                    </Text>
                );
            }
            return null;
        };

        return (
            <View style={styles.container}>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={{ color: COLORS.black }}
                    // selectedTextStyle={{ color: COLORS.orange }}
                    placeholder={!isFocus ? 'Select Level' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>
        );
    };
    const handleSubmit = async () => {
        const data = await updateUserBioAndLevel()
        navigation.navigate('RegistrationSuccessful')
    }
    return (
        <View style={styles.page}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCtn}>
                    <Image source={icons.arrowleft} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.primary }} />
                </TouchableOpacity>
                <View style={{ marginTop: SIZES.h2 }}>
                    <Text style={{ ...FONTS.h1, color: COLORS.primary, textAlign: 'center' }}>Enter your bio and level</Text>
                    <View style={styles.inputCtn}>
                        <TextInput placeholder='Enter your Bio' />
                    </View>
                    <DropdownComponent />
                </View>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={[styles.btnCtn, { flexDirection: 'row', alignItems: 'center' }]}>
                <Text style={{ ...FONTS.body3a, color: COLORS.white, marginRight: SIZES.h4 }}>Next</Text>
                <Image source={icons.arrowright} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.white }} />
            </TouchableOpacity>
        </View>
    )
}

export default LevelBio

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.03,
    },
    backCtn: {
        height: SIZES.h1 * 1.8,
        width: SIZES.h1 * 1.8,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        marginTop: SIZES.h3,
    },
    inputCtn: {
        height: SIZES.h1 * 1.9,
        // borderWidth: 1.5,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        marginBottom: SIZES.h1,
        borderColor: COLORS.brown,
        backgroundColor: COLORS.grey2,
        borderRadius: SIZES.h2,
        borderWidth: 1,
        marginTop: SIZES.h2,
        marginHorizontal: SIZES.width * 0.03,
    },

    // DROP DOWN 
    container: {
        backgroundColor: 'white',
        padding: SIZES.h5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: SIZES.base,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        ...FONTS.body4,
    },
    placeholderStyle: {
        ...SIZES.body4,
    },
    selectedTextStyle: {
        ...SIZES.body4,
        color: COLORS.primary,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        ...SIZES.body4,
    },
    btnCtn: {
        height: SIZES.h1 * 1.8,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.h3,
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.h2,
        alignItems: 'center',
        marginBottom: SIZES.h2 * 2,
        marginHorizontal: SIZES.width * 0.02,
    },
})