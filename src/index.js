import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { AuthProvider } from "./components/main/AuthProvider";
import { avalitikaTheme } from '../config/create-theme'
import RouteConfig from './routes'

// App stylesheets
import './scss/form-bd/application.scss';
import 'typeface-roboto';

ReactDOM.render(
  <ThemeProvider theme={avalitikaTheme}>
    <AuthProvider>
      <RouteConfig />
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('avalitika-app'),
);

