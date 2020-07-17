import React, { Fragment, useState, useContext } from "react";
import ActionCard from "./actionCards";
import FaveCard from "./favorites";
import {getUser} from '../../../services/Firebase';

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EcoIcon from "@material-ui/icons/Eco";

// ---------------------------------- NEW IMPORTS -------------------------------
import { fade } from "@material-ui/core/styles";

import Modal from "react-modal";
import styles from "../modal.module.css";
import { AuthUserContext, withAuthorization} from "../../../services/Session";

import "./toastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateUserPoint, updateDormPoint, updateUserDorm } from "../../../services/Firebase";


import ActionData from "./actionData.json";

import Grid from "@material-ui/core/Grid";

import SearchIcon from "@material-ui/icons/Search";

import TextField from "@material-ui/core/TextField";


import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";


import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import clsx from "clsx";

import Collapse from "@material-ui/core/Collapse";

import NoSsr from "@material-ui/core/NoSsr";
import GoogleFontLoader from "react-google-font-loader";

import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";

import favorite from "../../../img/favorite.svg";

import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from "@mui-treasury/components/info";

import { useGalaxyInfoStyles } from "@mui-treasury/styles/info/galaxy";

import {initPoints, assignData} from "../index.js"

import { addFav, deleteFav, createUser, uploadUserTotalPoint } from "../../../services/Firebase";




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: "2px 2px 6px #a6a6a6",
  },
  tabs: {
    flexGrow: 1,
    backgroundColor: "primary",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "6.5rem",
    },
  },
  root: {
    minWidth: "280",
    backgroundColor: "var(--text-secondary)",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "0.5rem",
  },
  searchInput: {
    width: "12rem",
    paddingBottom: "0",
    [theme.breakpoints.up("sm")]: {
      width: "15em",
    },
  },
  actionContainer: {
    paddingTop: "1rem",
    paddingLeft: "0",
    paddingRight: "0",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginBottom: "1rem",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "var(--theme)",
  },
  cardContent: {
    textAlign: "left",
    paddingBottom: "0",
  },
  cardActions: {
    paddingTop: "0",
  },
  underline: {
    "&:before": {
      borderBottom: "2px solid var(--text-primary)",
      marginBottom: "8px",
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "2px solid var(--theme)",
      marginBottom: "8px",
    },
    "&:after": {
      borderBottom: "2px solid var(--theme)",
      marginBottom: "8px",
    },
  },
  disabled: {},
  focused: {},
  error: {},
  card: {
    borderRadius: "1rem",
    boxShadow: "none",
    position: "relative",
    minWidth: 200,
    minHeight: 250,
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      bottom: 0,
      zIndex: 1,
      background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
    },
  },
  content: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    width: "100%",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "0.5rem",
  },
  searchInput: {
    width: "15rem",
    // marginBottom: "-8px !important",
    paddingBottom: "0",
    underline: "0px !important",
    // borderBottom: "#24a113"
  },
  actionContainer: {
    paddingTop: "1rem",
    paddingLeft: "0rem",
    paddingRight: "0rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginBottom: "1rem",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "var(--theme)",
  },
  cardContent: {
    textAlign: "left",
    paddingBottom: "0",
  },
  cardActions: {
    paddingTop: "0",
  },
}));

// ----------------------------------STUFF THAT I'M STARTING TO ADD IN -------------------------------
const modalCustomStyles = {
  overlay: {
    position: "fixed",
    overflow: "hidden",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    height: "25rem",
  },
};

// need this for modal to not get error in console
Modal.setAppElement("#root");

function HomeTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

// ----------------------------------STUFF THAT I'M STARTING TO ADD IN -------------------------------


  const [expandedId, setExpandedId] = React.useState(-1);
  // const [actionData, setActionData] = useState(ActionData);
  // const [actionData] = useState(ActionData);
  const [filter, setFilter] = useState("");
  toast.configure(); // Configure for toast messages later (not actually sure what this does tbh, but it was in
  // the one Amy wrote so I assume it's necessary here too) -Katie

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };


const mediaStyles = useCoverCardMediaStyles({ bgPosition: "top" });


  const authContext = useContext(AuthUserContext);

  toast.configure(); // Configure for toast messages later (not actually sure what this does tbh, but it was in
  // the one Amy wrote so I assume it's necessary here too) -Katie

  const [modalIsOpen, setModalIsOpen] = useState(false);


  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  // KEEP THIS!!! UPDATED VERSION
  // updates all necessary values in firestore when user completes sus action
  const increment = (action) => {

    // allows us to increment the correct values by writing the action & value to local storage
    // add specified number of points to the saved point total
    localStorage.setItem(
      action.susAction,
      parseInt(localStorage.getItem(action.susAction)) + parseInt(action.points)
    );
    
    // updates user's point in firestore
    updateUserPoint(
      authContext.email,
      action.susAction,
      parseInt(action.points)
    ).then(() => {
      window.location.reload(true);
    });

    // get the user's dorm from firestore and sets it in local storage
    getUser(authContext.email).onSnapshot(
      (docSnapshot) => {
        if (docSnapshot.exists) {
          assignData(docSnapshot.data());
        } else {
          createUser(authContext.email);
          initPoints(authContext.email);
          uploadUserTotalPoint(authContext.email, localStorage.getItem('total'));
        }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

  // update dorm's point in firestore
  updateDormPoint(localStorage.getItem('dorm'), parseInt(action.points));

  };

  // Initialize the color of each favorite button
  // This isn't in a function because I can't call the function when I want using html. Could go in a function and then be called with JS.
  var favIconColors = [] // Initalize array of the color for each favIcon
  for(const key in ActionData) { // Iterate over every action in ActionData
    var action = ActionData[key]; // Take the current action
    var storageName = action.susAction.concat("Fav");
    var storedFav = localStorage.getItem(storageName) == 'true'; // We're getting a warning in the console (wants ===)
    if (storedFav) { // If the action is favorited
    favIconColors[key-1] = "#DC143C"; // Turn red
    } else {
      favIconColors[key-1] = "#6c6c6c"; // Otherwise turn gray
    }
  }

  const favAction = (action) => {
    // Get the name and info of the stored action that we're working with
    var storageName = action.susAction.concat("Fav");
    // storedFav is a boolean (is the current action favorited?)
    // NOTE: the item in storage is a string, so the following line forces it to evaluate as a boolean
    var storedFav = localStorage.getItem(storageName) == 'true'; // We're getting a warning in the console
    // that this wants '===,' but I'm pretty sure we don't want that. I can check this again in a week or so. -Katie
    // In case the action hasn't been favorited before
    // NOTE: false is NaN, so here I don't check if the boolean is NaN because it often is. (I wonder if true is NaN too?)
    if (storedFav == null) {
      console.log("storedFav was null or NaN", storedFav);
      storedFav = false; // If not initialized, initialize here
    }
    storedFav = !storedFav; // Toggle the favorite
    // variable for getting color of fav icon
    var favIconColor = document.getElementById("favoriteIcon".concat(action.susAction));
    // Notify user that action was added/removed from favorites
    if (storedFav) {
      var message = action.title.concat(" added to favorites");
      favIconColor.style.color = "#DC143C"; // Turn red
      toast(message, { autoClose: 5000 });
    } else {
      var message = action.title.concat(" removed from favorites");
      favIconColor.style.color = "#6c6c6c"; // Back to grey
      toast.warn(message, { autoClose: 5000 });
    }
    localStorage.setItem(storageName, storedFav); // Save the updated favorite value
  };



  return (
    <div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className={styles.modalIncrement}
          overlayClassName={styles.overlay}
          style={modalCustomStyles}
        >
          <center>
            <h1>Are you sure you want to log this action?</h1>
            <div>
              <button onClick={() => setModalIsOpen(false)} className="buttonOops">
                {/* TODO: I want this button to be gray! But changing the color wasn't working? I'm not quite sure why. */}
                Oops, don't log it!
              </button>
              &nbsp;&nbsp;&nbsp;
              <button onClick={() => (setModalIsOpen(false), increment(action))} className="button">
                Yes, log it!
              </button>
            </div>
          </center>
        </Modal>
      <AppBar position="static" color="primary" elevation={0} className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="off"
          indicatorColor="primary"
          textColor="default"
          aria-label="scrollable tabs"
          centered="true"
          className={classes.tabs}
        >
          <Tab
            label="Actions!"
            icon={<EcoIcon />}
            {...a11yProps(0)}
            style={{ backgroundColor: "transparent" }}
          />
          <Tab
            label="Your Favorites"
            icon={<FavoriteIcon />}
            {...a11yProps(1)}
            style={{ backgroundColor: "transparent" }}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} class="tab-container">
      <Fragment>
      {/* <Toolbar> */}
        <div className={classes.searchContainer}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon className={classes.searchIcon} />
            </Grid>
            <Grid item>
              <TextField
                onChange={handleSearchChange}
                className={classes.searchInput}
                label="Search Actions"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                InputProps={{ classes: { underline: classes.underline } }}
              />
            </Grid>
          </Grid>
        </div>
      {/* </Toolbar> */}
      <Grid container spacing={2} className={classes.actionContainer}>
        {ActionData.map(
          (action, i) =>
            action.title.toLowerCase().includes(filter.toLowerCase()) && (
              <Grid item xs={12} md={6} lg={4}>
                <Card className={classes.root} key={action.title}>
                  <CardHeader
                    className={classes.cardContent}
                    action={
                      <IconButton
                        onClick={() => setModalIsOpen(true)}
                        // Finally found how to get ride of random old green from click and hover!
                        style={{ backgroundColor: "transparent" }}
                        aria-label="settings"
                        title="Complete this sustainable action"
                      >
                        <AddCircleIcon fontSize="large" />
                      </IconButton>
                    }
                    title={action.title}
                    subheader={"Earn ".concat(action.points, " Points!")}
                  />
                  <CardActions disableSpacing>
                    <IconButton
                      title='Add to favorites'
                      aria-label="add to favorites"
                      style={{ color: favIconColors[i-1], backgroundColor: "transparent" }} // Set the favIcon color (i-1 prevents off-by-one error)
                      onClick={() => favAction(action)}
                      id={ "favoriteIcon".concat(action.susAction) }                                                                                                                                                                                                            
                      className={classes.favoriteIcon}
                    >
                      <FavoriteIcon/>
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: !expandedId,
                      })}
                      onClick={() => handleExpandClick(i)}
                      style={{ backgroundColor: "transparent" }}
                      aria-expanded={expandedId === i}
                      aria-label="Show More"
                      title="Learn more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                    <CardContent>
                      <CardMedia
                        className={classes.media}
                        image={action.image}
                        title={action.title}
                      />
                      <Typography variant="h5" gutterBottom>
                        Environmental Impact:
                      </Typography>
                      <Typography variant="body1">{action.impact}</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </Fragment>
      </TabPanel>
      <TabPanel value={value} index={1} class="tab-container">
      <div>
      <AuthUserContext.Consumer>
        {(authUser) => (
          <>
            <NoSsr>
              <GoogleFontLoader
                fonts={[
                  { font: "Spartan", weights: [300] },
                  { font: "Montserrat", weights: [200, 400, 700] },
                ]}
              />
            </NoSsr>
            <Card className={classes.card}>
              <CardMedia classes={mediaStyles} image={favorite} />
              <Box py={3} px={2} className={classes.content}>
                <Info useStyles={useGalaxyInfoStyles}>
                  <InfoSubtitle>Your faves are here </InfoSubtitle>
                  <InfoTitle>Add more!</InfoTitle>
                  <InfoCaption>
                    Go to actions tab and press the heart to add❤️
                  </InfoCaption>
                </Info>
              </Box>
            </Card>
            <Grid container spacing={2} className={classes.actionContainer}>
        {ActionData.map(
          (action, i) =>
          localStorage.getItem(action.susAction.concat("Fav")) == "true" && (
              <Grid item xs={12} md={6} lg={4}>
                <Card className={classes.root} key={action.title}>
                  <CardHeader
                    className={classes.cardContent}
                    action={
                      <IconButton
                        onClick={() => setModalIsOpen(true)}
                        // Finally found how to get ride of random old green from click and hover!
                        style={{ backgroundColor: "transparent" }}
                        aria-label="settings"
                        title="Complete this sustainable action"
                      >
                        <AddCircleIcon fontSize="large" />
                      </IconButton>
                    }
                    title={action.title}
                    subheader={"Earn ".concat(action.points, " Points!")}
                  />
                  <CardActions disableSpacing>
                    <IconButton
                      title='Add to favorites'
                      aria-label="add to favorites"
                      style={{ color: favIconColors[i-1], backgroundColor: "transparent" }} // Set the favIcon color (i-1 prevents off-by-one error)
                      onClick={() => favAction(action)}
                      id={ "favoriteIcon".concat(action.susAction) }                                                                                                                                                                                                            
                      className={classes.favoriteIcon}
                    >
                      <FavoriteIcon/>
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: !expandedId,
                      })}
                      onClick={() => handleExpandClick(i)}
                      style={{ backgroundColor: "transparent" }}
                      aria-expanded={expandedId === i}
                      aria-label="Show More"
                      title="Learn more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                    <CardContent>
                      <CardMedia
                        className={classes.media}
                        image={action.image}
                        title={action.title}
                      />
                      <Typography variant="h5" gutterBottom>
                        Environmental Impact:
                      </Typography>
                      <Typography variant="body1">{action.impact}</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            )
        )}
      </Grid>
          </>
        )}
      </AuthUserContext.Consumer>
    </div>
      </TabPanel>
    </div>
  );
}

export default HomeTabs;
