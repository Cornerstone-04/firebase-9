import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import displayToast from "./toast";

const firebaseConfig = {
  apiKey: "AIzaSyBxkb_DG-wf18Dlec_4vVoxSUUmiafUqQg",
  authDomain: "fir-9-tut-ce076.firebaseapp.com",
  projectId: "fir-9-tut-ce076",
  storageBucket: "fir-9-tut-ce076.appspot.com",
  messagingSenderId: "757862292132",
  appId: "1:757862292132:web:6cf14fafccea74fd3f6431",
};

// const displayToast = (label) => {

// };

// initialize firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

//collection ref
const colRef = collection(db, "books");

// queries
const q = query(colRef, orderBy("createdAt"));

// get collection data
/* getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });
 */

// realtime data collection
const uncubCol = onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

//get a single document
const singleRef = doc(db, "books", "Igxi8PuqdKvvSTlmvrzR");

getDoc(singleRef).then((doc) => {
  console.log(doc.data(), doc.id);
});

//get a single document in realtime
const unsubDoc = onSnapshot(singleRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a form
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);
  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

// sign in users
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // decalre email & password
  const email = signupForm.email.value;
  const password = signupForm.password.value;

  // create a new user
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created:", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      displayToast(err.message, "top");
    });
});

// log user in
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in:", cred.user);
      displayToast("User logged in", "top");
      loginForm.reset();
    })
    .catch((err) => {
      displayToast(err.message);
    });
});

// log user out
const logUserOut = document.querySelector(".logout");
logUserOut.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      displayToast("User signed out.", "top");
    })
    .catch((err) => {
      displayToast(err.message);
    });
});

// subscribing to Auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user !== null) {
    displayToast(user.email, "bottom");
  } else displayToast("No user", "bottom");
});

// unsubscribing
const unsubBtn = document.querySelector(".unsub");
unsubBtn.addEventListener("click", () => {
  displayToast("Unsubscribed", "top");
  unsubAuth();
  uncubCol();
  unsubDoc();
});
