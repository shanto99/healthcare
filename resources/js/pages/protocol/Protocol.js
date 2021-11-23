import React from "react";

import {getProtocols} from "../../backend/protocol";
import {Box, IconButton, List, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";

import styles from "./styles";
import {Visibility} from "@material-ui/icons";
import {Link} from "react-router-dom";

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
                           <Link to={`/protocol_view/${protocol.ProtocolID}`}>
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
                           </Link>
                       )
                    })}
                </List>
            </Box>
        );
    }
}

export default withStyles(styles)(Protocol);
