import React from "react";
import "./style.css";

import {getTests, getStudies} from "../../backend/observation";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";

class InputObservation extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            sampleId: props.match && props.match.params && props.match.params.sampleId,
            tests: [],
            studies: []
        };
    }

    componentDidMount()
    {
        const sampleId = this.state.sampleId;
        Promise.all([getTests(sampleId), getStudies(sampleId)]).then(responses => {
            const tests = responses[0].tests;
            const studies = responses[1].studies;
            const formattedStudies = [];
            const formattedTests = [];

            studies.forEach(study => {
                const studyObj = {};
                studyObj.StudyName = study.study_type.StudyName;
                studyObj.StudyID = study.StudyID;
                studyObj.Months = JSON.parse(study.Months);

                formattedStudies.push(studyObj);
            });

            tests.forEach(test => {
                const testObj = {};
                testObj.ProtocolTestID = test.ProtocolTestID;
                if(testObj.sub_test) {
                    testObj.Name = test.sub_test.Name;
                    testObj.IsMinMax = Number(test.sub_test.IsMinMax) === 0 ? false : true;
                } else {
                    testObj.Name = test.test.Name;
                    testObj.IsMinMax = Number(test.test.IsMinMax) === 0 ? false : true;
                }

                formattedTests.push(testObj);
            });

            this.setState({
                tests: formattedTests,
                studies: formattedStudies
            });

        });

    }

    render() {
        const {tests, studies} = this.state;

        const selectedStudy = studies[0];
        const months = selectedStudy && selectedStudy.Months || [];
        console.log(tests);
        return (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Tests
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
                                {months.map(month => (
                                    <TableCell>
                                        <TextField label="Observation" />
                                    </TableCell>
                                ))}
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default InputObservation;