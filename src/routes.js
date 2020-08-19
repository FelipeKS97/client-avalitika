import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
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
import ReportContainer from './components/report/ReportContainer';

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
      <Switch>
        <Route path='/answers/:id/report' component={ReportContainer} />
        <Route path='/answers/:id' component={AnswersContainer} />
      </Switch>
      <Route path='/answer/:id' component={AnswerContainer} />
      {/* <Route exact path="*" component={NoMatch} /> */}
      {/* <Redirect from="*" to="/forms" /> */}
    </Router>
  );
}

function NoMatch() {
  let location = useLocation()

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <h3>
        A página <code>{location.pathname}</code> não foi encontrado.
      </h3>
    </div>
  );
}


