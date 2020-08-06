import React from "react";
import dorm4 from "../../../img/dorm4.svg";

import { AuthUserContext } from "../../../services/Session";
import SignOutButton from "../../../components/SignOut";

import GoogleFontLoader from "react-google-font-loader";
import NoSsr from "@material-ui/core/NoSsr";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from "react-router-dom";
// import Typography from "@material-ui/core/Typography";
import * as ROUTES from "../../../constants/routes";
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from "@mui-treasury/components/info";
import { useGalaxyInfoStyles } from "@mui-treasury/styles/info/galaxy";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import leaderBoardUpdate, {
  assignRanking,
} from "../../CompetePage/leaderBoardUpdate";
import { getDorm } from "../../../services/Firebase";

import styles from "./totalBuzz.module.css";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "1rem",
    boxShadow: "none",
    position: "relative",
    margin: "auto",
    maxWidth: "60rem",
    minHeight: "15rem",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "60rem",
      minHeight: "20rem",
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
  linkText: {
    color: "white",
  },
  link: {
    textDecoration: "none",
    underline: "none",
  },
}));

var rank;
var dormName = localStorage.getItem("dorm");
if (dormName !== "") {
  getDorm()
    .doc(dormName)
    .onSnapshot((docSnapshot) => {
      assignRanking(docSnapshot.data());
    });
}
leaderBoardUpdate();

var totalBuzzText;
const totalBuzzDisplay = () => {
  if ( localStorage.getItem('SchoolBuzzes') === 1 ) {
    totalBuzzText = <Typography variant="body4">Logged 1 Action!</Typography>
  } else {
    totalBuzzText = <Typography variant="body4">Logged {localStorage.getItem('SchoolBuzzes')} Action!</Typography>
  }
}

totalBuzzDisplay();


const rankDisplay = () => {
  if (parseInt(localStorage.getItem("ranking")) === 1) {
    rank = <p>You're in 1st place!</p>;
  } else if (parseInt(localStorage.getItem("ranking")) === 2) {
    rank = <p>You're in 2nd place!</p>;
  } else if (parseInt(localStorage.getItem("ranking")) === 3) {
    rank = <p>You're in 3rd place!</p>;
  } else if (parseInt(localStorage.getItem("ranking")) >= 4) {
    rank = <p>You're in {localStorage.getItem("ranking")}th place!</p>;
  }
};

export const DormCard = React.memo(function GalaxyCard() {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: "top" });
  const classes = useStyles();

  rankDisplay();
  return (
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
            <CardMedia classes={mediaStyles} image={dorm4} />
            <Box py={3} px={2} className={classes.content}>
              <Info useStyles={useGalaxyInfoStyles}>
                <InfoSubtitle style={{ color: "white", fontWeight: "bold" }}>
                  {localStorage.getItem("name")}, you're representing{" "}
                  {localStorage.getItem("dorm")} Dorm
                </InfoSubtitle>
                <InfoTitle>{rank}</InfoTitle>
                <InfoCaption>
                  <Link
                    to={ROUTES.CHANGEDORM}
                    className={classes.link}
                    style={{ underline: "enum: none", color: "white", fontWeight: "bold" }}
                  >
                    {/* <Typography
                      variant="body1"
                      className={classes.linkText}
                      style={{ underline: "enum: none" }}
                      component={'span'}
                    > */}
                    Change your dorm in settings&nbsp;
                    <span role="img" aria-label="settings">
                      ⚙️
                    </span>
                    {/* </Typography> */}
                  </Link>
                </InfoCaption>
              </Info>
            </Box>
          </Card>
          <SignOutButton />
          <div className={styles.bannerShape}>
        <Grid
          container
          justify="center"
          style={{ placeItems: "center", marginBottom: "0.5rem"}}
        >
          <Typography variant="h5">As a school we have...</Typography>
          <Grid container justify="center">
            {totalBuzzText}
          </Grid>
        </Grid>
      </div>
        </>
      )}
    </AuthUserContext.Consumer>
  );
});



export default DormCard;
