import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS, icons, SIZES, images, FONTS } from '../../constants'



const Slide = () => {
    const [cool, setCool] = React.useState([
        images.restaurant1, images.restaurant2, images.restaurant3
    ])
    return (
        <SliderBox
            images={cool}
            sliderBoxHeight={100}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            dotColor={COLORS.white}
            inactiveDotColor={COLORS.orange}
            dotStyle={{ height: 8, width: 8, borderRadius: 2 }}
            autoplay={true}
            circleLoop
            autoplayInterval={5000}
            ImageComponentStyle={{ height: SIZES.height * 0.27, /* borderBottomLeftRadius: 30, borderBottomRightRadius: 30 */ }}
        />
    )
}

export default Slide

const styles = StyleSheet.create({})