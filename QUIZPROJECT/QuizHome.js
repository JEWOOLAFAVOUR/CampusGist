import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../component/theme'
import Button from '../component/Button'

const QuizHome = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Text style={{
                fontSize: FONTS.big,
                fontWeight: 'bold',
                color: COLORS.primary,
                textAlign: 'center'
            }}>Quizler</Text>
            <View style={{ flex: 1 }}>
                <Image source={require('../assets/quiz/quiz1.png')}
                    style={{ height: '70%', width: '70%', alignSelf: 'center' }}
                />
            </View>
            <View style={{ marginBottom: SIZES.h1, paddingHorizontal: SIZES.h1 }}>
                <Button title="Start Quiz" dolapo={() => navigation.navigate('Question1')}
                    textColor={"red"} size={FONTS.h2}
                />
            </View>
        </View>
    )
}

export default QuizHome

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: SIZES.h2 * 1.2,
    },
})