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



// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Spinner from 'react-native-loading-spinner-overlay';


// const Roller = ({ visible }) => {
//     return <Spinner visible={true} size="large" />

// }

// export default Roller

// const styles = StyleSheet.create({})