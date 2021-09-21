import React from "react";
import {withStyles} from "@material-ui/core";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import styles from "./styles";

class HealthLoader extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.loaderContainer}>
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        )
    }
}

export default withStyles(styles)(HealthLoader);

