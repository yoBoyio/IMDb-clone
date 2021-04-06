import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
//redirect to home 

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) => authenticated === true ? <Redirect to='/' /> :
            <Component {...props} />}
    />
)

const mapStateToProps = (state) => ({
    auth: state.auth
})

AuthRoute.propTypes = {
    user: PropTypes.object
};
export default connect(mapStateToProps)(AuthRoute);