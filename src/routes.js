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

import Dashboard from './components/test/Dashboard'
import MainContainer from './components/main/MainContainer'
import ClassesContainer from './components/classes/ClassesContainer'
import FormBuilder from './components/form/index.jsx';
import FormListContainer from './components/form/form-list.jsx';
import StudentContainer from './components/student/StudentContainer';
import AnswerFormContainer from './components/student/AnswerForm';
import AnswersContainer from './components/answer/AnswersContainer';
import AnswerContainer from './components/answer/AnswerContainer';
import Main from './components/main/Main'
import Demobar from './components/form/demobar'
import formStore from './stores/form-store';

// import { get, post } from '../src/stores/requests';
import { items } from '../config/form-items'
import * as variables from '../config/variables';

// const url = 'http://localhost:3333/form/17';
// const saveUrl = 'http://localhost:3333/form';

// const onLoad = function() {
//   console.log('onLoad');
//   return get(url);
// };
// const onPost = function(data) {
//   console.log('onPost', data);
//   post(saveUrl, data);
// };


export const FormComponent = ({ match }) => {
  let { id } = useParams()
  console.log({match})
  return (
    <>
      <Main title={'Formulário'}>
        {/* <Demobar />       */}
        <FormBuilder.ReactFormBuilder variables={variables}
          toolbarItems={items}
          id={id}
        />
      </Main>

      {/* <Switch>
        <Route path={`${match.path}/:id`} component={FormComponent} />
      </Switch> */}
    </>
  )
}


export default function RouteConfig() {
  
  return (
    <Router>
        <Route exact path='/' component={MainContainer} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/classes' component={ClassesContainer} />
        <Switch>
          <Route path='/forms/:id' component={FormComponent} />
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


