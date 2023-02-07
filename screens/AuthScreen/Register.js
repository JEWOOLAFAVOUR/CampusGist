import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, View, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, icons } from '../../constants';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import { registerUser } from '../../api/auth';



const signUpValidationSchema = yup.object().shape({
    firstname: yup
        .string()
        .required('Firstname is missing'),
    lastname: yup
        .string()
        .required('Lastname is missing'),
    username: yup
        .string()
        .required('Username is missing'),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is required'),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        .matches(/\d/, 'Password must have a number')
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})

const Register = () => {
    const navigation = useNavigation();

    const [showSpinner, setShowSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { colors: { background } } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: SIZES.width * 0.05 }}>
            <ScrollView>
                <View style={{ marginTop: SIZES.h1 * 1, marginBottom: SIZES.h1 * 1.5 }}>
                    <Text style={{ fontSize: SIZES.navTitle * 1.3, fontWeight: 'bold', color: COLORS.blue }}>Create</Text>
                    <Text style={{ fontSize: SIZES.navTitle * 1.3, fontWeight: 'bold', color: COLORS.blue }}>an account</Text>
                    {/* <Text style={{ ...FONTS.body3, }}>Sign in to access more features.</Text> */}
                </View>
                <Formik
                    validationSchema={signUpValidationSchema}
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        username: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={async (values) => {
                        setShowSpinner(true);
                        console.log('values', values);
                        registerUser(values).then(res => {
                            console.log('response', res)
                            setShowSpinner(false);
                            Alert.alert(
                                ' ',
                                res.status,
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => {
                                            navigation.navigate('Login')
                                        }
                                    }
                                ]
                            )
                            // navigation.navigate('Bottom')
                        }).catch(err => {
                            console.log('signup error', err.response.data?.error)
                            setShowSpinner(false);
                            console.log('Error', err.response.data?.error)
                        })
                    }}
                >
                    {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (
                        <>
                            {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>FullName</Text> */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={[styles.inputCtn, { width: SIZES.width * 0.42 }]}>
                                    <TextInput
                                        placeholder='Enter Firstname'
                                        name='firstname'
                                        onChangeText={handleChange('firstname')}
                                        style={{ ...FONTS.body3 }}
                                    />
                                    {(errors.firstname && touched.firstname) &&
                                        <Text style={styles.errorText}>{errors.firstname}</Text>}
                                </View>
                                <View style={[styles.inputCtn, { width: SIZES.width * 0.42 }]}>
                                    <TextInput
                                        placeholder='Enter Lastname'
                                        name='lastname'
                                        onChangeText={handleChange('lastname')}
                                        style={{ ...FONTS.body3 }}
                                    />
                                    {(errors.lastname && touched.lastname) &&
                                        <Text style={styles.errorText}>{errors.lastname}</Text>}
                                </View>
                            </View>

                            {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Username</Text> */}
                            <View style={styles.inputCtn}>
                                <TextInput
                                    placeholder='Enter Username'
                                    name='username'
                                    onChangeText={handleChange('username')}
                                    style={{ ...FONTS.body3 }}
                                />
                                {(errors.username && touched.username) &&
                                    <Text style={styles.errorText}>{errors.username}</Text>}
                            </View>
                            {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Email</Text> */}
                            <View style={styles.inputCtn}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    <TextInput
                                        placeholder='Enter Email'
                                        name='email'
                                        onChangeText={handleChange('email')}
                                        keyboardType='email-address'
                                        style={{ ...FONTS.body3, flex: 1 }}
                                    />
                                    <Image source={icons.mail} style={{ height: SIZES.h2, width: SIZES.h2, tintColor: COLORS.chocolate }} />
                                </View>
                                {(errors.email && touched.email) &&
                                    <Text style={styles.errorText}>{errors.email}</Text>}
                            </View>
                            {/* <Text style={{ ...FONTS.body2b, color: COLORS.black, marginBottom: SIZES.base * 0.2 }}>Password</Text> */}
                            <View>
                                <View style={[styles.inputCtn, { marginBottom: 0, flexDirection: 'row', alignItems: 'center' }]}>
                                    <TextInput
                                        placeholder='Enter Password'
                                        name='password'
                                        onChangeText={handleChange('password')}
                                        secureTextEntry={showPassword}
                                        style={{ ...FONTS.body3, flex: 1 }}
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        <Image source={icons.key} style={{ height: SIZES.h3, width: SIZES.h3, tintColor: COLORS.chocolate }} />
                                    </TouchableOpacity>
                                </View>
                                {(errors.password && touched.password) &&
                                    <Text style={styles.errorText}>{errors.password}</Text>}
                            </View>
                            {
                                // <Text>{err.response.data?.error}</Text>
                            }
                            {/* BUTTON  */}
                            <TouchableOpacity onPress={handleSubmit} style={[styles.btnCtn, { marginTop: SIZES.h1 * 2, flexDirection: 'row', alignItems: 'center' }]}>
                                <Text style={{ ...FONTS.body2a, color: COLORS.white, marginRight: SIZES.h4 }}>Login</Text>
                                {
                                    showSpinner && (<ActivityIndicator color={COLORS.white} />)
                                }
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
        </View>
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
        borderRadius: SIZES.h4,
    },
    btnCtn: {
        height: SIZES.h1 * 1.8,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        ...FONTS.body4,
        marginVertical: SIZES.base * 0.3,
    },
})