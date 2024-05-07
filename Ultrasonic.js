import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAz0_en7KW1QQu4FEvAEJ0FY-JeEqUFn6A",
  authDomain: "teamanuada.firebaseapp.com",
  databaseURL:
    "https://teamanuada-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "teamanuada",
  storageBucket: "teamanuada.appspot.com",
  messagingSenderId: "508272139489",
  appId: "1:508272139489:web:4ea2a99caf034bc25aeba0",
};

const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const db = getDatabase();

let temp = document.getElementById("lblTemp");
let humidity = document.getElementById("lblHumidity");

window.onload = function () {
  retData();
  setInterval(retData, 100);
};

function retData() {
  const dbRef = ref(db);
  get(child(dbRef, "Ultrasonic/")).then((snapshot) => {
    if (snapshot.exists()) {
      temp.innerText = snapshot.val().Distance + " in";

      if(snapshot.val().Distance > 12){
        humidity.innerText = "Empty";
        temp.innerText = "...";
      }
      else if(snapshot.val().Distance < 7 && snapshot.val().Distance > 2){
        humidity.innerText = "Half Full";
      }
      else if(snapshot.val().Distance < 3){
        humidity.innerText = "Full";
      }
      
    }
  });
}