import React from 'react';
import PasswordChangeForm from './formChangePw.js';
import { AuthUserContext, withAuthorization } from "../../../services/Session";
import accountImg from "../../../img/account.svg";

const ChangePW = () => (
    <div>
    <AuthUserContext.Consumer>
      {(authUser) => (
    <div className="base-container">
        <h2>Want to change your password?</h2>
        <div className="image">
          <img alt="change your password" src={accountImg} />
        </div>
        <PasswordChangeForm/>
    </div>
      )}
      </AuthUserContext.Consumer>
      </div>
)

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ChangePW);
