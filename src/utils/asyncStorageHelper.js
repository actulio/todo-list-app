import { AsyncStorage, Alert } from 'react-native';

const APPID = 'todo-list-app';

const uid = () => {
  const date = new Date();
  return `${date.toLocaleDateString()}-${date.toTimeString().split(' ')[0]}`;
};

const create = async (values) => {
  const id = uid();

  try {
    const oldTodos = JSON.parse(await AsyncStorage.getItem(APPID));
    const newTodos = [...oldTodos, { ...values, id }];
    await AsyncStorage.setItem(APPID, JSON.stringify(newTodos));
  } catch (error) {
    Alert.alert(
      'Error adding todo',
      error
    );
  }
};

const update = async (id, values) => {
  const { description, title } = values;
  const todos = JSON.parse(await AsyncStorage.getItem(APPID));
  const updatedTodos = todos.map((todo) => (todo.id === id ? { id, description, title } : todo));
  try {
    await AsyncStorage.setItem(APPID, JSON.stringify(updatedTodos));
  } catch (error) {
    Alert.alert(
      'Error updating todo',
      error
    );
  }
};

const remove = async (id) => {
  const todos = JSON.parse(await AsyncStorage.getItem(APPID));
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  try {
    await AsyncStorage.setItem(APPID, JSON.stringify(updatedTodos));
  } catch (error) {
    Alert.alert(
      'Error removing todo',
      error
    );
  }
};

const index = async () => JSON.parse(await AsyncStorage.getItem(APPID));

export {
  update,
  create,
  remove,
  index
};
