import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Navbar from "../../components/navbar/Navbar";
import Home from "../../pages/home/Home";
import Sidebar from "../../components/sideBar/Sidebar";
import {Grid} from "@material-ui/core";
import Loader from "react-loader-spinner";

class Authenticated extends React.Component {
    render() {
        return (
            this.props.isLoggedIn
            ? <React.Fragment>
                <Navbar/>
                <Grid container>
                    <Grid item md={2}>
                        <Sidebar />
                    </Grid>
                    <Grid item md={10}>
                        <Router basename="authorized">
                            <Switch>
                                <Route path="/">
                                    <Home/>
                                </Route>
                            </Switch>
                        </Router>
                    </Grid>
                </Grid>
            </React.Fragment>
            : <Redirect to="/auth"/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    };
}

export default connect(mapStateToProps)(Authenticated);
