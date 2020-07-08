import React, { useState } from "react";
import Counter from "./counter"; // Remove this import soon
import ActionCard from "../ActionCard";
import ActionData from "../ActionData"; // katie added on 7/8

import CountUp from "react-countup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import Confetti from "react-confetti";


import { withAuthorization } from "../Session";

const CustomToast = ({ closeToast }) => {
  return (
    <div>
      <p>Log more sustainable actions!</p>
      <button onClick={closeToast} className="button">OK</button>
    </div>
  );
};

// Fun toast notifications
toast.configure();
const notify1 = () => {
  toast("You are amazing!", { autoClose: 8000 });
};
const notify2 = () => {
  toast(<CustomToast />, { autoClose: false });
};

// Initialize point counter to 0 instead of NaN or null
function initPoints(susAction) {
  var action = localStorage.getItem(susAction);
  if (isNaN(action) || action == null) {
    localStorage.setItem(susAction, 0);
  }
}

// Note from Katie to other programmers: The following statements are super important, even though they usually doesn't
// do anything. When a new susAction is added, the local storage value is initially NaN (or null), and then we can't increment/
// decrement. So we have to include this check, even though it rarely does anything. Let me know if you need clarification!
for(const key in ActionData) {
  initPoints(ActionData[key].susAction);
}

// Init the total variable
var total = 0;

// Loop over every element in ActionData, adding the save point values earn from each
for(const key in ActionData) {
  total += parseInt(localStorage.getItem(ActionData[key].susAction));
}

// The following commented out code didn't work, but I want to keep the record of it for now
// to understand what I tried and what went wrong. Talk to me (Katie) if you want any clarificaiton. :)
// // If the counter changes (i.e. if the buzz or undo button is pressed), call refreshPage function
// Counter.onChange = refreshPage();

// // Refresh the page
// function refreshPage() {
//   console.log('refreshPage func ran');
//   console.log('total val', total);
//   console.log('sum value', parseInt(localStorage.getItem('waterBottle')) + parseInt(localStorage.getItem('cmontWalk')));
//   if (total != parseInt(localStorage.getItem('waterBottle')) + parseInt(localStorage.getItem('cmontWalk'))) {
//     console.log('if ran');
//     total = parseInt(localStorage.getItem('waterBottle')) + parseInt(localStorage.getItem('cmontWalk'));
//     document.location.reload(true);
//   } else {
//     console.log('else ran');
//   }
//   // Currently the above if statement never runs, so the computer thinks that testParam is always equal to 
//   // the actual local storage values. but the local storage should be getting changed, and testParam definitely
//   // isn't updated.
//   // And the function is basically running full time so that shouldn't be the issue

//   // update at 2:43: I think the issue is that the function isn't actually running. Which I guess kind of makes
//   // sense because this entire file runs once and then it stops until reload. So i probably have to move all of this
//   // code into counter or something.
// }

// need this for modal to not get error in console
Modal.setAppElement("#root");
// Text to display on the homepage
function HomePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [actionData, setActionData] = useState(ActionData);
  var message = '';
  var newMessage;

  return (
    <div className="base-container">
      <script>var user =</script>
      <h1>Home Sweet Home</h1>
  
      {/* Testing for fun */}
      <h3>
        You have earned a total of&nbsp;
        {<CountUp start={0} end={total} duration={2}></CountUp>} points! &nbsp;
        <button onClick={notify1} className="button">
          Click me!
        </button> &nbsp;
        <button onClick={notify2} className="button">
          No, Click me!
        </button>
      </h3>
      <button onClick={() => setModalIsOpen(true)} className="button">
        Check Your Progress
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            // backgroundColor: 'papayawhip'
          },
          content: {
            color: "var(--theme)",
            overflow: "hidden",
          },
        }}
      >
        <Confetti
          width={1500}
          numberOfPieces={2000}
          recycle={false}
          opacity={0.7}
          // colors={["grey", "white", "green", "black"]}
        />
        <h2>Your Progress: </h2>
        {/* <p>Points for Recycling Water Bottle: { localStorage.getItem(ActionData[1].susAction) } </p> */}
        {
          Object.keys(ActionData).map(
            (key) => {
              // console.log('key num', key)
              // console.log('test')
              // So I'm pretty sure that I now know that \n will not be rendered. So I need some kind of break tag.
              message += ActionData[key].title.concat(' Points: ', localStorage.getItem(ActionData[key].susAction))
            }
          )
        }
        <p> { message } </p>
        <h3>Total Points: { total } </h3>
        <h1></h1>
        <div>
          <button onClick={() => setModalIsOpen(false)} className="button">
            Close
          </button>
        </div>
      </Modal>
      <ActionCard />
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);