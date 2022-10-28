import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, images, icons, SIZES } from '../../constants/';
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
            image: images.image1,
            title: 'Welcome to React Native App',
            text: 'Here you can read latest news update. By registering to this application.',
        }, {
            key: 'slide2',
            image: images.image2,
            title: 'Read News',
            text: 'Read news at anywhere at any place just by connecting to the internet.',
        }, {
            key: 'slide3',
            image: images.image2,
            title: 'Add to favourite',
            text: 'Add to your favourite read list and also you can comments.',
        },
    ];

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        )
    }

    const _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Image source={icons.home} style={{ height: SIZES.h1, width: SIZES.h1 }} />
            </View>
        )
    }

    const _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Image source={icons.notification} style={{ height: SIZES.h1, width: SIZES.h1 }} />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
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
        width: 40,
        height: 40,
        backgroundColor: COLORS.orange,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipTextColor: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    skipView: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})