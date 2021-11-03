import React from "react";

import {getProtocols} from "../../backend/protocol";
import {Box, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";

import styles from "./styles";
import {Visibility} from "@material-ui/icons";

class Protocol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            protocols: []
        }
    }

    componentDidMount() {
        getProtocols().then(res => {
            this.setState({
                protocols: res.protocols
            });
        });
    }

    render() {
        const protocols = this.state.protocols;
        const classes = this.props.classes;
        return (
            <Box className={classes.protocolList}>
                <List>
                    {protocols.map((protocol, index) => {
                       let variants = protocol.product.variants.map(variant => variant.Variant);
                       return (
                           <ListItem key={`saved_protocol_${index}`}>
                                <ListItemText
                                    primary={protocol.product.ProductName}
                                    secondary={variants.toString()}
                                />
                               <ListItemIcon>
                                   <IconButton>
                                       <Visibility/>
                                   </IconButton>
                               </ListItemIcon>
                           </ListItem>
                       )
                    })}
                </List>
            </Box>
        );
    }
}

export default withStyles(styles)(Protocol);
