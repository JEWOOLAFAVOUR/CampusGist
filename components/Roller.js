import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';


const Roller = ({ visible }) => {
    return <Spinner visible={true} size="large" />

}

export default Roller

const styles = StyleSheet.create({})