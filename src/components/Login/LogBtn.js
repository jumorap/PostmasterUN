import React from "react"
import Router from "next/router"
import { firebaseAppAuth, providers } from "../../../firebase/firebase.config"
import withFirebaseAuth from "react-with-firebase-auth"
import { Button, Tooltip } from "@mui/material"
import { FcGoogle } from "react-icons/fc"
import { FaSignOutAlt } from "react-icons/fa"


import styles from "./LogBtn.module.css"


// create a login form
const logButton = (props) => {
    const {
        user,
        signOut,
        signInWithGoogle,
    } = props;

    let isUnalUser
    if (user) isUnalUser = !!user.email.toString().split('@')[1].includes('unal.edu.co')

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

    return (
        <>
            {/* if the user is logged in, show the logout button */}
            {
                isUnalUser && user
                    ? logButtons(signOut, styles.logOutBtn, <FaSignOutAlt />, 'Sign Out', "Sign Out", "signOut-container")
                    : logButtons(signInWithGoogle, styles.loginBtn, <FcGoogle />, 'Sign in UNAL', "Sign In" ,"signIn-container")
            }
            {/*
                isUnalUser && Router.pathname === '/login'
                    ? Router.push('/').then(r => Router.reload())
                    : ""
                */
            }
        </>
    )
}

// export the login form with firebase auth provider
export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(logButton)
