import React, { useState, useEffect } from 'react';
import { NetInfo } from 'react-native';

const NetInfoProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        const handleConnectivityChange = (isConnected) => {
            setIsConnected(isConnected);
        };

        NetInfo.isConnected.addEventListener('connectionChange', handleConnectivityChange);

        return () => {
            NetInfo.isConnected.removeEventListener('connectionChange', handleConnectivityChange);
        };
    }, []);

    return children({ isConnected });
};

export default NetInfoProvider;
