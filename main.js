import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-analytics.js";
import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCcg_IngxL6M7A8wnK3p0Q5uT0cBhYtF_I",
    authDomain: "green-travel-230e5.firebaseapp.com",
    projectId: "green-travel-230e5",
    storageBucket: "green-travel-230e5.firebasestorage.app",
    messagingSenderId: "831113010615",
    appId: "1:831113010615:web:e8ecf0276784275312dc32",
    measurementId: "G-B9N1MFNJCX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const destination = document.getElementById("jobs-card");

const querySnapshot = await getDocs(collection(db, "products"));
destination.innerHTML = "";

let count = 0;
for (const doc of querySnapshot.docs) {
    if (count >= 6) break; 

    console.log(doc.id, doc.data());
    const card = document.createElement("btn");
    card.classList.add("card");
    card.onclick = () => {
        alert(doc.data().information);
    };

    const name = document.createElement("p");
    name.textContent = doc.data().name;
    name.classList.add("card-name");

    const img = document.createElement("img");
    img.src = doc.data().quality;
    img.width = 180;
    img.classList.add("card-img");
    
    const price = document.createElement("div");
    price.textContent = doc.data().price;
    price.classList.add("card-price");


    card.appendChild(img);    
    card.appendChild(name);
    card.appendChild(price)
    destination.appendChild(card);

    count++;
}

checkLogin();