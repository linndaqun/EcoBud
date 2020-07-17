import React, { useState, useContext } from "react";
import styles from "./modal.module.css";

import ActionData from "./HomeTabs/actionData.json";
import HomeTabs from "./HomeTabs";

import CustomizedDialogs from "./MuiModal.js";
// import "./toastify.css";

import CountUp from "react-countup";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./node_modules/react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Confetti from "react-confetti";
import { AuthUserContext, withAuthorization } from "../../services/Session";
import { getUser, createUser, uploadUserTotalPoint } from "../../services/Firebase";

// const CustomToast = ({ closeToast }) => {
//   return (
//     <div>
//       <p>Log more sustainable actions!</p>
//       <button onClick={closeToast} className="button">
//         OK
//       </button>
//     </div>
//   );
// };

// Fun toast notifications
// toast.configure();
// const notify2 = () => {
//   toast(<CustomToast />, { autoClose: false });
// };

var total;

// Note from Katie to other programmers: The following fuction is super important, even though it usually doesn't
// do anything. When a new susAction is added, the local storage value is initially NaN (or null), and then we can't increment/
// decrement. So we have to include this check, even though it rarely does anything. Let me know if you need clarification!
// Initialize point counter to 0 instead of NaN or null
function initPoints(email) {
  total = 0;
  for (const key in ActionData) {
    var action = localStorage.getItem(ActionData[key].susAction);
    if (isNaN(action) || action == null) {
      localStorage.setItem(ActionData[key].susAction, 0);
    }
  }
  localStorage.setItem("total", total);
}

function assignData(data) {
  localStorage.setItem("total", data.total);
  const points = data.points;
  for (const [key, value] of Object.entries(points)) {
    localStorage.setItem(key, value);
  }
  data.favorites.forEach(fav => {
    localStorage.setItem(fav, true)
  })
  localStorage.setItem("dorm", data.userDorm);
  localStorage.setItem('name', data.name)
}

// need this for modal to not get error in console
Modal.setAppElement("#root");

// Text to display on the homepage
function HomePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const authContext = useContext(AuthUserContext);

  // get user's dorm set in local storage
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

  const clicked = () => {
    // var codeBlock = '<button id=\'wrapper\' >Another option...</button><br />';
    var codeBlock = "";
    for (const key in ActionData) {
      codeBlock +=
        ActionData[key].title.concat(
          " Points: ",
          localStorage.getItem(ActionData[key].susAction),
          " "
        ) + "<br />";
    }

    // Inserting the code block to wrapper element
    document.getElementById("wrapper").innerHTML = codeBlock;
  };

  var message = [];
  total = localStorage.getItem("total");

  return (
    <>
      <HomeTabs />
      <div className="base-container">
        <h3>
          You have earned&nbsp;
          {<CountUp start={0} end={total} duration={1}></CountUp>} points!
          &nbsp;
          {/* <button onClick={notify2} className="button">
          Click me!
        </button> */}
        </h3>
        <button onClick={() => setModalIsOpen(true)} className="button">
          Check Your Progress
        </button>
        <p></p>
        {/* <CustomizedDialogs /> */}
        <p></p>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className={styles.modal}
          overlayClassName={styles.overlay}
          // style={{
          //   overlay: {
          //     // backgroundColor: 'papayawhip'
          //   },
          //   content: {
          //     color: "var(--theme)",
          //     overflow: "hidden",
          //     width: "20rem",
          //     height: "30rem",
          //     margin: "auto auto",
          //     verticalAlign: "middle",
          //     textAlign: "center",
          //   },
          // }}
          // style={modalCustomStyles}
        >
          <center>
            <Confetti
          width={1500}
          numberOfPieces={2000}
          recycle={false}
          opacity={0.7}
          // colors={["grey", "white", "green", "black"]}
        />
            {
              // I don't yet understand what "Object" is referring to here/how the program knows that.
              Object.keys(ActionData).map((key) => {
                message[parseInt(key) - 1] = ActionData[key].title.concat(
                  " Points: ",
                  localStorage.getItem(ActionData[key].susAction),
                  " "
                );
                return ""; // It has to return a value. I think it isn't bad practice to do this? -Katie
              })
            }
            <h1>Your Progress:</h1>
            {/* TODO: This is a super janky but slightly prettier way to display the individual points. Still need to improve later. */}
            <p>
              {" "}
              {message[0]} <br /> {message[1]} <br /> {message[2]} <br />{" "}
              {message[3]} <br /> {message[4]} <br /> {message[5]} <br />{" "}
              {message[6]} <br /> {message[7]} <br /> {message[8]}{" "}
              {message.slice(9, message.length)}{" "}
            </p>
            <h3>Total Points: {total} </h3>
            <h1 id="wrapper">
              <button onClick={() => clicked()}>Another option...</button>
            </h1>
            <div>
              <button onClick={() => setModalIsOpen(false)} className="button">
                Close
              </button>
            </div>
          </center>
        </Modal>
      </div>
    </>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);

export { initPoints, assignData };