import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <main className="h-screen">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </main>
  );
}

export default App;
