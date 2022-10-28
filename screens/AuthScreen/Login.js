import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { SIZES, COLORS, FONTS, icons } from '../../constants';

const Login = () => {
    const { colors: { background } } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: background }}>
            <ScrollView>
                <View>
                    <Text>Welcome</Text>
                    <Text>Sign in to access more features.</Text>
                </View>

                <View>
                    <View>
                        <View>
                            <TextInput
                                placeholder="Enter Email"
                                keyboardType='email-address'
                            />
                        </View>
                    </View>

                    <View>
                        <View>
                            <TextInput
                                placeholder="Enter Password"
                                secureTextEntry={true}
                            />
                        </View>
                        <TouchableOpacity>

                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})