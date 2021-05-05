import React, { Fragment } from 'react';
import logo from './error.png';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <img src={logo} alt='logo' />
    </Fragment>
  );
};

export default NotFound;
