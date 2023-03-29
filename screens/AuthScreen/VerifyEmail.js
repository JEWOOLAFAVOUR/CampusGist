import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler, Alert, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { COLORS, icons, images, FONTS, SIZES } from '../../constants';
import { verifyEmail, resendOtp } from '../../api/auth';
import Roller from '../../components/Roller';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import * as authActions from '../../redux/actions/authAction'
import Toast from '../../components/Toast';


const VerifyEmail = ({ navigation, route, ...props }) => {
    // console.log('props', route)
    const useId = route.params.item;
    console.log('dttt', useId)
    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                'Exit App',
                'Do you want to exit the app?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel'
                    },
                    {
                        text: 'Exit',
                        onPress: () => BackHandler.exitApp()
                    }
                ],
                { cancelable: false }
            );
            return true;
        };

        const removeListener = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            backAction();
        });

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => {
            removeListener();
            backHandler.remove();
        };
    }, [navigation]);

    const [userId, setUserId] = useState(route.params.item)
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);

    const [showToast, setShowToast] = useState(false)

    console.log(showToast)
    const [toastMsg, setToastMsg] = useState('')
    console.log('toast msggggggg', toastMsg)

    const [toastMsg2, setToastMsg2] = useState('')
    const [showToast2, setShowToast2] = useState(false)
    const { updateUserLogin, updateUserAccessToken, user, isLoggedIn } = props

    const [errork, setErrork] = useState('')
    const [showToastError, setShowToastError] = useState(false)
    // console.log('errork comming', errork)
    const [aV, setAv] = useState(false)
    const [uF, setUf] = useState(false)
    const [vO, setVo] = useState(false)
    const [eV, setEv] = useState(false)
    const handleInputChange = (value) => {
        setOtp(value);
        setErrorMessage('');
    };
    const handleSubmit = async () => {
        // const data = verifyEmail()
        if (otp === '') {
            setErrorMessage('Please enter OTP');
        } else if (otp.length !== 4) {
            setErrorMessage('OTP should be 4 digits');
        } else {
            // Valid OTP
            setErrorMessage('');
            try {
                setShowSpinner(true)
                const data = await verifyEmail(otp, userId);
                console.log('Verification response:', data);
                // if(data.error === "")
                setShowSpinner(false)
                setErrork(data.error)
                // setShowToastError(false)
                // setShowToastError(true)
                if (data.error === "This account is already verified!") {
                    setAv(false)
                    setAv(true)
                    setTimeout(() => {
                        navigation.navigate("Login");
                    }, 2000);
                } else if (data.error === "Sorry, user not found!") {
                    setUf(false)
                    setUf(true)
                } else if (data.error === "Please provide a valid otp token!") {
                    setVo(false)
                    setVo(true)
                } else if (data.status === "Your email is verified") {
                    setEv(false)
                    setEv(true)
                    setTimeout(() => {
                        navigation.navigate("YourGender");
                    }, 1000);
                    updateUserLogin(data.user, true)
                    updateUserAccessToken(data.user.accessToken)

                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setErrorMessage('Error verifying email, please try again.');
            }
        }
    }

    const handleResend = async (useId) => {
        const data = await resendOtp(useId);
        console.log('comig', data)
        if (data.status === false) {
            setToastMsg(data.error)
            setShowToast(false)
            setShowToast(true)
        } else if (data.success === true) {
            setToastMsg2(data.status)
            setShowToast2(false)
            setShowToast2(true)
        }
    }



    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.white, }}>
            {
                showToast && (
                    <Toast message={toastMsg} type="fail" />
                )
            }
            {
                showToast2 && (
                    <Toast message={toastMsg2} type="success" />
                )
            }
            {
                showSpinner && (<Roller visible={showSpinner} />)
            }
            {
                showToastError && (
                    <Toast message={errork} type="fail" />
                )
            }
            {aV && <Toast message={"This account is already verified!"} type="fail" />}
            {uF && <Toast message={"Sorry, user not found!"} type="fail" />}
            {vO && <Toast message={"Please provide a valid otp token!"} type="fail" />}
            {eV && <Toast message={"Your email is verified"} type="success" />}
            <View style={{}}>
                <View style={{ alignItems: 'center', marginTop: SIZES.h1 * 2 }}>
                    <Image source={images.otp} style={{ height: SIZES.height * 0.3, width: SIZES.width * 0.6 }} />
                </View>
                <View style={{ paddingHorizontal: SIZES.width * 0.05, paddingTop: SIZES.h1, marginBottom: SIZES.h2 }}>
                    <Text style={{ ...FONTS.navTitle, color: COLORS.blue, textAlign: 'center' }}>Verify OTP</Text>
                    {/* <Text style={{ ...FONTS.body4, color: COLORS.primary, maxWidth: '70%', marginBottom: SIZES.h4 }}>Lorem ipsum dolor sir amet, consectutur actiprincin eit.</Text> */}
                    {/* <Text style={{ ...FONTS.body3, letterSpacing: 1, fontWeight: 'bold', color: COLORS.primary, marginBottom: SIZES.base }}>OTP</Text> */}
                </View>
                <View style={{}}>
                    {/* OTP BOX DESIGN  */}
                    <View style={{ marginHorizontal: SIZES.width * 0.05 }}>
                        <Text style={{ ...FONTS.body2, color: COLORS.black, fontWeight: 'bold', marginBottom: SIZES.base }}>Enter Otp</Text>
                        <View style={styles.inputCtn}>
                            <TextInput
                                placeholder='Enter otp'
                                placeholderTextColor={COLORS.chocolate}
                                keyboardType='number-pad'
                                value={otp}
                                onChangeText={handleInputChange}
                                maxLength={4}
                            // onBlur={validateInput}
                            />
                            {errorMessage !== '' && <Text style={{ color: 'red', marginTop: SIZES.base }}>{errorMessage}</Text>}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.h2, alignSelf: 'center' }}>
                        <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Didn't Recieve Code?</Text>
                        <TouchableOpacity onPress={() => handleResend(useId)}>
                            <Text style={{ ...FONTS.body3, color: COLORS.orange }}> Resend</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <View style={{}}> */}
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.nextCtn}>
                <Image source={icons.arrowright} style={{ height: SIZES.h3 * 0.9, width: SIZES.h3 * 0.9, tintColor: COLORS.white }} />
            </TouchableOpacity>
            {/* </View> */}

        </ScrollView>
    );
};

VerifyEmail.propTypes = {
    user: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    updateUserLogin: PropTypes.func.isRequired,
    updateUserAccessToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateUserLogin: (user, isLoggedIn) => dispatch(authActions.updateUserLogin(user, isLoggedIn)),
    updateUserAccessToken: (token) => dispatch(authActions.updateUserAccessToken(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)


const styles = StyleSheet.create({
    nextCtn: {
        height: SIZES.h1 * 2,
        width: SIZES.h1 * 2,
        borderRadius: 100,
        backgroundColor: '#8c55f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.h1 * 2,
        alignSelf: 'center',
        marginRight: SIZES.width * 0.05
        // position: 'absolute',
        // bottom: 0,
    },
    inputCtn: {
        height: SIZES.h1 * 1.9,
        // borderWidth: 1.5,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        marginBottom: SIZES.h1,
        borderColor: COLORS.brown,
        backgroundColor: COLORS.grey2,
        borderRadius: SIZES.h2,
        borderWidth: 1,
    },
});