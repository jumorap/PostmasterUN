import { db } from "./firebase.config.js"
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

//Read one user from database

export async function getUser(userID){
    const docRef = doc(db, "users", userID)
    const user = await getDoc(docRef)

    if (user.exists()) {
      return user
    } else {
      return null
    }
}

export async function getUserByEmail(email){
  const docRef = collection(db, "users")
  const q = query(docRef, where("email", "==", email ));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());

    return doc.data()
  });
}