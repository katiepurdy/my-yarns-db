import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import './css/app.css';

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div id="main-content">
        <Router>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Main} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const NoMatch = () => {
  let location = useLocation();
  return (
    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <h1 class="text-center">404 - Path {location.pathname} not found</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
