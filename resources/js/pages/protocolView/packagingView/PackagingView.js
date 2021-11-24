import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";

import mainStyles from "../styles";
import styles from "./styles";

const combinedStyles = Object.assign(mainStyles, styles);

class PackagingView extends React.Component {

    getRowObject(variant, packs) {
        const result = {
            variant: variant.Variant,
            span: packs.length,
            counts: {}
        };
        packs.forEach(function(pack) {
            let count = pack.Count;
           if(!result.counts[count]) {
               result.counts[count] = {
                   types: {},
                   span: 0
               };
           }
           const countObj = result.counts[count];
           const countTypes = countObj.types;

           const primary = pack.primary_packaging;
           if(!countTypes[primary.Type]) {
               countTypes[primary.Type] = {
                   packs: [],
                   span: 0
               };
           }
            countTypes[primary.Type].packs.push(pack);
            countTypes[primary.Type].span += 1;

           countObj.span += 1;
        });

        return result;
    }

    getTotalRowCount = (containers) => {
        let totalRow = 0;
        containers.forEach(function(container) {
            let primaryContainer = container.primary_container;
            totalRow += primaryContainer.packagings.length;
        });

        return totalRow;
    }

    generatePrimaryPackagingTable = (variant) => {
        const classes = this.props.classes;
        let containers = this.props.protocol.containers.filter(container => {
            let variantId = variant.VariantID.toString();
            return container.VariantID === variantId;
        });
        const rowArray = [];

        containers.forEach((count, cIndex) => {
            let isFirst = true;
            const primaryContainer = count.primary_container;
            primaryContainer.packagings.forEach((packaging, packagingIndex) => {
                const row =  (
                  <TableRow>
                      { isFirst
                      ? <TableCell
                              className={classes.borderedCell}
                              rowSpan={this.getTotalRowCount(containers)}
                          >
                              {variant.Variant}mg
                        </TableCell>
                      : null}
                      { packagingIndex === 0
                      ? <TableCell
                              className={classes.borderedCell}
                              rowSpan={primaryContainer.packagings.length}
                          >
                              {count.Count}
                        </TableCell>
                      : null}
                      { packagingIndex === 0
                      ? <TableCell
                              className={classes.borderedCell}
                              rowSpan={primaryContainer.packagings.length}
                          >
                          {primaryContainer.Type}
                      </TableCell>
                      : null}
                      <TableCell
                          className={classes.borderedCell}
                      >
                          {packaging.Name}
                      </TableCell>
                  </TableRow>);
                    isFirst = false;
                rowArray.push(row);
            });
        });

        return (
            <Table style={{margin: '20px 0'}}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.borderedCell}>
                            Strength
                        </TableCell>
                        <TableCell className={classes.borderedCell}>
                            No. of units per pack
                        </TableCell>
                        <TableCell className={classes.borderedCell}>
                            Type of Packing
                        </TableCell>
                        <TableCell className={classes.borderedCell}>
                            Container/Closure system
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowArray}
                </TableBody>
            </Table>
        );
    }
    render() {

        const product = this.props.protocol && this.props.protocol.product;
        const variants = product && product.variants || [];
        return (
            <div>
                <section>
                    <h3>Primary Packaging Materials Details:</h3>
                    {variants.map(variant => {
                        return this.generatePrimaryPackagingTable(variant);
                    })}
                </section>
            </div>
        )
    }
}

export default withStyles(combinedStyles)(PackagingView);

