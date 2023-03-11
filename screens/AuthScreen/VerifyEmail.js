// import React, { useEffect } from 'react';
// import { View, Text, BackHandler } from 'react-native';
// import { StackActions } from '@react-navigation/native';

// const VerifyEmail = ({ navigation }) => {
//     useEffect(() => {
//         const backAction = () => {
//             navigation.dispatch(StackActions.popToTop());
//             BackHandler.exitApp();
//             return true;
//         };

//         const removeListener = navigation.addListener('beforeRemove', (e) => {
//             e.preventDefault();
//             backAction();
//         });

//         const backHandler = BackHandler.addEventListener(
//             'hardwareBackPress',
//             backAction
//         );

//         return () => {
//             removeListener();
//             backHandler.remove();
//         };
//     }, [navigation]);

//     return (
//         <View>
//             <Text>VerifyEmail Screen</Text>
//         </View>
//     );
// };

// export default VerifyEmail;


import React, { useEffect } from 'react';
import { View, Text, BackHandler, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import OtpInput from './Otp';

const VerifyEmail = ({ navigation }) => {
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

    return (
        <View>
            <Text>VerifyEmail Screen</Text>
            <OtpInput />
        </View>
    );
};

export default VerifyEmail;

