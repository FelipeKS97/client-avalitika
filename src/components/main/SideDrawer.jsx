import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory, useLocation } from "react-router-dom";

import SchoolIcon from '../../assets/school2.svg'
import FormIcon from '../../assets/form2.svg'
import DashboardIcon from '../../assets/dashboard2.svg'
import { useStyles } from './mainStyles'


export default function SideDrawer({open, handleDrawerClose}) {
  const classes = useStyles();
  const { push } = useHistory();
  const { pathname } = useLocation();
//   const [isLoggedIn, setIsLogin] = useState(true)

  const gridData = [{
        name: 'Formulários',
        icon: FormIcon,
        location: '/forms'
    },
    {
        name: 'Turmas',
        icon: SchoolIcon,
        location: '/classes'
    },
    {
        name: 'Painel',
        icon: DashboardIcon,
        location: '/dashboard'
    }]

    let isLoggedOut = pathname.includes('/student-form') 


  return (

    <Drawer
    variant="permanent"
    classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    open={open}
    // style={{display: 'flex'}}
    >
        <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
            </IconButton>
        </div>
        
        <Divider />
         
        { !isLoggedOut && gridData.map((d, i) => {
            return (
                <div>
                    <ListItem button onClick={() => push(d.location) }>
                        <ListItemIcon>
                            <img className={classes.paperIcon} src={d.icon} alt={d.name} />
                        </ListItemIcon>
                        <ListItemText primary={d.name} />
                    </ListItem>
                </div>
            )
        })}

        {
            isLoggedOut ?

            <div>
                <Divider />
                <ListItem button onClick={() => push('/') }>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Login'} />
                </ListItem>
            </div>
            :
            <div style={{position: 'absolute', bottom: '20px'}}>
                <Divider />
                <ListItem button onClick={() => push('/student-form') }>
                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>
            </div>

        }
    </Drawer>
  );
}