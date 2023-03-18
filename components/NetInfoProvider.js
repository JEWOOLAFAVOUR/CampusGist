import React from 'react';
import { View, Text } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

const NetInfoProvider = () => {
    const netInfo = useNetInfo();

    return (
        <View>
            {netInfo.isConnected ? (
                <Text>You are online</Text>
            ) : (
                <Text>You are offline</Text>
            )}
        </View>
    );
};

export default NetInfoProvider;
