import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AuthProvider } from './src/contexts/Auth';
import Router from './src/routers/Router';

const App = () => {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
};

export default App;
