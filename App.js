// In App.js in a new project

import * as React from 'react';
import { LogBox } from 'react-native';
import Navigation from './Component/Navigation'



function App() {
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  return (
    <Navigation></Navigation>
    
  );
}

export default App;