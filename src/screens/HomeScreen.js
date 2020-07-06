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


import HeaderButtons from '../components/HeaderButtons';
import TodoItem from '../components/TodoItem';
import Colors from '../constants/Colors';
import TodoContext from '../contexts/todoContext';

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

  const context = React.useContext(TodoContext);

  React.useLayoutEffect(() => {
    setAppLoading(true);
    setTodos(context.todos);
    setAppLoading(false);
  }, []);

  React.useEffect(() => {
    setTodos(context.todos);
  // eslint-disable-next-line react/destructuring-assignment
  }, [context.todos]);

  return (
    <View style={styles.container}>

      { todos.length === 0 && !appLoading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{
            fontSize: 15, fontFamily: 'Roboto_700Bold', color: Colors.textColor
          }}
          >
            No todos yet.
          </Text>
        </View>
      )}
      {appLoading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={Colors.activeColor}
          animating={appLoading}
        />
      ) : (
        <>
          <FlatList
            data={todos}
            keyExtractor={(item) => `${item.id}-${item.checked}`}
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
  headerRight: <HeaderButtons />
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
  loading: {
    flex: 1,
    alignSelf: 'center'
  },
});

export default HomeScreen;
