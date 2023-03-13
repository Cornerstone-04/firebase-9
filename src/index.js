import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxkb_DG-wf18Dlec_4vVoxSUUmiafUqQg",
  authDomain: "fir-9-tut-ce076.firebaseapp.com",
  projectId: "fir-9-tut-ce076",
  storageBucket: "fir-9-tut-ce076.appspot.com",
  messagingSenderId: "757862292132",
  appId: "1:757862292132:web:6cf14fafccea74fd3f6431",
};

// initialize firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "books");

//get collection data
getDocs(colRef).then((snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books)
}).catch(err=>{
    console.log(err)
});
