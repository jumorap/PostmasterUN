import {db} from "./firebase.config.js"

import {getFirestore, collection, doc,
    //create
    addDoc, 
    //read
    getDoc, getDocs,
    //delete
    deleteDoc,
    //uptade
    setDoc } from "firebase/firestore"

export async function readDoc (collectionId,documentId) {

    try {
        const docRef = doc(db, collectionId, documentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {

          console.log("Document data:", docSnap.data());
        } else {

          console.log("No such document!");
          
        }
    } catch (error) {
        console.log("FIRESTORE ERROR!")
        console.log(error)
        
    }

    // doc.data() will be undefined if there is no document
    return docSnap.data()    
}

    

export const update = ()=>{

}

export const deletes = ()=>{

}



