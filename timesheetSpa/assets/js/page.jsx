import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import ManagerLogin from './managerlogin';
import WorkerLogin from './workerlogin';

import WorkerIndex from './workerIndex';
import ManagerIndex from './ManagerIndex';
import CreateTask from './CreateTask';

import { Redirect } from 'react-router';

import store from './store';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Col md="8">
          <Nav>
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                Home
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md="4">
          <Session />
        </Col>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route exact path="/managerLogin">
          <ManagerLogin />
        </Route>
        <Route exact path="/workerLogin">
          <WorkerLogin />
        </Route>
        <Route exact path="/workerIndex">
          <WorkerIndex />
        </Route>
        <Route exact path="/ManagerIndex">
          <ManagerIndex />
        </Route>
        <Route exact path="/createTask">
          <CreateTask />
        </Route>
      </Switch>
    </Router>
  );
}

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }

  if (session) {
    return (
	    <div>
      		<Nav>
        		<Nav.Item>
          		<p className="text-light py-2">User: {session.user_name}</p>
        		</Nav.Item>
        		<Nav.Item>
          		<a className="nav-link" href="#" onClick={logout}>Logout</a>
        		</Nav.Item>
      		</Nav>
      		<Redirect to={session.worker ? "/workerIndex" : "/ManagerIndex"}/>
	    </div>
    );
  }
  else {
    return (
	    <div>
      		<Nav>
        		<Nav.Item>
          		<NavLink to="/workerLogin" exact activeClassName="active" className="nav-link">
            		Worker Login
          		</NavLink>
        		</Nav.Item>
        		<Nav.Item>
          		<NavLink to="/managerLogin" exact activeClassName="active" className="nav-link">
            		Manager Login
          		</NavLink>
        		</Nav.Item>
      		</Nav>
      		<Redirect to={"/"}/>
      </div>
    );
  }
});
