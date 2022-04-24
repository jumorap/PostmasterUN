import React from 'react'
import LogBtn from "../src/components/Login/index"
import Image from "next/image"

import styles from "../styles/login.module.css"
import postmasterWhiteLogo from "../public/assets/postmaster_white.png"
import book from "../public/assets/book.png"

import Link from "next/link"



export default function Login() {
    return (
        <>
            <div className={styles.generalDiv}>
                <div className={styles.leftDiv}>
                    <br />
                    <span className={styles.logoContainer}>
                        <Image src={postmasterWhiteLogo} alt="logo" />
                    </span>
                    <span className={styles.footer}>
                        ¿Necesitas ayuda? Contáctanos a:&nbsp;
                            <a className={styles.link} href="mailto:postmasterun@unal.edu.co">postmasterun@unal.edu.co</a>
                            <br />
                            <a className={styles.link} href="#">Términos, Condiciones y Políticas de Privacidad</a>
                    </span>

                </div>

                <div className={styles.rightDiv}>
                    <div className={styles.rightDiv_up}>
                        <h1 className={styles.PUNTitle}>
                            PUN
                        </h1>
                        <Image className={styles.bookImg} src={book} alt="book" width={124} height={116} />
                        <h4 className={styles.description}> Toda la información institucional en una misma plataforma</h4>
                    </div>

                    <div className={styles.rightDiv_down}>
                        <br />
                        <h3>
                            Iniciar Sesión
                        </h3>
                        <LogBtn />
                    </div>
                    <Link href="/content">login en desarrollo: ir a pagina principal</Link>
                </div>
            </div>
        </>
    );
}
