import React from "react";
import {
    FormControl, InputLabel, MenuItem, Grid,
    Select, TextField, withStyles, Box, Typography
} from "@material-ui/core";

import {getProducts} from "../../../../backend/product";
import {getMarkets} from "../../../../backend/market";
import {getManufacturers} from "../../../../backend/manufacturer";
import {getApiDetails} from "../../../../backend/api_detail";

import styles from "./styles";

class Basic extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.stp_references = props.stp_references;
        this.state = {
            products: [],
            selectedProduct: props.product,
            selectedMarket: props.market,
            selectedManufacturer: props.manufacturer,
            selectedApi: props.api,
            reference: props.reference,
            markets: [],
            manufacturers: [],
            api_details: [],
        }

        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleMarketChange = this.handleMarketChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleApiDetailChange = this.handleApiDetailChange.bind(this);
        this.handleStpSpecificationChange = this.handleStpSpecificationChange.bind(this);
    }

    componentDidMount() {
        Promise.all([getProducts(), getMarkets(), getManufacturers(), getApiDetails()]).then(responses => {
            let fields = {
                products: [],
                markets: [],
                manufacturers: [],
                api_details: [],
            }
            Object.keys(fields).forEach((field, index) => {
               fields[field] = responses[index][field];
            });

            this.setState(previousState => {
                return {...previousState, ...fields};
            })
        })
    }

    componentWillUnmount() {
        this.props.sendDataToParent({
            product: this.state.selectedProduct,
            market: this.state.selectedMarket,
            manufacturer: this.state.selectedManufacturer,
            api: this.state.selectedApi,
            reference: this.state.reference,
            stp_references: this.stp_references
        });
    }

    handleProductChange(e)
    {
        const productId = e.target.value;
        const product = this.state.products.find(product => product.ProductID === productId);
        if(product) {
            this.setState({
                selectedProduct: product
            })
        }
    }

    handleMarketChange(e)
    {
        const marketId = e.target.value;
        const market = this.state.markets.find(market => market.MarketID === marketId);
        if(market) {
            this.setState({
                selectedMarket: market
            })
        }
    }

    handleManufacturerChange(e)
    {
        const manufacturerId = e.target.value;
        const manufacturer = this.state.manufacturers.find(manufacturer => manufacturer.ManufacturerID === manufacturerId);
        if(manufacturer) {
            this.setState({
                selectedManufacturer: manufacturer
            });
        }
    }

    handleApiDetailChange(e)
    {
        const apiDetailId = e.target.value;
        const apiDetail = this.state.api_details.find(apiDetail => apiDetail.ApiDetailID === apiDetailId);
        if(apiDetail)
        {
            this.setState({
                selectedApi: apiDetail
            });
        }
    }

    handleStpSpecificationChange(variantId, type, value)
    {
        if(!this.stp_references) this.stp_references = {};
        if(!this.stp_references[variantId]) this.stp_references[variantId] = {}
        this.stp_references[variantId][type] = value;
    }

    render() {
        const classes = this.props.classes;
        const {products, markets, manufacturers, api_details} = this.state;
        const variants = this.state.selectedProduct && this.state.selectedProduct.variants || [];
        
        return (
            <Box width="100" px={5}>
                <Grid container spacing={4} className={classes.formContainer}>
                        <Grid item lg={6} md={12} container spacing={2}>
                            <Grid item lg={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-product-label">Product</InputLabel>
                                    <Select
                                        labelId="select-product-label"
                                        label="Product"
                                        value={this.state.selectedProduct && this.state.selectedProduct.ProductID || ""}
                                        onChange={this.handleProductChange}
                                    >
                                        {products.map((product, index) => (
                                            <MenuItem value={product.ProductID} key={`product_drop_${index}`}>
                                                {product.ProductName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-market-label">Market</InputLabel>
                                    <Select
                                        labelId="select-market-label"
                                        label="Market"
                                        value={this.state.selectedMarket ? this.state.selectedMarket.MarketID : ''}
                                        onChange={this.handleMarketChange}
                                    >
                                        {markets.map((market, index) => (
                                            <MenuItem key={`mar-${index}`} value={market.MarketID}>{market.Name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-manufacturer-label">Manufacturer</InputLabel>
                                    <Select
                                        labelId="select-manufacturer-label"
                                        label="Manufacturer"
                                        value={this.state.selectedManufacturer ? this.state.selectedManufacturer.ManufacturerID : ''}
                                        onChange={this.handleManufacturerChange}
                                    >
                                        {manufacturers.map((manufacturer, index) => (
                                            <MenuItem key={`manu-${index}`} value={manufacturer.ManufacturerID}>{manufacturer.Name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12} sm={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-api-label">API Details</InputLabel>
                                    <Select
                                        labelId="select-api-label"
                                        label="API Details"
                                        value={this.state.selectedApi ? this.state.selectedApi.ApiDetailID : ''}
                                        onChange={this.handleApiDetailChange}
                                    >
                                        {api_details.map((api, index) => (
                                            <MenuItem key={`api-${index}`} value={api.ApiDetailID}>{api.Name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12} sm={12}>
                                <TextField
                                    label="Reference"
                                    fullWidth
                                    value={this.state.reference}
                                    onChange={(e) => this.setState({
                                        reference: e.target.value
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <Grid item container lg={6} md={12} spacing={2}>
                            {variants.map(variant => {
                                const variantStpRef = this.stp_references && this.stp_references[variant.VariantID];
                                const stp = variantStpRef ? variantStpRef['stp'] : '';
                                const specification = variantStpRef ? variantStpRef['specification'] : '';
                                return (
                                    <React.Fragment>
                                        <h4>Strength: {variant.Variant}</h4>
                                        <TextField
                                            label="Specification No"
                                            fullWidth
                                            defaultValue={specification}
                                            onChange={(e) => {
                                                    this.handleStpSpecificationChange(variant.VariantID, "specification", e.target.value);
                                                }}
                                        />
                                        <TextField
                                            label="STP No"
                                            fullWidth
                                            defaultValue={stp}
                                            onChange={(e) => {
                                                this.handleStpSpecificationChange(variant.VariantID, "stp", e.target.value);
                                            }}
                                        />
                                    </React.Fragment>
                                )
                            })}
                        </Grid>
                    
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(Basic);
