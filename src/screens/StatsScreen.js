import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import * as AsyncStorageHelper from '../utils/asyncStorageHelper';
import Colors from '../constants/Colors';

const StatsScreen = () => {
  const [completedTodos, setCompletedTodos] = React.useState(null);
  const [activeTodos, setActiveTodos] = React.useState(null);
  const [appLoading, setAppLoading] = React.useState(true);

  const handleWillFocus = async () => {
    setAppLoading(true);

    let completed = 0; let active = 0;
    const todos = await AsyncStorageHelper.index();

    todos.forEach((todo) => {
      if (todo.checked) completed += 1;
      else active += 1;
    });
    setCompletedTodos(completed);
    setActiveTodos(active);

    setAppLoading(false);
  };


  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={handleWillFocus}
      />
      {!appLoading && (
        <>
          <Text style={styles.text}> Completed Todos </Text>
          <Text style={styles.text}>
            {completedTodos}
          </Text>
          <Text style={styles.text}> Active Todos </Text>
          <Text style={styles.text}>
            {activeTodos}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: 'bold'
  }
});

StatsScreen.navigationOptions = () => ({
  headerTitle: 'Statistics Screen'
});

export default StatsScreen;
