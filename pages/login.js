import React from 'react'
import LogBtn from "../src/components/Login/index"
import Typography from "@mui/material/Typography";
import Image from "next/image"
import Link from "next/link"

import styles from "../styles/login.module.css"
import postmasterRed from "../public/assets/postmaster_red.png"


export default function Login() {
    return (
        <>
            <div className={styles.generalDiv}>
                <div className={styles.leftDiv}>
                    <br />
                    <span className={styles.footer}>
                        <p/>
                        ¿Necesitas ayuda? Contáctanos a:&nbsp;
                            <a className={styles.link} href="mailto:postmasterun@unal.edu.co">postmasterun@unal.edu.co</a>
                            <br />
                        <Link href={"/legal"}>
                            <a className={styles.link}>Términos, Condiciones y Políticas de Privacidad</a>
                        </Link>
                    </span>
                </div>

                <div className={styles.rightDiv}>
                    <div className={styles.rightDiv_up}>
                        <span className={styles.logoContainer} >
                            <Image src={postmasterRed} alt="logo" />
                            <Typography variant="subtitle1">
                                Información institucional en un solo lugar
                            </Typography>
                        </span>
                    </div>

                    <div className={styles.rightDiv_down}>
                        <br/>
                        <LogBtn />
                        <br/>

                        <span className={styles.logoContainer} >
                            <Typography variant="subtitle2">
                                AL INGRESAR ESTÁS ACEPTANDO NUESTROS&nbsp;

                                <Link href={"/legal"}>
                                    <a className={styles.usLinks}>TÉRMINOS, CONDICIONES Y POLÍTICAS DE PRIVACIDAD
                                    </a>
                                </Link>
                            </Typography>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
