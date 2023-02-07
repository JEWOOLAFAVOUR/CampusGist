// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import TodoApp from './TodoApp'
// import Practice2 from './Practice2';
// import Project from './Project';
// import Practice5 from './Practice5';
// import Class1 from './DAVIDCLASS/Class1';

// const App = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       {/* <TodoApp /> */}
//       <Class1 />
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})

















// import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// const App = () => {
//   const [textInput, setTextInput] = useState('')
//   const [todos, setTodos] = useState([
//     { id: 1, task: 'First todo', completed: true },
//     { id: 2, task: 'Second todo', completed: false },
//   ])
//   useEffect(() => {
//     getTodoToUserDevice()
//   }, [])

//   useEffect(() => {
//     saveTodoToUserDevice(todos)
//   }, [todos])

//   const addTodo = () => {
//     console.log('nice', textInput);
//     if (textInput == '') {
//       Alert.alert("Error", "Please input todo")
//     } else {
//       const newTodo = {
//         id: Math.random(),
//         task: textInput,
//         completed: false,
//       }
//       setTodos([...todos, newTodo])
//       setTextInput('')
//     }
//   }
//   const markTodoComplete = (todoId) => {
//     console.log(todoId)
//     const newTodo = todos.map((item) => {
//       if (item.id == todoId) {
//         return { ...item, completed: true }
//       }
//       return item;
//     })
//     setTodos(newTodo)
//   };
//   const deleteTodo = todoId => {
//     const newTodo = todos.filter(item => item.id != todoId)
//     setTodos(newTodo)
//   }
//   const clearTodos = () => {
//     Alert.alert('Confirm', 'Clear todos?', [
//       {
//         text: 'Yes',
//         onPress: () => setTodos([])
//       },
//       { text: 'No' }
//     ])
//   }

//   const saveTodoToUserDevice = async (todos) => {
//     try {
//       const stringifyTodos = JSON.stringify(todos)
//       await AsyncStorage.setItem('todos', stringifyTodos)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const getTodoToUserDevice = async () => {
//     try {
//       const todos = await AsyncStorage.getItem('todos')
//       if (todos != null) {
//         setTodos(JSON.parse(todos))
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <View style={styles.page}>
//       <View style={styles.header}>
//         <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#1f145c' }}>TODO APP</Text>
//         <TouchableOpacity onPress={() => clearTodos()}>
//           <Image source={require('./assets/delete1.png')} style={{ height: 20, width: 20, }} />
//         </TouchableOpacity>
//       </View>
//       {/* MIDDLE */}
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
//         data={todos}
//         renderItem={({ item }) => {
//           return (
//             <View style={styles.listItem}>
//               {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}> */}
//               <Text style={{ color: '#1f145c', flex: 1, fontSize: 15, fontWeight: 'bold', textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.task}</Text>
//               {!item?.completed && (
//                 <TouchableOpacity onPress={() => markTodoComplete(item?.id)} style={styles.actionIcon}>
//                   <Image source={require('./assets/circlecheck.png')} style={{ height: 15, width: 15, tintColor: 'white' }} />
//                 </TouchableOpacity>
//               )
//               }
//               <TouchableOpacity onPress={() => deleteTodo(item?.id)} style={[styles.actionIcon, { backgroundColor: 'red', marginLeft: 10 }]}>
//                 <Image source={require('./assets/delete1.png')} style={{ height: 15, width: 15, tintColor: 'white' }} />
//               </TouchableOpacity>
//               {/* </View> */}
//             </View>
//           )
//         }}
//       />
//       {/* FOOTER  */}
//       <View style={styles.footer}>
//         <View style={styles.inputCtn}>
//           <TextInput
//             placeholder='Add Todo'
//             value={textInput}
//             onChangeText={text => setTextInput(text)}
//           />
//         </View>
//         <TouchableOpacity onPress={addTodo} style={styles.iconCtn}>
//           <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>+</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 0,
//     backgroundColor: 'white',
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 20,
//   },
//   inputCtn: {
//     backgroundColor: 'white',
//     elevation: 40,
//     flex: 1,
//     height: 50,
//     marginVertical: 20,
//     marginRight: 20,
//     borderRadius: 30,
//     paddingHorizontal: 20,
//   },
//   iconCtn: {
//     height: 50,
//     width: 50,
//     backgroundColor: '#1f145c',
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listItem: {
//     padding: 20,
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     elevation: 12,
//     borderRadius: 7,
//     marginVertical: 10,
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   actionIcon: {
//     height: 25,
//     width: 25,
//     backgroundColor: 'green',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 5,
//     borderRadius: 3,
//   },
// })








import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './screens/AuthScreen/AuthStack';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './redux/store';
import constants from './redux/constants';
import axios from 'axios';

const { MyDarkTheme, MyLightTheme, BASE_URL } = constants;

export const reduxPersistStore = persistStore(reduxStore);

const App = () => {
  const setUrlConfig = () => {
    console.log('called setUrlConfig');
    axios.defaults.baseURL = BASE_URL;
  }
  useEffect(() => {
    setUrlConfig();
  })
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistStore}>
        <NavigationContainer theme={MyLightTheme}>
          <AuthStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})