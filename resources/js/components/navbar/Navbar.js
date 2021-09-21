import React from "react";
import {AppBar, Toolbar, Typography, Button, IconButton, withStyles} from "@material-ui/core";
import {Menu as MenuIcon} from "@material-ui/icons";

import style from "./style";
import {LOG_IN, LOG_OUT} from "../../actions";

import {connect} from "react-redux";

import {signOut} from "../../backend/authentication";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.makeLogout = this.makeLogout.bind(this);
    }

    makeLogout()
    {
        signOut().then(res => {
            this.props.logout();
        }).catch(err => {
            console.log("Loggin out failed");
        })
    }

    render() {
        const classes = this.props.classes;
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Healthcare
                    </Typography>
                    <Button color="inherit" onClick={this.makeLogout} >Logout</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () =>  {
            return dispatch({ type: LOG_OUT})
        }
    }
}

export default connect(null, mapDispatchToProps)(withStyles(style)(Navbar));
