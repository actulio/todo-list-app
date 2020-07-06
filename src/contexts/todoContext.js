import React from 'react';


const TodoContext = React.createContext({
  todos: [],
  action: '',
});

export default TodoContext;
