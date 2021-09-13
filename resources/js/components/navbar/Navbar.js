import React from "react";
import {AppBar, Toolbar, Typography, Button, IconButton, withStyles} from "@material-ui/core";
import {Menu as MenuIcon} from "@material-ui/icons";

import style from "./style";

class Navbar extends React.Component {
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
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(style)(Navbar);
