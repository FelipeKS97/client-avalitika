import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useParams,
  Redirect,
  Link
} from "react-router-dom";

import Dashboard from './components/dashboard/Dashboard';
import MainContainer from './components/main/MainContainer';
import ClassesContainer from './components/classes/ClassesContainer';
import FormListContainer from './components/form/form-list';
import FormContainer from './components/form/form-container';
import StudentContainer from './components/student/StudentContainer';
import AnswerFormContainer from './components/student/AnswerForm';
import AnswersContainer from './components/answer/AnswersContainer';
import AnswerContainer from './components/answer/AnswerContainer';

export default function RouteConfig() {
  
  return (
    <Router>
        <Route exact path='/' component={MainContainer} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/classes' component={ClassesContainer} />
        <Switch>
          <Route path='/forms/:id' component={FormContainer} />
          <Route exact path='/forms' component={FormListContainer} />
        </Switch>
        <Switch>
          <Route path='/student-form/:id' component={AnswerFormContainer} />
          <Route exact path='/student-form' component={StudentContainer} />
        </Switch>
        <Route path='/answers/:id' component={AnswersContainer} />
        <Route path='/answer/:id' component={AnswerContainer} />
        {/* <Route exact path="*" component={NoMatch} /> */}
        {/* <Redirect from="*" to="/forms" /> */}
    </Router>
  );
}

function NoMatch() {
  let location = useLocation()

  return (
    <div>
      <h3>
        O caminho <code>{location.pathname}</code> não foi encontrado.
      </h3>
    </div>
  );
}


