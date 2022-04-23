import React from 'react'
import LogBtn from "../src/components/Login/index"
import Image from "next/image"

import { BsBook } from "react-icons/bs"

import styles from "../styles/login.module.css"
import postmasterWhiteLogo from "../public/assets/postmaster_white.png"


export default function Login() {
    return (
        <>
            <div className={styles.generalDiv}>
                <div className={styles.leftDiv}>
                    <span className={styles.logoContainer}>
                        <Image src={postmasterWhiteLogo} alt="logo" />
                    </span>

                </div>
                <div className={styles.rightDiv}>
                    <BsBook />
                    <p/>
                    <LogBtn />
                </div>
            </div>
        </>
    );
}
