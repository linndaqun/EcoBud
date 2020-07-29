import React from "react";
import { withFirebase } from "../../services/Firebase";

// import material ui
import { AppBar, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

// account header imports
import SettingsDrawer from "../../pages/AccountPage/Settings";
import Grid from "@material-ui/core/Grid";

// change dorm/pw imports
// import material ui
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

// import suslogoImg from "../../img/suslogo.svg";
import { ReactComponent as SusLogo } from "../../img/suslogo.svg";


// imports for homeheader
import { fade, makeStyles } from "@material-ui/core/styles";
// const suslogoImg = import("../../img/suslogo.svg");

// Styles for Header
const useStyles1 = makeStyles((theme) => ({
  logo: {
    width: "3rem",
    height: "3rem",
    paddingRight: "0.5rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "6.5rem",
    },
    // styles for mobile landscape
    [`${theme.breakpoints.down(767)} and (orientation: landscape)`]: {
      marginLeft: "0",
    },
  },
  title: {
    color: "white",
    fontWeight: "bold",
    margin: "0",
  },
}));

// Standard Header for App
const Header = ({ firebase }) => {
  const classes = useStyles1();
  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <SusLogo className = {classes.logo}/>
          {/* <img src={suslogoImg} alt="logo" className={classes.logo} /> */}
          <Typography variant="h6" className={classes.title} noWrap>
            Sus Comp
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

// CompeteHeader
const CompeteHeader = ({ firebase }) => {
  const classes = useStyles1();
  return (
    <>
      <AppBar position="static" className={classes.header} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <SusLogo className={classes.logo} />
          {/* <img src={suslogoImg} alt="logo" className={classes.logo} /> */}
          <Typography variant="h6" className={classes.title} noWrap>
            Leaderboard and Challenges
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

// InfoHeader
const InfoHeader = ({ firebase }) => {
  const classes = useStyles1();
  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <SusLogo className={classes.logo} />
          {/* <img src={suslogoImg} alt="logo" className={classes.logo} /> */}
          <Typography variant="h6" className={classes.title} noWrap>
            Information
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

// Styles for Account Page Header
const useStyles2 = makeStyles((theme) => ({
  logo: {
    width: "3rem",
    height: "100%",
    paddingRight: "0.5rem",
    padding: "0",
    margin: "0",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "6.5rem",
    },
    // styles for mobile landscape
    [`${theme.breakpoints.down(767)} and (orientation: landscape)`]: {
      marginLeft: "0",
    },
  },
  title: {
    color: "white",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    padding: "0",
    marginTop: "0.5rem",
  },
}));

// Header for account page
const AccountHeader = ({ firebase }) => {
  const classes = useStyles2();
  return (
    <>
      <AppBar position="static" className={classes.header} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6" className={classes.title} noWrap>
                <SusLogo className={classes.logo} />
                {/* <img src={suslogoImg} alt="logo" className={classes.logo} /> */}
                Profile
              </Typography>
            </Grid>
            <Grid item>
              <SettingsDrawer />
            </Grid>
            {/* <Grid item>
              <AccountTabs/>
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <AccountTabs/> */}
    </>
  );
};

// Styles used for pages that have a back arrow & settings header
const useStyles3 = makeStyles((theme) => ({
  title: {
    color: "white",
    fontWeight: "bold",
    marginTop: "0.5rem",
    marginLeft: "0rem",
    marginBottom: "0.5rem",
    textAlign: "left",
  },
  buttonIcon: {
    paddingLeft: "0",
  },
  backarrow: {
    color: "white",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logo: {
    width: "3rem",
    height: "100%",
    paddingRight: "0.5rem",
    padding: "0",
    margin: "0",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "6.5rem",
    },
  },
}));

// Header for Change Dorm and Change PW- back arrow & settings icon
const BackArrowSettingsHeader = ({ firebase }) => {
  let history = useHistory();

  const classes = useStyles3();
  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          {/* Back Button using history */}
          <IconButton
            className={classes.buttonIcon}
            onClick={() => history.goBack()}
            style={{ backgroundColor: "transparent" }}
          >
            <ArrowBackIcon className={classes.backarrow} />
          </IconButton>
          <SusLogo className={classes.logo} />
          {/* <img src={suslogoImg} alt="logo" className={classes.logo} /> */}
          <Grid justify="flex-start" container>
            <Grid item>
              <Typography variant="h6" className={classes.title} noWrap>
                Sus Comp
                {/* <EcoIcon className={classes.leaf} /> */}
              </Typography>
            </Grid>
          </Grid>
          <Grid justify="flex-end" container>
            <Grid item>
              <SettingsDrawer />
            </Grid>
            {/* <Grid item>
              <AccountTabs/>
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

// Header for Signup Page- only need back arrow not settings icon
const BackArrowHeader = ({ firebase }) => {
  let history = useHistory();

  const classes = useStyles3();
  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          {/* Back Button using history */}
          <IconButton
            className={classes.buttonIcon}
            onClick={() => history.goBack()}
            style={{ backgroundColor: "transparent" }}
          >
            <ArrowBackIcon className={classes.backarrow} />
          </IconButton>
          <SusLogo className={classes.logo} />
          {/* <img src={suslogoImg} alt="logo" className={classes.logo} /> */}
          <Grid justify="flex-start" container>
            <Grid item>
              <Typography variant="h6" className={classes.title} noWrap>
                Sus Comp
                {/* <EcoIcon className={classes.leaf} /> */}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

// HomeHeader
const useStyles4 = makeStyles((theme) => ({
  logo: {
    width: "3rem",
    height: "100%",
    paddingRight: "0.5rem",
    padding: "0",
    margin: "0",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "6.5rem",
    },
    // styles for mobile landscape
    [`${theme.breakpoints.down(767)} and (orientation: landscape)`]: {
      marginLeft: "0",
    },
  },
  title: {
    fontWeight: "bold",
    display: "inline",
    marginRight: "2rem",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      margin: "0",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const HomeHeader = ({ firebase }) => {
  const classes = useStyles4();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SusLogo className={classes.logo} />
          {/* <img src={suslogoImg} alt="logo" className={classes.logo} /> */}
          <Typography className={classes.title} variant="h6">
            Home
          </Typography>
          {/* OLD SEARCH BAR IN HEADER THAT WASN'T FUNCTIONAL wait a little before deleting */}
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export {
  HomeHeader,
  CompeteHeader,
  InfoHeader,
  AccountHeader,
  BackArrowSettingsHeader,
  BackArrowHeader,
};
export default withFirebase(Header);
