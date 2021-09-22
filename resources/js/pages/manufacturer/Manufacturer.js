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

import {createManufacturer, getManufacturers} from "../../backend/manufacturer";

import styles from "./styles";

class Manufacturer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            manufacturers: [],
            name: '',
            address: '',
            phone: '',
            email: ''
        };

        this.createManufacturer = this.createManufacturer.bind(this);
        this.getManufacturers = this.getManufacturers.bind(this);
    }

    componentDidMount() {
        this.getManufacturers();
    }

    getManufacturers()
    {
        getManufacturers().then(res => {
            this.setState({
                manufacturers: res.manufacturers || []
            });
        });
    }

    updateFieldValue(value, field)
    {
        this.setState((preState) => {
           const newState = {...preState};
           newState[field] = value;
           return newState;
        });
    }

    createManufacturer(e)
    {
        e.preventDefault();
        const {name, address, phone, email} = this.state;
        createManufacturer(name, address, phone, email).then(res => {
            swal("Created!", "Manufacturer created successfully!", "success");
            this.getManufacturers();
        }).catch(err => {
            swal("Error!", "Could not create manufacturer!", "error");
        });
    }

    render() {
        const manufacturers = this.state.manufacturers;
        return (
            <Box width="100" p={3}>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12}>
                        <List>
                            {manufacturers.map((manufacturer, index) => {
                                const secondaryItems = [];
                                ['Address', 'Phone', 'Email'].forEach(function(field) {
                                    if(manufacturer[field]) {
                                        const icon = field === 'Address'
                                            ? <PlaceIcon fontSize="small"/> : field === 'Phone'
                                                ? <PhoneIcon fontSize="small"/> : <EmailIcon fontSize="small"/> ;

                                        secondaryItems.push({
                                            icon: icon,
                                            text: manufacturer[field]
                                        })
                                    }
                                })
                                return (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <HomeWorkIcon fontSize="large"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={manufacturer.Name}
                                            secondary={
                                                <TextWithIcon
                                                    items={secondaryItems}
                                                />
                                            }
                                        />
                                    </ListItem>
                                    )
                            })}
                        </List>
                    </Grid>
                    <Grid item lg={6} md={12}>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.createManufacturer}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.name}
                                required
                                fullWidth
                                validators={['required']}
                                label="Manufacturer name"
                                autoComplete="off"
                                autoFocus
                                onChange={
                                    (e) =>
                                        this.updateFieldValue(e.target.value, 'name')
                                }
                            />
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.address}
                                required
                                fullWidth
                                label="Address"
                                autoComplete="off"
                                autoFocus
                                validators={['required']}
                                onChange={
                                    (e) =>
                                        this.updateFieldValue(e.target.value, 'address')
                                }
                            />
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.phone}
                                validators={['required']}
                                required
                                fullWidth
                                label="Phone"
                                autoComplete="off"
                                autoFocus
                                onChange={
                                    (e) =>
                                        this.updateFieldValue(e.target.value, 'phone')
                                }

                            />
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.email}
                                validators={['required', 'isEmail']}
                                required
                                fullWidth
                                label="Email"
                                autoComplete="off"
                                autoFocus
                                onChange={
                                    (e) =>
                                        this.updateFieldValue(e.target.value, 'email')
                                }
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save manufacturer
                            </Button>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(Manufacturer);
