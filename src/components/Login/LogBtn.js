import React, { useEffect, useState } from "react"
import Router from "next/router"
import { firebaseAppAuth, providers, firebaseLogin } from "../../../firebase/firebase.config"
import withFirebaseAuth from "react-with-firebase-auth"
import { Button, Tooltip } from "@mui/material"
import { FcGoogle } from "react-icons/fc"

import Loading from "../Loading";

import styles from "./LogBtn.module.css"


// create a login form
const LogButton = (props) => {
    const {
        user,
        signOut,
        signInWithGoogle,
    } = props;


    let isUnalUser = false
    if (user) isUnalUser = !!user.email.toString().split('@')[1].includes('unal.edu.co')

    const [loggedIn, setLoggedIn] = useState(false)
    const [actualPage, setActualPage] = useState(undefined)
    const [inLogin, setInLogin] = useState(true)
    const [alreadyLoaded, setAlreadyLoaded] = useState(false)

    /***
     * set the actual page to redirect the user.
     * If the actual page is /login, set the 'inLogin' to true.
     * If already loaded, set the 'alreadyLoaded' to true, it's to prevent double loading.
     */
    useEffect(() => {
        let actualPageState = Router.pathname
        setActualPage(actualPageState)

        if (actualPageState === '/login') setInLogin(true)
        else setInLogin(false)
        setAlreadyLoaded(true)
    }, [actualPage, inLogin])

    /***
     * check if the user is logged in or not and set the state accordingly to redirect the user
     */
    useEffect(() => {
        firebaseAppAuth.onAuthStateChanged((user) => {
            if (user) setLoggedIn(true)
            else setLoggedIn(false)
            // if isn't a user from UNAL, redirect to login page
            if (actualPage !== '/login' && !isUnalUser && !user) authConfirm("login")
        })
    }, [actualPage, isUnalUser])

    /***
     * @param clickUse {function} - function to sign in/out
     * @param classNameStyles {string} - class name to apply to the button
     * @param btnIcon {object} - icon to apply to the button
     * @param text {string} - text to display in the button
     * @param title {string} - title to display in the tooltip
     * @param containerClassName {string} - class name to apply to the tooltip container
     * @returns {JSX.Element}
     */
    const logButtons = (clickUse, classNameStyles, btnIcon, text, title="", containerClassName) =>{
        return (
            <div className = {containerClassName}>
                <Tooltip title = {title}>
                    <Button onClick={clickUse}
                            className={classNameStyles}
                            startIcon={btnIcon}
                            aria-label="sign in and sign out"
                    >{text}</Button>
                </Tooltip>
            </div>
        )
    }

    /***
     * clickUse {function} - function that show the loading component and redirect to the main page
     * @returns {JSX.Element}
     */
    const authConfirm = (redirectTo) => {
        return(
            <>
                <Loading state={true}/>
                {
                    alreadyLoaded
                        ? setTimeout(() => { Router.push(`/${redirectTo}`) }, 100)
                        : null
                }
                <Loading state={false}/>
            </>
        )
    }

    return (
        <>
            {/* if the user is logged in, show the logout button */}
            {
                isUnalUser && user
                    ? <span  onClick={signOut}>Cerrar sesión</span>
                    : logButtons(firebaseLogin, styles.loginBtn, <FcGoogle />, 'Ingresar con UNAL', "Sign In" ,"signIn-container")
            }
            {/* when the user is logged in, show the loading component and redirect to the main page */}
            {
                loggedIn && isUnalUser && user && inLogin
                    ? authConfirm("")
                    : ""
            }
            {
                !loggedIn && !isUnalUser && !user && !inLogin
                    ? authConfirm("/login")
                    : ""
            }
        </>
    )
}

// export the login form with firebase auth provider
export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(LogButton)
