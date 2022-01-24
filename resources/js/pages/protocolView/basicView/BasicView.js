import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";
import mainStyles from "../styles";
import styles from "./styles";

const combinedStyle = Object.assign(mainStyles, styles);

class BasicView extends React.Component {
    generateSpecificationTableBody = () => {
        const classes = this.props.classes;
        const protocol = this.props.protocol;
        const product = protocol.product;
        const specifications = protocol.stp_references;
        const apis = protocol.apis;

        const specCount = {};
        const stpCount = {};

        specifications.forEach(function(specification) {
            let specificationNo = specification.SpecificationNo;
            let stpNo = specification.StpNo;

           if(specCount[specificationNo]) {
               specCount[specificationNo] += 1;
           } else {
               specCount[specificationNo] = 1;
           }

            if(stpCount[stpNo]) {
                stpCount[stpNo] += 1;
            } else {
                stpCount[stpNo] = 1;
            }

        });
        let specNoTrack = [],
            stpNoTrack = [];

        const getVariantName = function(variantId) {
            let foundVariant = product.variants.find(function(variant) {
                return variant.VariantID === Number(variantId);
            });

            return foundVariant && foundVariant.Variant || 'N/A';
        }

        return specifications.map(function(specification) {
            let specificationNo = specification.SpecificationNo;
            let stpNo = specification.StpNo;
            return (
              <TableRow>
                  <TableCell className={classes.borderedCell}>
                      {getVariantName(specification.VariantID)}
                  </TableCell>
                  {specNoTrack.includes(specificationNo)
                  ? null
                  : (function() {
                      specNoTrack.push(specificationNo)
                      return (
                          <TableCell className={classes.borderedCell} rowSpan={specCount[specificationNo]}>
                              {specificationNo}
                          </TableCell>
                      )
                    })()}

                  {stpNoTrack.includes(stpNo)
                  ? null
                  : (function() {
                        stpNoTrack.push(stpNo)
                        return (
                            <TableCell className={classes.borderedCell} rowSpan={stpCount[stpNo]}>
                                {stpNo}
                            </TableCell>
                        )
                    })()}

              </TableRow>
            );
        });

    }
    render() {
        const classes = this.props.classes;
        const protocol = this.props.protocol;
        return (
            <div>
                <section>
                    <h3>Reference:</h3>
                    <p>
                        SOP of Stability Designing adn Handling of Stability Protocol ({ protocol.Reference })
                    </p>
                </section>
                <section>
                    <h3>Market:</h3>
                    <p>
                        The product is intended for {protocol.market && protocol.market.Name} Market
                    </p>
                </section>
                <section>
                    <h3>Manufacturing Site Address:</h3>
                    <div className={classes.pGroup}>
                        <p>
                            {protocol.manufacturer && protocol.manufacturer.Name}
                        </p>
                        <p>
                            {protocol.manufacturer && protocol.manufacturer.Address}
                        </p>
                    </div>
                </section>
                <section>
                    <h3>Specification and STP Reference:</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.borderedCell}>
                                    Strength
                                </TableCell>
                                <TableCell className={classes.borderedCell}>
                                    Specification No.
                                </TableCell>
                                <TableCell className={classes.borderedCell}>
                                    Standard Test Procedure No.
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.generateSpecificationTableBody()}
                        </TableBody>
                    </Table>
                </section>
                <section>
                    <h3>API Details:</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.borderedCell}>
                                    API
                                </TableCell>
                                <TableCell className={classes.borderedCell}>
                                    Source of API
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {apis.map(api => {
                                return (
                                    <TableRow>
                                        <TableCell className={classes.borderedCell} rowSpan={2}>
                                            {api.Name}
                                        </TableCell>
                                        <TableCell className={classes.borderedCell} rowSpan={2}>
                                            {api.Source}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </section>
            </div>
        )
    }
}

export default withStyles(combinedStyle)(BasicView);
