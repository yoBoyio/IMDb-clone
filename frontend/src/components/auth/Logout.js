import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

export const Logout = ({ logout }) => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);