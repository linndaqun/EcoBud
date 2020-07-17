import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "../components/Navigation";
import LandingPage from "../pages/LandingPage";
import SignUpPage from "../pages/RegisterPage/signUpPage";
import SignInPage from "../pages/RegisterPage/signInPage";
import PasswordForgetPage from "../pages/RegisterPage/passwordForgetPage.js.js";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import InfoPage from "../pages/InfoPage";
import Header, {
  HomeHeader,
  CompeteHeader,
  InfoHeader,
  AccountHeader,
  ChangeHeader,
} from "../components/Headers";
import CompetePage from "../pages/CompetePage";
import OfflinePage from "../pages/OfflinePage";
import ChangePW from "../pages/AccountPage/Settings/changePw";
import ChangeDorm from "../pages/AccountPage/Settings/changeDorm";
import DeleteAccount from "../pages/AccountPage/Settings/deleteAccount";
import * as ROUTES from "../constants/routes";
import { withAuthentication } from "../services/Session";

const App = () => (
  <Router>
    <Switch>
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

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
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

export default withAuthentication(App);
