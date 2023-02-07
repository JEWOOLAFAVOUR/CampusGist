import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, FlatList, Alert } from "react-native";

const TodoApp = () => {
    const [todos, setTodos] = useState([
        { id: 1, todo: 'First Todo', completed: false, },
        { id: 2, todo: 'Second Todo', completed: true, },
    ])
    const todooo = [
        {
            id: 1,
            todo: 'First',
            completed: true
        },
    ]
    const [textInput, setTextInput] = useState('')

    const addTodo = () => {
        if (textInput == '') {
            Alert.alert("Error", "Please input a todo🧨🎆")
        } else {
            const newTodo = {
                id: Math.random(),
                todo: textInput,
                completed: false,
            }
            setTodos([...todos, newTodo])
            setTextInput('')
        }
    }

    const markTodoComplete = (todoId) => {
        const newTodo = todos.map((item) => {
            if (item.id == todoId) {
                return { ...item, completed: true }
            }
            return item;
        })
        setTodos(newTodo)
    };
    const clearAllTodo = () => {
        Alert.alert('Confirm', 'Clear todos?', [
            {
                text: 'Yes',
                onPress: () => setTodos([])
            },
            { text: 'No' }
        ])
    }
    const deleteTodo = (todoId) => {
        const newTodo = todos.filter((item) => item.id != todoId)
        setTodos(newTodo)
    }
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#1f145c' }}>TODO APP</Text>
                <TouchableOpacity onPress={() => clearAllTodo()}>
                    <Image source={require('./assets/delete1.png')} style={{ height: 20, width: 20, }} />
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 100 }}>
                <FlatList
                    data={todos}
                    // contentContainerStyle={{ marginBottom: 70 }}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.listCtn}>
                                <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', flex: 1, textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.todo}</Text>
                                {!item.completed &&
                                    <TouchableOpacity onPress={() => markTodoComplete(item.id)}
                                        style={[styles.boxCtn, { backgroundColor: 'green' }]}>
                                        <Image source={require('./assets/circlecheck.png')} style={{ height: 20, tintColor: 'white', width: 20, }} />
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => deleteTodo(item.id)}
                                    style={styles.boxCtn}>
                                    <Image source={require('./assets/delete1.png')} style={{ height: 20, width: 20, tintColor: 'white', }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
            {/* FOOTER  */}
            <View style={styles.inputContainer}>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder="Add Todo"
                        value={textInput}
                        onChangeText={text => setTextInput(text)}
                    />
                </View>
                <TouchableOpacity onPress={() => addTodo()} style={styles.actionCtn}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoApp;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputContainer: {
        position: 'absolute',
        bottom: 15,
        paddingHorizontal: 20,
        width: '100%',
        elevation: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        height: 50,
        // elevation: 40,
        width: '85%',
        borderWidth: 1,
        marginRight: 20,
        borderRadius: 25,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    actionCtn: {
        height: 50,
        width: 50,
        backgroundColor: '#1f145c',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listCtn: {
        height: 60,
        borderWidth: 2,
        marginBottom: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    boxCtn: {
        height: 40,
        width: 40,
        backgroundColor: 'red',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})