import React from "react";
import {Box, Button, IconButton, TextField, withStyles} from "@material-ui/core";

import {Delete as DeleteIcon} from "@material-ui/icons";

import styles from "./styles";

class SampleQuantity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedProduct: props.product,
            tests: props.tests || [],
            testName: '',
            counts: {}
        }


        this.handleVariantQuantityChange = this.handleVariantQuantityChange.bind(this);
        this.addTest = this.addTest.bind(this);
    }

    handleVariantQuantityChange(variantId, quantity)
    {
        this.setState(preState => {
           const newState = {...preState};
           const counts = newState.counts;
           counts[variantId] = Number(quantity);
           return newState;
        });
    }

    addTest()
    {
        const test = {
            name: this.state.testName,
            counts: this.state.counts
        }

        this.props.saveTestWithQunatity(test);
    }

    static getDerivedStateFromProps(props, state) {
        const tests = props.tests;
        return {...state, tests};
    }

    render() {
        const classes = this.props.classes;
        const variants = this.state.selectedProduct.variants || [];
        const tests = this.state.tests || [];
        return (
            <Box width="100" px={5}>
                <div className={classes.sample_quantity_headings}>
                    <div className={classes.sample_quantity_heading}>
                        Test Name
                    </div>
                    {variants.map((variant, index) => (
                        <div key={`samp-quan-variant-${index}`} className={classes.sample_quantity_heading}>
                            {variant.Variant}
                        </div>
                    ))}
                    <div className={classes.sample_quantity_heading}>
                        Action
                    </div>
                </div>
                <section className="saved_tests">
                    {tests.map((test, index) => {
                        const counts = test.counts;
                        return (
                            <div className={classes.sample_quantity_headings}  style={{ height: '50px' }} key={`saved_test_${index}`}>
                                <div className={classes.sample_quantity_heading}>
                                    {test.name}
                                </div>
                                {variants.map((variant, index) => (
                                    <div key={`samp-saved-variant-${index}`} className={classes.sample_quantity_heading}>
                                        {counts[variant.VariantID]}
                                    </div>
                                ))}
                                <div className={classes.sample_quantity_heading}>
                                    <IconButton>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        )
                    })}
                </section>
                <div className={classes.sample_quantity_headings}>
                    <div className={classes.sample_quantity_heading}>
                        <TextField
                            label="Test name"
                            id="test_name"
                            onChange={e => this.setState({
                                testName: e.target.value
                            })}
                        />
                    </div>
                    {variants.map((variant, index) => (
                        <div key={`samp-quan-variant-${index}`} className={classes.sample_quantity_heading}>
                            <TextField
                                label="Quantity"
                                onChange={(e) => {
                                        this.handleVariantQuantityChange(variant.VariantID, e.target.value);
                                    }
                                }
                            />
                        </div>
                    ))}
                    <div className={classes.sample_quantity_heading}>
                        <Button
                            variant="outlined"
                            onClick={this.addTest}
                        >Add</Button>
                    </div>
                </div>
            </Box>
        );
    }
}

export default withStyles(styles)(SampleQuantity);
