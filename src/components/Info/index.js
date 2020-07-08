import React from "react"; // Used to also import "{ Component }", removed because it gave a warning
import Goal from "./Goal";
import Points from "./Points";
import Challenges from "./Challenges";
import Rewards from "./Rewards";
import ContactForm from "../ContactForm";

const InfoPage = () => (
  <div className="base-container">
    <h1 className="header">Information</h1>
    <ContactForm />
    <center>
      <Goal />
      <p></p>
      <Points />
      <p></p>
      <Challenges />
      <p></p>
      <Rewards />
    </center>
  </div>
);

//const condition = authUser => !!authUser;

export default InfoPage;
