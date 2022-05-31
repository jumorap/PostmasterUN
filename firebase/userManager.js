import { db } from "./firebase.config.js"
import { collection, doc, getDoc } from "firebase/firestore";

//Read one user from database

  export async function getUser(userID){
  
    const docRef = doc(db, "users", userID)
    
    const user = await getDoc(docRef)
  
    if (user.exists()) {
      
      return user
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null
    }
      
  }