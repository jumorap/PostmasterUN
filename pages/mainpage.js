import React from 'react'
import Image from "next/image"
import Navbar from "../src/components/Navbar/index"
import styles from "../styles/Home.module.css"


export default function Login() {
    return (
        <>
            <div className={styles.generalDiv}>
                <div className={styles.navbar} >
                    <div className={styles.redlogo}>
                        <div className={styles.pun}>PUN</div>
                    </div>
                    <Navbar/>
                </div>
            </div>
        </>
    );
}