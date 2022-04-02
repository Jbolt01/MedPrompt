import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const app = firebase.initializeApp({
  replace_with_creds_from_google_doc
})

const auth = app.auth()
const functions = app.functions('us-east4')
const storage = app.storage()
const firestore = app.firestore()

if (process.env.NODE_ENV !== 'production') {
  functions.useFunctionsEmulator('http://localhost:5001')
}

export { firebase, app, auth, functions, storage, firestore }
