import { async } from "@firebase/util"
import { collection, doc, addDoc, updateDoc} from "firebase/firestore"
import { dataQueryArray } from "./dataQuery";
import { db, firebaseAppAuth } from "./firebase.config"
import FirestoreManager from "./FirestoreManager";

export async function addDependency(itemName){
    
    dataQueryArray(FirestoreManager.getDependenciesList()).then((data) => {
        const dataArray = data.map((item) => item.name);
        if ( dataArray.indexOf(itemName)!== -1){
            alert('Una dependencia con este nombre ya existe, inténtelo de nuevo.')
        }
        else {
            addDoc(collection(db, "dependencies"), {
                name: itemName
            })
            .then(() => {    
                alert('Dependencia agregada con éxito.')
            })
            .catch((error) => {
                alert('Hubo un error, inténtalo de nuevo.')
                console.log(error)    
            });
        }
      });
}

export async function editDependency(itemName){
}