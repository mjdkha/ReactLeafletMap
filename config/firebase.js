import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDPfTsxPVZvy6Sov2GnLhLc4YRQIpFPqFY",

    authDomain: "location-4cf22.firebaseapp.com",
  
    projectId: "location-4cf22",
  
    storageBucket: "location-4cf22.appspot.com",
  
    messagingSenderId: "1045019224205",
  
    appId: "1:1045019224205:web:fe7bd6eba385b81580dac4",
  
    measurementId: "G-B8PZQM8TH1"
  
};

const app = initializeApp(firebaseConfig)
const dbFirebase = getFirestore(app)

export {dbFirebase}