import React from "react"
import { makeStyles } from "@mui/material"
import LoadingIcons from 'react-loading-icons'


export default function Loading() {

    const useStyles = makeStyles( () => ({
        loading: {
            color: "#FFF",
            fontSize: "110px",
        },
        loadingContainer: {
            position: "absolute",
            top: "45%",
            right: "50%",
            width: "100%",
            alignContent: "center",
            transform: "translate(50%,-50%)"
        }
    }))

    return (
        <center className={useStyles().loadingContainer}>
            <LoadingIcons.ThreeDots className={useStyles().loading}/>
        </center>
    )
}


