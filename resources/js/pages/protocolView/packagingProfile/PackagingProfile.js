import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";

import mainStyles from "../styles";
import styles from "./styles";

const combinedStyles = Object.assign(mainStyles, styles);

class PackagingProfile extends React.Component {

    createPackagingProfileTable = (variant) =>
    {
        const variantId = variant.VariantID.toString();
        const classes = this.props.classes;
        const containers = this.props.protocol.containers.filter(container => container.VariantID === variantId);
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.borderedCell}>
                            Pack Details
                        </TableCell>
                        <TableCell className={classes.borderedCell}>
                            Pack 1 (Primary Packaging)
                        </TableCell>
                        <TableCell className={classes.borderedCell}>
                            Pack 2 (Secondary Packaging)
                        </TableCell>
                        <TableCell className={classes.borderedCell}>
                            Pack 3 (Tertiary Packaging)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {containers.map(count => (
                        <TableRow>
                            <TableCell className={classes.borderedCell}>
                                {count.Count}
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                { count.primary_container
                                ? <div>
                                        {count.primary_container.packagings.map(packaging => (
                                            <p>{packaging.Name}</p>
                                        ))}
                                  </div>
                                : 'N/A'}
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                { count.secondary_container
                                    ? <div>
                                        {count.secondary_container.packagings.map(packaging => (
                                            <p>{packaging.Name}</p>
                                        ))}
                                      </div>
                                    : 'N/A'}
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                { count.tertiary_container
                                    ? <div>
                                        {count.secondary_container.packagings.map(packaging => (
                                            <p>{packaging.Name}</p>
                                        ))}
                                      </div>
                                    : 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    render() {
        const variants = this.props.protocol &&
            this.props.protocol.product && this.props.protocol.product.variants || [];
        return (
            <section>
                <h3>Packaging Profile:</h3>
                {variants.map(variant => (
                    <React.Fragment>
                        <h4>For {variant.Variant} mg:</h4>
                        {this.createPackagingProfileTable(variant)}
                    </React.Fragment>
                ))}
            </section>
        );
    }
}

export default withStyles(combinedStyles)(PackagingProfile);
