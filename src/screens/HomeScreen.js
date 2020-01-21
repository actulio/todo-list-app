import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Menu } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';


import MyHeaderButton from '../components/HeaderButton';
import TodoItem from '../components/TodoItem';
import Colors from '../constants/Colors';
import * as AsyncStorageHelper from '../utils/asyncStorageHelper';

const renderListItem = (itemData) => (
  <TodoItem
    checked={itemData.item.checked}
    id={itemData.item.id}
    title={itemData.item.title}
    description={itemData.item.description}
  />
);

const HomeScreen = (props) => {
  const [appLoading, setAppLoading] = React.useState(true);
  const [todos, setTodos] = React.useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = React.useState(false);
  const [isModeMenuOpen, setIsModeMenuOpen] = React.useState(false);

  const toggleFilterMenuHandler = React.useCallback(() => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  }, [isFilterMenuOpen]);

  const toggleModeMenuHandler = React.useCallback(() => {
    setIsModeMenuOpen(!isModeMenuOpen);
  }, [isModeMenuOpen]);

  React.useEffect(() => {
    props.navigation.setParams({ toggleFilterMenu: toggleFilterMenuHandler });
    props.navigation.setParams({ isFilterMenuOpen });
  }, [toggleFilterMenuHandler, isFilterMenuOpen]);

  React.useEffect(() => {
    props.navigation.setParams({ toggleModeMenu: toggleModeMenuHandler });
    props.navigation.setParams({ isModeMenuOpen });
  }, [toggleModeMenuHandler, isModeMenuOpen]);

  const handleWillFocus = async () => {
    // setAppLoading(true);
    setTodos(await AsyncStorageHelper.index());
    // setAppLoading(false);
  };

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={handleWillFocus}
      />
      {/* { todos.length === 0 && !appLoading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.textColor }}>
            No todos yet.
          </Text>
        </View>
      )} */}
      { appLoading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={Colors.textColor}
          animating={appLoading}
        />
      )}
      { !appLoading && (
        <>
          <FlatList
            data={todos}
            keyExtractor={(item, index) => `item-${index}`}
            renderItem={renderListItem}
          />
          <TouchableOpacity
            style={styles.addTodoButton}
            onPress={() => {
              props.navigation.navigate('NewTodoScreen');
            }}
          >
            <Ionicons name="md-add" size={20} color="black" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

HomeScreen.navigationOptions = (navData) => {
  const isFilterMenuOpen = navData.navigation.getParam('isFilterMenuOpen');
  const toggleFilterMenu = navData.navigation.getParam('toggleFilterMenu');

  const isModeMenuOpen = navData.navigation.getParam('isModeMenuOpen');
  const toggleModeMenu = navData.navigation.getParam('toggleModeMenu');

  return {
    headerTitle: 'TODO list',
    headerRight: (
      <View style={styles.headerButtons}>
        <Menu
          visible={isFilterMenuOpen}
          onDismiss={toggleFilterMenu}
          contentStyle={{ backgroundColor: Colors.backgroundColor }}
          anchor={(
            <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
              <Item
                title="Filter"
                iconName="md-funnel"
                onPress={toggleFilterMenu}
              />
            </HeaderButtons>
          )}
        >
          <Menu.Item onPress={() => { }} theme={{ colors: { text: 'white' } }} title="Show All" />
          <Menu.Item onPress={() => { }} theme={{ colors: { text: 'white' } }} title="Show Active" />
          <Menu.Item onPress={() => { }} theme={{ colors: { text: 'white' } }} title="Show Completed" />
        </Menu>

        <Menu
          visible={isModeMenuOpen}
          onDismiss={toggleModeMenu}
          contentStyle={{ backgroundColor: Colors.backgroundColor }}
          anchor={(
            <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
              <Item
                title="Filter"
                iconName="ios-more"
                onPress={toggleModeMenu}
              />
            </HeaderButtons>
              )}
        >
          {/* <View style={styles.OverflowMenu}>
            <Text>ALo</Text>
            <Text>Oie</Text>
          </View> */}
          <Menu.Item onPress={() => { }} theme={{ colors: { text: 'white' } }} title="Mark all complete" />
          <Menu.Item onPress={() => { }} theme={{ colors: { text: 'white' } }} title="Clear completed" />
        </Menu>
      </View>

    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  addTodoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 7,
    bottom: 10,
    right: 12,
    backgroundColor: Colors.activeColor,
  },
  headerButtons: {
    flexDirection: 'row'
  },
  loading: {
    flex: 1,
    alignSelf: 'center'
  },
});

export default HomeScreen;
