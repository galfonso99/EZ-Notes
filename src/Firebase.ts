

import fb from "firebase/app"
import "firebase/database"

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
    appId: process.env.REACT_APP_FIREBASE_APP,
    measurementId: process.env.REACT_APP_FIREBASE_MEASURE
}

fb.initializeApp(config);


export const saveNotes = (id: string, text: string) => {
    let obj:{ [key: string]: string } = {}
    obj[id] = text
    fb['database']().ref().update(obj);
}

export const getNote = async (id: string) => {
    let text = '';
    await fb['database']().ref(id).once('value', (snap) => {
      text = snap.val();
    });
    return text;
  }

export const generateId = () => {
    let id = Math.random().toString(36).replace(/[a-z0-9]/, '').substr(1, 8)
    // let unique = false
    // while (!unique) {
    //     fb.database().ref(id).once("value", snapshot => {
    //         if (!snapshot.exists()){
    //            unique = true
    //         }
    //         else {
    //            console.log("Repeated")
    //             id = Math.random().toString(36).replace(/[a-z0-9]/, '').substr(1, 4)
    //         }
    //      });
    // }
    return id
}

export const getRef = (id: string) => fb['database']().ref(id);

// //fetches a given property from the current user
// export const getUserData = async (property) => {
//   let uid = firebase.auth().currentUser.uid;
//   let address = `users/${uid}/${property}`;
//   let value = '';
//   await firebase.database().ref(address).once('value', (snapshot) => {
//     value = snapshot.val();
//   });
//   return value;
// }

