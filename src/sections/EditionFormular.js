import React from 'react'
import { EditFormular } from '../components'

export default function EditionFormular() {
  //array of publications
  const [formular, setFormular] = React.useState([])

  return (
    <EditFormular list = {formular}/>
  )
}
