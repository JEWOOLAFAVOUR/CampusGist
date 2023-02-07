// import React, { useState, useEffect } from 'react'
// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
// import { TextInput, /*Animated*/ } from 'react-native'
// import { StatusBar } from 'react-native';
// import { COLORS, SIZES, images, icons, FONTS } from '../../constants'

// // import Ionic from 'react-native-vector-icons/Ionicons';
// // import Feather from 'react-native-vector-icons/Feather'

// const Story = ({ route, navigation }) => {
//     const { name } = route.params;
//     const { image } = route.params;

//     useEffect(() => {
//         let timer = setTimeout(() => {
//             // navigation.goBack();
//         }, 5000)

//         // Animated.timing(progress, {
//         //     toValue: 5,
//         //     duration: 5000,
//         //     useNativeDriver: false
//         // }).start();
//         // return clearTimeout(timer)
//     }, [])

//     // const [progress, setProgress] = useState(new Animated.Value(0))
//     const [progress, setProgress] = useState()

//     const progressAnimation = progress.interpolate({
//         inputRange: [0, 5],
//         outputRange: ['0%', '100%']
//     })
//     return (
//         <View style={{
//             backgroundColor: 'black', height: '100%',
//             position: 'relative', justifyContent: 'center', alignItems: 'center'
//         }}>
//             <StatusBar backgroundColor='black' barStyle='light-content' />
//             <View style={{
//                 height: 3, width: '95%', borderWidth: 1, backgroundColor: 'gray',
//                 position: 'absolute', top: 10,
//             }}>
//                 <Animated.View style={{ height: '100%', backgroundColor: 'purple', width: '50%' }}>
//                 </Animated.View>
//             </View>
//             <View style={{
//                 padding: 15, flexDirection: 'row', alignItems: 'center',
//                 position: 'absolute', top: 10, left: 0, width: '90%'
//             }}>
//                 <View style={{
//                     borderRadius: 100, width: 30, height: 30, justifyContent: 'center',
//                     alignItems: 'center'
//                 }}>
//                     <Image source={image} style={{
//                         borderRadius: 100, backgroundColor: 'orange', resizeMode: 'cover',
//                         width: progressAnimation, height: '92%'
//                     }} />
//                 </View>
//                 <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
//                     <Text style={{
//                         color: 'white', fontSize: 12, paddingLeft: 10
//                     }}>{name}</Text>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         {/* <Ionic name='close' style={{fontSize: 20, color: 'white', opacity: 0.8}}/> */}
//                         <Image source={icons.clock} style={{ height: SIZES.h1, width: SIZES.h1 }} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <Image source={image} style={{
//                 position: 'absolute',
//                 width: '100%', height: 550
//             }} />
//             <View style={{
//                 position: 'absolute', bottom: 0, left: 0,
//                 flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
//                 marginVertical: 10, width: '100%'
//             }}>
//                 <TextInput placeholder='send message'
//                     placeholderTextColor='#fff' style={{
//                         borderColor: '#fff', borderRadius: 25, width: '85%',
//                         height: 50, paddingLeft: 20, borderWidth: 1, fontSize: 20, color: '#fff'
//                     }} />
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     {/* <Feather name='navigation' style={{color: '#fff',
//               fontSize: 30}}/> */}
//                     <Image source={icons.send} style={{ height: SIZES.h1, width: SIZES.h1 }} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default Story

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, FONTS, images, icons } from '../../constants'

const Story = ({ route, navigation }) => {
    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
    const name = route.params.name;
    const image = route.params.image;
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <Text style={{ ...FONTS.body2, color: COLORS.white, fontWeight: 'bold' }}>{name}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={icons.close} style={{ height: SIZES.h1, width: SIZES.h1, tintColor: COLORS.white }} />
                </TouchableOpacity>
            </View>
            {/* STATUS IMAGE  */}
            <View>
                <Image source={image} style={styles.statusImage} />
            </View>
        </View>
    )
}

export default Story

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: SIZES.width * 0.05,
        paddingTop: SIZES.h5,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZES.h3,
    },
    statusImage: {
        height: SIZES.height * 0.9,
        width: SIZES.width * 0.905,
    },
})