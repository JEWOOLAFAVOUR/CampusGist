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


const signInValidationSchema = yup.object().shape({
    email: yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup.string().required('Password is required')
})

const Login = ({ ...props }) => {


    const { updateUserLogin, updateUserAccessToken, user, isLoggedIn } = props

    const navigation = useNavigation();

    const [showSpinner, setShowSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { colors: { background } } = useTheme();

    useEffect(() => {

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: SIZES.width * 0.05 }}>
            <ScrollView>
                <View style={{ marginTop: SIZES.h1 * 1.5, marginBottom: SIZES.h1 * 1.5 }}>
                    <Text style={{ fontSize: SIZES.navTitle * 1.3, fontWeight: 'bold', color: COLORS.blue }}>Let's Sign</Text>
                    <Text style={{ fontSize: SIZES.navTitle * 1.3, fontWeight: 'bold', color: COLORS.blue }}>You In</Text>
                    {/* <Text style={{ ...FONTS.body3, }}>Sign in to access more features.</Text> */}
                </View>
                <View style={{ flex: 1 }}>
                    <Formik
                        validationSchema={signInValidationSchema}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={async (values) => {
                            setShowSpinner(true);
                            console.log('values', values);
                            loginUser(values).then(res => {
                                console.log('response', res)
                                setShowSpinner(false);
                                navigation.navigate('Bottom')
                                updateUserLogin(res, true)
                                updateUserAccessToken(res.user.accessToken)
                                setTokenInterceptor(res)
                                console.log('User coming from state', user)
                                console.log('isLoggedIn coming from state', isLoggedIn)
                                // showSnackBar('Successfully LoggedIn')
                            }).catch(err => {
                                console.log('Error', err.response.data?.error)
                                setShowSpinner(false);
                                // showSnackBar(err.response.data?.error, 'ERROR')
                                // console.log('Error', err.response)
                            })
                        }}>
                        {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (

                            <>
                                {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Email</Text> */}
                                <View style={styles.inputCtn}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <TextInput
                                            name="email"
                                            placeholder='Enter Email'
                                            keyboardType='email-address'
                                            style={{ ...FONTS.body3, flex: 1 }}
                                            onChangeText={handleChange('email')}
                                        />
                                        <Image source={icons.mail} style={{ height: SIZES.h2, width: SIZES.h2 }} />
                                    </View>
                                    {(errors.email && touched.email) &&
                                        <Text style={{ ...FONTS.body4, color: 'red', marginVertical: SIZES.base * 0.3, }}>{errors.email}</Text>}
                                </View>
                                {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Password</Text> */}
                                <View>
                                    <View style={[styles.inputCtn, { marginBottom: 0, flexDirection: 'row', alignItems: 'center' }]}>
                                        <TextInput
                                            name="password"
                                            placeholder='Enter Password'
                                            style={{ ...FONTS.body3, flex: 1 }}
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={showPassword}

                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Image source={icons.key} style={{ height: SIZES.h3, width: SIZES.h3 }} />
                                        </TouchableOpacity>
                                    </View>
                                    {(errors.password && touched.password) &&
                                        <Text style={{ ...FONTS.body4, color: 'red', marginVertical: SIZES.base * 0.3, }}>{errors.password}</Text>}
                                    <TouchableOpacity style={{ marginTop: SIZES.base * 1.6 }}>
                                        <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>Forget Password?</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={handleSubmit} style={[styles.btnCtn, { marginTop: SIZES.h1 * 5, flexDirection: 'row', alignItems: 'center' }]}>
                                    <Text style={{ ...FONTS.body2a, color: COLORS.white, marginRight: SIZES.h4 }}>Login</Text>
                                    {
                                        showSpinner && (<ActivityIndicator color={COLORS.white} />)
                                    }
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </View>

                {/* BUTTON  */}
                <View style={{}}>

                    <View style={{ marginTop: SIZES.h1 * 1.3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ ...FONTS.body3b, color: COLORS.primary }}>I am new user,</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                                <Text style={{ ...FONTS.h2, color: COLORS.primary }}>  Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Bottom')} style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Skip</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

Login.propTypes = {
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
        borderRadius: SIZES.h4,
    },
    btnCtn: {
        height: SIZES.h1 * 1.8,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
