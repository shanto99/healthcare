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

import {createApiDetail, getApiDetails} from "../../backend/api_detail";

import styles from "./styles";

class ApiDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            api_details: [],
            name: '',
            source: ''
        };

        this.createApiDetail = this.createApiDetail.bind(this);
        this.getApiDetails = this.getApiDetails.bind(this);
    }

    componentDidMount() {
        this.getApiDetails();
    }

    getApiDetails()
    {
        getApiDetails().then(res => {
            this.setState({
                api_details: res.api_details || []
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

    createApiDetail(e)
    {
        e.preventDefault();
        const {name, source} = this.state;

        createApiDetail(name, source).then(res => {
            swal("Created!", "ApiDetail created successfully!", "success");
            this.getApiDetails();
        }).catch(err => {
            swal("Error!", "Could not create ApiDetail!", "error");
        });
    }

    render() {
        const api_details = this.state.api_details;
        return (
            <Box width="100" p={3}>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12}>
                        <List>
                            {api_details.map((api_detail, index) => {
                                const secondaryItems = [{
                                        icon: <PhoneIcon fontSize="small"/>,
                                        text: api_detail.Source
                                    }];
                                return (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <HomeWorkIcon fontSize="large"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={api_detail.Name}
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
                            onSubmit={this.createApiDetail}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.name}
                                required
                                fullWidth
                                validators={['required']}
                                label="ApiDetail name"
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
                                value={this.state.source}
                                required
                                fullWidth
                                label="Source"
                                autoComplete="off"
                                autoFocus
                                validators={['required']}
                                onChange={
                                    (e) =>
                                        this.updateFieldValue(e.target.value, 'source')
                                }
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save ApiDetail
                            </Button>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(ApiDetail);
