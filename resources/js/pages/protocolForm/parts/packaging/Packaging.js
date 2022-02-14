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
import {Delete as DeleteIcon} from "@material-ui/icons";

import {getContainers} from "../../../../backend/container";

import styles from "./styles";

class Packaging extends React.Component {
    constructor(props) {
        super(props);

        const counts = {};
        const primaryContainers = {};
        const secondaryContainers = {};
        const tertiaryContainers = {};

        const variants = props.product && props.product.variants || [];
        variants.forEach(variant => {
            counts[variant.VariantID] = 0;
            primaryContainers[variant.variantID] = '';
            secondaryContainers[variant.VariantID] = '';
            tertiaryContainers[variant.VariantID] = '';
        });

        this.state = {
            selectedProduct: props.product,
            containers: [],
            containerInfo: props.containers,
            counts: counts,
            primaryContainers: primaryContainers,
            secondaryContainers: secondaryContainers,
            tertiaryContainers: tertiaryContainers
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
        console.log("Will unmount");
        this.props.sendDataToParent({
            containers: this.state.containerInfo
        })
    }

    addContainerInfo(variantId)
    {
        this.setState(preState => {
            const unitCount = preState.counts[variantId];
            const primaryContainer = preState.primaryContainers[variantId];
            const secondaryContainer = preState.secondaryContainers[variantId];
            const tertiaryContainer = preState.tertiaryContainers[variantId];

            const newState = {...preState};
            const containers = newState.containerInfo;
            if(!containers[variantId]) containers[variantId] = {};
                containers[variantId][unitCount] = {
                primary: primaryContainer,
                secondary: secondaryContainer,
                tertiary: tertiaryContainer
            }

            newState.counts[variantId] = '';
            newState.primaryContainers[variantId] = '';
            newState.secondaryContainers[variantId] = '';
            newState.tertiaryContainers[variantId] = '';

            return newState;
        });

    }

    getContainerLabel(containerId)
    {
        const containers = this.state.containers;
        let container = containers.find(function(container) {
            const id = container.ContainerID;
            return id.toString() === containerId.toString();
        });
        if(container) {
            return container.Name;
        }
        return 'N/A';
    }

    handleUnitCountChange = (variantId, value) => {
        let counts = {...this.state.counts};
        counts[variantId] = value;
        this.setState({
            counts: counts
        });
    }

    handlePackagingChange = (variantId, packagingType, value) => {
        this.setState(preState => {
            const newState = {...preState};
            let containers = null;
            if(packagingType === 'primary') containers = newState.primaryContainers;
            else if(packagingType === 'secondary') containers = newState.secondaryContainers;
            else if(packagingType === 'tertiary') containers = newState.tertiaryContainers;

            containers[variantId] = value;

            return newState;

        })
    }

    removeContainerRow = (variantId, count) => {
        console.log({variantId, count});
        this.setState(preState => {
            const newState = {...preState};
            const containers = newState.containerInfo;
            if(containers && containers[variantId] && containers[variantId][count]) {
                delete containers[variantId][count];
            }

            return newState;
        });
    }

    render() {
        const classes = this.props.classes;
        const containers = this.state.containers;
        const containerInfo = this.state.containerInfo || {};
        const variants = this.state.selectedProduct && this.state.selectedProduct.variants || [];
        const {counts, primaryContainers, secondaryContainers, tertiaryContainers} = this.state;
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
                                                        <DeleteIcon color="secondary" onClick={() => this.removeContainerRow(variant.VariantID, count)}/>
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </section>
                                    <Box className={classes.packagingRow}>
                                        <Box px={2} className={classes.packagingRowCell}>
                                            <TextField label="Unit count"
                                            value={counts[variant.VariantID] || ""} onChange={(e) => this.handleUnitCountChange(variant.VariantID, e.target.value)} />
                                        </Box>
                                        <Box px={2} className={classes.packagingRowCell}>
                                            <FormControl fullWidth id={`primary-packaging-${variant.VariantID}`} >
                                                <InputLabel id="select-container-label">Container</InputLabel>
                                                <Select
                                                    labelId="select-container-label"
                                                    label="Container"
                                                    value={primaryContainers[variant.VariantID] || ""}
                                                    onChange={(e) => this.handlePackagingChange(variant.VariantID, 'primary', e.target.value)}
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
                                                    value={secondaryContainers[variant.VariantID] || ""}
                                                    onChange={(e) => this.handlePackagingChange(variant.VariantID, 'secondary', e.target.value)}
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
                                                    value={tertiaryContainers[variant.VariantID] || ""}
                                                    onChange={(e) => this.handlePackagingChange(variant.VariantID, 'tertiary', e.target.value)}
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
