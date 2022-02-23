import React from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, withStyles} from "@material-ui/core";

import mainStyles from "../styles";

class ProtocolSampleQuantity extends React.Component {

    getTestName = (test) => {
        if(test.sub_test) {
            return test.sub_test.Name;
        } else {
            return test.test.Name;
        }
    }

    render() {
        const classes = this.props.classes;
        const protocol = this.props.protocol;
        const product = protocol.product;

        const tests = protocol.tests;

        console.log("Tests: ", tests);

        return (
            <section>
                <h3>Quantity ofSamples Required for Physical and Chemical test in QC</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.borderedCell}>
                                Test No.
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                Test Parameters
                            </TableCell>
                            <TableCell
                                className={classes.borderedCell}
                                colSpan={product.variants.length}
                            >
                                No. of Unit per Test
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                className={classes.borderedCell}
                                colSpan={2}>
                                Strengths
                            </TableCell>
                            {product.variants.map(variant => (
                                <TableCell
                                    className={classes.borderedCell}
                                >
                                    {variant.Variant}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tests.map((test, index) => {
                            if(test.test && test.test.IsCommon && test.test.IsCommon === "1") return null;
                            return (
                                <TableRow>
                                <TableCell className={classes.borderedCell}>
                                    {index+1}
                                </TableCell>
                                <TableCell className={classes.borderedCell}>
                                    {this.getTestName(test)}
                                </TableCell>
                                {product.variants.map(variant => {
                                    let variantId = variant.VariantID.toString();
                                    let variantCount = test.counts.find(count => count.VariantID === variantId);
                                    return (
                                        <TableCell className={classes.borderedCell}>
                                            {variantCount && variantCount.Count || "N/A"}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </section>
        );
    }
}

export default withStyles(mainStyles)(ProtocolSampleQuantity);
