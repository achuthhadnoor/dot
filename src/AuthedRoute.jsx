import { Redirect, Route, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Loader from './components/loader' 

class AuthedRoute extends React.Component {
  render() {
    const { component, ...rest } = this.props;
    const Component = component;

    return (
      <Route
        {...rest}
        render={props => { 
          if (!localStorage["authedUser"]) {
            if (this.props.redirect) {
              return <Redirect to="/login" />;
            } else {
              return <div />;
            }
          } else if (!this.props.user.uid) { 
            if (this.props.showLoader) {
              return <Loader />;
            } else {
              return <div />;
            }
          } else {
            return <Component {...props} />;
          }
        }}
      />
    );
  }
}

AuthedRoute.defaultProps = {
  redirect: true,
  showLoader: true
};

AuthedRoute.propTypes = {
  component: PropTypes.elementType,
  redirect: PropTypes.bool,
  showLoader: PropTypes.bool,
  user: PropTypes.shape({})
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(AuthedRoute));
