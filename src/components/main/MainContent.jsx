import React, { useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './mainStyles'
import MainAppBar from './MainAppBar'
import { useLocation } from "react-router-dom";

export default function Main(props) {
  const classes = useStyles();
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const loginProps = {
    openModalLogin,
    setOpenModalLogin
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainAppBar {...props} {...loginProps} />

      <main className={classes.content}>

        <div className={classes.appBarSpacer} />
        <Typography
          className={classes.mainTitle}
          variant={window.outerWidth > 762 ?  "h4" : "h5"}
          component="h5"
          >
          {props.title}
        </Typography>
        <Backdrop className={classes.backdrop} open={props.isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {props.children}
      </main>
    </div>
  );
}