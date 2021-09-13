import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";

import Authentication from "./layouts/authentication/Authentication";
import Authenticated from "./layouts/authenticated/Authenticated";

import {Provider, connect} from "react-redux";
import store from "./store";

import SiteRouter from "./SiteRouter";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import {LOG_IN} from "./actions";


class HealthCare extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <SiteRouter/>
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
        login: () =>  dispatch({ type: LOG_IN, payload: {
                user: {UserID: 24221, UserName: 'Shanto'}
            } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HealthCare);

ReactDOM.render(
    <Provider store={store}>
        <HealthCare/>
    </Provider>
    , document.getElementById("app"));

