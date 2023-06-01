// import { StyleSheet, Text, View, Image, Platform } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { FONTS } from '../../constants'
// import { useNavigation, useTheme } from '@react-navigation/native';
// import { COLORS, images, SIZES } from '../../constants';
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import { setTokenInterceptor } from '../../utils/setTokenInterceptor';

// const SplashScreen = ({ ...props }) => {

//     const { isLoggedIn, user, accessToken, refreshToken, isOnboardingDisabled } = props;


//     const [isVisible, setIsVisible] = useState(true);
//     const navigation = useNavigation();

//     const theme = useTheme();
//     const { background, dark } = theme;

//     const hideSplashScreen = () => {
//         setIsVisible(false);
//     }

//     useEffect(() => {
//         console.log('access token inside splashscreen ', accessToken);
//         console.log('refress token inside splashscreen ', refreshToken);
//         setTimeout(() => {
//             if (isLoggedIn) {
//                 setTokenInterceptor(user)
//             }
//             hideSplashScreen()
//             // navigation.navigate(isLoggedIn ? 'Bottom' : 'Login');
//             // if (isOnboardingDisabled) {
//             //     navigation.navigate('Splash')
//             // } else {
//             //     navigation.navigate('Onboarding')
//             // }
//             navigation.replace(isLoggedIn ? 'Main' : 'WelcomeScreen', { screen: 'Bottom' });

//             // navigation.navigate(isLoggedIn ? 'WelcomeScreen' : 'WelcomeScreen');
//         }, 1000);
//     }, []);

//     const renderSplash = () => {
//         return (
//             <View style={styles.splash}>
//                 <Image source={dark ? images.splash : images.splash} style={{ height: SIZES.height, width: SIZES.width }} />

//                 {/* <View style={styles.childView}>
//                     <Image source={dark ? images.splash : images.splash} style={{ height: SIZES.height, width: SIZES.width, resizeMode: 'contain' }} />
//                 </View> */}
//             </View>
//         )
//     }
//     return (
//         <View style={{
//             flex: 1, justifyContent: 'center', alignItems: 'center', /* padding: Platform.OS === 'ios' ? 20 : 0,*/
//             backgroundColor: COLORS.primary,
//         }}>
//             {/* {isVisible === true ? renderSplash() : null} */}
//             <Text style={{ color: COLORS.white, fontSize: SIZES.h1 * 4.5, fontFamily: 'Roboto-Black' }}>CG</Text>
//         </View>
//     )
// }

// SplashScreen.propTypes = {
//     user: PropTypes.object.isRequired,
//     isLoggedIn: PropTypes.bool.isRequired,
//     isOnboardingDisabled: PropTypes.bool.isRequired,
// };

// const mapStateToProps = (state) => {
//     return {
//         user: state.auth.user,
//         isLoggedIn: state.auth.isLoggedIn,
//         accessToken: state.auth.accessToken,
//         refreshToken: state.auth.refreshToken,
//         isOnboardingDisabled: state.auth.isOnboardingDisabled,
//     }
// }

// const mapDispatchToProps = (dispatch) => { return {} }

// export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

// const styles = StyleSheet.create({
//     mainContainer: {

//     },
//     splash: {
//         justifyContent: 'center',
//         flex: 1,
//         margin: 10,
//         position: 'absolute',
//         // width: '100%',
//         // height: '100%',
//     },
//     childView: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flex: 1,
//     },
// })

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            // navigation.navigate('Onboarding');
            navigation.navigate('Main', { screen: 'Bottom' });
        }, 1000)
    }, [])
    return (
        <View style={{ backgroundColor: 'red', flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 40, fontWeight: 'bold' }}>SplashScreen</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})