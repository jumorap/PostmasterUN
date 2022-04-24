import React from 'react'
import AppBar from '@mui/material/AppBar';
import UserIcon from './UserIcon';


export default function Navbar() {

  const [auth, setAuth] = React.useState(true);


  return (
    <AppBar position='sticky'>
      <UserIcon auth = {auth}/>
    </AppBar>
  )
}
