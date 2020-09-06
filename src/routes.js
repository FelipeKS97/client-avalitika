import React, {useEffect, useState, useContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";

import DashboardContainer from './components/dashboard/Dashboard';
import MainContainer from './components/main/MainContainer';
import ClassesContainer from './components/classes/ClassesContainer';
import FormListContainer from './components/form/form-list';
import FormContainer from './components/form/form-container';
import StudentContainer from './components/student/StudentContainer';
import AnswerFormContainer from './components/student/AnswerForm';
import AnswersContainer from './components/answer/AnswersContainer';
import AnswerContainer from './components/answer/AnswerContainer';
import ReportContainer from './components/report/ReportContainer';
import { AuthContext } from './components/main/AuthProvider'

export default function RouteConfig() {
  // This is a temporary route configuration.

  return (
    <Router>
      <Switch>
        <CustomRoute private exact path='/main' component={MainContainer} />
        <CustomRoute private exact path='/dashboard' component={DashboardContainer} />
        <CustomRoute private exact path='/classes' component={ClassesContainer} />
        <CustomRoute private path='/forms/:id' component={FormContainer} />
        <CustomRoute private  exact path='/forms' component={FormListContainer} />
        <CustomRoute private path='/answers/:id/report' component={ReportContainer} />
        <CustomRoute private path='/answers/:id' component={AnswersContainer} />
        <CustomRoute private path='/answer/:id' component={AnswerContainer} />
        <CustomRoute path='/student-form/:id' component={AnswerFormContainer} />
        <CustomRoute exact path='/student-form' component={StudentContainer} />
        <Redirect from="/" to="/student-form" />
        <Route exact path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}

function CustomRoute({ component: Component, ...rest}) {
  const [user, setUser] = useContext(AuthContext);
  const isPrivate = rest.private

  useEffect(() => {
    const fetchLogged = async () => {
      if(localStorage.getItem('auth_token')) {
        setUser(true)
      } else {
        setUser(false)
      }
    };
    fetchLogged();
  }, [user]);
  return (
    <Route
      {...rest}
      render={props => // (<Component {...props}  />)
        // eslint-disable-next-line no-nested-ternary
        localStorage.getItem('auth_token') ? (
          <Component {...props} />
        ) : isPrivate ? (
          <Redirect
            to={{
              pathname: '/student-form',
            }}
          />
        ) : (
          <Component {...props}  />
        )
      }
    />
  )
}

function NoMatch() {
  let location = useLocation()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', width:'100%', height: '100%'}}>
      <h3 style={{  margin: 'auto' }}>
        A página <code>{location.pathname}</code> não foi encontrada.
      </h3>
    </div>
  );
}


