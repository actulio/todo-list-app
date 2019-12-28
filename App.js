import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import MainNavigator from './src/navigation/MainNavigator';

// If you have another provider (such as Redux), wrap it outside PaperProvider so that the
// context is available to components rendered inside a Modal from the library:
export default function App() {
  return (
    <PaperProvider>
      <MainNavigator />
    </PaperProvider>
  );
}
