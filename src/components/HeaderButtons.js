import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

// import todoReducer from '../contexts/todoReducer';
import Colors from '../constants/Colors';
import TodoContext from '../contexts/todoContext';
import {
  SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE, CLEAR_ALL, MARK_ALL
} from '../contexts/todoReducer';

const HeaderButtons = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = React.useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = React.useState(false);

  const context = React.useContext(TodoContext);

  function clearCompleted() {
    setIsOptionsMenuOpen(false);
    context.dispatch(CLEAR_ALL);
  }

  function markAllTodos() {
    setIsOptionsMenuOpen(false);
    context.dispatch(MARK_ALL);
  }

  function showAll() {
    setIsFilterMenuOpen(false);
    context.dispatch(SHOW_ALL);
  }

  function showActive() {
    setIsFilterMenuOpen(false);
    context.dispatch(SHOW_ACTIVE);
  }

  function showCompleted() {
    setIsFilterMenuOpen(false);
    context.dispatch(SHOW_COMPLETED);
  }


  return (
    <View style={styles.headerButtons}>
      <Menu
        visible={isFilterMenuOpen}
        onDismiss={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
        contentStyle={{ backgroundColor: Colors.backgroundColor }}
        anchor={(
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            >
              <Ionicons name="md-funnel" size={30} color={Colors.activeColor} />
            </TouchableOpacity>
          </View>
      )}
      >
        <Menu.Item onPress={showAll} theme={{ colors: { text: 'white' } }} title="Show All" />
        <Menu.Item onPress={showActive} theme={{ colors: { text: 'white' } }} title="Show Active" />
        <Menu.Item onPress={showCompleted} theme={{ colors: { text: 'white' } }} title="Show Completed" />
      </Menu>

      <Menu
        visible={isOptionsMenuOpen}
        onDismiss={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
        contentStyle={{ backgroundColor: Colors.backgroundColor }}
        anchor={(
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
            >
              <Ionicons name="md-more" size={30} color={Colors.activeColor} />
            </TouchableOpacity>
          </View>
          )}
      >
        <Menu.Item onPress={markAllTodos} theme={{ colors: { text: 'white' } }} title="Mark all complete" />
        <Menu.Item onPress={clearCompleted} theme={{ colors: { text: 'white' } }} title="Clear completed" />
      </Menu>
    </View>
  );
};


const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    marginRight: 20,
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    width: 60
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  }
});

export default HeaderButtons;
