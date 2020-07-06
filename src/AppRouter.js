import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css' 

import AuthedRoute from "./AuthedRoute";
import UnauthedRoute from "./UnauthedRoute";
import Login from './pages/Login'
import NotFound from './pages/404'
import Home from './pages'
import workspaces from './pages/workspaces' 
import { ThemeWrapper } from "./services/theme"; 
import { getAllData } from "./api";

nprogress.start();
class AppRouter extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        getAllData(dispatch)
        nprogress.done();
    }
    render() {
        return (
            <Router history={this.props.history}>
                <ThemeWrapper user={this.props.user}> 
                        <Switch>
                            <AuthedRoute component={workspaces} exact path={["/:wid","/:wid/:sid","/:wid/:sid/:cid"]} />
                            <AuthedRoute component={Home} exact path="/" />
                            <AuthedRoute component={Home} exact path="/create" />
                            <UnauthedRoute component={Login} exact path="/login" />  
                            <Route component={NotFound} />
                        </Switch> 
                </ThemeWrapper>
            </Router>
        );
    }
}

AppRouter.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state =>{ 
    return ({ user: state.user })}

export default connect(mapStateToProps)(AppRouter);
 