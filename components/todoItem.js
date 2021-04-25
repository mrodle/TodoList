import React from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function TodoItem({ tapHandler, longTapHandler, item }) {
  return (
    <TouchableOpacity 
      onPress={() => tapHandler(item)}
      onLongPress={() => longTapHandler(item)}>
      <Text style={styles.item}>{item.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  }
});