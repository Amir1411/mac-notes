import React from 'react';
import './App.css'
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import Notes from './components/notes'

const App = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path={['/notes-app/:folder/:note_id', '/notes-app/:folder', '/notes-app']}
            component={Notes}
          />
        </Switch>
        <Redirect from='/' to='/notes-app/' />
      </BrowserRouter>
    )
}

export default App;
