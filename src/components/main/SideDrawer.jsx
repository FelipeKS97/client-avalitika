import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";

import { useStyles } from './mainStyles'


export default function SideDrawer({open, handleDrawerClose}) {
  const classes = useStyles();
  const { push } = useHistory();
  

  return (

    <Drawer
    variant="permanent"
    classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
    >
        <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
            </IconButton>
        </div>
        
        <Divider />
        
        <div>
            <ListItem button onClick={() => push('/dashboard') }>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Painel" />
            </ListItem>
        </div>

        <div>
            <ListItem button onClick={() => push('/classes') }>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Turmas" />
            </ListItem>
        </div>

        <div>
            <ListItem button onClick={() => push('/forms') }>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Formulários" />
            </ListItem>
        </div>

        
    </Drawer>
  );
}