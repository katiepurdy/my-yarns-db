import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Register from './components/Register';
import CreateForm from './components/CreateForm';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import './css/app.css';
import './css/signin.css';
import './css/register.css';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <div id="main-content">
          <Switch>
            <ProtectedRoute path="/yarns/create" component={CreateForm} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signout" component={SignOut} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Main} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </Router>
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
