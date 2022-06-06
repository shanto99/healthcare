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

import {getPackagings, savePackaging} from "../../backend/packaging";

import styles from "./styles";
import swal from "sweetalert";

class Packaging extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            packagings: [],
            name: '',
            source: '',
            dmf: '',
            resin: '',
            colorant: '',
            liner: ''
        }

        this.savePackaging = this.savePackaging.bind(this);
    }

    componentDidMount() {
        this.getPackagings();
    }

    getPackagings = () => {
        getPackagings().then(res => {
            this.setState({
                packagings: res.packagings || []
            })
        }).catch(err => {
            swal("Error!","Could not fetch packagings", "error");
        })
    }

    savePackaging(e)
    {
        e.preventDefault();
        const {name, source, dmf, resin, colorant, liner} = this.state;
        savePackaging(name, source, dmf, resin, colorant, liner).then(res => {
            swal("Success", "Package info saved successfully", "success");
            this.getPackagings();
        }).catch(err => {
            swal("Oops!", 'Something went wrong', 'error');
        })
    }

    render() {
        const {packagings} = this.state;
        return (
            <Box width="100" p={3}>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12}>
                        <List>
                            {packagings.map((packaging, index) => {
                                const secondaryTexts = [];

                                ['Source', 'DMF', 'Liner'].forEach(field => {
                                    secondaryTexts.push({
                                        text: `${field}: ${packaging[field]}`
                                    });
                                })
                                return (
                                    <ListItem key={`con-${index}`}>
                                        <ListItemText
                                            primary={packaging.Name}
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
