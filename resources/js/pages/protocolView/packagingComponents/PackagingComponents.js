import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";

import mainStyles from "../styles";

class PackagingComponents extends React.Component {
    getPackagings = (containers) => {
        console.log("adfadsf: ", containers);
        const packagings = [];
        const ifExists = function(searchingPackId) {
            return packagings.find(packaging => packaging.PackagingID === searchingPackId);
        }
        containers.forEach((count, index) => {
           ['primary_container', 'secondary_container', 'tertiary_container'].forEach(function(type) {
              count[type].packagings.forEach(function(packaging) {
                  if(!ifExists(packaging.PackagingID)) {
                      packagings.push(packaging);
                  }
              });
           });
        });
        return packagings;
    }
    render() {
        const classes = this.props.classes;
        const allPackaging = this.getPackagings(this.props.protocol.containers);
        return (
            <section>
                <h3>Packaging component details: </h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.borderedCell}>
                                Packaging Material
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                Components
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allPackaging.map(packaging => (
                            <TableRow>
                                <TableCell className={classes.borderedCell}>
                                    {packaging.Name}
                                </TableCell>
                                <TableCell className={classes.borderedCell}>
                                    <div>
                                        {['Source', 'DMF', 'Resin', 'Colorant'].map(infoKey => {
                                            if(packaging[infoKey]) {
                                                return (
                                                    <p>
                                                        <span>
                                                            <b>
                                                                {infoKey}:
                                                            </b>
                                                        </span>
                                                        <span>
                                                            {packaging[infoKey]}
                                                        </span>
                                                    </p>
                                                )
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        );
    }
}

export default withStyles(mainStyles)(PackagingComponents);
