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
            editingMarketId: null,
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
        const {name, marketCondition, editingMarketId} = this.state;
        createMarket(name, marketCondition, editingMarketId).then(res => {
            swal("Created!", "Market created successfully!", "success");
            this.getMarkets();
        }).catch(err => {
            swal("Error!", "Could not create market!", "error");
        });
    }

    editMarket = (marketId) => {
        let editingMarket = this.state.markets.find(market => market.MarketID === marketId);
        if(editingMarket) {
            this.setState({
                editingMarketId: marketId,
                name: editingMarket.Name,
                marketCondition: editingMarket.MarketCondition
            });
        }
    }

    cancelMarketEdit = () => {
        this.setState({
            editingMarketId: null
        });
    }

    render() {
        const {markets, editingMarketId} = this.state;
        return (
            <Box width="100" p={3}>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={12}>
                        <List>
                            {markets.map((market, index) => {
                                return (
                                    <ListItem key={index} style={{ width: 'fit-content' }}>
                                        <ListItemIcon>
                                            <HomeWorkIcon fontSize="large"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            style={{ marginRight: '15px' }}
                                            primary={market.Name}
                                        />
                                        <ListItemIcon style={{ cursor: 'pointer' }}>
                                            <EditIcon fontSize="medium" onClick={() => this.editMarket(market.MarketID)}/>
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
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                { editingMarketId
                                ? <Button 
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.cancelMarketEdit}>
                                    Cancel edit
                                  </Button>
                                  : null}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Save market
                                </Button>
                            </div>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(Market);
