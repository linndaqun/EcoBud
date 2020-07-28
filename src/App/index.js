import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "../components/Navigation";
import BottomNav from "../components/Navigation/bottomNav";
import MuiLandingPage from "../pages/LandingPage/muiLandingPage";
import MuiSignInPage from "../pages/RegisterPage/muiSignInPage";
import MuiSignUpPage from "../pages/RegisterPage/muiSignUpPage";
// import SignUpPage from "../pages/RegisterPage/signUpPage";
import MuiPasswordForgetPage from "../pages/RegisterPage/muiPasswordForgetPage";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import InfoPage from "../pages/InfoPage";
import Header, {
  HomeHeader,
  CompeteHeader,
  InfoHeader,
  AccountHeader,
  BackArrowHeader,
} from "../components/Headers";
import CompetePage from "../pages/CompetePage";
import OfflinePage from "../pages/OfflinePage";
import ChangePW from "../pages/AccountPage/Settings/changePw";
import ChangeDorm from "../pages/AccountPage/Settings/changeDorm";
import DeleteAccount from "../pages/AccountPage/Settings/deleteAccount";
import * as ROUTES from "../constants/routes";

import { withAuthentication } from "../services/Session";
import { withTheme } from "../components/Theme";

const AppBase = () => (
  <Router>
    <Switch>
      {/* FOR PAGES WITH SPECIAL HEADERS */}
      <Route exact path="/home" component={HomeHeader} />
      <Route exact path="/compete" component={CompeteHeader} />
      <Route exact path="/info" component={InfoHeader} />
      <Route exact path="/account" component={AccountHeader} />
      <Route exact path="/changedorm" component={Header} />
      <Route exact path="/changepassword" component={Header} />
      <Route exact path="/deleteaccount" component={Header} />
      <Route component={Header} />
    </Switch>

    <div className="main">
      {/* {window.location.pathname !== "/account" ? <Header /> : <AccountHeader /> }  */}

      <Navigation />
      <BottomNav />

      {/* For each page's content */}
      <Route exact path={ROUTES.LANDING} component={MuiLandingPage} />
      <Route path={ROUTES.SIGN_UP} component={MuiSignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={MuiSignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={MuiPasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.INFO} component={InfoPage} />
      <Route path={ROUTES.COMPETE} component={CompetePage} />
      <Route path={ROUTES.OFFLINE} component={OfflinePage} />
      <Route path={ROUTES.CHANGEPW} component={ChangePW} />
      <Route path={ROUTES.CHANGEDORM} component={ChangeDorm} />
      <Route path={ROUTES.DELETE_ACCOUNT} component={DeleteAccount} />
    </div>
  </Router>
);

const App = withTheme(AppBase);
export default withAuthentication(App);
