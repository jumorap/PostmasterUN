import React from 'react'
import { Admin, NavBar } from '../../src/sections'
import { useRouter } from 'next/router'

export default function admin() {
  const router = useRouter()
  const { section } = router.query

  return (
    <NavBar>
        <Admin section = {section}/>
    </NavBar>
  )
}
