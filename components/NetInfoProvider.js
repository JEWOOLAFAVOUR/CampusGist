import React, { useState, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import Toast from './Toast';
import { COLORS, FONTS } from '../constants';

const NetInfoProvider = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            if (!state.isConnected) {
                setIsModalVisible(true);
                const id = setInterval(() => {
                    NetInfo.fetch().then(state => {
                        if (state.isConnected) {
                            setIsConnected(true);
                            setIsModalVisible(false);
                            clearInterval(intervalId);
                        }
                    });
                }, 10000);
                setIntervalId(id);
            }
        });

        return () => {
            unsubscribe();
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    const closeModal = () => {
        setIsModalVisible(false);
        clearInterval(intervalId);
    };

    return (
        <View>
            {isConnected ? (
                ToastAndroid.show("You're back online!", ToastAndroid.SHORT)
            ) : (
                <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text style={{ marginBottom: 10, ...FONTS.h3, color: COLORS.black }}>No internet connection</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.black }}>Please check your internet connection and try again.</Text>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default NetInfoProvider;




// import React, { useEffect, useState } from 'react';
// import { View, Text, Modal, Button } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// import { styles } from './styles';

// const NetInfoProvider = () => {
//   const [isConnected, setIsConnected] = useState(true);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       if (!state.isConnected) {
//         setIsConnected(false);
//         setIsModalVisible(true);
//       } else {
//         setIsConnected(true);
//         setIsModalVisible(false);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <View>
//       {isConnected ? (
//         <Text>You are connected to the internet.</Text>
//       ) : (
//         <Modal visible={isModalVisible} animationType="slide">
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalText}>
//               No internet connection. Please check your internet connection and try again.
//             </Text>
//             <Button title="OK" onPress={() => setIsModalVisible(false)} />
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// };

// export default NetInfoProvider;


{/* <FlatList
refreshControl={<RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={this.props.refreshing}
                onRefresh={this._onRefresh.bind(this)} />}
/> */}