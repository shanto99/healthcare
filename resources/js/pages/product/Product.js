import React from "react";
import {withStyles, Box, Grid, TextField, Button, List, ListItem, ListItemText} from "@material-ui/core";
import styles from "./styles";

import {saveProduct, getProducts} from "../../backend/product";

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            productName: ''
        }

        this.handleProductSubmit = this.handleProductSubmit.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
    }

    componentDidMount() {
        this.getAllProducts();
    }

    handleProductSubmit(e)
    {
        e.preventDefault();
        let productName = this.state.productName;
        if(this.state.productName && this.state.productName !== "") {
            saveProduct(productName).then(res => {
                console.log(res);
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

    render() {
        const classes = this.props.classes;
        return (
            <Box width="100">
                <Grid container>
                    <Grid item lg={4} md={12}>
                        <div className={classes.productListContainer}>
                            <List>
                                {this.state.products.map(product => (
                                    <ListItem key={product.ProductID}>
                                        <ListItemText primary={product.ProductName} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Grid>
                    <Grid item lg={8} md={12}>
                        <form method="POST" onSubmit={this.handleProductSubmit} className={classes.productForm} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                value={this.state.productName}
                                required
                                fullWidth
                                label="Product name"
                                autoComplete="off"
                                autoFocus
                                onChange={(e) => this.setState({ productName: e.target.value })}
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
                        </form>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default withStyles(styles)(Product);
