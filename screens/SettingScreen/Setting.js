import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Switch, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/actions/authAction'
import { clearNews } from '../../redux/actions/newsAction'
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

const Setting = ({ ...props }) => {
    const data = props?.user
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    const handleConfirm = () => {
        dispatch(logoutUser());
        dispatch(clearNews());
        setModalVisible(false);
        navigation.replace('WelcomeScreen');
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const settingData = [
        {
            id: 1,
            title: 'Edit Profile',
            iconName: icons.bell,
            onPress: () => navigation.navigate('EditProfile'),
        }, {
            id: 2,
            title: 'Edit Bio',
            iconName: icons.bell,
            onPress: () => navigation.navigate('ChangeBio'),

        }, {
            id: 3,
            title: 'Notification',
            iconName: icons.bell,
            // onPress: () => navigation.navigate('SNotification'),
            onPress: () => { },
            // onPress: Notification,
        }, {
            id: 4,
            title: 'FAQ',
            iconName: icons.bell,
            // onPress: Notification,
        },/* {
            id: 5,
            title: 'Dark Mode',
            iconName: icons.bell,
            // onPress: Notification,
        }, */{
            id: 6,
            title: 'Logout',
            iconName: icons.bell,
            onPress: () => {
                setModalVisible(true);
                /*dispatch(logoutUser())
                dispatch(clearNews());

                navigation.replace('WelcomeScreen')
                */
            },
        },
    ];
    const _renderHeader = () => {
        return (
            <View style={styles.container}>
                <View style={styles.imageRadius}>
                    <Image source={images.profile2} style={{ height: SIZES.h1 * 3, width: SIZES.h1 * 3, borderRadius: 100 }} />
                </View>
                <View style={{ marginLeft: SIZES.h3 }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.black }}>{`${data.firstName} ${data.lastName} `}</Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.chocolate }}>@{data.username}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.page}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: SIZES.h2 * 1.5 }}>
                <Image source={icons.arrowleft2} style={{ height: SIZES.h1, width: SIZES.h1, }} />
            </TouchableOpacity>
            <_renderHeader />
            <FlatList
                // ListHeaderComponent={_renderHeader}
                data={settingData}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={item.onPress} style={styles.boxCtn}>
                            <Image source={item.iconName} style={{ height: SIZES.h1 * 0.8, width: SIZES.h1 * 0.8, }} />
                            <Text style={{ ...FONTS.body3, color: COLORS.black, marginTop: SIZES.base * 0.8 }}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Modal isVisible={modalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
                        <Text style={styles.modalButtonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                        <Text style={styles.modalButtonText}>No</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting)

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.h4,
        paddingHorizontal: SIZES.width * 0.07,
    },
    boxCtn: {
        height: SIZES.h1 * 4.3,
        width: SIZES.width * 0.415,
        // borderWidth: 1,
        marginBottom: SIZES.h5,
        borderRadius: SIZES.h3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.grey2,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.h2,
    },
    imageRadius: {
        height: SIZES.h1 * 3.15,
        width: SIZES.h1 * 3.15,
        borderRadius: 100,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.primary
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#e6e6e6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
})