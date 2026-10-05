import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue
} from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const messagesRef = ref(db, "marineMessages");

onValue(messagesRef, (snapshot) => {

  const data = snapshot.val() || {};

  console.log("MarineLoRa data:", data);

  window.dispatchEvent(
    new CustomEvent("marineMessagesUpdated", {
      detail: data
    })
  );

});
