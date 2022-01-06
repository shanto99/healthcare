import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";

import {generateReport} from "../../backend/report";
import {fnExcelReport} from "../../Utility";

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: [],
            batches: []
        }
    }
    componentDidMount()
    {
        generateReport().then(res => {
            const batches = res.batches;
            let headers = ['ProductName', 'BatchNo', 'MfgDate', 'Condition'];
            if(batches.length > 0) {
                const firstBatch = batches[0];
                let firstBatchHeaders = Object.keys(firstBatch);
                firstBatchHeaders.forEach(header => {
                    if(header.includes('Month')) {
                        headers.push(header);
                    }
                });
            }

            this.setState({
                headers: headers,
                batches: batches
            });
        });
    }

    exportReport = (tableId) => {
        fnExcelReport(tableId);
    }

    formatTableHeaderString = (header) => {
        if(header.includes('_')) {
            return header.split('_')[0]+' Months';
        }
        return header.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
    }

    render()
    {
        const {headers, batches} = this.state;
        return (
            <div>
                <div className="reportHeader" style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems:'center', padding: '0 20px'}}>
                    <h4 style={{fontSize: '20px'}}>Database: </h4>
                    <Button style={{height: '30px'}} variant="contained" color="secondary" onClick={() => this.exportReport('reportTable')}>Export</Button>
                </div>
                <TableContainer>
                    <Table id="reportTable">
                        <TableHead>
                            <TableRow>
                                {headers.map(header => (
                                    <TableCell>
                                        {this.formatTableHeaderString(header)}
                                    </TableCell>
                                ))}
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {batches.map(batch => {
                                return (
                                    <TableRow>
                                        {headers.map(header => (
                                            <TableCell>
                                                {batch[header]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default Report;