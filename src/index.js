import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { avalitikaTheme } from '../config/create-theme'
import RouteConfig from './routes'

// App stylesheets
import './scss/form-bd/application.scss';
import 'typeface-roboto';

ReactDOM.render(
  <ThemeProvider theme={avalitikaTheme}>
      <RouteConfig />
  </ThemeProvider>,
  document.getElementById('avalitika-app'),
);

