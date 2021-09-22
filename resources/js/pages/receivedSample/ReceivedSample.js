import React from "react";
import {Box, Grid, TextField, withStyles} from "@material-ui/core";
import styles from "./styles";

class ReceivedSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grn: '',
            batch: '',
            ar: '',
            remark: ''
        }
    }
    render() {
        const classes = this.props.classes;
        return (
            <Box width="100">
                <Grid container spacing={2}>
                    <Grid item lg={6}>

                    </Grid>
                    <Grid item lg={6}>
                        <form className={classes.receivedSampleForm}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                value={this.state.grn}
                                required
                                fullWidth
                                label="GRN Number"
                                autoComplete="off"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                value={this.state.batch}
                                required
                                fullWidth
                                label="Batch Number"
                                autoComplete="off"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                value={this.state.ar}
                                required
                                fullWidth
                                label="AR Number"
                                autoComplete="off"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                value={this.state.remark}
                                required
                                fullWidth
                                label="Remark"
                                autoComplete="off"
                                autoFocus
                            />
                        </form>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(ReceivedSample);

