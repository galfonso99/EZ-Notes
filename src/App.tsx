import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import HomePage from './HomePage'
import SavedNotePage from './SavedNotePage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div>
        <Switch>
         <Route path="/" component={HomePage} exact/>
         <Route path="/:id" component={SavedNotePage}/>
       </Switch>
    </div> 
  </BrowserRouter>
  );
}

export default App;
