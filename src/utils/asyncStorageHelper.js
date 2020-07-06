import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const APPID = 'com.actulio.todo-list-app';

const uid = () => {
  const date = new Date();
  return `${date.toLocaleDateString()}-${date.toTimeString().split(' ')[0]}`;
};

const create = async (values) => {
  const id = uid();
  let newTodos;

  try {
    const todos = JSON.parse(await AsyncStorage.getItem(APPID));
    newTodos = todos ? [...todos, { ...values, id }] : [{ ...values, id }];
    await AsyncStorage.setItem(APPID, JSON.stringify(newTodos));
  } catch (error) {
    Alert.alert(
      'Error adding todo',
      error.message
    );
  }
  return newTodos || [];
};

const update = async (id, values) => {
  let updatedTodos;
  try {
    const todos = JSON.parse(await AsyncStorage.getItem(APPID));
    updatedTodos = todos.map((todo) => (todo.id === id ? { id, ...values } : todo));
    await AsyncStorage.setItem(APPID, JSON.stringify(updatedTodos));
  } catch (error) {
    Alert.alert(
      'Error updating todo',
      error.message
    );
  }
  return updatedTodos || [];
};

const remove = async (id) => {
  let updatedTodos;
  try {
    const todos = JSON.parse(await AsyncStorage.getItem(APPID));
    updatedTodos = todos.filter((todo) => todo.id !== id);
    await AsyncStorage.setItem(APPID, JSON.stringify(updatedTodos));
  } catch (error) {
    Alert.alert(
      'Error removing todo',
      error.message
    );
  }
  return updatedTodos || [];
};

const index = async () => {
  let todos;
  try {
    todos = JSON.parse(await AsyncStorage.getItem(APPID));
  } catch (error) {
    Alert.alert(
      'Error getting all todos',
      error.message
    );
  }
  return todos === null ? [] : todos;
};

const setChecked = async (id, checked) => {
  let updatedTodos;
  try {
    const todos = JSON.parse(await AsyncStorage.getItem(APPID));
    updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, checked } : todo));
    await AsyncStorage.setItem(APPID, JSON.stringify(updatedTodos));
  } catch (error) {
    Alert.alert(
      'Error updating todo',
      error.message
    );
  }
  return updatedTodos || [];
};

const debugRemoveAll = async () => {
  try {
    await AsyncStorage.removeItem(APPID);
  } catch (error) {
    Alert.alert(
      'Error removing all todos',
      error.message
    );
  }
};

const markAll = async () => {
  let updatedTodos;
  try {
    const todos = JSON.parse(await AsyncStorage.getItem(APPID));
    updatedTodos = todos.map((todo) => (todo.checked ? todo : { ...todo, checked: true }));
    await AsyncStorage.setItem(APPID, JSON.stringify(updatedTodos));
  } catch (error) {
    Alert.alert(
      'Error updating todo',
      error.message
    );
  }
  return updatedTodos || [];
};

const clearAll = async () => {
  let updatedTodos;
  try {
    const todos = JSON.parse(await AsyncStorage.getItem(APPID));
    updatedTodos = todos.map((todo) => (todo.checked ? { ...todo, checked: false } : todo));
    await AsyncStorage.setItem(APPID, JSON.stringify(updatedTodos));
  } catch (error) {
    Alert.alert(
      'Error updating todo',
      error.message
    );
  }
  return updatedTodos || [];
};


export {
  update,
  create,
  remove,
  index,
  setChecked,
  markAll,
  clearAll,
  debugRemoveAll
};
