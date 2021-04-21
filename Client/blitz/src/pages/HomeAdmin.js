import React from 'react';
import './Admin.css'
import NavbarAdmin from '../components/admin/NavbarAdmin'

export default function HomeAdmin() {
  return (
    <>
    <div>
        <NavbarAdmin/>
    </div>

    <div className='homeAdmin'>Welcom to the Administration</div>
    </>
  )
  
}