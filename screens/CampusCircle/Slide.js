import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { SliderBox } from 'react-native-image-slider-box';
// import { SliderBox } from 'megamaxs1234/react-native-image-slider-box';

// import { COLORS, icons, SIZES, images, FONTS } from '../../constants'



const Slide = () => {
    const [cool, setCool] = React.useState([
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",
    ])
    // return (
    //     <SliderBox
    //         images={cool}
    //         sliderBoxHeight={100}
    //         onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
    //         dotColor={COLORS.white}
    //         inactiveDotColor={COLORS.orange}
    //         dotStyle={{ height: 8, width: 8, borderRadius: 2 }}
    //         autoplay={true}
    //         circleLoop
    //         autoplayInterval={3000}
    //         ImageComponentStyle={{ height: SIZES.height * 0.27, /* borderBottomLeftRadius: 30, borderBottomRightRadius: 30 */ }}
    //     />
    // )
}

export default Slide

const styles = StyleSheet.create({})