import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MyHeaderButton from '../components/HeaderButton';
import TodoItem from '../components/TodoItem';
import Colors from '../constants/Colors';
import * as AsyncStorageHelper from '../utils/asyncStorageHelper';

const renderListItem = (itemData) => (
  <TodoItem
    checked={itemData.item.done}
    id={itemData.item.id}
    title={itemData.item.title}
    description={itemData.item.description}
  />
);

const HomeScreen = (props) => {
  const [appLoading, setAppLoading] = React.useState(true);
  const [todos, setTodos] = React.useState([{
    checked: false, id: '1', title: '', description: ''
  }]);

  React.useEffect(() => {
    const didFocusListener = props.navigation.addListener(
      'didFocus', () => {
        setAppLoading(true);
        const getTodos = async () => {
          setTodos(await AsyncStorageHelper.index());
        };
        getTodos();
        setAppLoading(false);
      }
    );

    return function cleanup() {
      didFocusListener.remove();
    };
  },);

  return (
    <View style={styles.container}>

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

HomeScreen.navigationOptions = () => ({
  headerTitle: 'TODO list',
  headerRight: (
    <View style={styles.headerButtons}>
      <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
        <Item
          title="Filter"
          iconName="md-funnel"
        />
      </HeaderButtons>
      <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
        <Item
          title="settings"
          iconName="ios-more"
        />
      </HeaderButtons>
    </View>
  )
});

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
