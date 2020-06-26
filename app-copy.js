import React from 'react';
import ReactDOM from 'react-dom';
import DemoBar from './demobar';
import FormBuilder from './src/components/form/index.jsx';
import * as variables from './config/variables';
import { get, post, put } from './src/stores/requests';
import { ThemeProvider } from '@material-ui/core/styles';
import { avalitikaTheme } from './config/create-theme'
import Dashboard from './src/components/test/Dashboard'

// App stylesheets
import './src/scss/form-bd/application.scss';
import 'typeface-roboto';

// const url = '/api/formdata';
// const saveUrl = '/api/formdata';
const url = 'http://localhost:3333/form/17';
const saveUrl = 'http://localhost:3333/form';


const onLoad = function() {
  console.log('onLoad');
  return get(url);
};

const onPost = function(data) {
  console.log('onPost', data);
  post(saveUrl, data);
};

const onPut = function(data) {
  console.log('onPut', data);
  put(saveUrl, data);
};

const items = [
  {
    key: 'TextInput',
    canHaveAnswer: true,
    canHaveAlternateForm: false,
    name: 'Entrada de Texto',
    label: 'Conteúdo...',
    icon: 'fa fa-font',
    field_name: 'text_input_',
  },
  {
    key: 'Dropdown',
    canHaveAnswer: true,
    name: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
    label: 'Conteúdo...',
    field_name: 'dropdown_',
    options: [],
  },
  {
    key: 'RadioButtons',
    canHaveOptionValue: false,
    name: 'Múltipla Escolha',
    icon: 'fa fa-dot-circle-o',
    label: 'Conteúdo...',
    field_name: 'radiobuttons_',
    options: [],
  },
];


// ReactDOM.render(
//   <ThemeProvider theme={avalitikaTheme}>
//       <Dashboard />
//   </ThemeProvider>,
//   document.getElementById('avalitika-app'),
// );


// ReactDOM.render(
//   <FormBuilder.ReactFormBuilder variables={variables}
//     // url={url}
//     // saveUrl={saveUrl}
//     toolbarItems={items}
//     onLoad={onLoad}
//     onPost={onPost}
//   />,
//   document.getElementById('form-builder'),
// );

// ReactDOM.render(
//   <DemoBar variables={variables} />,
//   document.getElementById('demo-bar'),
// );
