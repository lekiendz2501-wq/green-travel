import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcg_IngxL6M7A8wnK3p0Q5uT0cBhYtF_I",
  authDomain: "green-travel-230e5.firebaseapp.com",
  projectId: "green-travel-230e5",
  storageBucket: "green-travel-230e5.firebasestorage.app",
  messagingSenderId: "831113010615",
  appId: "1:831113010615:web:e8ecf0276784275312dc32",
  measurementId: "G-B9N1MFNJCX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const qualityInput = document.getElementById("productImg");
const editIdInput = document.getElementById("editId");
const addBtn = document.getElementById("addProduct");
const cancelBtn = document.getElementById("cancelEdit");
const productList = document.getElementById("productList");
const infoInput = document.getElementById("productInfo");


onSnapshot(collection(db, "products"), (Snapshot) => {
  productList.innerHTML = "";
  Snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const tr = document.createElement("tr");
    tr.dataset.id = docSnap.id;

    const nameTd = document.createElement("td");
    nameTd.textContent = data.name;

    const priceTd = document.createElement("td");
    priceTd.textContent = data.price;


    const infoTd = document.createElement("td");
    infoTd.textContent = data.information || "No information";


    const qualityTd = document.createElement("td");

    const img = document.createElement("img");
    img.src = data.quality;
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.objectFit = "cover";

    qualityTd.appendChild(img);

    const actionTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn-edit";
    editBtn.addEventListener("click", () => startEdit(docSnap.id, data));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn-delete";
    delBtn.addEventListener("click", () => handleDelete(docSnap.id));

    actionTd.appendChild(editBtn);
    actionTd.appendChild(delBtn);
    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(qualityTd);
    tr.appendChild(infoTd);
    tr.appendChild(actionTd);
    productList.appendChild(tr);
  });
});

// CREATE / UPDATE
addBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const quality = qualityInput.value.trim();
  const information = infoInput.value.trim();
  const editId = editIdInput.value;

  if (!name || !price || !quality) {
    alert("bro, please fill in all the field");
    return;
  }
  try {
      if (editId) {
          await updateDoc(doc(db, "products", editId), {
              name,
              price,
              quality,
              information
          });

          alert("Product updated successfully!");
          resetForm();
      } else {
          await addDoc(collection(db, "products"), {
              name,
              price,
              quality,
              information
          });

          alert("Product added successfully!");
          clearInputs();
      }
  } catch (e) {
      console.error("Error: ", e);
  }
});

cancelBtn.addEventListener("click", resetForm);

function startEdit(id, data) {  
  infoInput.value = data.information || "";
  editIdInput.value = id;
  nameInput.value = data.name;
  priceInput.value = data.price;
  qualityInput.value = data.quality;
  addBtn.textContent = "Update Product";
  cancelBtn.style.display = "inline";
}
function resetForm() {
  editIdInput.value = "";
  addBtn.textContent = "Add Product";
  cancelBtn.style.display = "none";
  clearInputs();
}

function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
  qualityInput.value = "";
  infoInput.value = "";
}

async function handleDelete(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}