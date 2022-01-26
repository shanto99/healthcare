import React from "react";
import {
    Box,
    Grid,
    withStyles,
    TextField,
    InputLabel,
    Select,
    MenuItem, FormControl, Button,
} from "@material-ui/core";

import {getContainers} from "../../../../backend/container";

import styles from "./styles";

class Packaging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: props.product,
            containers: [],
            containerInfo: props.containers
        }

        this.addContainerInfo = this.addContainerInfo.bind(this);
        this.getContainerLabel = this.getContainerLabel.bind(this);
    }

    componentDidMount() {
        getContainers().then(res => {
            this.setState({
               containers: res.containers || []
            });
        })
    }

    componentWillUnmount() {
        this.props.sendDataToParent({
            containers: this.state.containerInfo
        })
    }

    static getDerivedStateFromProps(props, state) {
        return {
            selectedProduct: props.product,
            containerInfo: props.containers
        }
    }

    addContainerInfo(variantId)
    {
        const unitCount = document.getElementById(`unit-count-${variantId}`).value;
        let primaryContainer = document.getElementById(`primary-packaging-${variantId}`);
        primaryContainer = primaryContainer.parentElement.querySelector('input').value;
        let secondaryContainer = document.getElementById(`secondary-packaging-${variantId}`);
        secondaryContainer = secondaryContainer.parentElement.querySelector('input').value;
        let tertiaryContainer = document.getElementById(`tertiary-packaging-${variantId}`);
        tertiaryContainer = tertiaryContainer.parentElement.querySelector('input').value;

        this.setState(preState => {
           const newState = {...preState};
           const containers = newState.containerInfo;
           if(!containers[variantId]) containers[variantId] = {};
            containers[variantId][unitCount] = {
               primary: primaryContainer,
               secondary: secondaryContainer,
               tertiary: tertiaryContainer
           }
           return newState;
        });

    }

    getContainerLabel(containerId)
    {
        const containers = this.state.containers;
        let container = containers.find(function(container) {
            const id = container.ContainerID;
            return id.toString() === containerId;
        });
        if(container) {
            return container.Name;
        }
        return 'N/A';
    }

    render() {
        const classes = this.props.classes;
        const containers = this.state.containers;
        const containerInfo = this.state.containerInfo || {};
        const variants = this.state.selectedProduct && this.state.selectedProduct.variants || [];
        return (
            <Box width="100" px={5}>
                <Grid container>
                    <Grid item lg={12} sm={12}>
                        <Box className={classes.packagingRow} mb={5}>
                            <Box px={2} className={classes.packagingRowCell}>
                                <b>Unit count</b>
                            </Box>
                           <Box px={2} className={classes.packagingRowCell}>
                               <b>Primary container</b>
                           </Box>
                            <Box px={2} className={classes.packagingRowCell}>
                                <b>Secondary container</b>
                            </Box>
                            <Box px={2} className={classes.packagingRowCell}>
                                <b>Tertiary container</b>
                            </Box>
                            <Box px={2} className={classes.packagingRowCell}>
                                <b>Actions</b>
                            </Box>
                        </Box>
                        {variants.map((variant, index) => {
                            let variantContainers = containerInfo[variant.VariantID] || {};
                            return (
                                <section key={`variant-${index}`}>
                                    <h4>{ variant.Variant }</h4>
                                    <section className="saved-package-info">
                                        {Object.keys(variantContainers).map((count, index) => {
                                            const singleContainer = variantContainers[count];
                                            return (
                                                <Box className={classes.packagingRow} mb={5} key={`single-pac-${index}`}>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>{count}</b>
                                                    </Box>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>{this.getContainerLabel(singleContainer.primary)}</b>
                                                    </Box>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>{this.getContainerLabel(singleContainer.secondary)}</b>
                                                    </Box>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>{this.getContainerLabel(singleContainer.tertiary)}</b>
                                                    </Box>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>Actions</b>
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </section>
                                    <Box className={classes.packagingRow}>
                                        <Box px={2} className={classes.packagingRowCell}>
                                            <TextField label="Unit count" id={`unit-count-${variant.VariantID}`} />
                                        </Box>
                                        <Box px={2} className={classes.packagingRowCell}>
                                            <FormControl fullWidth id={`primary-packaging-${variant.VariantID}`} >
                                                <InputLabel id="select-container-label">Container</InputLabel>
                                                <Select
                                                    labelId="select-container-label"
                                                    label="Container"
                                                    defaultValue=""
                                                >
                                                    {containers.map((container, index) => (
                                                        <MenuItem key={`con-${index}`} value={container.ContainerID}>{container.Name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box px={2} className={classes.packagingRowCell}>
                                            <FormControl fullWidth >
                                                <InputLabel id="select-container-label">Container</InputLabel>
                                                <Select
                                                    labelId="select-container-label"
                                                    label="Container"
                                                    defaultValue=""
                                                    id={`secondary-packaging-${variant.VariantID}`}
                                                >
                                                    {containers.map((container, index) => (
                                                        <MenuItem key={`con-${index}`} value={container.ContainerID}>{container.Name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box px={2} className={classes.packagingRowCell}>
                                            <FormControl fullWidth >
                                                <InputLabel id="select-container-label">Container</InputLabel>
                                                <Select
                                                    labelId="select-container-label"
                                                    label="Container"
                                                    defaultValue=""
                                                    id={`tertiary-packaging-${variant.VariantID}`}
                                                >
                                                    {containers.map((container, index) => (
                                                        <MenuItem key={`con-${index}`} value={container.ContainerID}>{container.Name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box className={classes.packagingRowCell}>
                                            <Button
                                                variant="contained"
                                                onClick={() => this.addContainerInfo(variant.VariantID)}
                                                color="primary">
                                                Add
                                            </Button>
                                        </Box>
                                    </Box>
                                </section>
                            )
                        })}
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(Packaging);
