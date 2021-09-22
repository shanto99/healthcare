import React from "react";
import {Box, Grid, TextField, withStyles, Select, MenuItem, InputLabel, FormControl, Button} from "@material-ui/core";
import { KeyboardDatePicker } from '@material-ui/pickers';

import {getManufacturers} from "../../backend/manufacturer";

import styles from "./styles";
import {getProducts} from "../../backend/product";

class ReceivedSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            products: [],
            selectedManufacturer: '',
            selectedProduct: '',
            grn: '',
            batch: '',
            ar: '',
            remark: ''
        }

        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
    }

    componentDidMount() {
        getManufacturers().then(res => {
            const manufacturers = res.manufacturers || [];
            getProducts().then(res => {
                const products = res.products || [];
                this.setState({
                    manufacturers: manufacturers,
                    products: products
                });
            });
        });
    }

    handleManufacturerChange(e)
    {
        let manufacturer = e.target.value;
        this.setState({
            selectedManufacturer: manufacturer
        });
    }

    handleProductChange(e)
    {
        let product = e.target.value;
        console.log(product);
        this.setState({
            selectedProduct: product
        });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Box width="100">
                <Grid container spacing={2}>
                    <Grid item lg={6}>

                    </Grid>
                    <Grid container item lg={6} spacing={2}>
                        <form className={classes.receivedSampleForm}>
                                <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Receiving date"
                                    format="yyyy-MM-dd"
                                    value={new Date()}
                                    fullWidth
                                    InputAdornmentProps={{ position: "start" }}
                                />
                                <Box mt={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="manufacturer-label">Manufacturer</InputLabel>
                                        <Select
                                            labelId="manufacturer-label"
                                            variant="outlined"
                                            label="Manufacturer"
                                            value={this.state.selectedManufacturer}
                                            onChange={this.handleManufacturerChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.state.manufacturers.map((manufacturer, index) => (
                                                <MenuItem key={index} value={manufacturer.ManufacturerID}>{manufacturer.Name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box mt={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="product-label">Product</InputLabel>
                                        <Select
                                            labelId="product-label"
                                            variant="outlined"
                                            label="Product"
                                            value={this.state.selectedProduct}
                                            onChange={this.handleProductChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.state.products.map((product, index) => (
                                                <MenuItem key={index} value={product.ProductID}>{product.ProductName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.grn}
                                    required
                                    fullWidth
                                    label="GRN Number"
                                    autoComplete="off"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.batch}
                                    required
                                    fullWidth
                                    label="Batch Number"
                                    autoComplete="off"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.ar}
                                    required
                                    fullWidth
                                    label="AR Number"
                                    autoComplete="off"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    value={this.state.remark}
                                    required
                                    fullWidth
                                    label="Remark"
                                    autoComplete="off"
                                    autoFocus
                                />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Save
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(ReceivedSample);

