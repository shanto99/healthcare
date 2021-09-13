import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Authenticated from "./layouts/authenticated/Authenticated";
import Authentication from "./layouts/authentication/Authentication";

class SiteRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/auth">
                        <Authentication/>
                    </Route>
                    <Route path="/">
                        <Authenticated/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default SiteRouter;
