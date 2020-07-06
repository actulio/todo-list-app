import * as AsyncStorageHelper from '../utils/asyncStorageHelper';

export const MARK_ALL = 'MARK_ALL';
export const CLEAR_ALL = 'CLEAR_ALL';
export const SHOW_ACTIVE = 'SHOW_ACTIVE';
export const SHOW_COMPLETED = 'SHOW_COMPLETED';
export const SHOW_ALL = 'SHOW_ALL';

export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

export const SET_CHECKED = 'SET_CHECKED';


async function markAll() {
  return AsyncStorageHelper.markAll();
}

async function clearAll() {
  return AsyncStorageHelper.clearAll();
}

async function showAll() {
  return AsyncStorageHelper.index();
}

async function showActive() {
  const todos = await AsyncStorageHelper.index();
  return todos.filter((todo) => !todo.checked);
}

async function showCompleted() {
  const todos = await AsyncStorageHelper.index();
  return todos.filter((todo) => todo.checked);
}


async function createTodo(values) {
  return AsyncStorageHelper.create(values);
}

async function removeTodo(content) {
  return AsyncStorageHelper.remove(content.id);
}


async function editTodo(content) {
  return AsyncStorageHelper.update(content.id, content);
}

async function setChecked(state, content) {
  const todo = state.find((e) => e.id === content.id);
  return AsyncStorageHelper.setChecked(content.id, !todo.checked);
}


const reducer = (state, action, content) => {
  switch (action) {
    case MARK_ALL:
      return markAll();
    case CLEAR_ALL:
      return clearAll();
    case SHOW_ALL:
      return showAll();
    case SHOW_ACTIVE:
      return showActive();
    case SHOW_COMPLETED:
      return showCompleted();
    case CREATE_TODO:
      return createTodo(content);
    case REMOVE_TODO:
      return removeTodo(content);
    case EDIT_TODO:
      return editTodo(content);
    case SET_CHECKED:
      return setChecked(state, content);
    default:
      return state;
  }
};

export default reducer;
