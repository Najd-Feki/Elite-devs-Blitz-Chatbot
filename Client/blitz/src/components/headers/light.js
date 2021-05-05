/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import styled from 'styled-components';
import Pulse from 'react-reveal/Pulse';
import Fade from 'react-reveal/Fade';
import { css } from 'styled-components/macro'; //eslint-disable-line
import './ligh.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import useAnimatedNavToggler from '../../helpers/useAnimatedNavToggler.js';

import logo from '../../images/blitz.PNG';
import { ReactComponent as MenuIcon } from 'feather-icons/dist/icons/menu.svg';
import { ReactComponent as CloseIcon } from 'feather-icons/dist/icons/x.svg';

const Header = tw.header`
sticky top-0
`;

export const NavLinks = tw.div`inline-block sticky top-0`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-20 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-50 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion.custom(styled.div`
  ${tw`lg:hidden z-50 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center z-50`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center sticky top-0
`;

const Navbar = ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = 'lg',
  auth,
  logout,
}) => {
  const authLinks = [
    <NavLinks>
      <NavLink>
        <Link to='/about'>About Us</Link>
      </NavLink>
      <NavLink>
        <Link to='/contact'>Contact Us</Link>
      </NavLink>
      <NavLink>
        <Link to={`/jobs/${auth?.user?._id}`}> Jobs</Link>
      </NavLink>
      <NavLink>
        <Link to='/posts'>Posts</Link>
      </NavLink>
      <NavLink>
        <Link to={`/profile/${auth?.user?._id}`}> Profile</Link>
      </NavLink>
      <NavLink>
        <Link to='/course'>Courses</Link>
      </NavLink>
      <NavLink>
        <Link to='/progress'>Progress</Link>
      </NavLink>
      <NavLink>
        <Link to='/event'>Events</Link>
      </NavLink>
      <NavLink>
        <Link to='/reclamation'>Claims</Link>
      </NavLink>

      <a onClick={logout} href='/'>
        <i className='fas fa-sign-out-alt' />{' '}
        <span className='hide-sm'>Logout</span>
      </a>
    </NavLinks>,
  ];

  const adminLinks = [
    <NavLinks>
      <NavLink>
        <Link to='/about'>About Us</Link>
      </NavLink>
      <NavLink>
        <Link to='/users'>Users</Link>
      </NavLink>
      <NavLink>
        <Link to='/addCourse'>Add Course</Link>

        
      </NavLink>
      <NavLink>
        <Link to='/classification'>Dashbord </Link>
      </NavLink>
      <NavLink>
        <Link to='/CourseList'>Course List</Link>
      </NavLink>
      <NavLink>
      <Link to='/reclamationAdmin'>Claims </Link>
      </NavLink>
      <a onClick={logout} href='/'>
        <i className='fas fa-sign-out-alt' />{' '}
        <span className='hide-sm'>Logout</span>
      </a>
    </NavLinks>,
  ];

  const guestLinks = [
    <NavLinks>
      <NavLink>
        <Link to='/about'>About Us</Link>
      </NavLink>
      <NavLink>
        <Link to='/contact'>Contact Us</Link>
      </NavLink>
      <NavLink tw='lg:ml-12!'>
        <Link to='/login'>Login</Link>
      </NavLink>
      <PrimaryLink
        css={roundedHeaderButton && tw`rounded-full`}
        href='/register'
      >
        Sign Up
      </PrimaryLink>
    </NavLinks>,
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink style={{ top: '100rem' }}>
      <Pulse forever left>
        <img src={logo} alt='logo' />
      </Pulse>
      <Link to='/'>Blitz</Link>
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  /*   links = links || defaultLinks;
   */
  return (
    <Fade bottom duration={3000}>
      <Header className={'sticky'}>
        <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
          {logoLink}
          {!auth.isAuthenticated
            ? guestLinks
            : auth.user.isAdmin
            ? adminLinks
            : authLinks}
        </DesktopNavLinks>

        <MobileNavLinksContainer
          css={collapseBreakpointCss.mobileNavLinksContainer}
        >
          {logoLink}
          <MobileNavLinks
            initial={{ x: '150%', display: 'none' }}
            animate={animation}
            css={collapseBreakpointCss.mobileNavLinks}
          >
            {links}
          </MobileNavLinks>
          <NavToggle
            onClick={toggleNavbar}
            className={showNavLinks ? 'open' : 'closed'}
          >
            {showNavLinks ? (
              <CloseIcon tw='w-6 h-6' />
            ) : (
              <MenuIcon tw='w-6 h-6' />
            )}
          </NavToggle>
        </MobileNavLinksContainer>
      </Header>
    </Fade>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};
