import { StyleSheet, Text, View, FlatList, Image, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { COLORS, images, FONTS, SIZES } from '../../constants';

const width = Dimensions.get('window').width - 30;
let currentSlideIndex = 0;
let intervalId;

const Slider = () => {
    const data = [
        {
            id: 1,
            thumbnail: images.image2,
            title: 'Programming language to learn in 2022',
            author: 'Admin',
            postedDate: 'December 30, 2020',
            imageType: true,
        }, {
            id: 2,
            thumbnail: images.image1,
            title: 'Programming language to learn in 2022',
            author: 'Admin',
            postedDate: 'December 30, 2020',
            imageType: false,
        }, {
            id: 3,
            thumbnail: images.profile4,
            title: 'Programming language to learn in 2022',
            author: 'Admin',
            postedDate: 'December 30, 2020',
            imageType: false,
        }
    ];

    const [dataToRender, setDataToRender] = useState([]);
    const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
    const [activeSlideIndex, setActiveSlideIndex] = useState(1);

    const onViewableItemChanged = useRef(({ viewableItems }) => {
        currentSlideIndex = viewableItems[0]?.index || 0
        setVisibleSlideIndex(currentSlideIndex)
    });

    const viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 50
    });

    const flatList = useRef();

    const handleScrollTo = (index) => {
        flatList.current.scrollToIndex({ animated: false, index })
    }

    const startSlider = () => {
        if (currentSlideIndex <= dataToRender.length - 2) {
            intervalId = setInterval(() => {
                flatList.current.scrollToIndex({ animated: true, index: currentSlideIndex + 1 })
            }, 4000);
        } else {
            pauseSlider();
        }
    }

    const pauseSlider = () => {
        clearInterval(intervalId)
    }

    useEffect(() => {
        if (dataToRender.length && flatList.current) {
            startSlider();
        }
    }, [data.length])

    useEffect(() => {
        const newData = [[...data].pop(), ...data, [...data].shift()]
        setDataToRender([...newData])
    }, [data.length])

    useEffect(() => {
        const length = dataToRender.length
        // reset slide to first
        if (visibleSlideIndex === length - 1 && length) handleScrollTo(1)
        // reset slide to last
        if (visibleSlideIndex === 0 && length) handleScrollTo(length - 2)

        const lastSlide = currentSlideIndex === length - 1
        const firstSlide = currentSlideIndex === 0

        if (lastSlide && length) setActiveSlideIndex(0)
        else if (firstSlide && length) setActiveSlideIndex(length - 2)
        else setActiveSlideIndex(currentSlideIndex - 1)

    }, [visibleSlideIndex]);
    return (
        <View style={{ flex: 1, paddingTop: SIZES.h4 }}>
            {/* <View style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Featured Post</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        data.map((data, index) => {
                            return <View key={data.id}
                                style={{
                                    width: 12, height: 12, borderRadius: 10, borderWidth: 2, marginLeft: 5,
                                    backgroundColor: activeSlideIndex === index ? '#383838' : 'transparent'
                                }} />
                        })
                    }
                </View>
            </View> */}
            <View style={{ alignSelf: 'center', /*width*/ }}>
                <FlatList
                    ref={flatList}
                    data={dataToRender}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    initialScrollIndex={1}
                    getItemLayout={(_, index) => ({
                        length: width,
                        offset: width * index,
                        index
                    })}
                    onViewableItemsChanged={onViewableItemChanged.current}
                    viewabilityConfig={viewabilityConfig.current}
                    onScrollBeginDrag={pauseSlider}
                    onScrollEndDrag={startSlider}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginRight: SIZES.h3, marginLeft: SIZES.base }}>
                                <Image source={item.thumbnail} style={{ height: width / 1.8, width: width - 40, borderRadius: SIZES.base }} />
                                <View style={{ position: 'absolute', top: width / 3.2, left: SIZES.h2 }}>
                                    <Text style={{ color: COLORS.primary, ...FONTS.h3, }}>{item.title}</Text>
                                    <Text style={{ color: COLORS.primary, ...FONTS.body3, }}>{item.postedDate}</Text>
                                </View>
                                {/* <View style={{ width: width - 20 }}> 
                                <Text numberOfLines={2} style={{ ...FONTS.h3 }}>{item.title}</Text>
                                </View>   */}
                            </View>
                        )
                    }}
                />
            </View>
        </View >
    )
}

export default Slider

const styles = StyleSheet.create({})