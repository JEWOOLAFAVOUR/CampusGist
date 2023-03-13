// import React, { useRef } from 'react';
// import { View, TextInput, StyleSheet } from 'react-native';

// const OtpInput = () => {
//     const secondInputRef = useRef();
//     const thirdInputRef = useRef();
//     const fourthInputRef = useRef();

//     const focusSecondInput = () => {
//         secondInputRef.current.focus();
//     };

//     const focusThirdInput = () => {
//         thirdInputRef.current.focus();
//     };

//     const focusFourthInput = () => {
//         fourthInputRef.current.focus();
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 onChangeText={focusSecondInput}
//             />
//             <TextInput
//                 style={styles.input}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 onChangeText={focusThirdInput}
//                 ref={secondInputRef}
//             />
//             <TextInput
//                 style={styles.input}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 onChangeText={focusFourthInput}
//                 ref={thirdInputRef}
//             />
//             <TextInput
//                 style={styles.input}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 ref={fourthInputRef}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         marginTop: 16,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 4,
//         paddingHorizontal: 8,
//         paddingVertical: 12,
//         width: '22%',
//         textAlign: 'center',
//         fontSize: 20,
//     },
// });

// export default OtpInput;

// const handleCreateAccount = async () => {
// setLoading(true);
// setShowToast(!showToast);

// try {
//     // Simulate network request delay of 5 seconds
//     await new Promise((resolve) => setTimeout(resolve, 5000));

//     // Replace this with actual network request
//     // await fetch('https://example.com/create-account', { method: 'POST' });

//     setLoading(false);
//     Alert.alert('Success!', 'Account created successfully!');
// } catch (err) {
//     setLoading(false);
//     Alert.alert('Oops!', err.message);
// }
// };

import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const OtpInput = () => {
    const firstInputRef = useRef();
    const secondInputRef = useRef();
    const thirdInputRef = useRef();
    const fourthInputRef = useRef();

    const [otp, setOtp] = useState('');

    const handleInputChange = (value, ref, nextRef) => {
        if (value) {
            if (nextRef) {
                nextRef.current.focus();
            }

            // set OTP state
            setOtp(
                firstInputRef.current?.value +
                secondInputRef.current?.value +
                thirdInputRef.current?.value +
                fourthInputRef.current?.value
            );
        } else {
            if (ref) {
                ref.current.focus();
            }
        }
    };

    const handleBackspace = (e, ref, prevRef) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (!ref.current._lastNativeText) {
                prevRef.current.focus();
            }
            // update OTP state
            setOtp(
                firstInputRef.current?.value +
                secondInputRef.current?.value +
                thirdInputRef.current?.value +
                fourthInputRef.current?.value
            );
        }
    };

    const handleLastInputSubmit = () => {
        // set OTP state
        setOtp(
            firstInputRef.current?.value +
            secondInputRef.current?.value +
            thirdInputRef.current?.value +
            fourthInputRef.current?.value
        );
    };

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                        handleInputChange(value, firstInputRef, secondInputRef)
                    }
                    onKeyPress={(e) =>
                        handleBackspace(e, firstInputRef, firstInputRef)
                    }
                    ref={firstInputRef}
                />
                <TextInput
                    style={styles.input}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                        handleInputChange(value, secondInputRef, thirdInputRef)
                    }
                    onKeyPress={(e) =>
                        handleBackspace(e, secondInputRef, firstInputRef)
                    }
                    ref={secondInputRef}
                />
                <TextInput
                    style={styles.input}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                        handleInputChange(value, thirdInputRef, fourthInputRef)
                    }
                    onKeyPress={(e) => handleBackspace(e, thirdInputRef, secondInputRef)}
                    ref={thirdInputRef}
                />
                <TextInput
                    style={styles.input}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(value) =>
                        handleInputChange(value, fourthInputRef, null)
                    }
                    onKeyPress={(e) =>
                        handleBackspace(e, fourthInputRef, thirdInputRef)
                    }
                    ref={fourthInputRef}
                    onSubmitEditing={handleLastInputSubmit}
                />
            </View>
            <Text>{`OTP: ${otp}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 12,
        width: '22%',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default OtpInput;


