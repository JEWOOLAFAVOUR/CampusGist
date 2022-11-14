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
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: SIZES.width * 0.05 }}>
            <ScrollView>
                <View style={{ marginTop: SIZES.h1 * 1.5, marginBottom: SIZES.h1 * 2 }}>
                    <Text style={{ ...FONTS.navTitle, color: COLORS.black }}>Welcome</Text>
                    <Text style={{ ...FONTS.body3, }}>Sign in to access more features.</Text>
                </View>
                <View>
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
                                updateUserAccessToken(res.accessToken)
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
                                <View style={styles.inputCtn}>
                                    <TextInput
                                        name="email"
                                        placeholder='Enter Email'
                                        keyboardType='email-address'
                                        style={{ ...FONTS.body3 }}
                                        onChangeText={handleChange('email')}
                                    />
                                    {(errors.email && touched.email) &&
                                        <Text>{errors.email}</Text>}
                                </View>
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
                                        <Text>{errors.password}</Text>}
                                    <TouchableOpacity style={{ marginTop: SIZES.base }}>
                                        <Text style={{ textAlign: 'right', color: COLORS.primary, ...FONTS.h4 }}>Forget Password</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={handleSubmit} style={[styles.btnCtn, { marginTop: SIZES.h1 * 1.2, flexDirection: 'row', alignItems: 'center' }]}>
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
                            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>I am new user,</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                                <Text style={{ ...FONTS.h3a, color: COLORS.primary }}>  Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Bottom')} style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Skip</Text>
                        </TouchableOpacity>
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
    updateUserAccessToken: (accessToken) => dispatch(authActions.updateUserAccessToken(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    inputCtn: {
        height: SIZES.h1 * 1.9,
        borderWidth: 1.5,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base,
        marginBottom: SIZES.h1,
        borderColor: COLORS.brown
    },
    btnCtn: {
        height: SIZES.h1 * 1.8,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
