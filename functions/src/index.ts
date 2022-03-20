import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

import { register as registerAnalyser } from './modules/analyser'
import { register as registerNotifications } from './modules/notifications'
import { register as registerUser } from './modules/user'
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp()

const builder = functions.region('us-east4')

export const analyser = registerAnalyser(builder)
export const notifications = registerNotifications(builder)
export const user = registerUser(builder)
