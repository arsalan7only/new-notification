import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyAccrDgngovS5JVAFCyb4xDnkhR4KlNAh0",
  authDomain: "pwa-app-c2464.firebaseapp.com",
  projectId: "pwa-app-c2464",
  storageBucket: "pwa-app-c2464.appspot.com",
  messagingSenderId: "234035996709",
  appId: "1:234035996709:web:7d86f744bb8841bdf2f7cc",
  measurementId: "G-RR3YP3YVF3",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BCxNxXx-ia6Mn907k7mODjSiMBk3Sy08uPeXmo076ZYBD2exyKXV_7RyJTIBR0phUeV2jNZ_wepH3fxZgr3BtpQ",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
        return currentToken;
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
