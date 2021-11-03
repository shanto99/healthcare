import React from "react";
import {Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, withStyles} from "@material-ui/core";
import {
    HomeWork as HomeWorkIcon,
    Place as PlaceIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
} from "@material-ui/icons";

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import TextWithIcon from "../../components/TextWithIcon";

import {getContainers, saveContainer} from "../../backend/container";

import styles from "./styles";
import swal from "sweetalert";

class Packaging extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containers: [],
            name: '',
            source: '',
            dmf: '',
            resin: '',
            colorant: '',
            liner: ''
        }

        this.savePackaging = this.savePackaging.bind(this);
        this.getContainers = this.getContainers.bind(this);
    }

    componentDidMount() {
        this.getContainers();
    }

    createManufacturer(e)
    {

    }

    getContainers()
    {
        getContainers().then(res => {
            this.setState({
                containers: res.containers || []
            })
        }).catch(err => {
            swal("Error!","Could not fetch containers", "error");
        })
    }

    savePackaging(e)
    {
        e.preventDefault();
        const {name, source, dmf, resin, colorant, liner} = this.state;
        saveContainer(name, source, dmf, resin, colorant, liner).then(res => {
            swal("Success", "Container added successfully", "success");
        }).catch(err => {
            swal("Oops!", 'Something went wrong', 'error');
        })
    }

    render() {
        const {containers} = this.state;
        return (
            <Box width="100" p={3}>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12}>
                        <List>
                            {containers.map((container, index) => {
                                const secondaryTexts = [];

                                ['Source', 'DMP', 'Liner'].forEach(field => {
                                    secondaryTexts.push({
                                        text: `${field}: ${container[field]}`
                                    });
                                })
                                return (
                                    <ListItem key={`con-${index}`}>
                                        <ListItemText
                                            primary={container.Name}
                                            secondary={<TextWithIcon items={secondaryTexts} />}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                    <Grid item lg={6} md={12}>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.savePackaging}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.name}
                                required
                                fullWidth
                                validators={['required']}
                                label="Name"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => {
                                    this.setState({
                                        name: e.target.value
                                    })
                                }}
                            />
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.source}
                                required
                                fullWidth
                                validators={['required']}
                                label="Source"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => {
                                    this.setState({
                                        source: e.target.value
                                    })
                                }}
                            />
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.dmf}
                                required
                                fullWidth
                                validators={['required']}
                                label="DMF"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => {
                                    this.setState({
                                        dmf: e.target.value
                                    })
                                }}
                            />
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.resin}
                                required
                                fullWidth
                                validators={['required']}
                                label="Resin"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => {
                                    this.setState({
                                        resin: e.target.value
                                    })
                                }}
                            />
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.colorant}
                                required
                                fullWidth
                                validators={['required']}
                                label="Colorant"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => {
                                    this.setState({
                                        colorant: e.target.value
                                    })
                                }}
                            />
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.liner}
                                required
                                fullWidth
                                validators={['required']}
                                label="Liner"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => {
                                    this.setState({
                                        liner: e.target.value
                                    })
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save packaging info
                            </Button>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(Packaging);
