import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './HomePage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div>
        <Switch>
         <Route path="/" component={HomePage} exact/>
         <Route path="/:id" component={HomePage}/>
       </Switch>
    </div> 
  </BrowserRouter>
  );
}

export default App;
