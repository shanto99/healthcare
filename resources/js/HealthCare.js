import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";

import Authentication from "./layouts/authentication/Authentication";
import Authenticated from "./layouts/authenticated/Authenticated";

import {Provider, connect} from "react-redux";
import store from "./store";
import {LOG_IN} from "./actions";

import Loader from "./components/loader/Loader";
import {getUser} from "./backend/authentication";

class HealthCare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount()
    {
       getUser().then(res => {
           let user = res.user;
           console.log(user);
           this.props.login(user);
           this.setState({
               isLoading: false
           });
       }).catch(err => {
           this.setState({
               isLoading: false
           });
       })
    }

    render() {
        console.log(this.state.isLoading);
        return (
            <React.Fragment>
                <CssBaseline/>
                {this.state.isLoading
                ? <Loader/>
                : <Router>
                        <Switch>
                            <Route path="/auth">
                                <Authentication/>
                            </Route>
                            <Route path="/">
                                <Authenticated/>
                            </Route>
                        </Switch>
                        {!this.props.isLoggedIn
                        ? <Redirect to="/auth"/>
                        : null}
                    </Router>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) =>  {
            return dispatch({ type: LOG_IN, payload: {
                    user: user
                }})
        }
    }
}

HealthCare = connect(mapStateToProps, mapDispatchToProps)(HealthCare);

export default HealthCare;

ReactDOM.render(
    <Provider store={store}>
        <HealthCare/>
    </Provider>
    , document.getElementById("app"));

