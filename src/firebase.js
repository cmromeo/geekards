import * as firebase from 'firebase';
const fbConfig = {
    apiKey: "AIzaSyCvhvappXso7usiGpLu-79gEUXZhmxVaI0",
    authDomain: "reviewcard-56ed1.firebaseapp.com",
    databaseURL: "https://reviewcard-56ed1.firebaseio.com",
    projectId: "reviewcard-56ed1",
    storageBucket: "reviewcard-56ed1.appspot.com",
    messagingSenderId: "689234340979"
}

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(fbConfig) : firebase.app();

export default firebaseApp;