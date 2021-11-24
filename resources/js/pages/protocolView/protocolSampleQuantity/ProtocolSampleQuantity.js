import React from "react";
import {Table, TableHead, TableBody, TableRow, TableCell, withStyles} from "@material-ui/core";

import mainStyles from "../styles";

class ProtocolSampleQuantity extends React.Component {
    render() {
        const classes = this.props.classes;
        const protocol = this.props.protocol;
        const product = protocol.product;

        const tests = protocol.tests;

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
                        {tests.map((test, index) => (
                            <TableRow>
                                <TableCell className={classes.borderedCell}>
                                    {index+1}
                                </TableCell>
                                <TableCell className={classes.borderedCell}>
                                    {test.TestName}
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
                        ))}
                    </TableBody>
                </Table>
            </section>
        );
    }
}

export default withStyles(mainStyles)(ProtocolSampleQuantity);
