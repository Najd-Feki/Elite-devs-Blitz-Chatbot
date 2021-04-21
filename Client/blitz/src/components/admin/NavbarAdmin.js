import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './NavbarAdmin.css';


function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {    
      setDropdown(true);
    }
    console.log('Enter')
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
    console.log("leave")
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/adminhome' className='navbar-logo' onClick={closeMobileMenu}>
          BLITZ 
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/adminhome' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item' >
            <Link
              to='/users'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Users 
            </Link>
          </li>
          <li className='nav-item' >
            <Link
              to='/connecting'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Users connected
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/classification'
              className='nav-links'
              onClick={closeMobileMenu}
            >
             Classification
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/reclamationAdmin'
              className='nav-links'
              onClick={closeMobileMenu}
            >
             Reclamation
            </Link>
          </li>
          <li>
            <Link
              to='/'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
             Logout
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;