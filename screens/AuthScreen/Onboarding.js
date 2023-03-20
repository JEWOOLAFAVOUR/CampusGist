import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, images, icons, SIZES, COLORSONTS } from '../../constants/';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as authAction from '../../redux/actions/authAction'
let screenHeight = Dimensions.get('window').height;
import { FONTS } from '../../constants/';

import PropTypes from 'prop-types'

const Onboarding = ({ ...props }) => {
    const { updateOnboarding } = props;
    const navigation = useNavigation();
    const slides = [
        {
            key: 'slide1',
            image: images.pic1,
            title: <Text style={{ marginHorizontal: 10 }}>Get the latest gist from <Text style={{ color: '#ff3f4c' }}>reliable source</Text></Text>,
            text: 'Get the latest information on events, organizations, and academic gists.',
        }, {
            key: 'slide2',
            image: images.pic4,
            title: <Text>Gist <Text style={{ color: '#ff3f4c' }}>on-the-go,</Text> gist from all around the campuses</Text>,
            text: 'Read gists at anywhere at any place just by connecting to the internet.',
        }, {
            key: 'slide3',
            image: images.pic5,
            title: <Text>From art to politics, <Text style={{ color: '#ff3f4c' }}>CampusGist</Text> has it all</Text>,
            text: 'Add to your favourite read list and also you can comments.',
        },
    ];
    // const slides = [
    //     {
    //         key: 'slide1',
    //         image: images.pic1,
    //         title: <Text style={{ marginHorizontal: 10 }}>Stay informed with CampusGist <Text style={{ color: '#ff3f4c' }}>Your source for campus news and updates</Text></Text>,
    //         text: 'Get the latest information on events, organizations, and academic news. Register now to stay up-to-date with everything happening on your campus.',
    //     }, {
    //         key: 'slide2',
    //         image: images.pic4,
    //         title: <Text>News on-the-go <Text style={{ color: '#ff3f4c' }}>Keep up with</Text> the latest stories from around the world.</Text>,
    //         text: 'Read news at anywhere at any place just by connecting to the internet.',
    //     }, {
    //         key: 'slide3',
    //         image: images.pic5,
    //         title: <Text>Explore diverse topics, <Text style={{ color: '#ff3f4c' }}>From art to science,</Text> CampusGist has it all.</Text>,
    //         text: 'Explore diverse topics and engage with other users by leaving comments and sharing your opinions on CampusGist.',
    //     },
    // ];
    //     Slide 1:
    // Image: A picture of a university campus or a group of students
    // Title: "Stay informed with CampusGist: Your source for campus news and updates"
    // Text: "Get the latest information on events, organizations, and academic news. Register now to stay up-to-date with everything happening on your campus."

    // Slide 2:
    // Image: A picture of a person reading news on their phone
    // Title: "News on-the-go: Keep up with the latest stories from around the world"
    // Text: "Our app provides news updates from various sources, covering topics ranging from politics to sports. Stay informed wherever you are by reading the latest news from CampusGist."

    // Slide 3:
    // Image: A picture of a person reading a book
    // Title: "Explore diverse topics: From art to science, CampusGist has it all"
    // Text: "Find articles on a wide range of topics, including art, science, technology, and more. Add articles to your favorites list and engage with other users by leaving comments and sharing your opinions."

    const _renderItem = ({ item }) => {
        return (
            // <View style={styles.slide}>
            //     {/* <View style={styles.titleContainer}>
            //         <Text style={styles.title}>{item.title}</Text>
            //     </View>

            //     <View style={styles.imageContainer}>
            //         <Image source={item.image} style={styles.image} />
            //     </View>

            //     <View style={styles.textContainer}>
            //         <Text style={styles.text}>{item.text}</Text>
            //     </View> */}
            //     <View>
            //         <Text style={{ fontSize: SIZES.body1 * 0.9, fontWeight: 'bold', color: COLORS.primary }}>CampusGist</Text>
            //         <View style={{}}>
            //             <Image source={item.image} style={styles.imageSlide} />
            //             <View style={{ position: 'absolute', bottom: SIZES.h1 * 6, alignSelf: 'center', paddingHorizontal: SIZES.h2 }}>
            //                 <Text style={styles.slideText}>{item.title}</Text>
            //             </View>
            //         </View>
            //     </View>
            // </View>
            <View
                style={{
                    height: screenHeight,
                    flex: 1,
                    backgroundColor: COLORS.white,
                    justifyContent: 'center',
                }}>
                <View
                    style={{
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        top: SIZES.h1 * 1.5,
                        alignItems: 'center',
                        position: 'absolute',
                        width: '100%',
                        marginHorizontal: 5,
                    }}>
                    <Text style={{ ...FONTS.navTitle, color: COLORS.orange }}>Welcome to CampusGist</Text>
                </View>

                <Image
                    source={item.image}
                    style={{
                        width: '100%',
                        height: screenHeight / 2.2,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />
                <View
                    style={{
                        // marginHorizontal: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            ...FONTS.body2,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            // fontFamily: appFonts.BoldText.fontFamily,
                            color: COLORS.black,
                            paddingVertical: 16,
                        }}>
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.body3a,
                            fontFamily: 'Roboto-Medium',
                            color: COLORS.primary,
                            paddingHorizontal: 16,
                            textAlign: 'center',
                        }}>
                        {item.text}
                    </Text>
                </View>
                <View
                    style={{
                        bottom: 0,
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: COLORS.primary,
                        justifyContent: 'center',
                        height: SIZES.h1 * 3,
                    }}>
                    {/* <Text style={{ color: 'white' }}>Next</Text> */}
                </View>
            </View>
        )
    }
    const _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Image source={icons.arrowright2} style={{ height: SIZES.h2, tintColor: COLORS.white, width: SIZES.h2 }} />
            </View>
        )
    }

    const _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Image source={icons.done} style={{ height: SIZES.h2 * 0.9, width: SIZES.h2 * 0.9, tintColor: COLORS.white }} />
            </View>
        )
    }

    const _renderSkipButton = () => {
        return (
            <View style={styles.skipView}>
                <Text style={styles.skipTextColor}>Skip</Text>
            </View>
        )
    }

    const _onEndReached = () => {
        updateOnboarding(true);
        navigation.navigate('WelcomeScreen');
    }
    return (
        <AppIntroSlider
            data={slides}
            renderItem={_renderItem}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            renderSkipButton={_renderSkipButton}
            onDone={_onEndReached}
            onSkip={_onEndReached}
            dotClickEnabled={true}
            showNextButton={true}
            showDoneButton={true}
            showSkipButton={true}
            dotStyle={{ height: 10, width: 10, backgroundColor: COLORS.orange, borderRadius: 0 }}
            activeDotStyle={{ backgroundColor: COLORS.white }}
        />
    )
};

Onboarding.propTypes = {
    isOnboardingDisabled: PropTypes.bool.isRequired,
    updateOnboarding: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isOnboardingDisabled: state.auth.isOnboardingDisabled
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateOnboarding: (status) => dispatch(authAction.updateOnboarding(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.width * 0.05,
        paddingTop: SIZES.base * 0.5,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingStart: '8%',
        paddingRight: '8%',
    },
    title: {
        color: COLORS.brown,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingRight: '8%',
        paddingStart: '8%',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonCircle: {
        width: SIZES.h1 * 1.4,
        height: SIZES.h1 * 1.4,
        backgroundColor: COLORS.orange,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.h4,
        marginBottom: 20
    },
    skipTextColor: {
        color: COLORS.white,
        // fontWeight: 'bold',
        ...FONTS.h3,
    },
    skipView: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SIZES.h4,
    },
    imageSlide: {
        height: SIZES.height * 0.919,
        width: SIZES.width * 0.9,
        marginTop: SIZES.base * 1.3,
        borderRadius: SIZES.h1 * 1.2,
    },
    slideText: {
        // ...FONTS.navTitle,
        fontSize: SIZES.navTitle * 1.3,
        color: COLORS.white,
        fontWeight: 'bold',
    },
})