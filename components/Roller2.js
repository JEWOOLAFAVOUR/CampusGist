import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';

const Roller2 = ({ visible }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 35000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Spinner
            visible={loading && visible}
            size="large"
            color='#182952'
        />
    );
}

export default Roller2;

const styles = StyleSheet.create({});
