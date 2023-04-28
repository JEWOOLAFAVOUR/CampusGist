import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import { loginUser } from '../../api/auth';
import { showSnackBar } from '../../utils/SnackBar';
import { connect } from 'react-redux';
import * as authActions from '../../redux/actions/authAction'
import PropTypes from 'prop-types'
import { setTokenInterceptor } from '../../utils/setTokenInterceptor';
import Roller from '../../components/Roller';
import Toast from '../../components/Toast';


const Login = ({ ...props }) => {


    const { updateUserLogin, updateUserAccessToken, user, isLoggedIn, updateUserRefreshToken } = props

    const navigation = useNavigation();

    const [showSpinner, setShowSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [showToast, setShowToast] = useState(false)
    const [toastMsg, setToastMsg] = useState('')
    const [showToast2, setShowToast2] = useState(false)
    const [notVerify, setNotVerify] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [press, setPress] = useState(true);

    const handleSubmit = async () => {
        setShowSpinner(false)
        setShowSpinner(true)
        const data = await loginUser(email, password)
        console.log('response', data)
        setShowSpinner(false)
        if (data.error) {
            setToastMsg(data.error)
            setShowToast(false)
            setShowToast(true)
        } else if (data?.user?.verified === false) {
            setNotVerify(false)
            setNotVerify(true)
            setTimeout(() => {
                navigation.navigate("VerifyEmail", { item: data.user.id, emailSubmitted: data.user?.emailSubmitted });
            }, 1500);
        } else {
            setShowToast2(false)
            setShowToast2(true)
            setTimeout(() => {
                navigation.replace('Main', { screen: 'Bottom' });
            }, 1000);
            updateUserLogin(data.user, true)

            updateUserAccessToken(data?.user?.accessToken)
            updateUserRefreshToken(data?.refreshToken)
        }
    }

    const { colors: { background } } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: SIZES.width * 0.05 }}>
            {
                showSpinner && (<Roller visible={showSpinner} />)
            }
            {showToast && <Toast message={toastMsg} type="fail" />}
            {showToast2 && <Toast message="Login Successful" type="success" />}
            {notVerify && <Toast message="Please verify your email to proceed!" type="fail" />}

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCtn}>
                <Image source={icons.arrowleft} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.primary }} />
            </TouchableOpacity>
            <ScrollView>
                <View style={{ marginTop: SIZES.h1 * 1.5, marginBottom: SIZES.h1 * 2, alignItems: 'center' }}>
                    <Text style={{ ...FONTS.body1, fontWeight: 'bold', color: COLORS.blue }}>Welcome Back 👋</Text>
                    <Text style={{ ...FONTS.body3a, color: COLORS.primary }}>Hi there, you've been missed</Text>
                </View>
                <View style={{ flex: 1 }}>


                    <View style={styles.inputCtn}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.base }}>
                            <TextInput
                                placeholder='Enter Email'
                                placeholderTextColor={COLORS.chocolate}
                                keyboardType='email-address'
                                style={{ ...FONTS.body4, flex: 1, color: COLORS.black }}
                                value={email}
                                onChangeText={value => setEmail(value)}
                            />
                            <Image source={icons.mail} style={{ height: SIZES.h3, width: SIZES.h3 }} />
                        </View>
                    </View>
                    {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Password</Text> */}
                    <View style={{}}>
                        <View style={[styles.inputCtn, { marginBottom: 0, flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.base }]}>
                            <TextInput
                                placeholder='Enter Password'
                                placeholderTextColor={COLORS.chocolate}
                                style={{ ...FONTS.body4, flex: 1, color: COLORS.black }}
                                secureTextEntry={press}
                                value={password}
                                onChangeText={value => setPassword(value)}
                                keyboardType='visible-password'
                            />
                            <TouchableOpacity onPress={() => setPress(!press)}>
                                <Image source={press ? icons.eyeclose : icons.eye} style={{ height: SIZES.h2, width: SIZES.h2, marginRight: SIZES.base }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ alignItems: 'center', marginBottom: SIZES.base, marginTop: SIZES.body1 * 1. }}>
                            <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
                    {/* LOGIN BUTTON */}
                    <TouchableOpacity onPress={() => handleSubmit()} style={[styles.btnCtn, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={{ ...FONTS.body3a, color: COLORS.white, marginRight: SIZES.h4 }}>Login</Text>
                        <Image source={icons.arrowright} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.white }} />
                    </TouchableOpacity>

                </View>
            </ScrollView >

        </View >
    )
}

Login.propTypes = {
    user: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    updateUserLogin: PropTypes.func.isRequired,
    updateUserAccessToken: PropTypes.func.isRequired,
    updateUserRefreshToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        // refreshToken: state.auth.refreshToken,
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateUserLogin: (user, isLoggedIn) => dispatch(authActions.updateUserLogin(user, isLoggedIn)),
    updateUserAccessToken: (token) => dispatch(authActions.updateUserAccessToken(token)),
    updateUserRefreshToken: (refreshToken) => dispatch(authActions.updateUserRefreshToken(refreshToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    inputCtn: {
        height: SIZES.h1 * 1.9,
        // borderWidth: 1.5,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        marginBottom: SIZES.h1,
        // borderColor: COLORS.brown,
        backgroundColor: COLORS.grey2,
        borderRadius: SIZES.h2,
        borderWidth: 1,
    },
    btnCtn: {
        height: SIZES.h1 * 1.8,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.h3,
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.h2,
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 0,
    },
    backCtn: {
        height: SIZES.h1 * 1.8,
        width: SIZES.h1 * 1.8,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        marginTop: SIZES.h3,
    },
})





















// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation, useTheme } from '@react-navigation/native';
// import { SIZES, COLORS, FONTS, icons } from '../../constants';
// import * as yup from 'yup';
// import { Formik, Field } from 'formik';
// import { loginUser } from '../../api/auth';
// import { showSnackBar } from '../../utils/SnackBar';
// import { connect } from 'react-redux';
// import * as authActions from '../../redux/actions/authAction'
// import PropTypes from 'prop-types'
// import { setTokenInterceptor } from '../../utils/setTokenInterceptor';
// import Roller from '../../components/Roller';
// import Toast from '../../components/Toast';


// const signInValidationSchema = yup.object().shape({
//     // email: yup.string()
//     //     .email('Please enter a valid email')
//     //     .required('Email is required'),
//     // password: yup.string().required('Password is required')
// })

// const Login = ({ ...props }) => {


//     const { updateUserLogin, updateUserAccessToken, user, isLoggedIn } = props

//     const navigation = useNavigation();

//     const [showSpinner, setShowSpinner] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [showError, setShowError] = useState(false)

//     const { colors: { background } } = useTheme();

//     return (
//         <View style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: SIZES.width * 0.05 }}>
//             {
//                 // showSpinner && (<ActivityIndicator color={COLORS.white} />)
//                 showSpinner && (<Roller />)
//             }
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCtn}>
//                 <Image source={icons.arrowleft} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.primary }} />
//             </TouchableOpacity>
//             <ScrollView>
//                 <View style={{ marginTop: SIZES.h1 * 1.5, marginBottom: SIZES.h1 * 2, alignItems: 'center' }}>
//                     <Text style={{ ...FONTS.body1, fontWeight: 'bold', color: COLORS.blue }}>Welcome Back 👋</Text>
//                     <Text style={{ ...FONTS.body3a, color: COLORS.primary }}>Hi there, you've been missed</Text>
//                 </View>
//                 <View style={{ flex: 1 }}>
//                     <Formik
//                         validationSchema={signInValidationSchema}
//                         initialValues={{ email: '', password: '' }}
//                         onSubmit={async (values) => {
//                             setShowSpinner(true);
//                             console.log('values', values);
//                             loginUser(values).then(res => {
//                                 console.log('response', res)
//                                 setShowSpinner(false);
//                                 // navigation.navigate('Bottom')
//                                 // updateUserLogin(res, true)
//                                 // updateUserAccessToken(res.user.accessToken)
//                                 // setTokenInterceptor(res)
//                                 // console.log('User coming from state', user)
//                                 // console.log('isLoggedIn coming from state', isLoggedIn)
//                             }).catch(err => {
//                                 // console.log('Error', err.response.data.error)
//                                 console.log('Error', err)
//                                 setShowSpinner(false);
//                             })


//                         }}>
//                         {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (

//                             <>
//                                 {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Email</Text> */}
//                                 {
//                                     <Toast />
//                                 }
//                                 <View style={styles.inputCtn}>
//                                     <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.base }}>
//                                         <TextInput
//                                             name="email"
//                                             placeholder='Enter Email'
//                                             placeholderTextColor={COLORS.chocolate}
//                                             keyboardType='email-address'
//                                             style={{ ...FONTS.body4, flex: 1 }}
//                                             onChangeText={handleChange('email')}
//                                         />
//                                         <Image source={icons.mail} style={{ height: SIZES.h3, width: SIZES.h3 }} />
//                                     </View>
//                                     {(errors.email && touched.email) &&
//                                         <Text style={{ ...FONTS.body4, color: 'red', marginVertical: SIZES.base * 0.3, }}>{errors.email}</Text>}
//                                 </View>
//                                 {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Password</Text> */}
//                                 <View style={{}}>
//                                     <View style={[styles.inputCtn, { marginBottom: 0, flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.base }]}>
//                                         <TextInput
//                                             name="password"
//                                             placeholder='Enter Password'
//                                             placeholderTextColor={COLORS.chocolate}
//                                             style={{ ...FONTS.body4, flex: 1 }}
//                                             onChangeText={handleChange('password')}
//                                             secureTextEntry={showPassword}

//                                         />
//                                         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                                             <Image source={icons.key} style={{ height: SIZES.h3, width: SIZES.h3 }} />
//                                         </TouchableOpacity>
//                                     </View>
//                                     {(errors.password && touched.password) &&
//                                         <Text style={{ ...FONTS.body4, color: 'red', marginVertical: SIZES.base * 0.3, }}>{errors.password}</Text>}
//                                     <TouchableOpacity style={{ alignItems: 'center', marginBottom: SIZES.base, marginTop: SIZES.body1 * 1.5 }}>
//                                         <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Forget Password?</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 {/* LOGIN BUTTON */}
//                                 <TouchableOpacity onPress={handleSubmit} style={[styles.btnCtn, { flexDirection: 'row', alignItems: 'center' }]}>
//                                     <Text style={{ ...FONTS.body3a, color: COLORS.white, marginRight: SIZES.h4 }}>Login</Text>
//                                     <Image source={icons.arrowright} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.white }} />
//                                 </TouchableOpacity>
//                             </>
//                         )}
//                     </Formik>
//                 </View>
//             </ScrollView >

//         </View >
//     )
// }

// Login.propTypes = {
//     user: PropTypes.object.isRequired,
//     isLoggedIn: PropTypes.bool.isRequired,
//     updateUserLogin: PropTypes.func.isRequired,
//     updateUserAccessToken: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => {
//     return {
//         user: state.auth.user,
//         isLoggedIn: state.auth.isLoggedIn
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     updateUserLogin: (user, isLoggedIn) => dispatch(authActions.updateUserLogin(user, isLoggedIn)),
//     updateUserAccessToken: (token) => dispatch(authActions.updateUserAccessToken(token))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

// const styles = StyleSheet.create({
//     inputCtn: {
//         height: SIZES.h1 * 1.9,
//         // borderWidth: 1.5,
//         borderRadius: SIZES.radius,
//         paddingHorizontal: SIZES.base,
//         marginBottom: SIZES.h1,
//         // borderColor: COLORS.brown,
//         backgroundColor: COLORS.grey2,
//         borderRadius: SIZES.h2,
//         borderWidth: 1,
//     },
//     btnCtn: {
//         height: SIZES.h1 * 1.8,
//         backgroundColor: COLORS.primary,
//         borderRadius: SIZES.h3,
//         justifyContent: 'space-between',
//         paddingHorizontal: SIZES.h2,
//         alignItems: 'center',
//         // position: 'absolute',
//         // bottom: 0,
//     },
//     backCtn: {
//         height: SIZES.h1 * 1.8,
//         width: SIZES.h1 * 1.8,
//         borderRadius: 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f3f3f3',
//         marginTop: SIZES.h3,
//     },
// })
