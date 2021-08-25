import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import TodoList from './Components/Todolist';

export default function App() {



  return (
    <View style={styles.container}>
      <TodoList />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
