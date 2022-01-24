import React from "react";
import "./style.css";

import {getTests, getStudies, getObservations, 
    submitObservations, getSampleVariants, getBatches, observationReport} from "../../backend/observation";
import { Box, Button, FormControl, InputLabel, 
    MenuItem, Select, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, TextField } from "@material-ui/core";
import swal from "sweetalert";
import { KeyboardDatePicker } from '@material-ui/pickers';
import {AddOutlined} from "@material-ui/icons";
import { format } from "date-fns";

import BatchInput from "./batchInput/BatchInput";

class InputObservation extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            batchModal: false,
            variants: [],
            sampleId: props.match && props.match.params && props.match.params.sampleId,
            protocolTests: [],
            tests: [],
            batches: [],
            studies: [],
            selectedStudy: null,
            selectedBatch: null,
            observations: [],
        };
    }

    componentDidMount()
    {
        const sampleId = this.state.sampleId;
        Promise.all([getTests(sampleId), getStudies(sampleId), 
            getObservations(sampleId), getSampleVariants(sampleId),
            getBatches(sampleId)]).then(responses => {
            const tests = responses[0].tests || [];
            const studies = responses[1].studies || [];
            const observations = responses[2].observations || [];
            const variants = responses[3].variants || [];
            const batches = responses[4].batches || [];

            this.setState({
                variants: variants,
                tests: tests,
                studies: studies,
                observations: observations,
                selectedStudy: studies[0],
                batches: batches,
                selectedBatch: batches[0]
            });

        });

    }

    findObservation = (studyId, batchId, month, protocolTestId) => {
        studyId = studyId.toString();
        month = month.toString();
        protocolTestId = protocolTestId.toString();
        batchId = batchId.toString();

        let foundIndex = -1;

        const observations = this.state.observations;
        
        const foundObservation = observations.find(function(observation, index) {
            if(observation.ProtocolTestID == "10") console.log("Observation: ", observation);
            let found =  observation.ProtocolTestID.toString() === protocolTestId && observation.SampleBatchID.toString() === batchId
            && observation.Month.toString() === month && observation.StudyID.toString() === studyId
            if(found) foundIndex = index;
            return found;
        });

        return {test: foundObservation, index: foundIndex};
    }

    handleStudyTypeChange = (e) => {
        const studyId = e.target.value;
        const study = this.state.studies.find(study => study.StudyID == studyId);
        this.setState({
            selectedStudy: study
        });
    }

    getTestValue = (month, protocolTest, type="Value") => {
        const protocolTestId = protocolTest.ProtocolTestID;
        const studyId = this.state.selectedStudy && this.state.selectedStudy.StudyID || "";
        const batchId = this.state.selectedBatch && this.state.selectedBatch.SampleBatchID || "";
        const foundTest = this.findObservation(studyId, batchId, month, protocolTestId);
        if(protocolTest.IsDate) {
            let withdrawDate = foundTest && foundTest.test && foundTest.test[type] || null;
            if(withdrawDate) {
                withdrawDate = new Date(withdrawDate);
            }
            return withdrawDate;
        } else {
            return foundTest && foundTest.test && foundTest.test[type] || "";
        }
        
    }

    handleObservationInput = (month, protocolTest, value, valueType="Value") => {
        const protocolTestId = protocolTest.ProtocolTestID;
        const studyId = this.state.selectedStudy && this.state.selectedStudy.StudyID || "";
        const batchId = this.state.selectedBatch && this.state.selectedBatch.SampleBatchID || "";

        if(protocolTest.IsDate) {
            value = format(value, 'yyyy-MM-dd');
        }

         this.setState(preState => {
             const newState = {...preState};
             const observations = newState.observations;
             const foundObservation = this.findObservation(studyId, batchId, month, protocolTestId);
             if(foundObservation && foundObservation.index !== -1) {
                const observation = observations[foundObservation.index];
                observation[valueType] = value;
             } else {
                 let newObservation = {
                    AR: this.state.sampleId,
                    ProtocolTestID: protocolTestId,
                    StudyID: studyId,
                    SampleBatchID: this.state.selectedBatch.SampleBatchID,
                    Month: month,
                    Value: null,
                    Min: null,
                    Avg: null,
                    Max: null
                 }

                 newObservation[valueType] = value;
                
                observations.push(newObservation);
             }

             return newState;
         })
    }

    submitObservation = () => {
        const observations = this.state.observations;
        submitObservations(observations).then(res => {
            swal("Submitted!", "Observations submitted successfully", "success");
        }).catch(err => {
            swal("Error", "Could not submit observations", "error");
        });
    }

    openBatchModal = () => {
        this.setState(preState => {
            const newState = {...preState};
            newState.batchModal = true;
            return newState;
        })
    }

    closeBatchModal = (batch) => {
        this.setState(preState => {
            const newState = {...preState};
            if(batch) {
                let batches = newState.batches;
                batches.push(batch);

                newState.batches = batches;
            }
            newState.batchModal = false;
            return newState;
        });
    }

    handleBatchSelect = (e) => {
        const sampleBatchId = e.target.value;
        const selectedBatch = this.state.batches.find(batch => batch.SampleBatchID === sampleBatchId);
        this.setState({
            selectedBatch: selectedBatch
        });
    }

    generateObservationReport = () => {
        const studyId = this.state.selectedStudy && this.state.selectedStudy.StudyID || "";
        const batchId = this.state.selectedBatch && this.state.selectedBatch.SampleBatchID || "";
        const sampleId = this.state.sampleId;
        observationReport(sampleId, studyId, batchId).then(res => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
    }

    render() {
        const {tests, studies, variants, sampleId, batches} = this.state;

        const selectedStudy = this.state.selectedStudy;
        const months = selectedStudy && JSON.parse(selectedStudy.Months) || [];

        const selectedBatch = this.state.selectedBatch;

        return (
            <Box style={{ margin: '30px' }}>
                <div style={{display: 'flex'}}>
                    <FormControl variant="outlined" style={{ width: '300px', marginRight: '30px' }}>
                        <InputLabel
                            id="study-type-id"
                        >
                            Select study type
                        </InputLabel>
                        <Select
                            labelId="study-type-id"
                            label="Select study type"
                            value={selectedStudy ? selectedStudy.StudyID : ""}
                            onChange={this.handleStudyTypeChange}
                        >
                            <MenuItem value="">
                                Select study type
                            </MenuItem>
                            {studies.map(study => (
                                <MenuItem value={study.StudyID}>
                                    { study.study_type.StudyName }
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <section style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl variant="outlined" style={{ width: '300px' }}>
                            <InputLabel
                                id="study-type-id"
                            >
                                Select batch
                            </InputLabel>
                            <Select
                                labelId="study-type-id"
                                label="Select study type"
                                value={selectedBatch && selectedBatch.SampleBatchID || ""}
                                onChange={this.handleBatchSelect}
                            >
                                <MenuItem value="">
                                    Select study type
                                </MenuItem>
                                {batches.map(batch => (
                                    <MenuItem value={batch.SampleBatchID}>
                                        { batch.BatchNo }
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <span style={{cursor: 'pointer'}} onClick={this.openBatchModal} >
                            <AddOutlined fontSize="large" />
                        </span>
                    </section>

                    <button onClick={this.generateObservationReport}>Report</button>

                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Tests
                                </TableCell>
                                <TableCell>
                                    Specifications
                                </TableCell>
                                {months.map(month => (
                                    <TableCell>
                                        {month}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tests.map(test => {
                            return (<TableRow>
                                        <TableCell>
                                            {test.Name}
                                        </TableCell>
                                        <TableCell>
                                            {test.Specifications}
                                        </TableCell>
                                        {months.map(month => {
                                            return (
                                                <TableCell>
                                                    { test.IsDate
                                                    ? <KeyboardDatePicker
                                                        autoOk
                                                        variant="inline"
                                                        label="Withdraw date"
                                                        format="yyyy-MM-dd"
                                                        value={this.getTestValue(month, test)}
                                                        fullWidth
                                                        InputAdornmentProps={{ position: "start" }}
                                                        onChange={(date) => this.handleObservationInput(month, test, date)}
                                                    />
                                                    : !test.IsMinMax
                                                    ? <TextField 
                                                        label="Observation" 
                                                        value={this.getTestValue(month, test)} 
                                                        onChange={(e) => this.handleObservationInput(month, test, e.target.value)}
                                                        />
                                                    : <section>
                                                        <TextField
                                                            label="Min"
                                                            value={this.getTestValue(month, test, "Min")} 
                                                            onChange={(e) => this.handleObservationInput(month, test, e.target.value, "Min")}
                                                            />
                                                        <TextField
                                                            label="Avg"
                                                            value={this.getTestValue(month, test, "Avg")} 
                                                            onChange={(e) => this.handleObservationInput(month, test, e.target.value, "Avg")}
                                                            />
                                                        <TextField
                                                            label="Max"
                                                            value={this.getTestValue(month, test, "Max")} 
                                                            onChange={(e) => this.handleObservationInput(month, test, e.target.value, "Max")}
                                                            />
                                                        </section>
                                                    }
                                                    
                                                </TableCell>
                                            )
                                        })} 
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="observationFooter">
                    <Button 
                        variant="outlined"
                        onClick={this.submitObservation}
                    >
                        Submit
                    </Button>
                </div>
                {this.state.batchModal
                ? <BatchInput sampleId={sampleId} variants={variants} closeModal={this.closeBatchModal}/>
                : null}
                
            </Box>
        )
    }
}

export default InputObservation;