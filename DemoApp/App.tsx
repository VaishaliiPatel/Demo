import 'react-native-gesture-handler';
import React from 'react';
import Container from './screens/Container';
import { store } from './store';
import { Provider } from 'react-redux';


declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <Provider store={store}>
      <Container></Container>
    </Provider>

  );
};


export default App;
