import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';


import { useStyles } from './mainStyles'
import MainAppBar from './MainAppBar'
import { useLocation } from "react-router-dom";

export default function Main(props) {
  let location = useLocation();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // if(location.pathname !== "/form") {
  //   let link = document.head.querySelector(".addedCss")
  //   link.parentNode.removeChild(link)
  // }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainAppBar {...props} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography 
          className={classes.mainTitle} 
          variant="h4" 
          component="h5"
          >
            {props.title}
        </Typography>
        {props.children}
      </main>
    </div>
  );
}