import React from "react";
import { withFirebase } from '../Firebase';
import IconButton from "@material-ui/core/IconButton";
// import material ui
import Button from '@material-ui/core/Button';

import { AppBar, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import EcoIcon from "@material-ui/icons/Eco";
import SwipeableTemporaryDrawer from './settings.js';

const useStyles = makeStyles((theme) => ({
  header: {
    background: "primary",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginTop: "0.5rem",
    marginLeft: "0rem",
    marginBottom: "0.5rem",
    textAlign:"left",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "6.5rem",
    },
  },
  menuButton: {
    marginright: theme.spacing(2),
    textAlign: "left",
    color: "white",
  },
}));



const AccountHeader = ({ firebase }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title} noWrap>
            Yay
            <EcoIcon className={classes.leaf} />
          </Typography>
          <SwipeableTemporaryDrawer className={classes.menuButton} />       
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withFirebase(AccountHeader);
