import React, { Fragment, useState, useContext } from "react";
import BadgeModal from "./badgeModal"

import ActionData from "./HomeTabs/actionData.json";
import HomeTabs from "./HomeTabs";

import CustomizedDialogs from "./MuiModal.js";
// import "./toastify.css";

import CountUp from "react-countup";
import Modal from "react-modal";
import Confetti from "react-confetti";
import { AuthUserContext, withAuthorization } from "../../services/Session";
import {
  getUser,
  createUser,
  uploadUserTotalPoint,
  updateUserPoint,
  updateDormPoint,
  actionMastered,
  firestore,
} from "../../services/Firebase";

import PropTypes from "prop-types";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ActionData from "./actionData.json";

import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EcoIcon from "@material-ui/icons/Eco";

import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";

// Modal Imports
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Collapse from "@material-ui/core/Collapse";
import NoSsr from "@material-ui/core/NoSsr";
import GoogleFontLoader from "react-google-font-loader";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";

import clsx from "clsx";
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from "@mui-treasury/components/info";
import { useGalaxyInfoStyles } from "@mui-treasury/styles/info/galaxy";

// Sounds
import like from "../../sounds/state-change_confirm-up.wav";
import unlike from "../../sounds/state-change_confirm-down.wav";
import confetti from "../../sounds/hero_decorative-celebration-02.wav";

// Initiaize user's points in local storage. If the user has never logged points on this device,
// each local storage item will be null. To prevent "null" from displaying anywhere, we
// initialize here.
var total;
function initPoints(email) {
  total = 0;
  for (const el in ActionData) {
    var action = localStorage.getItem(ActionData[el].susAction); // Action to initialize
    if (isNaN(action) || action == null) {
      // If it hasn't been initialized
      localStorage.setItem(ActionData[el].susAction, 0); // Initialize to 0
      action = 0;
    }
    total += parseInt(action); // Keep track of the sum of the individual points
  }
  localStorage.setItem("total", total); // After initializing individual points, initialize total.
}

// sound play for certain buttons
const likeAudio = new Audio(like);
const unlikeAudio = new Audio(unlike);
const confettiAudio = new Audio(confetti);

// called by onclick to play the audio file
const playSound = (audioFile) => {
  audioFile.play();
};

// I think Linda wrote this function? I don't want to fail to do it justice with my comments. -Katie
// removed fav foreach loop here, don't think it was doing anything? (This comment is from Jessica?)
function assignData(data) {
  localStorage.setItem("total", data.total);
  const points = data.points;
  for (const [key, value] of Object.entries(points)) {
    localStorage.setItem(key, value);
  }
  localStorage.setItem("dorm", data.userDorm);
  localStorage.setItem("name", data.name);
}

Modal.setAppElement("#root"); // Need this for modal to not get error in console

// Amy or Kobe (I think) wrote this function. -Katie
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
          <Typography component={'span'}>{children}</Typography>
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

// Idk who wrote this or what it does -Katie
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    // flexGrow: 1,
    backgroundColor: "primary",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "6.5rem",
      marginTop: "0.5rem",
    },
  },
  root: {
    minWidth: "280",
    // maxHeight: "168px",
    backgroundColor: theme.palette.divider,
    // height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  actionContainer: {
    padding: "0",
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
    display: "flex",
    flex: "1 0 auto",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  card: {
    borderRadius: "1rem",
    boxShadow: "none",
    position: "relative",
    margin: "auto",
    marginBottom: "1rem",
    maxWidth: "36rem",
    minHeight: "15rem",
    zIndex: 0,
    [theme.breakpoints.up("sm")]: {
      maxWidth: "75vh",
      minHeight: "40vh",
    },
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
  card2: {
    borderRadius: "1rem",
    boxShadow: "none",
    position: "relative",
    margin: "auto",
    marginBottom: "1rem",
    maxWidth: "36rem",
    minHeight: "15rem",
    zIndex: 0,
    [theme.breakpoints.up("sm")]: {
      maxWidth: "75vh",
      minHeight: "40vh",
    },
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
  appbar: {
    boxShadow: "2px 2px 6px #242424",
  },
  bar: {
    padding: 0,
  },
  tabIcon: {
    position: "relative",
    top: "0.4rem",
  },
  tabText: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "17px",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
  },
  indicator: {
    height: "3px",
    [theme.breakpoints.up("sm")]: {
      height: "5px",
    },
  },
  search: {
    position: "absolute",
    top: "0.75rem",
    right: "1rem",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "12rem",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
      top: "1rem",
    },
  },
  searchIcon: {
    color: "#fff",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#fff",
    display: "flex",
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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "28ch",
      },
    },
  },
  fab: {
    right: "1rem",
    bottom: "4.5rem",
    position: "fixed",
    zIndex: "1",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  checkProgress: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      marginTop: theme.spacing(2),
    },
  },
  dialogPaper: {
    overflow: "hidden !important",
  },
}));

// transition to make modal open by slideing up and close by sliding down
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Text to display on the homepage
function HomePage() {
  const [progressModalIsOpen, setProgressModalIsOpen] = useState(false);
  const authContext = useContext(AuthUserContext);

  // Get user's dorm set in local storage
  getUser(authContext.email).onSnapshot(
    (docSnapshot) => {
      if (docSnapshot.exists) {
        assignData(docSnapshot.data());
        function assignData(data) {
          localStorage.setItem("dorm", data.userDorm);
        }
      } else {
        createUser(authContext.email);
        initPoints(authContext.email);
        uploadUserTotalPoint(authContext.email, total);
      }
    },
    (err) => {
      console.log(`Encountered error: ${err}`);
    }
  );

  // getMastered(authContext.email);

  total = localStorage.getItem("total");

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [expandedId, setExpandedId] = React.useState(-1);
  // const [height, setHeight] = React.useState("");
  const [filter, setFilter] = useState("");
  toast.configure(); // Configure for toast messages later (not actually sure what this does tbh, but it was in
  // the one Amy wrote so I assume it's necessary here too) -Katie
  const mediaStyles1 = useCoverCardMediaStyles({ bgPosition: "top"});
  const mediaStyles2 = useCoverCardMediaStyles({ bgPosition: "bottom" });


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleExpandClick = (i) => {
    // WILL MAYBE REVISITED TO HAVE CARDS SAME HEIGHT
    // for (const j in ActionData) {
    //   if (expandedId === i) {
    //     setHeight("168px");
    //     console.log("ID: ", i);
    //     console.log("ID HEIGHT: ", height);
    //   } else {
    //     setHeight("100%");
    //   }
    // }
    // console.log("ID: ", i);
    // console.log("HEIGHT: ", height);
    setExpandedId(expandedId === i ? -1 : i);
    // setHeight("50px")
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  // This function is the one that is called when the user presses the increment susAction button. If they confirm that
  // they meant to, then this function calls increment.
  const confirmIncrement = (action) => {
    var confirmed = window.confirm("Are you sure you want to log this action?"); // Check with the user (did they mean to increment?)
    if (confirmed === true) {
      increment(action); // If user meant to, call the function to actually increment user's points
    }
  };

  // Updates all necessary values in firestore and local storage when user completes sus action
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

    // get the user's dorm from firestore and update the dorm's points
    getUser(authContext.email).onSnapshot(
      (docSnapshot) => {
        if (docSnapshot.exists) {
          assignData(docSnapshot.data());
        } else {
          createUser(authContext.email);
          initPoints(authContext.email);
          uploadUserTotalPoint(
            authContext.email,
            localStorage.getItem("total")
          );
        }
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    checkMastered(action);

    // update dorm's point in firestore
    updateDormPoint(localStorage.getItem("dorm"), parseInt(action.points));
  }; // increment

  // to check with the mastered actions that firestore has upon loading page
  // may need to change this because every time the page loads we will read firestore data
  //(and page load everytime action is logged) so we may reach limit if many people are using the app
  var firestoreMastered = [];
  const getMastered = (userEmail) => {
    let userDocRef = firestore.doc("users/" + userEmail);
    userDocRef.get().then((snapshot) => {
      // finds which actions have been previously mastered from firestore -> this is an array!
      firestoreMastered = snapshot.get("masteredActions");
      // need json.stringify to put the array into local storage as an array!
      localStorage.setItem(
        "firestoreMastered",
        JSON.stringify(firestoreMastered)
      );
    });
  };
  getMastered(localStorage.getItem("email"));

  var masterActions = []; // Initalize array of the mastered status for each action
  for (const el in ActionData) {
    // Iterate over every action in ActionData & determine if button needs to load as enabled or disabled
    var action = ActionData[el]; // Take the current action
    var stringActionName = JSON.stringify(action.susAction);
    var storageName = action.susAction.concat("Mastered");
    firestoreMastered = localStorage.getItem("firestoreMastered");

    if (firestoreMastered.includes(stringActionName)) {
      masterActions[el - 1] = true; //disable button when action is mastered
      localStorage.setItem(storageName, true); // update local storage accordingly
    } else {
      masterActions[el - 1] = false; //enable button is action is not yet mastered
      localStorage.setItem(storageName, false); // update local storage accordingly
    }
  }

  //This function checks if (upon increment) the action should be mastered & acts according
  const checkMastered = (action) => {
    // Get the name and info of the stored action that we're working with

    // In case the action hasn't been favorited before
    // NOTE: false is NaN, so here I don't check if the boolean is NaN because it often is. (I wonder if true is NaN too?)
    const actionTotal = localStorage.getItem(action.susAction);
    console.log(actionTotal);
    console.log(action.points);
    // if (storedMaster == null) {
    //   console.log('null')
    // }
    if (20 * action.points >= actionTotal) {
      // If action has not been mastered, the button will remain enabled
      console.log(
        "You are " +
          (20 * action.points - actionTotal) +
          " points away from mastering this action!"
      );
    } else if (20 * action.points < actionTotal) {
      actionMastered(localStorage.getItem("email"), action.susAction);
      // add to firestore list of mastered actions (local storage will ipdate upon page refresh) to reflect
      // that action has been mastered -> will be disabled upon reload
      console.log("You have mastered this action!");
    }
  };

  // Initialize the color of each favorite button
  // This isn't in a const because I can't call the const when I want using html. Could go in a const and then be called with JS.
  var favIconColors = []; // Initalize array of the color for each favIcon
  for (const el in ActionData) {
    // Iterate over every action in ActionData
    var action2 = ActionData[el]; // Take the current action
    var storageName2 = action2.susAction.concat("Fav");
    var storedFav = localStorage.getItem(storageName2) == "true"; // We're getting a warning in the console (wants ===)
    if (storedFav) {
      // If the action is favorited
      favIconColors[el - 1] = "#DC143C"; // Turn red
    } else {
      favIconColors[el - 1] = "#6c6c6c"; // Otherwise turn gray
    }
  }

  const favAction = (action) => {
    // Get the name and info of the stored action that we're working with
    var storageName = action.susAction.concat("Fav");
    // storedFav is a boolean (is the current action favorited?)
    // NOTE: the item in storage is a string, so the following line forces it to evaluate as a boolean
    var storedFav = localStorage.getItem(storageName) == "true"; // We're getting a warning in the console
    // that this wants '===,' but I'm pretty sure we don't want that. I can check this again in a week or so. -Katie
    // In case the action hasn't been favorited before
    // NOTE: false is NaN, so here I don't check if the boolean is NaN because it often is. (I wonder if true is NaN too?)
    if (storedFav == null) {
      storedFav = false; // If not initialized, initialize here
    }
    storedFav = !storedFav; // Toggle the favorite
    // variable for getting color of fav icon
    var favIconColor = document.getElementById(
      "favoriteIcon".concat(action.susAction)
    );
    // Notify user that action was added/removed from favorites
    var displayText;
    if (storedFav) {
      displayText = action.title.concat(" added to favorites");
      favIconColor.style.color = "#DC143C"; // Turn red
      playSound(likeAudio);
      toast.success(displayText, { autoClose: 5000 }); // It's "success" so that the window is green
    } else {
      displayText = action.title.concat(" removed from favorites");
      favIconColor.style.color = "#6c6c6c"; // Back to grey
      playSound(unlikeAudio);
      toast.warn(displayText, { autoClose: 5000 }); // It's a warning so that the window is yellow
    }
    localStorage.setItem(storageName, storedFav); // Save the updated favorite value
  };

  // Set the "progress message" to be displayed when the user pressed "check progress"
  var progressMessage = "";
  const setProgressMessage = () => {
    initPoints();
    for (const el in ActionData) {
      // Loop over every action in ActionData
      var actionPoints = localStorage.getItem(ActionData[el].susAction); // Points earned by current action
      progressMessage = (
        <>
          {progressMessage}
          {ActionData[el].title}&nbsp;points: {actionPoints}
          <br />
        </>
      );
    }
    // Append the total points earned
    progressMessage = (
      <>
        {progressMessage}
        <Typography variant="body1" component={'span'}><b>Total points: {total}</b></Typography>
      </>
    );
  }; // setProgressMessage

  // Call the function immediately so that it runs before the return statement
  setProgressMessage();

  // HTML to be displayed
  return (
    <>
      {/* {prompt && <IosModal />} */}
      <>
        <AppBar
          position="static"
          color="primary"
          elevation={0}
          className={classes.appbar}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons="off"
            // TODO: need to set text color to white if we don't want non-selected tab to have grayed out text
            // textColor="#ffff"
            aria-label="scrollable tabs"
            className={classes.tabs}
            TabIndicatorProps={{ className: classes.indicator }}
          >
            <Tab
              label={
                <div className={classes.tabText}>
                  <EcoIcon className={classes.tabIcon} /> Actions{" "}
                </div>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <div className={classes.tabText}>
                  <FavoriteIcon className={classes.tabIcon} /> Favorites{" "}
                </div>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <div className="top-container">
          <Typography variant="h5" style={{ marginTop: "1rem" }} component={'span'}>
            You have earned&nbsp;
            {<CountUp start={0} end={total} duration={1}></CountUp>} points!
          </Typography>
          {/* Mobile Screens */}
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => setProgressModalIsOpen(true)}
            aria-label="check progress"
            className={classes.fab}
          >
            <CheckIcon />
            &nbsp;Progress
          </Fab>
          {/* Large Screens */}
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setProgressModalIsOpen(true);
              playSound(confettiAudio);
            }}
            className={classes.checkProgress}
          >
            Check Progress
          </Button>

          <BadgeModal />

          {/* NEW MODAL */}
          <Dialog
            open={progressModalIsOpen}
            onClose={() => setProgressModalIsOpen(false)}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            classes={{ paper: classes.dialogPaper }}
          >
            <DialogTitle
              id="alert-dialog-slide-title"
              style={{ backgroundColor: "var(--theme)", color: "#FFFFFF" }}
            >
              {"Check Your Progress!"}
            </DialogTitle>
            <DialogContent>
              <Confetti
                width={1500}
                numberOfPieces={2000}
                recycle={false}
                opacity={0.7}
                // colors={["grey", "white", "green", "black"]}
              />
              <DialogContentText id="alert-dialog-slide-description">
                {progressMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setProgressModalIsOpen(false)
                }}
                variant="contained"
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* OLD MODAL */}
          {/* <Modal
            isOpen={progressModalIsOpen}
            onRequestClose={() => setProgressModalIsOpen(false)}
            className={styles.modal}
            overlayClassName={styles.overlay}
          >
            <center>
              <Confetti
                width={1500}
                numberOfPieces={2000}
                recycle={false}
                opacity={0.7}
                // colors={["grey", "white", "green", "black"]}
              />
              <h1>Your Progress:</h1>
              {progressMessage}
              <div>
                <button
                  onClick={() => setProgressModalIsOpen(false)}
                  className="button"
                >
                  Close
                </button>
              </div>
            </center>
          </Modal> */}
        </div>
        <TabPanel value={value} index={0} className="tab-container">
           {/* Action card boi */}
        <NoSsr>
                    <GoogleFontLoader
                      fonts={[
                        { font: "Spartan", weights: [300] },
                        { font: "Montserrat", weights: [200, 400, 700] },
                      ]}
                    />
                 
                  </NoSsr>
                  <Card className={classes.card2}>
                    <CardMedia classes={mediaStyles2} image={actionTab} />
                    <Box py={3} px={2} className={classes.content}>
                      <Info useStyles={useGalaxyInfoStyles}>
                        <InfoSubtitle></InfoSubtitle>
                        <InfoTitle>Log your actions here!</InfoTitle>
                        <InfoCaption>
                        Tap the drop down menu to find out more 
                          <span role="img" aria-label="down arrow">
                             🔽
                          </span>
                        </InfoCaption>
                      </Info>
                    </Box>
                  </Card>
          <Fragment>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={handleSearchChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            {/* Card for actions */}
            <Grid container spacing={2} className={classes.actionContainer}>
              {/* All actions (this loops using search) */}
              {ActionData.map(
                (action, i) =>
                  action.title.toLowerCase().includes(filter.toLowerCase()) && (
                    <Grid item xs={12} md={6} lg={4} key={i}>
                      <Card className={classes.root}>
                        <CardHeader
                          className={classes.cardContent}
                          action={
                            <IconButton
                              disabled={masterActions[i - 1]}
                              onClick={() => confirmIncrement(action)} // Call function to check if user meant to increment susAction
                              aria-label="increment"
                              title="Complete this sustainable action"
                            >
                              <AddCircleIcon fontSize="large" />
                            </IconButton>
                          }
                          title={action.title}
                          subheader={"Earn ".concat(action.points, " Points!")}
                        />

                        <CardActions
                          disableSpacing
                          className={classes.cardActions}
                        >
                          <IconButton
                            title="Add to favorites"
                            aria-label="add to favorites"
                            style={{
                              color: favIconColors[i - 1],
                            }} // Set the favIcon color (i-1 prevents off-by-one error)
                            onClick={() => favAction(action)}
                            id={"favoriteIcon".concat(action.susAction)}
                            className={classes.favoriteIcon}
                          >
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: !expandedId,
                            })}
                            onClick={() => {
                              handleExpandClick(i);
                            }}
                            aria-expanded={expandedId === i}
                            aria-label="Show More"
                            title="Learn more"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </CardActions>
                        <Collapse
                          in={expandedId === i}
                          timeout="auto"
                          unmountOnExit
                        >
                          <CardContent>
                            <CardMedia
                              className={classes.media}
                              image={action.image}
                              title={action.title}
                            />
                            <Typography variant="h5" component={'span'} gutterBottom>
                              Environmental Impact:
                            </Typography>
                            <Typography variant="body1">
                              {action.impact}
                            </Typography>
                          </CardContent>
                        </Collapse>
                      </Card>
                    </Grid>
                  )
              )}
            </Grid>
          </Fragment>
        </TabPanel>
        <TabPanel value={value} index={1} className="tab-container">
          <div>
            <AuthUserContext.Consumer>
              {(authUser) => (
                <>
                {/* Favorites card */}
                  <NoSsr>
                    <GoogleFontLoader
                      fonts={[
                        { font: "Spartan", weights: [300] },
                        { font: "Montserrat", weights: [200, 400, 700] },
                      ]}
                    />
                  </NoSsr>
                  <Card className={classes.card}>
                    <CardMedia classes={mediaStyles1} image={favorite} />
                    <Box py={3} px={2} className={classes.content}>
                      <Info useStyles={useGalaxyInfoStyles}>
                        <InfoSubtitle>Your faves are here </InfoSubtitle>
                        <InfoTitle>Add more!</InfoTitle>
                        <InfoCaption>
                          Go to actions tab and press the heart to add&nbsp;
                          <span role="img" aria-label="heart">
                            ❤️
                          </span>
                        </InfoCaption>
                      </Info>
                    </Box>
                  </Card>
                  <Grid
                    container
                    spacing={2}
                    className={classes.actionContainer}
                  >
                    {/* Favorite actions (this loops using favs) */}
                    {ActionData.map(
                      (action, i) =>
                        localStorage.getItem(action.susAction.concat("Fav")) ==
                          "true" && (
                          <Grid item xs={12} md={6} lg={4} key={i}>
                            <Card className={classes.root}>
                              <CardHeader
                                className={classes.cardContent}
                                action={
                                  <IconButton
                                    onClick={() => confirmIncrement(action)}
                                    // Finally found how to get rid of random old green from click and hover!
                                    style={{ backgroundColor: "transparent" }}
                                    aria-label="settings"
                                    title="Complete this sustainable action"
                                  >
                                    <AddCircleIcon fontSize="large" />
                                  </IconButton>
                                }
                                title={action.title}
                                subheader={"Earn ".concat(
                                  action.points,
                                  " Points!"
                                )}
                              />
                              <CardActions disableSpacing>
                                <IconButton
                                  title="Add to favorites"
                                  aria-label="add to favorites"
                                  style={{
                                    color: favIconColors[i - 1],
                                    backgroundColor: "transparent",
                                  }} // Set the favIcon color (i-1 prevents off-by-one error)
                                  onClick={() => favAction(action)}
                                  id={"favoriteIcon".concat(action.susAction)}
                                  className={classes.favoriteIcon}
                                >
                                  <FavoriteIcon />
                                </IconButton>
                                <IconButton
                                  className={clsx(classes.expand, {
                                    [classes.expandOpen]: !expandedId,
                                  })}
                                  onClick={() => handleExpandClick(i)}
                                  aria-expanded={expandedId === i}
                                  aria-label="Show More"
                                  title="Learn more"
                                >
                                  <ExpandMoreIcon />
                                </IconButton>
                              </CardActions>
                              <Collapse
                                in={expandedId === i}
                                timeout="auto"
                                unmountOnExit
                              >
                                <CardContent>
                                  <CardMedia
                                    className={classes.media}
                                    image={action.image}
                                    title={action.title}
                                  />
                                  <Typography variant="h5" component={'span'} gutterBottom>
                                    Environmental Impact:
                                  </Typography>
                                  <Typography component={'span'}>
                                    {action.impact}
                                  </Typography>
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
      </>
    </>
  ); // end of return statement
} // end of function

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(HomePage);
export { initPoints, assignData };
