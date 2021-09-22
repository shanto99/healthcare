import React from "react";
import {
    withStyles,
    Box,
    Grid,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
    ListItemIcon
} from "@material-ui/core";
import swal from "sweetalert";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ChipInput from 'material-ui-chip-input'
import {GiMedicines} from "react-icons/gi";

import styles from "./styles";

import {saveProduct, getProducts} from "../../backend/product";

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: [],
            products: [],
            productName: ''
        }

        this.handleProductSubmit = this.handleProductSubmit.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.handleVariantAdd = this.handleVariantAdd.bind(this);
    }

    componentDidMount() {
        this.getAllProducts();
    }

    handleProductSubmit(e)
    {
        e.preventDefault();
        const {productName, variants} = this.state;
        if(variants.length < 1) {
            swal("Error", "Minimum one strength is needed", "error");
            return;
        }
        if(this.state.productName && this.state.productName !== "") {
            saveProduct(productName, variants).then(res => {
                swal("Success", "Product added successfully", "success");
                this.getAllProducts();
            }).catch(function (err) {
                swal("OPS", "Could not add product", "error");
            })
        } else {
            console.log("Product name required");
        }
    }

    getAllProducts()
    {
        getProducts().then(res => {
            this.setState({
                products: res.products || []
            });
        })
    }

    handleVariantAdd(variant)
    {
        this.setState((preState) => {
           let variants = [...preState.variants, variant];
           return {...preState, variants}
        });
    }

    handleVariantRemove(removedVariant) {
        this.setState((preState) => {
           let variants = preState.variants.filter(function(variant) {
              return variant !== removedVariant
           });

           return {...preState, variants};
        });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.rootContainer}>
                <Grid item lg={4} md={12}>
                    <div className={classes.productListContainer}>
                        <List>
                            {this.state.products.map(product => {
                                let variants = '';
                                product.variants.forEach(function(variant, index) {
                                    if(index > 0) {
                                        variants += `, ${variant.Variant}`;
                                    } else {
                                        variants += variant.Variant;
                                    }

                                });
                                return <ListItem key={product.ProductID}>
                                            <ListItemIcon>
                                                <GiMedicines fontSize="30px"/>
                                            </ListItemIcon>
                                            <ListItemText primary={product.ProductName}
                                            secondary={`Strengths: ${variants}`}/>
                                        </ListItem>
                                }
                            )}
                        </List>
                    </div>
                </Grid>
                <Grid item lg={8} md={12}>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleProductSubmit}
                        className={classes.productForm}
                        onError={errors => console.log(errors)}
                    >
                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            value={this.state.productName}
                            validators={['required']}
                            errorMessages={['Product name is required']}
                            fullWidth
                            label="Product name"
                            autoComplete="off"
                            autoFocus
                            onChange={(e) => this.setState({ productName: e.target.value })}
                        />

                        <ChipInput
                            value={this.state.variants}
                            variant="outlined"
                            fullWidth
                            onAdd={(variant) => this.handleVariantAdd(variant)}
                            onDelete={(variant) => this.handleVariantRemove(variant)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Save product
                        </Button>
                    </ValidatorForm>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Product);
