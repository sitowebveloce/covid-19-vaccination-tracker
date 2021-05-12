import React from 'react';
import './App.css';
import Header from './components/Header';
// Store
import {ContextProvider} from './stores/store';


function App() {

  // RETURN
  return (
    <ContextProvider>
    <div className="App">
     <Header />
    </div>
    </ContextProvider>
  );
}

export default App;
