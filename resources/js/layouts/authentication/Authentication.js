import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Login from "../../pages/login/Login";
import Registration from "../../pages/registration/Registration";

class Authentication extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router basename="/auth">
                    <Switch>
                        <Route path="/registration">
                            <Registration/>
                        </Route>
                        <Route path="/">
                            <Login/>
                        </Route>
                    </Switch>
                </Router>
                {this.props.isLoggedIn ?
                <Redirect to={"/"}/>
                : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    };
}

export default connect(mapStateToProps)(Authentication);
