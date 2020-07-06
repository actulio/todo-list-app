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
  const [currentSelection, setCurrentSelection] = React.useState(SHOW_ALL);

  const context = React.useContext(TodoContext);

  function getSelection(selection) {
    setIsOptionsMenuOpen(false);
    setIsFilterMenuOpen(false);

    if (selection === CLEAR_ALL || selection === MARK_ALL) {
      setTimeout(() => setCurrentSelection(SHOW_ALL), 200);
    } else {
      setTimeout(() => setCurrentSelection(selection), 200);
    }

    context.dispatch(selection);
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
        <Menu.Item
          onPress={() => getSelection(SHOW_ALL)}
          theme={{
            colors:
              { text: currentSelection === SHOW_ALL ? Colors.activeColor : Colors.textColor }
          }}
          title="Show All"
        />
        <Menu.Item
          onPress={() => getSelection(SHOW_ACTIVE)}
          theme={{
            colors:
              { text: currentSelection === SHOW_ACTIVE ? Colors.activeColor : Colors.textColor }
          }}
          title="Show Active"
        />
        <Menu.Item
          onPress={() => getSelection(SHOW_COMPLETED)}
          theme={{
            colors:
              { text: currentSelection === SHOW_COMPLETED ? Colors.activeColor : Colors.textColor }
          }}
          title="Show Completed"
        />
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
        <Menu.Item onPress={() => getSelection(MARK_ALL)} theme={{ colors: { text: 'white' } }} title="Mark all complete" />
        <Menu.Item onPress={() => getSelection(CLEAR_ALL)} theme={{ colors: { text: 'white' } }} title="Clear completed" />
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
