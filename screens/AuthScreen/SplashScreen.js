import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FONTS } from '../../constants'
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, images, SIZES } from '../../constants';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setTokenInterceptor } from '../../utils/setTokenInterceptor';

const SplashScreen = ({ ...props }) => {

    const { isLoggedIn, user, accessToken } = props;


    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();

    const theme = useTheme();
    const { background, dark } = theme;

    const hideSplashScreen = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        console.log('access token inside splashscreen ', accessToken);
        setTimeout(() => {
            if (isLoggedIn) {
                setTokenInterceptor(user)
            }
            hideSplashScreen()
            // navigation.navigate(isLoggedIn ? 'Bottom' : 'Login');
            navigation.navigate(isLoggedIn ? 'Bottom' : 'WelcomeScreen');
        }, 1000);
    }, []);

    const renderSplash = () => {
        return (
            <View style={styles.splash}>
                <View style={styles.childView}>
                    <Image source={dark ? images.pic7 : images.pic7} style={{ height: SIZES.height, width: SIZES.width, resizeMode: 'contain' }} />
                </View>
            </View>
        )
    }
    return (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center', padding: Platform.OS === 'ios' ? 20 : 0,
            backgroundColor: background,
        }}>
            {isVisible === true ? renderSplash() : null}
        </View>
    )
}

SplashScreen.propTypes = {
    user: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
    }
}

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
    mainContainer: {

    },
    splash: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    childView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})