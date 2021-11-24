import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";
import mainStyles from "../styles";
class StabilityStudy extends React.Component {
    render() {
        const classes = this.props.classes;
        const studyTypes = this.props.protocol.study_types;
        return (
            <section>
                <h3>Stability Study:</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.borderedCell}>
                                Type of stability Study
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                Storage Condition
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                Duration
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                Testing Time Points(months)
                            </TableCell>
                            <TableCell className={classes.borderedCell}>
                                No,. of Time Points
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studyTypes.map(type => {
                            let months = JSON.parse(type.Months);
                            months = months.map(month => Number(month));
                            return (
                                <TableRow>
                                    <TableCell className={classes.borderedCell}>
                                        {type.study_type.StudyName}
                                    </TableCell>
                                    <TableCell className={classes.borderedCell}>
                                        {type.condition.Condition}
                                    </TableCell>
                                    <TableCell className={classes.borderedCell}>
                                        {Math.max(...months)} months
                                    </TableCell>
                                    <TableCell className={classes.borderedCell}>
                                        {months.toString()}
                                    </TableCell>
                                    <TableCell className={classes.borderedCell}>
                                        {months.length}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </section>
        );
    }
}

export default withStyles(mainStyles)(StabilityStudy);
