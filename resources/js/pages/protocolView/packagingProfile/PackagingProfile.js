import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";

import styles from "./styles";

class PackagingProfile extends React.Component {
    componentDidMount() {
        console.log(this.props.protocol);
    }

    createPackagingProfileTable = () =>
    {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Pack Details
                        </TableCell>
                        <TableCell>
                            Pack 1 (Primary Packaging)
                        </TableCell>
                        <TableCell>
                            Pack 2 (Secondary Packaging)
                        </TableCell>
                        <TableCell>
                            Pack 3 (Tertiary Packaging)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

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
                        <h4>{variant.Variant}</h4>
                        {this.createPackagingProfileTable()}
                    </React.Fragment>
                ))}
            </section>
        );
    }
}

export default withStyles(styles)(PackagingProfile);
