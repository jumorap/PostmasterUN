import React from "react"
import LoadingIcons from 'react-loading-icons'

import styles from "./Loading.module.css"


export default function Loading(state) {

    return (
        <>
            {
                state
                    ? (
                        <center className={styles.loadingContainer}>
                            <LoadingIcons.ThreeDots className={styles.loading}/>
                        </center>
                    )
                    : null
            }
        </>
    )
}
