import React from "react";
import { withStyles } from "@material-ui/styles";

import styles from "./style";
import { Box, Grid, Select, TextField, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import {getPackagings} from "../../backend/packaging";

class Container extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      selectedPackaging: "",
      packagings: [],
      selectedPackagings: []
    }
  }

  componentDidMount()
  {
    getPackagings().then(res => {
      this.setState({
        packagings: res.packagings || []
      });
    }).catch(err => {
      console.log("Could not get packagings: ", err);
    });
  }

  handlePackagingSelect = (e) => {

  }

  render()
  {
    const classes = this.props.classes;
    const packagings = this.state.packagings;
    return (
      <Box width="100" p={3}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={12}>

          </Grid>
          <Grid item lg={6} md={12}>
            <div className={classes.formContainer}>
              <Box m={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Container name"
                />
              </Box>
              <Box m={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Container type"
                />
              </Box>
              <Box m={3}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="packaging-label">Packaging</InputLabel>
                    <Select
                        labelId="packaging-label"
                        label="Packaging"
                        value={this.state.selectedPackaging}
                        onChange={this.handlePackagingSelect}
                    >
                        <MenuItem value="">
                            <em>Select packaging</em>
                        </MenuItem>
                        {packagings.map((packaging, index) => (
                            <MenuItem key={index} value={packaging.PackagingID}>{packaging.Name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>
    )
  }

}

export default withStyles(styles)(Container);

