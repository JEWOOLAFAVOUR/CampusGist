import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, images, icons, SIZES, FONTS } from '../../constants/';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as authAction from '../../redux/actions/authAction'
import PropTypes from 'prop-types'

const Onboarding = ({ ...props }) => {
    const { updateOnboarding } = props;
    const navigation = useNavigation();
    const slides = [
        {
            key: 'slide1',
            image: images.slide3,
            title: <Text style={{ marginHorizontal: 10 }}>Get the latest gist from <Text style={{ color: '#ff3f4c' }}>reliable source.</Text></Text>,
            text: 'Here you can read latest news update. By registering to this application.',
        }, {
            key: 'slide2',
            image: images.slide2,
            title: <Text>Still <Text style={{ color: '#ff3f4c' }}>up to date</Text> news from all around the world.</Text>,
            text: 'Read news at anywhere at any place just by connecting to the internet.',
        }, {
            key: 'slide3',
            image: images.slide1,
            title: <Text>From art to politics, <Text style={{ color: '#ff3f4c' }}>anything</Text> in CampusGist.</Text>,
            text: 'Add to your favourite read list and also you can comments.',
        },
    ];

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                {/* <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.text}</Text>
                </View> */}
                <View>
                    <Text style={{ fontSize: SIZES.body1 * 0.9, fontWeight: 'bold', color: COLORS.primary }}>CampusGist</Text>
                    <View style={{}}>
                        <Image source={item.image} style={styles.imageSlide} />
                        <View style={{ position: 'absolute', bottom: SIZES.h1 * 6, alignSelf: 'center', paddingHorizontal: SIZES.h2 }}>
                            <Text style={styles.slideText}>{item.title}</Text>
                        </View>
                    </View>
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
        navigation.navigate('Login');
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