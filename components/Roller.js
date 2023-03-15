import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';

const Roller = ({ visible }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Spinner
            visible={loading && visible}
            size="large"
        />
    );
}

export default Roller;

const styles = StyleSheet.create({});


// I'm having an app by a client last night to check, it about redesigning/cloning the app, the beta version already done about to be release for the beta testing, but the client developer wasn't able to aceive Linear Accelerometer using Flutter, so he said I should clone/redesign the app with React-Native.
// The app is about "accurate and estimated vital sign measurement with your phone"

// Blood Pressure, Breath Count, Step Count, Speed Measurement, Noise Measurement

// so he said I should write a quotation for it, note i'm using react native in clonning/redsegin the app all over from scarath from flutter, backend is ready, because they
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Spinner from 'react-native-loading-spinner-overlay';


// const Roller = ({ visible }) => {
//     return <Spinner visible={true} size="large" />

// }

// export default Roller

// const styles = StyleSheet.create({})