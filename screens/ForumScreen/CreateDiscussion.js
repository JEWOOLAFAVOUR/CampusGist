import { StyleSheet, Image, TouchableOpacity, Text, View, FlatList, ActivityIndicator, RefreshControl, ToastAndroid, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { createDiscussion, getAllForumCategory } from '../../api/forum'
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const CreateDiscussion = () => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    // DATA SENDING 
    const [selectedCategoryId, setSelectedCategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [modalVisible, setModalVisible] = useState(false);


    const handleConfirm = () => {
        setModalVisible(false);
        navigation.goBack()
        ToastAndroid.show("Discussion cancelled", ToastAndroid.SHORT);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        clearInterval(intervalId);
    };

    const CloseCreate = () => {
        if (title.trim() === "") {
            navigation.goBack();
            ToastAndroid.show("Discussion cancelled", ToastAndroid.SHORT);
        } else {
            setModalVisible(true)
        }

    }

    const fetchAllCategory = async () => {
        const { categories, error } = await getAllForumCategory()
        if (error) return console.log('error fetching categories', categories)
        setAllCategories(categories);
        console.log('get all categories', categories)
    }

    useEffect(() => {
        fetchAllCategory();
    }, [])

    const handleSubmitDiscussion = async () => {
        if (title.trim() === "") {
            Toast.show({
                type: 'error',
                text1: 'Please Add Something',
                visibilityTime: 1000,
            });
        } else if (selectedCategoryId.trim() === "") {
            Toast.show({
                type: 'error',
                text1: 'Choose a Category to Continue',
                visibilityTime: 1000,
            });
        } else {
            const data = { title, category: selectedCategoryId }
            console.log('...........', data)
            const { discussion, error, status } = await createDiscussion(data)
            if (error) return console.log('creating discussion error', error)
            console.log(discussion)
            if (status === true) {
                Toast.show({
                    type: 'success',
                    text1: 'Post Created 👋',
                    visibilityTime: 1000,
                });
                navigation.goBack()
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Network Error, Check Internet😥',
                    visibilityTime: 1000,
                });
            }
        }
    }
    return (
        <View style={styles.page}>
            {/* HEADER  */}
            <View style={{ marginBottom: SIZES.h2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => CloseCreate()}>
                    <Image source={icons.close} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                </TouchableOpacity>
                <Text style={{ ...FONTS.body1, color: COLORS.primary, fontWeight: 'bold', letterSpacing: 2 }}>NEW DISCUSSIONS</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={icons.search} style={{ height: SIZES.h2, width: SIZES.h2, }} />
                </View>
            </View>
            {/* CREATE DISCUSSION */}
            <View style={{ marginBottom: SIZES.h2, }}>
                <Text style={{ ...FONTS.body2, color: COLORS.primary, fontWeight: 'bold' }}>Create Discussion</Text>
                <View style={{ marginTop: SIZES.h3 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={images.avatar} style={{ height: SIZES.h1 * 1.7, width: SIZES.h1 * 1.7, borderRadius: 100 }} />
                            <Text style={{ ...FONTS.body3, color: COLORS.primary, fontWeight: 'bold', marginLeft: SIZES.h5 * 0.9 }}>John Smith</Text>
                        </View>
                        <View style={styles.puclicCtn}>
                            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Public</Text>
                            <Image source={icons.arrowright2} style={{ width: SIZES.h4, height: SIZES.h4, }} />
                        </View>
                    </View>
                </View>
                <TextInput placeholder='Type your question/queres here...'
                    placeholderTextColor={COLORS.chocolate}
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                    style={{ ...FONTS.h3, color: COLORS.black }}
                />
            </View>
            {/* BUTTON  */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Text style={{ ...FONTS.body3, color: COLORS.black, }}>Choose Categories</Text>
                </TouchableOpacity>
                <Text style={{ ...FONTS.body3, color: COLORS.black, marginLeft: SIZES.h3 }}>{selectedCategory}</Text>
            </View>
            <TouchableOpacity onPress={() => handleSubmitDiscussion()} style={styles.discussionCtn}>
                <Text style={{ ...FONTS.body3, color: COLORS.white, letterSpacing: 1.3, fontWeight: 'bold' }}>CREATE DISCUSSION</Text>
            </TouchableOpacity>

            {/* MODAL FOR CATEGORIES  */}
            <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                <View style={{ backgroundColor: 'white', paddingVertical: SIZES.h3 * 1.3, paddingHorizontal: SIZES.h3, maxHeight: '70%' }}>
                    <FlatList
                        data={allCategories}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => { setSelectedCategory(item.name); closeModal(); setSelectedCategoryId(item.id) }} style={styles.categoryCtn}>
                                    <Text numberOfLines={1} style={{ ...FONTS.h3, color: COLORS.black }}>{item?.name}</Text>
                                    <View style={{ height: 1, backgroundColor: COLORS.chocolateBackground, marginVertical: SIZES.h4 }} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </Modal>

            <Modal isVisible={modalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Are you sure you want cancel discussion?</Text>
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

export default CreateDiscussion

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.045,
        paddingTop: SIZES.base,
    },
    puclicCtn: {
        height: SIZES.h1,
        width: SIZES.h1 * 2.3,
        borderRadius: SIZES.base / 1.5,
        backgroundColor: COLORS.grey2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.base * 0.5,
    },
    discussionCtn: {
        height: SIZES.h1 * 1.5,
        width: SIZES.width * 0.7,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.base,
        marginTop: SIZES.h1,
    },
    categoryCtn: {
        // paddingHorizontal: SIZES.base,
    },

    // MODAL
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalText: {
        ...FONTS.body3,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.orange,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#e6e6e6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtonText: {
        ...FONTS.body4,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
})

