import React from 'react';
import { AuthUserContext, withAuthorization } from "../../../services/Session";
import * as firebase from "firebase";
import "firebase/auth";
import {firestore} from "../../../services/Firebase"
import 'firebase/firestore'


// to delete user in authentication & firestore 
const accountDelete = () => {
    var user = firebase.auth().currentUser;
    // deletes user in authentication
    user.delete().then( 
        // calls for deletion of user data in firestore 
        () => {
        firestore.collection('users').document(firebase.auth().currentUser.uid)
        .delete()
        .addOnCompleteListener(
            // redirect to landing page after deleted?
        )
    })
}



const DeleteAccount = () => (
    <div>
    hi
    <p> Delete Account Here!</p>
    <button onClick={accountDelete}></button>
    Bye
    </div>
)

export default DeleteAccount;