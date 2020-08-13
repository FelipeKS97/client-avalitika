import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AvalitikaLogo from '../../../public/images/avalitika_logo.svg'
import SideDrawer from './SideDrawer'

import { useStyles } from './mainStyles'
import { useHistory } from "react-router-dom";


export default function MainAppBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log({open})
  function handleDrawerOpen() {
    setOpen(true);
  }
  function handleDrawerClose() {
    setOpen(false);
  }
  const history = useHistory()
  const drawerProps = {
    open,  
    handleDrawerClose
  }

  return (
    <>
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
          edge="start"
          color="inherit"
          aria-label="abrir menu"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div style={{cursor: 'pointer'}} onClick={()=> history.push('/')}>
            <img className={classes.logoWidth} src={AvalitikaLogo} alt="Logo" />
          </div>
          {/* <Typography component="h5" variant="h6" color="inherit" noWrap className={classes.title}>
            Avalitika
          </Typography>  */}
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
            </IconButton> */}
        </Toolbar>
    </AppBar>

    <SideDrawer {...drawerProps} />
    </>
  );
}