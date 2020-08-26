import React, { useState, useContext } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory, useLocation } from "react-router-dom";

import SchoolIcon from "../../assets/school2.svg";
import FormIcon from "../../assets/form2.svg";
import DashboardIcon from "../../assets/dashboard2.svg";
import { AuthContext } from "./AuthProvider";
import { useStyles } from "./mainStyles";

export default function SideDrawer({
  open,
  handleDrawerClose,
  openModalLogin,
  setOpenModalLogin,
}) {
  const classes = useStyles();
  const { push } = useHistory();
  const [user, setUser] = useContext(AuthContext);

  const gridData = [
    {
      name: "Formulários",
      icon: FormIcon,
      location: "/forms",
    },
    {
      name: "Turmas",
      icon: SchoolIcon,
      location: "/classes",
    },
    {
      name: "Painel",
      icon: DashboardIcon,
      location: "/dashboard",
    },
  ];

  const authToken = localStorage.getItem("auth_token");

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem("auth_token");
    push("/student-form");
  };

  const handleLogin = () => {
    setOpenModalLogin(true);
  };

  return (
    <Drawer
      variant="temporary"
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

      {user &&
        gridData.map((d, i) => {
          return (
            <div key={i + 12}>
              <ListItem button onClick={() => push(d.location)}>
                <ListItemIcon>
                  <img
                    className={classes.paperIcon}
                    src={d.icon}
                    alt={d.name}
                  />
                </ListItemIcon>
                <ListItemText primary={d.name} />
              </ListItem>
            </div>
          );
        })}

      {!user ? (
        <div>
          <Divider />
          <ListItem button onClick={() => handleLogin()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Entrar"} />
          </ListItem>
        </div>
      ) : (
        <div style={{ position: "absolute", bottom: "20px" }}>
          <Divider />
          <ListItem button onClick={() => handleLogout()}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
          </ListItem>
        </div>
      )}
    </Drawer>
  );
}
