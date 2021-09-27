import React from "react";
import swal from "sweetalert";
import {
    Box,
    Grid,
    TextField,
    withStyles,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    List, ListItem, ListItemText, ListItemIcon
} from "@material-ui/core";
import {HomeWork as HomeWorkIcon, CalendarToday as CalendarIcon} from "@material-ui/icons";
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import {getManufacturers} from "../../backend/manufacturer";

import styles from "./styles";
import {getProducts} from "../../backend/product";

import {formatDate} from "../../Utility";
import {saveReceivedSample, getReceivedSamples} from "../../backend/receivedSample";
import {GiMedicines} from "react-icons/gi";
import TextWithIcon from "../../components/TextWithIcon";

class ReceivedSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            samples: [],
            receivingDate: new Date(),
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
        this.handleReceivingDateChange = this.handleReceivingDateChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getSavedReceivedSamples = this.getSavedReceivedSamples.bind(this);
    }

    componentDidMount() {
        getManufacturers().then(res => {
            const manufacturers = res.manufacturers || [];
            getProducts().then(res => {
                const products = res.products || [];
                this.setState({
                    manufacturers: manufacturers,
                    products: products
                }, this.getSavedReceivedSamples);
            });
        });
    }

    getSavedReceivedSamples()
    {
        getReceivedSamples().then(res => {
            const samples = res.samples || [];
            this.setState({
                samples: samples
            });
        })
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
    handleReceivingDateChange(date)
    {
        this.setState({
            receivingDate: date
        });
    }

    handleFormSubmit(e)
    {
        e.preventDefault();
        let {selectedManufacturer, selectedProduct, grn, batch, remark, ar, receivingDate} = this.state;
        receivingDate = formatDate(receivingDate);

        saveReceivedSample(receivingDate, selectedManufacturer, selectedProduct, grn, batch, ar, remark).then(res => {
            swal("Received", "Sample received successfully", "success");
            this.getSavedReceivedSamples();
        }).catch(err => {
            swal("Error", "Somthing went wrong" ,"error");
        })
    }

    getSecondaryText(sample)
    {
        let secondaryItems = [];
        secondaryItems.push({
            icon: <HomeWorkIcon fontSize="small"/>,
            text: sample.manufacturer.Name
        });
        secondaryItems.push({
            icon: <CalendarIcon fontSize="small"/>,
            text: sample.ReceivingDate
        });
        let secondaryText = '';
        ['AR', 'GRN', 'Batch'].forEach(function(field, index) {
            if(index > 0) secondaryText += ', '
            secondaryText += `${field}: ${sample[field]}`;
        });
        secondaryItems.push({
            icon: null,
            text: secondaryText
        });

        return secondaryItems;
    }

    render() {
        const classes = this.props.classes;
        const samples = this.state.samples;
        return (
            <Box width="100">
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <List>
                            {samples.map(sample => {
                                return (
                                    <ListItem key={sample.AR}>
                                        <ListItemIcon>
                                            <GiMedicines fontSize="30px"/>
                                        </ListItemIcon>
                                        <ListItemText primary={sample.product.ProductName} secondary={
                                            <TextWithIcon items={this.getSecondaryText(sample)}/>
                                        } />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                    <Grid container item lg={6} spacing={2}>
                        <ValidatorForm
                            ref="form"
                            className={classes.receivedSampleForm}
                            onSubmit={this.handleFormSubmit}
                            onError={errors => console.log(errors)}
                        >
                                <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Receiving date"
                                    format="yyyy-MM-dd"
                                    value={this.state.receivingDate}
                                    fullWidth
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={this.handleReceivingDateChange}
                                />
                                <Box mt={2}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="manufacturer-label">Manufacturer</InputLabel>
                                        <Select
                                            labelId="manufacturer-label"
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
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="product-label">Product</InputLabel>
                                        <Select
                                            labelId="product-label"
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
                                    onChange={(e) => this.setState({grn: e.target.value})}
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
                                    onChange={(e) => this.setState({batch: e.target.value})}
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
                                    onChange={(e) => this.setState({ar: e.target.value})}
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
                                    onChange={(e) => this.setState({remark: e.target.value})}
                                />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleFormSubmit}
                            >
                                Save
                            </Button>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(ReceivedSample);

