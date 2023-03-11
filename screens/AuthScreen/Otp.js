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


// import React, { useRef } from 'react';
// import { View, TextInput, StyleSheet } from 'react-native';

// const OtpInput = () => {
//     const firstInputRef = useRef();
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

//     const focusFirstInput = () => {
//         firstInputRef.current.focus();
//     };

//     const handleBackspace = (ref, val) => {
//         if (val === '') {
//             ref.current.focus();
//         }
//     };

//     const handleDelete = (ref, val) => {
//         if (val === '') {
//             const prevRef = ref === fourthInputRef ? thirdInputRef : ref === thirdInputRef ? secondInputRef : firstInputRef;
//             prevRef.current.focus();
//             prevRef.current.setNativeProps({ text: '' });
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 onChangeText={focusSecondInput}
//                 ref={firstInputRef}
//                 onKeyPress={({ nativeEvent: { key: keyValue } }) => {
//                     if (keyValue === 'Backspace') {
//                         handleBackspace(firstInputRef, firstInputRef.current._lastNativeText);
//                     }
//                 }}
//             />
//             <TextInput
//                 style={styles.input}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 onChangeText={focusThirdInput}
//                 ref={secondInputRef}
//                 onKeyPress={({ nativeEvent: { key: keyValue } }) => {
//                     if (keyValue === 'Backspace') {
//                         handleBackspace(secondInputRef, secondInputRef.current._lastNativeText);
//                     }
//                 }}
//                 onTextInput={({ nativeEvent: { text: inputValue } }) => {
//                     handleDelete(secondInputRef, inputValue);
//                 }}
//             />
//             <TextInput
//                 style={styles.input}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 onChangeText={focusFourthInput}
//                 ref={thirdInputRef}
//                 onKeyPress={({ nativeEvent: { key: keyValue } }) => {
//                     if (keyValue === 'Backspace') {
//                         handleBackspace(thirdInputRef, thirdInputRef.current._lastNativeText);
//                     }
//                 }}
//                 onTextInput={({ nativeEvent: { text: inputValue } }) => {
//                     handleDelete(thirdInputRef, inputValue);
//                 }}
//             />
//             <TextInput
//                 style={styles.input}
//                 maxLength={1}
//                 keyboardType="numeric"
//                 ref={fourthInputRef}
//                 onKeyPress={({ nativeEvent: { key: keyValue } }) => {
//                     if (keyValue === 'Backspace') {
//                         handleBackspace(fourthInputRef, fourthInputRef.current._lastNativeText);
//                     }
//                 }}
//                 onTextInput={({ nativeEvent: { text: inputValue } }) => {
//                     handleDelete(fourthInputRef, inputValue);
//                 }}
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

import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = () => {
    const firstInputRef = useRef();
    const secondInputRef = useRef();
    const thirdInputRef = useRef();
    const fourthInputRef = useRef();

    const handleInputChange = (value, ref, nextRef) => {
        if (value) {
            if (nextRef) {
                nextRef.current.focus();
            }
        } else {
            if (ref) {
                ref.current.focus();
            }
        }
    };

    const handleBackspace = (e, ref, prevRef) => {
        if (e.nativeEvent.key === 'Backspace' && !e.nativeEvent.keyIsDown) {
            if (!ref.current._lastNativeText) {
                prevRef.current.focus();
            }
        }
    };

    return (
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
                onKeyPress={(e) =>
                    handleBackspace(e, thirdInputRef, secondInputRef)
                }
                ref={thirdInputRef}
            />
            <TextInput
                style={styles.input}
                maxLength={1}
                keyboardType="numeric"
                onKeyPress={(e) =>
                    handleBackspace(e, fourthInputRef, thirdInputRef)
                }
                ref={fourthInputRef}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 12,
        width: '22%',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default OtpInput;

