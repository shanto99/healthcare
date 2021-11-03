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
            packaging: props.packaging || {}
        }

        this.handlePackagingTypeChange = this.handlePackagingTypeChange.bind(this);
        this.addPackagingInfo = this.addPackagingInfo.bind(this);
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
            packaging: this.state.packaging
        })
    }

    handlePackagingTypeChange(type)
    {

    }

    static getDerivedStateFromProps(props, state) {
        return {
            selectedProduct: props.product,
            packaging: props.packaging
        }
    }

    addPackagingInfo(variantId)
    {
        const unitCount = document.getElementById(`unit-count-${variantId}`).value;
        let primaryPackaging = document.getElementById(`primary-packaging-${variantId}`);
            primaryPackaging = primaryPackaging.parentElement.querySelector('input').value;
        let secondaryPackaging = document.getElementById(`secondary-packaging-${variantId}`);
            secondaryPackaging = secondaryPackaging.parentElement.querySelector('input').value;
        let tertiaryPackaging = document.getElementById(`tertiary-packaging-${variantId}`);
            tertiaryPackaging = tertiaryPackaging.parentElement.querySelector('input').value;


            this.setState(preState => {
               const newState = {...preState};
               const packaging = newState.packaging;
               if(!packaging[variantId]) packaging[variantId] = {};
               packaging[variantId][unitCount] = {
                   primary: primaryPackaging,
                   secondary: secondaryPackaging,
                   tertiary: tertiaryPackaging
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
        const variants = this.state.selectedProduct && this.state.selectedProduct.variants || [];
        const packaging = this.state.packaging;
        return (
            <Box width="100" px={5}>
                <Grid container>
                    <Grid item lg={12} sm={12}>
                        <Box className={classes.packagingRow} mb={5}>
                            <Box px={2} className={classes.packagingRowCell}>
                                <b>Unit count</b>
                            </Box>
                           <Box px={2} className={classes.packagingRowCell}>
                               <b>Primary packaging</b>
                           </Box>
                            <Box px={2} className={classes.packagingRowCell}>
                                <b>Secondary packaging</b>
                            </Box>
                            <Box px={2} className={classes.packagingRowCell}>
                                <b>Tertiary packaging</b>
                            </Box>
                            <Box px={2} className={classes.packagingRowCell}>
                                <b>Actions</b>
                            </Box>
                        </Box>
                        {variants.map((variant, index) => {
                            let variantPackaging = packaging[variant.VariantID] || {};
                            return (
                                <section key={`variant-${index}`}>
                                    <h4>{ variant.Variant }</h4>
                                    <section className="saved-package-info">
                                        {Object.keys(variantPackaging).map((count, index) => {
                                            const singlePackaging = variantPackaging[count];
                                            return (
                                                <Box className={classes.packagingRow} mb={5} key={`single-pac-${index}`}>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>{count}</b>
                                                    </Box>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>{this.getContainerLabel(singlePackaging.primary)}</b>
                                                    </Box>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>{this.getContainerLabel(singlePackaging.secondary)}</b>
                                                    </Box>
                                                    <Box px={2} className={classes.packagingRowCell}>
                                                        <b>{this.getContainerLabel(singlePackaging.tertiary)}</b>
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
                                                onClick={() => this.addPackagingInfo(variant.VariantID)}
                                                color="success">
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
