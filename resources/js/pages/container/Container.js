import React from "react";
import {withStyles} from "@material-ui/styles";

import styles from "./style";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem, ListItemText,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import TextWithIcon from "../../components/TextWithIcon";
import {getPackagings} from "../../backend/packaging";
import {getContainers, saveContainer} from "../../backend/container";

class Container extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      containerName: '',
      containerType: '',
      selectedPackaging: "",
      containers: [],
      packagings: [],
      selectedPackagings: []
    }
  }

  componentDidMount()
  {
    getPackagings().then(res => {
      this.setState({
        packagings: res.packagings || []
      }, this.getContainers);
    }).catch(err => {
      console.log("Could not get packagings: ", err);
    });
  }

  getContainers = () => {
      getContainers().then(res => {
          this.setState({
             containers: res.containers || []
          });
      })
  }

  handlePackagingSelect = (e) => {
      const packagingId = e.target.value;
      this.setState((preState) => {
        const newState = {...preState};
        newState.selectedPackagings.push(packagingId);
        return newState;
      });
  }

  getPackagingById = (id) => {
      return this.state.packagings.find(packaging => packaging.PackagingID === id);
  }

  removePackaging = (id) => {
    this.setState(preState => {
       const newState = {...preState};
       newState.selectedPackagings = newState.selectedPackagings.filter(packagingId => packagingId === id);
       return newState;
    });
  }

  createContainer = () => {
      const {containerName, containerType, selectedPackagings} = this.state;
      saveContainer(containerName, containerType, selectedPackagings).then(res => {
          this.setState({
              containers: res.containers || []
          });
      }).catch(err => {
        console.log(err);
      });
  }

  render()
  {
    const classes = this.props.classes;
    const {packagings, selectedPackagings, containers} = this.state;
    return (
      <Box width="100" p={3}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={12}>
            <List>
                {containers.map(container => {
                    const pacakgings = container.packagings.map(packaging => {
                        return {
                            text: packaging.Name
                        }
                    });
                    return (
                        <ListItem>
                            <ListItemText
                                primary={container.Name}
                                secondary={
                                    <TextWithIcon
                                        items={pacakgings}
                                    />
                                }
                            />
                        </ListItem>
                    )
                })}
            </List>
          </Grid>
          <Grid item lg={6} md={12}>
            <div className={classes.formContainer}>
              <Box m={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Container name"
                  onChange={(e) => this.setState({
                      containerName: e.target.value
                  })}
                />
              </Box>
              <Box m={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Container type"
                  onChange={(e) => this.setState({
                      containerType: e.target.value
                  })}
                />
              </Box>
              <Box m={3}>
                  <div className={classes.selectedPackagings}>
                      <div className="packaging-row selected-packaging-header">
                          <div className="packaging-name">
                              <h3>Packaging name</h3>
                          </div>
                          <div className="packaging-action">
                              <h3>Delete</h3>
                          </div>
                      </div>
                      {selectedPackagings.map(packagingId => {
                          const packaging = this.getPackagingById(packagingId);
                          return (
                              <div className="packaging-row">
                                  <div className="packaging-name">
                                      <h3>{packaging.Name}</h3>
                                  </div>
                                  <div className="packaging-action">
                                      <Button
                                          variant="outlined"
                                          color="success"
                                          label="Delete"
                                          onClick={() => this.removePackaging(packagingId)}
                                      >
                                          Delete
                                      </Button>
                                  </div>
                              </div>
                          )
                      })}
                  </div>

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
                        {packagings.map((packaging, index) => {
                            if(selectedPackagings.includes(packaging.PackagingID)) {
                                return null;
                            } else {
                                return (
                                    <MenuItem key={index} value={packaging.PackagingID}>{packaging.Name}</MenuItem>
                                )
                            }

                        })}
                    </Select>
                </FormControl>
              </Box>
                <Box m={3}>
                    <Button
                        variant="outlined"
                        onClick={this.createContainer}
                    >
                        Create
                    </Button>
                </Box>
            </div>
          </Grid>
        </Grid>
      </Box>
    )
  }

}

export default withStyles(styles)(Container);

