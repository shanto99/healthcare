import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Navbar from "../../components/navbar/Navbar";
import Home from "../../pages/home/Home";
import Product from "../../pages/product/Product";
import ReceivedSample from "../../pages/receivedSample/ReceivedSample";
import Manufacturer from "../../pages/manufacturer/Manufacturer";
import Sidebar from "../../components/sideBar/Sidebar";
import {Grid} from "@material-ui/core";
import ProtocolForm from "../../pages/protocolForm/ProtocolForm";
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
                        <Switch>
                            <Route exact={true} path="/manufacturer">
                                <Manufacturer/>
                            </Route>
                            <Route exact={true} path="/product">
                                <Product/>
                            </Route>
                            <Route exact={true} path="/received-sample">
                                <ReceivedSample/>
                            </Route>
                            <Route exact={true} path="/product-protocol">
                                <ProtocolForm/>
                            </Route>
                            <Route exact={true} path="/">
                                <Home/>
                            </Route>
                        </Switch>
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
