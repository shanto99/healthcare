import React from "react";
import {Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, withStyles} from "@material-ui/core";
import {
    HomeWork as HomeWorkIcon,
    Place as PlaceIcon,
    Edit as EditIcon
} from "@material-ui/icons";

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import TextWithIcon from "../../components/TextWithIcon";

import {createMarket, getMarkets} from "../../backend/market";

import styles from "./styles";

class Market extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markets: [],
            name: '',
            marketCondition: ''
        };

        this.createMarket = this.createMarket.bind(this);
        this.getMarkets = this.getMarkets.bind(this);
    }

    componentDidMount() {
        this.getMarkets();
    }

    getMarkets()
    {
        getMarkets().then(res => {
            this.setState({
                markets: res.markets || []
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

    createMarket(e)
    {
        e.preventDefault();
        const {name, marketCondition} = this.state;
        createMarket(name, marketCondition).then(res => {
            swal("Created!", "Market created successfully!", "success");
            this.getMarkets();
        }).catch(err => {
            swal("Error!", "Could not create market!", "error");
        });
    }

    editMarket = () => {

    }

    render() {
        const markets = this.state.markets;
        return (
            <Box width="100" p={3}>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={12}>
                        <List>
                            {markets.map((market, index) => {
                                const secondaryItems = [];
                                ['MarketCondition'].forEach(function(field) {
                                    if(market[field]) {
                                        const icon = <PlaceIcon fontSize="small"/>
                                        secondaryItems.push({
                                            icon: icon,
                                            text: market[field]
                                        })
                                    }
                                });
                                return (
                                    <ListItem key={index} style={{ width: 'fit-content' }}>
                                        <ListItemIcon>
                                            <HomeWorkIcon fontSize="large"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            style={{ marginRight: '15px' }}
                                            primary={market.Name}
                                            secondary={
                                                <TextWithIcon
                                                    items={secondaryItems}
                                                />
                                            }
                                        />
                                        <ListItemIcon style={{ cursor: 'pointer' }}>
                                            <EditIcon fontSize="medium"/>
                                        </ListItemIcon>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                    <Grid item lg={4} md={12}>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.createMarket}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                value={this.state.name}
                                required
                                fullWidth
                                validators={['required']}
                                label="Market name"
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
                                value={this.state.marketCondition}
                                required
                                fullWidth
                                label="Market Condition"
                                autoComplete="off"
                                autoFocus
                                onChange={
                                    (e) =>
                                        this.updateFieldValue(e.target.value, 'marketCondition')
                                }
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save market
                            </Button>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(Market);
