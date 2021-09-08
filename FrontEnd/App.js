import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Redux
import { Provider } from 'react-redux';
import store from './Redux/store';

// Navigators
import Main from './Navigators/Main';

// Screens
import Header from './Shared/Header';
import ProductContainer from './Screens/Products/ProductContainer'

// Do Not Do. Only for this course, to simnplify screen in class
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}


