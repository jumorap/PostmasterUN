import { async } from "@firebase/util"
import {collection, query, where, getDocs} from "firebase/firestore";
import { doc, updateDoc, addDoc } from "firebase/firestore";
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
                alert('Dependencia agregada con éxito.');
            })
            .catch((error) => {
                alert('Hubo un error, inténtalo de nuevo.');
                console.log(error);
            });
        }
      });

}

export async function editDependency(itemName, newName){
    const q = query(collection(db, "dependencies"), where("name", "==", itemName));
    const querySnapshot = await getDocs(q);
    var docID = "";
    querySnapshot.forEach((doc) =>{
        docID = doc.id
    })
    const depRef = doc(db, "dependencies", docID);

    await updateDoc(depRef, {name: newName})
    .then(() => {    
        alert('Dependencia modificada con éxito.');
    })
    .catch((error) => {
        alert('Hubo un error, inténtalo de nuevo.');
        console.log(error);
    });
}

export async function addPost(dependency, title, description, tags, links){
    const q = query(collection(db, "dependencies"), where("name", "==", dependency));
    const querySnapshot = await getDocs(q);
    var docID = "";
    querySnapshot.forEach((doc) =>{
        docID = doc.id
    })

    const arr = tags.split(/[ ,]+/);
    await addDoc(collection(db, "posts"), {
        date: "1 de Junio de 2022",
        type: docID,
        title: title,
        images: ["https://picsum.photos/500/550"],
        description: description,
        tags: arr,
        links: [{name: links, url: links}]
    })
    .then(() => {    
        alert('Publicación agregada con éxito.');
    })
    .catch((error) => {
        alert('Hubo un error, inténtalo de nuevo.');
        console.log(error);
    });

}
