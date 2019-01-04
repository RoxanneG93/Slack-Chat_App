import firebase from 'firebase/app';

import "firebase/auth";
// real-time database
import "firebase/database";
// for media files
import "firebase/storage";

var config = {
    apiKey: "AIzaSyBzkf2Yje4ER1_6IWQgg2Tnf2ylrfqSuO8",
    authDomain: "react-slack-clone-8f7fa.firebaseapp.com",
    databaseURL: "https://react-slack-clone-8f7fa.firebaseio.com",
    projectId: "react-slack-clone-8f7fa",
    storageBucket: "react-slack-clone-8f7fa.appspot.com",
    messagingSenderId: "900259805419"
};
firebase.initializeApp(config);

export default firebase;