// Makkambayev Eldor 20MD0192

import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos, setTodos] = useState([]);
  var tapedTwice = false;
  var isEdited = false;
  var editedText = useState();

  const tapHandler = (item) => {
    if(tapedTwice) {
      tapedTwice = false;
      editedText = item;
      isEdited = true;
      setText(item.text);
    } else {
      setTimeout( function() { tapedTwice = false; }, 300 );
      tapedTwice = true;
    }
 };

 const longTapHandler = (item) => {
  setTodos(prevTodos => {
    return prevTodos.filter(todo => todo != item);
  });
 };

  const submitHandler = (text) => {
    if(text.length > 3){
      setText('');
      if (isEdited) {
        setTodos(prevTodos => {
          return prevTodos.filter(todo => todo != editedText);
        });
        setTodos(prevTodos => {
          return [
            { text, key: Math.random().toString() },
            ...prevTodos
          ];
        });
        isEdited = false; 
      } else {
        setTodos(prevTodos => {
          return [
            { text, key: text.key },
            ...prevTodos
          ];
        });  
      }
    } else {
      Alert.alert('OOPS', 'Todo must be over 3 characters long', [
        {text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} tapHandler={tapHandler} longTapHandler={longTapHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
