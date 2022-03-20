import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const app = firebase.initializeApp({
  apiKey: "AIzaSyBFVF1VIEUYjezk2r4ovL_YXdD3_m-fBMU",
  authDomain: "medprompt-84ead.firebaseapp.com",
  projectId: "medprompt-84ead",
  storageBucket: "medprompt-84ead.appspot.com",
  messagingSenderId: "971406069851",
  appId: "1:971406069851:web:299a5f3a64f409863b2f7e",
  measurementId: "G-QMCB1SWZ1D"
})

const auth = app.auth()
const functions = app.functions('us-east4')
const storage = app.storage()
const firestore = app.firestore()

if (process.env.NODE_ENV !== 'production') {
  functions.useFunctionsEmulator('http://localhost:5001')
}

export { firebase, app, auth, functions, storage, firestore }
