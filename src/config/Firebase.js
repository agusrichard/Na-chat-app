import firebase from 'firebase'

class Fire {
  constructor() {
    this.init()
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAIM9pUslfATCc_uhgzulla8ujXcGYI-JU",
        authDomain: "na-chat-app.firebaseapp.com",
        databaseURL: "https://na-chat-app.firebaseio.com",
        projectId: "na-chat-app",
        storageBucket: "na-chat-app.appspot.com",
        messagingSenderId: "1072048974634",
        appId: "1:1072048974634:web:7e0efe650c50b1478b4c53",
        measurementId: "G-W6Z9R8BHN2"
      })
    }
  }

  get auth() {
    return firebase.auth()
  }

  get db() {
    return firebase.database()
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }

  off() {
    this.db.off()
  }
}

export default new Fire()