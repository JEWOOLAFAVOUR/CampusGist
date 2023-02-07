import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants';

const MarketDetail = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);

    // USING NORMAL VARIABLE
    const friend1 = 'Dayo'
    const friend2 = 'Felix'
    const friend3 = 'Teni'

    // USING ARRAY
    const friends = ['Dayo', 'Felix', 'Teni']

    const j205534 = {
        name: 'Favour',
        dept: 'CSC',
        level: 200,
        gender: 'Male',
    }
    const g205555 = {
        name: 'Mide',
        dept: 'CSC',
        level: 200,
        gender: 'Female',
    }

    const k205555 = {
        name: 'Mide',
        dept: 'CSC',
        level: 200,
        gender: 'Female',
    }

    const studentBioData = [
        {
            id: 1,
            name: 'Favour',
            matricNo: 205534,
            dept: 'CSC',
            bioImage: require('../../assets/alphabet/delete1.png'),
        },
        {
            id: 2,
            name: 'David',
            matricNo: 199999,
            dept: 'CSE',
            bioImage: require('../../assets/alphabet/delete1.png'),
        },
        {
            id: 3,
            name: 'Damola',
            matricNo: 144444,
            dept: 'BCH',
            bioImage: require('../../assets/alphabet/delete1.png'),
        }, {
            id: 4,
            name: 'Felix',
            matricNo: 144444,
            dept: 'BCH',
            bioImage: require('../../assets/alphabet/delete1.png'),
        }, {
            id: 5,
            name: 'Teni',
            matricNo: 144444,
            dept: 'BCH',
            bioImage: require('../../assets/alphabet/delete1.png'),
        }, {
            id: 6,
            name: 'Teni',
            matricNo: 144444,
            dept: 'BCH',
            bioImage: require('../../assets/alphabet/delete1.png'),
        }, {
            id: 7,
            name: 'Teni',
            matricNo: 144444,
            dept: 'BCH',
            bioImage: require('../../assets/alphabet/delete1.png'),
        }
    ];

    const kudaData = [
        {
            id: 1,
            // dataIcon: require(''),
            title: 'Enable Biometrics',
            story: 'djdjdjdjdjdjdjdjdjdjdjdjdjcncnnvnvn',
        }, {
            id: 2,
            // dataIcon: require(''),
            title: 'Invite Friends',
            story: 'djdjdjdjdjdjdjdjdjdjdjdjdjcncnnvnvn',
        },
    ];



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'black' }}>FLATLIST CLASS</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginBottom: 20, alignItems: 'center', justifyContent: 'space-between', }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>NAME</Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>DEPT</Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>MATRICNO</Text>
            </View>

            <FlatList
                data={studentBioData}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container}>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>{item.name}</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>{item.dept}</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>{item.matricNo}</Text>
                            {/* <Image source=/{item.dataIcon}/> */}
                            {/* <View style={{ height: 20, width: 20, backgroundColor: 'red', borderRadius: 100 }}></View> */}
                            <Image source={item.bioImage} style={{ height: 30, width: 30 }} />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default MarketDetail

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
        height: 100,
        backgroundColor: 'pink',
        borderRadius: 20,
        padding: 40,
    },
})