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

    generatePrimaryPackagingTable = (variant) => {
        const classes = this.props.classes;
        const {packagings} = this.props.protocol
        const variantPackagings = packagings.filter(function(packaging) {
            let packagingVariantId = packaging.VariantID;
            packagingVariantId = packagingVariantId.toString();

            let variantId = variant.VariantID;
            variantId = variantId.toString();

            return packagingVariantId === variantId;
        });

        const packs = this.getRowObject(variant, variantPackagings);

        const rowArray = [];
        const counts = packs.counts;
        let variantSpan = packs.span;

        Object.keys(counts).forEach((count, countIndex) => {
            let countObj = counts[count];
            let countSpan = countObj.span;
            let types = countObj.types;
            Object.keys(types).forEach((type, typeIndex) => {
                let typeObj = types[type];
                let typeSpan = typeObj.span;
                let packs = typeObj.packs;
                packs.forEach((pack, packIndex) => {
                    rowArray.push(
                        <TableRow>
                            { countIndex === 0
                            ? <TableCell rowSpan={variantSpan} className={classes.borderedCell}>
                                    {variant.Variant}
                              </TableCell>
                            : null
                            }
                            { typeIndex === 0
                            ? <TableCell rowSpan={countSpan} className={classes.borderedCell}>
                                    {count}
                              </TableCell>
                            : null
                            }
                            { packIndex === 0
                            ? <TableCell rowSpan={typeSpan} className={classes.borderedCell}>
                                    {type}
                              </TableCell>
                            : null}
                            <TableCell className={classes.borderedCell}>
                                {pack.primary_packaging && pack.primary_packaging.Name}
                            </TableCell>
                        </TableRow>
                    )
                });
            })

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

