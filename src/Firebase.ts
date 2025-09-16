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

export const saveNotes = async (id: string, text: string) => {
    if (text === "") {
        await fb.database().ref(id).remove();
        return;
    }
    let obj: { [key: string]: string } = {}
    obj[id] = text
    fb.database().ref().update(obj);
}

export const getNote = async (id: string) => {
    let text = '';
    await fb.database().ref(id).once('value', (snap) => {
        text = snap.val();
    });
    return text;
}

export const generateId = async () => {
	const MAX_ATTEMPTS = 7;
    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 8);
    };

    const isIdUnique = async (id: string) => {
        const snapshot = await fb.database().ref(id).once("value");
        return !snapshot.exists();
    };

    let id;
	let attempts = 0;
    do {
        id = generateRandomId();
        if (attempts >= MAX_ATTEMPTS) {
        	return id.slice(0, -1) + 'z';
        }
		attempts++;
    } while (!(await isIdUnique(id)));

    return id;
};

export const getRef = (id: string) => fb.database().ref(id);
