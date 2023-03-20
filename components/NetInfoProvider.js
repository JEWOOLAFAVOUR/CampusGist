import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetInfoProvider = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            if (!state.isConnected) {
                Alert.alert('No internet connection', 'Please check your internet connection and try again.');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View>
            {isConnected ? (
                <Text>You are connected to the internet.</Text>
            ) : (
                <Text>You are not connected to the internet.</Text>
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