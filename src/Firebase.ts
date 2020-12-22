
import firebaseAccount from './firebase_account.json';
import fb from "firebase/app"
import "firebase/database"

const config = firebaseAccount;

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

