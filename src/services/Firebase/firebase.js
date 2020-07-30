import firebase from 'firebase/app';
import app from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';
import Axios from 'axios'
require('dotenv').config();

// import firebase/auth from 'firebase/auth';


// };

// const firebase = require("firebase"); // Value never used
// Required for side-effects
require("firebase/firestore");  

// Intialize Firebase
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

app.initializeApp(config);
// firebase.initializeApp(config)
const firestore = app.firestore()

class Firebase {
  constructor() {
    // app.initializeApp(config);

    

    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore()
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  

  // *** User API ***
 
  user = uid => this.db.ref(`users/${uid}`);
 
  users = () => this.db.ref('users');
  }

export default Firebase;

export const createUser = (userEmail, userName, dorm) => {
  console.log("creating...")
  return firestore.collection('users').doc(userEmail)
      .set({
          created: app.firestore.FieldValue.serverTimestamp(),
          name: userName,
          createdBy: userEmail,
          total: 0,
          favorites: {},
          userDorm: dorm,
          points: {
              "waterBottle": 0,
              "cmontWalk": 0,
              "reuseStraw": 0,
              "reuseBag": 0,
              "frmersMarket": 0,
              "rebrewTea": 0,
              "noFoodWaste": 0,
              "meatlessMon": 0,
              "ecoClean": 0,
          },
          impact: {
            "coEmiss": 0,
            "water": 0,
            "energy": 0,
            "buzzes":0,
          },
      });
};


export const getUser = (userEmail) => {
  localStorage.setItem('email', userEmail)
  return firestore.collection('users').doc(userEmail)
}




// this method is called to increase points
export const updateUserPoint = (userEmail, userAction, actionPoint) => {
  // local storage allows us to display the correct points
  localStorage.setItem('total', (parseInt(localStorage.getItem('total'))+ parseInt(actionPoint)));
  localStorage.setItem(userAction, (parseInt(localStorage.getItem(userAction)) + parseInt(actionPoint)));
  return firestore.collection('users').doc(userEmail).update({
    ['points.' + userAction]: app.firestore.FieldValue.increment(actionPoint),
    total: app.firestore.FieldValue.increment(actionPoint),
  })
}
//this method is meant to update the dorm total
export const updateDormPoint = (userDorm, actionPoint) => {
  return firestore.collection('dorms').doc(userDorm).update({
    score: app.firestore.FieldValue.increment(actionPoint),
  })
}

// these two methods are called to synchronize local storage with Firestore
export const uploadUserPoint = (userEmail, userAction, actionPoint) => {
  return firestore.collection('users').doc(userEmail).update({
    ['points.' + userAction]: app.firestore.FieldValue.increment(actionPoint),
  })
}
export const uploadUserTotalPoint = (userEmail, actionPoint) =>{
  return firestore.collection('users').doc(userEmail).update({
    total: app.firestore.FieldValue.increment(actionPoint),
  })
}

// for changing which dorm you are affilaited with 
export const updateUserDorm = (userEmail, value) => {
  return firestore.collection('users').doc(userEmail).update({
    userDorm: value,
  })
}

// fetches the dorm collection from firestore
// meant to be called then added to (ex: getDorm().doc('North'))
export const getDorm = () => {
  return firestore.collection('dorms')
}

// updates firestore when a user favorites an action
export const addFav = (userEmail, susAction) => {
  console.log("updating")
  return firestore.collection('users').doc(userEmail).update({
    favorites: app.firestore.FieldValue.arrayUnion(susAction)
  })
}

// updates firestore when a user deletes a favorite
export const deleteFav = (userEmail, susAction) => {
  return firestore.collection('users').doc(userEmail).update({
    favorites: app.firestore.FieldValue.arrayRemove(susAction)
  })
}

// adds action to mastered list in firestore when called (user has mastered action)
export const actionMastered = (userEmail, susAction) => {
  console.log("updating")
  return firestore.collection('users').doc(userEmail).update({
    masteredActions: app.firestore.FieldValue.arrayUnion(susAction)
  })
}

// updates all the necessary impact fields when a user logs an action
export const updateUserImpact = (userEmail, coImpact, energyImpact, waterImpact) => {
    //updates local storage with incremented impact data
    localStorage.setItem('coEmiss', (parseInt(localStorage.getItem('coEmiss'))+ parseInt(coImpact)));
    localStorage.setItem('energy', (parseInt(localStorage.getItem('energy'))+ parseInt(energyImpact)));
    localStorage.setItem('water', (parseInt(localStorage.getItem('water'))+ parseInt(waterImpact)));
    localStorage.setItem('buzzes', (parseInt(localStorage.getItem('buzzes'))+ 1));
  //updates firestore with incremented impact data
  return firestore.collection('users').doc(userEmail).update({
    'impact.coEmiss': app.firestore.FieldValue.increment(coImpact),
    'impact.energy': app.firestore.FieldValue.increment(energyImpact),
    'impact.water': app.firestore.FieldValue.increment(waterImpact),
    'impact.buzzes': app.firestore.FieldValue.increment(1),
  })
}

const db = firebase.firestore;

export {Axios, db}


export {firestore}