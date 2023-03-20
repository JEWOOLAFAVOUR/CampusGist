import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, View, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import { registerUser } from '../../api/auth';
import Toast from '../../components/Toast';
import Roller from '../../components/Roller';

const signUpValidationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('Firstname is missing'),
    lastName: yup
        .string()
        .required('Lastname is missing'),
    username: yup
        .string()
        .required('Username is missing')
        .min(5, ({ min }) => `Username must be at least ${min} characters`),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is required'),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        // .matches(/\d/, 'Password must have a number')
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})

const Register = () => {
    const navigation = useNavigation();

    const [showSpinner, setShowSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [existUserName, setExistUserName] = useState(false);
    const [msg, setMsg] = useState('');
    const [vProfile, setVProfile] = useState(false)
    const { colors: { background } } = useTheme();


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: SIZES.width * 0.05 }}>
            {
                showError && (
                    <Toast message="Please verify your email to proceed" type="fail" />
                )
            }
            {
                existUserName && (
                    <Toast message={msg} type="fail" />
                )
            }
            {vProfile && <Toast message={"Account Created, Please Verify!"} type="success" />}

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCtn}>
                <Image source={icons.arrowleft} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.primary }} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: SIZES.h3, marginBottom: SIZES.h1 * 1.3, alignItems: 'center' }}>
                    <Text style={{ ...FONTS.body1, fontWeight: 'bold', color: COLORS.blue }}>Create an Account</Text>
                    <Text style={{ ...FONTS.body3a, color: COLORS.primary }}>To access more features</Text>
                </View>
                {/* <Text style={{ ...FONTS.body3, }}>Sign in to access more features.</Text> */}
                <Formik
                    validationSchema={signUpValidationSchema}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={async (values) => {
                        setShowSpinner(true);
                        console.log('values', values);
                        registerUser(values).then(res => {
                            console.log('responssse', res)
                            setShowSpinner(false);
                            // setShowSpinner(true);
                            if (res.status === "Email not verified") {
                                setShowError(false)

                                setShowError(true)
                                navigation.navigate('VerifyEmail', { item: res.userId, email: values.email })
                            } else if (res?.data?.verified === false) {
                                console.log('coolll', values)
                                setVProfile(false)
                                setVProfile(true)
                                setTimeout(() => {
                                    navigation.navigate('VerifyEmail', { item: res?.data?._id })
                                }, 2000);
                            }
                        }).catch(err => {
                            console.log('signup error', err.response.data)
                            setShowSpinner(false);
                            setMsg(err?.response.data?.error)
                            setExistUserName(false)
                            console.log('Error', err?.response?.data?.error)
                            setExistUserName(true)
                        })
                        // navigation.navigate('VerifyEmail')

                    }}
                >
                    {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={[styles.inputCtn, { width: SIZES.width * 0.42 }]}>
                                    <TextInput
                                        placeholder='Enter Firstname'
                                        placeholderTextColor={COLORS.chocolate}
                                        name='firstName'
                                        onChangeText={handleChange('firstName')}
                                        style={{ ...FONTS.body4 }}
                                    />
                                    {(errors.firstName && touched.firstName) &&
                                        <Text style={styles.errorText}>{errors.firstName}</Text>}
                                </View>
                                <View style={[styles.inputCtn, { width: SIZES.width * 0.42 }]}>
                                    <TextInput
                                        placeholder='Enter Lastname'
                                        placeholderTextColor={COLORS.chocolate}
                                        name='lastName'
                                        onChangeText={handleChange('lastName')}
                                        style={{ ...FONTS.body4 }}
                                    />
                                    {(errors.lastName && touched.lastName) &&
                                        <Text style={styles.errorText}>{errors.lastName}</Text>}
                                </View>
                            </View>

                            {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Username</Text> */}
                            <View style={styles.inputCtn}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.base }}>
                                    <TextInput
                                        placeholder='Enter Username'
                                        placeholderTextColor={COLORS.chocolate}
                                        name='username'
                                        onChangeText={handleChange('username')}
                                        style={{ ...FONTS.body4, flex: 1 }}
                                    />
                                    <Image source={icons.person} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.chocolate }} />
                                </View>
                                {(errors.username && touched.username) &&
                                    <Text style={styles.errorText}>{errors.username}</Text>}
                            </View>
                            {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Email</Text> */}
                            <View style={styles.inputCtn}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.base }}>
                                    <TextInput
                                        placeholder='Enter Email'
                                        placeholderTextColor={COLORS.chocolate}
                                        name='email'
                                        onChangeText={handleChange('email')}
                                        keyboardType='email-address'
                                        style={{ ...FONTS.body4, flex: 1 }}
                                    />
                                    <Image source={icons.mail} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.chocolate }} />
                                </View>
                                {(errors.email && touched.email) &&
                                    <Text style={styles.errorText}>{errors.email}</Text>}
                            </View>
                            {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Password</Text> */}
                            <View>
                                <View style={[styles.inputCtn, { marginBottom: 0, flexDirection: 'row', alignItems: 'center' }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.base }}>
                                        <TextInput
                                            placeholder='Enter Password'
                                            placeholderTextColor={COLORS.chocolate}
                                            name='password'
                                            onChangeText={handleChange('password')}
                                            secureTextEntry={showPassword}
                                            style={{ ...FONTS.body4, flex: 1 }}
                                            keyboardType='visible-password'
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Image source={icons.key} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.chocolate }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {(errors.password && touched.password) &&
                                    <Text style={styles.errorText}>{errors.password}</Text>}
                            </View>
                            {
                                // <Text>{err.response.data?.error}</Text>
                            }
                            {/* BUTTON  */}
                            <TouchableOpacity onPress={handleSubmit} style={[styles.btnCtn, { marginTop: SIZES.h1 * 2, flexDirection: 'row', alignItems: 'center' }]}>
                                <Text style={{ ...FONTS.body3a, color: COLORS.white, marginRight: SIZES.h4 }}>Register</Text>
                                {
                                    // showSpinner && (<ActivityIndicator color={COLORS.white} />)
                                    showSpinner && (<Roller visible={showSpinner} />)
                                }
                                <Image source={icons.arrowright} style={{ height: SIZES.h4, width: SIZES.h4, tintColor: COLORS.white }} />
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>


                {/* BUTTON  */}
                <View style={{}}>
                    <View style={{ marginTop: SIZES.h1 * 1.3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ ...FONTS.body3b, color: COLORS.primary }}>I am already a member,</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                                <Text style={{ ...FONTS.h2, color: COLORS.primary }}>  Sign In</Text>
                            </TouchableOpacity>

                        </View>
                        {/* <TouchableOpacity style={{ alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Skip</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

export default Register

const styles = StyleSheet.create({
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
    errorText: {
        color: 'red',
        ...FONTS.body4,
        marginVertical: SIZES.base * 0.3,
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