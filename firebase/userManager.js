import React, { useState, useEffect } from "react";
import {db, firebaseAppAuth} from "./firebase.config.js"
import { collection, doc, getDoc, query, where, getDocs, setDoc } from "firebase/firestore";
import FirestoreManager from "./FirestoreManager";
import {dataQueryArray, dataQueryById} from "./dataQuery";

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


/**
 * Read all users from database and generate an array of users id.
 * With this, will check if the user is already in the database.
 * if not, will create a new user.
 * @param user The user to check if is in the database.
 * @returns {Promise<void>}
 */
export async function createUser(user) {
    // get full users data from firebase and store it as a list
    const usersListById = await dataQueryById(FirestoreManager.getUsersList())

    // The usersListById have and id object, these ids are collected in an array
    const usersListIds = usersListById.map(user => user.id)

    // Check if the userID is already in the usersListIds
    // If it is false, the userID is used to create a new user state with "estudiante" as role
    // With this, the date of the creation is stored in the database
    if (!usersListIds.includes(user.uid)) {
        console.log("Creating user")
        const userGen = doc(db, "users", user.uid);
        setDoc(userGen, {
            rol: ["estudiante"],
            creationDate: new Date(),
        })
    }
}
