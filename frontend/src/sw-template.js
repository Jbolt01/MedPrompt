/**
 * Template to inject Firebase messaging into the existing React PWA service worker.
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js')

const firebaseConfig = {
  apiKey: "AIzaSyBFVF1VIEUYjezk2r4ovL_YXdD3_m-fBMU",
  authDomain: "medprompt-84ead.firebaseapp.com",
  projectId: "medprompt-84ead",
  storageBucket: "medprompt-84ead.appspot.com",
  messagingSenderId: "971406069851",
  appId: "1:971406069851:web:299a5f3a64f409863b2f7e",
  measurementId: "G-QMCB1SWZ1D"
}

self.addEventListener('message', (event) => {
  // take over from the previous sw immediately (on refresh)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

workbox.core.clientsClaim()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'), {
  blacklist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
})

firebase.initializeApp(firebaseConfig)
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging()

  messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', JSON.stringify(payload))
    const notificationTitle = payload.data.title
    let notificationOptions = JSON.parse(payload.data.options)
    // notificationOptions = {
    //   actions: [{ action: 'view', title: 'View' }],
    //   body: payload.data.body,
    //   icon: payload.data.icon,
    //   requireInteraction: true,
    //   data: { type: payload.data.type, payload: payload.data.payload },
    // }

    return self.registration.showNotification(notificationTitle, notificationOptions)
  })

  //   self.addEventListener('notificationclick', function (event) {
  //     console.log('EVENT', event.notification.data)
  //     const data = event.notification.data
  //     const notification = event.notification

  //     if (data.type === 'NEW_MATCH') {
  //       notification.close()
  //       clients.openWindow(`/match/${data.payload}`)
  //     }
  //   })

  self.addEventListener('notificationclick', function (e) {
    var notification = e.notification
    // var primaryKey = notification.data.transactionId
    var action = e.action

    if (action === 'close' || action === 'take') {
      notification.close()
    }
    if (action === 'view') {
      clients.openWindow(notification.data.callback)
    } else {
      notification.close()
    }
  })

  self.addEventListener('notificationclose', function (e) {
    var notification = e.notification
    var primaryKey = notification.data.notificationId

    console.log('Closed notification: ' + primaryKey)
  })
}
