import React from "react";
import {List, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {Mail as MailIcon} from "@material-ui/icons";

import style from "./style";

class Sidebar extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.sidebar}>
                <List>
                    <ListItem button>
                        <ListItemIcon><MailIcon/></ListItemIcon>
                        <ListItemText primary="Mails"/>
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withStyles(style)(Sidebar);
