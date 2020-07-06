import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppLoading } from 'expo';

// eslint-disable-next-line camelcase
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import MainNavigator from './src/navigation/MainNavigator';
import TodoContext from './src/contexts/todoContext';
import todoReducer, { SHOW_ALL } from './src/contexts/todoReducer';
// import * as AsyncStorageHelper from './src/utils/asyncStorageHelper';

// If you have another provider (such as Redux), wrap it outside PaperProvider so that the
// context is available to components rendered inside a Modal from the library:
export default function App() {
  const [todos, setTodos] = React.useState([]);
  const [action, setAction] = React.useState(SHOW_ALL);
  const [content, setContent] = React.useState({});

  const dispatch = (currAction, todoContent = {}) => {
    setContent(todoContent);
    setAction(currAction);
  };

  React.useEffect(() => {
    const doAction = async () => {
      if (action !== '') {
        const newTodos = await todoReducer(todos, action, content);
        setTodos(newTodos);
        setAction('');
      }
      // AsyncStorageHelper.debugRemoveAll();
    };
    doAction();
  }, [action]);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      <PaperProvider>
        <MainNavigator />
      </PaperProvider>
    </TodoContext.Provider>
  );
}
