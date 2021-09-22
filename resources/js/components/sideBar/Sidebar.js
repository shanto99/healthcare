import React from "react";
import {List, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import { AddBox as AddBoxIcon, Dashboard as DashboardIcon} from "@material-ui/icons";

import style from "./style";
import {Link} from "react-router-dom";

class Sidebar extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.sidebar}>
                <List>
                    <Link to="/" className={classes.linkStyle} >
                        <ListItem button>
                            <ListItemIcon><DashboardIcon/></ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                    </Link>
                    <Link to="/manufacturer" className={classes.linkStyle} >
                        <ListItem button>
                            <ListItemIcon><AddBoxIcon/></ListItemIcon>
                            <ListItemText primary="Manufacturer"/>
                        </ListItem>
                    </Link>
                    <Link to="/product" className={classes.linkStyle} >
                        <ListItem button>
                            <ListItemIcon><AddBoxIcon/></ListItemIcon>
                            <ListItemText primary="Product"/>
                        </ListItem>
                    </Link>
                    <Link to="/received-sample" className={classes.linkStyle} >
                        <ListItem button>
                            <ListItemIcon><AddBoxIcon/></ListItemIcon>
                            <ListItemText primary="Received sample"/>
                        </ListItem>
                    </Link>
                </List>
            </div>
        );
    }
}

export default withStyles(style)(Sidebar);
