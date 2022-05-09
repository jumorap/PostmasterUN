import React, { useEffect, useState } from 'react'

import styles from "../styles/profile.module.css"
import Image from 'next/image'
import Head from 'next/head'
import Button from '@mui/material/Button';

import { NavBar } from "../src/sections";
import userpic from "../public/assets/user_profile.png"

import {db} from '../firebase/firebase.config.js' 
import {readDoc} from '../firebase/FirestoreManager.js'

import { AdminPanelSettingsTwoTone } from '@mui/icons-material';

const defaultUser = {
    UID: "123",
    img: "",
    joinDate: "1 de mayo de 2022, 10:00:00 UTC-5",
    mail: "frailejon@unal.edu.co",
    name: "Frailejon Ernesto Perez",
    role: "admin"

}

export default function Profile() {

    //ejemplo de lectura de un documento
    //readDoc(collectionId,documentId)
    const user = readDoc("users","pacuna")

    return (
        <div className={styles.body}>
            <Head>
                <title>Perfil de usuario</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            </Head>

            <NavBar />
            
            <div className={styles.main}>
                <div className={styles.title_logout}>
                    <h2 className={styles.titulo}>Información de usuario</h2>
                    <Button 
                        className={styles.buttonUI} 
                        href='/login'
                        style={{color: 'red',
                                maxHeight: '30px'}}>
					    Cerrar Sesión
				    </Button>
                </div>
                    
                <div className={styles.card_1}>
                    <div className={styles.card_2}>
                        <Image 
                            className={styles.user_pic} 
                            src={userpic} 
                            alt='PUN'
                            width='150%'
                            height='150%'
                        />
                        <div className={styles.card_3}>
                            <div className={styles.info1}>{defaultUser.name}</div>
                            <div className={styles.info2}>{defaultUser.mail}</div>
                            <div>Se unió el  
                                <a className={styles.info3}> {defaultUser.joinDate}</a>
                            </div>
                            <div>Publicaciones guardadas: 
                                <a className={styles.info3}> 3</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.card_4}>
                    <div className={styles.card_5}>
                        <h3 className={styles.subtitulo}>Mis tags</h3>
                        <div className={styles.card_7}>
                            <div className={styles.tag}>Ambiental</div>
                            <div className={styles.tag}>Tecnología</div>
                            <div className={styles.tag}>Revolución</div>
                            <div className={styles.tag}>Académico</div>
                            <div className={styles.tag}>Interdisciplinar</div>
                            
                        </div>
                    </div>
                    <div className={styles.card_6}>
                        <h3 className={styles.subtitulo}>Estadísticas</h3>
                        <div className={styles.card_8}>
                            <img  className={styles.barras} src='https://cdn.pixabay.com/photo/2016/02/01/16/51/ascending-graph-1173935_1280.png'></img>
                        </div>
                    </div>

                </div>

                <h2 className={styles.titulo2}>Publicaciones guardadas</h2>

                <div className={styles.card_1}>
                    <p>Publicación 1</p>
                    <p>Publicación 2</p>
                    <p>Publicación 3</p>


                </div>

            </div>
        </div>
        
    );
}