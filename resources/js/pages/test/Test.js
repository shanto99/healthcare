import React from "react";
import {
    Grid,
    Box,
    withStyles,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Button,
    Checkbox,
    FormControlLabel,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import { AddBox as AddBoxIcon} from "@material-ui/icons";

import {createTest, getParentTests, getAllTests} from "../../backend/test";

import styles from "./styles";
import swal from "sweetalert";


class Test extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            testName: '',
            specifications: '',
            childTestName: '',
            childSpecifications :'',
            isMinMax: false,
            parentTest: "",
            isParent: false,
            hasParent: false,
            parentTests: [],
            tests: [],
            expression: "",
            defaultValue: ""
        }
    }

    componentDidMount()
    {
        Promise.all([getAllTests(), getParentTests()]).then(responses => {
            const tests = responses[0] && responses[0].tests;
            const parentTests = responses[1] && responses[1].parent_tests;

            this.setState(preState => {
                const newState = {...preState};
                newState.tests = tests;
                newState.parentTests = parentTests;
                return newState;
            });

            return newState;
        });
    }

    changeValueType = (event) => {
        const isChecked = event.target.checked;
        this.setState(preState => {
           const newState = {...preState};
           newState.isMinMax = isChecked;
           return newState;
        });
    }

    handleParentSelect = (e) => {
        let selectedParent = e.target.value;
        this.setState({
            parentTest: selectedParent
        });
    }

    toggleFormOfChildTest = () => {
        this.setState(preState => {
            const newState = {...preState};
            newState.isParent = !preState.isParent;
            if(!newState.isParent) {
                newState.childTestName = '';
                newState.childSpecifications = '';
            } else {
                newState.parentTest = "";
                newState.specifications = '';
            }
            return newState;
        });
    }

    handleInputChange = (field, value) => {
        this.setState(preState => {
            const newState = {...preState};
            newState[field] = value;
            return newState;
        })
    }

    saveTest = () => {
        const {testName, specifications, childTestName, expression, defaultValue,
            childSpecifications, isMinMax, isParent, parentTest} = this.state;

        if(testName === "" || (!isParent && specifications === "")) {
            swal("Error", "Test name or specifications is missing", "error");
            return;
        }

        if(isParent && (childTestName === "" || childSpecifications === "")) {
            swal("Error", "Child test name or specifications is missing", "error");
            return;
        }

        createTest(testName, expression, defaultValue, specifications, childTestName, 
            childSpecifications, isMinMax, parentTest).then(res => {
            if(res.status === 200) {
                swal("Created!", "New test created", "success");
            }
        }).catch(err => {
            swal("Opps!", "Could not create test", "error");
        });
    }

    render() {
        const classes = this.props.classes;
        const {isMinMax, parentTests, parentTest, tests, isParent} = this.state;

        return (
            <Grid container spacing={4}>
                <Grid item lg={6} md={6}>
                    <List>
                        {tests.map(test => {
                            const subTests = test.sub_tests;
                            return (
                                <React.Fragment>
                                    <ListItem>
                                        <ListItemText primary={test.Name} />
                                    </ListItem>
                                    { subTests.length > 0
                                    ? <List component="div" style={{ paddingLeft: '20px' }}>
                                        {subTests.map(subTest => (
                                            <ListItem>
                                                <ListItemText primary={subTest.Name} />
                                            </ListItem>
                                        ))}
                                        </List>
                                    : null}
                                </React.Fragment>
                            )
                        })}
                    </List>
                </Grid>
                <Grid item lg={6} md={6}>
                    <Box className={classes.formContainer}>
                        <FormControl variant="outlined" fullWidth style={{marginBottom: '10px'}}>
                            <InputLabel id="packaging-label">Parent</InputLabel>
                            <Select
                                labelId="parent-test-label"
                                label="Parent"
                                value={parentTest}
                                disabled={isParent}
                                onChange={this.handleParentSelect}
                            >
                                <MenuItem value="">
                                    <em>Select Parent test</em>
                                </MenuItem>
                                {parentTests.map(parentTest => {
                                    return (
                                        <MenuItem value={parentTest.TestID}>
                                            {parentTest.Name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <div style={{display: 'flex', alignItems: 'center', margin: '10px 0px'}}>
                            <TextField
                                label="Test name"
                                variant="outlined"
                                style={{ flex: '5' }}
                                onChange={(e) =>
                                    this.handleInputChange('testName', e.target.value)}
                            />
                            <span
                                style={{ flex: '1' }}
                                onClick={this.toggleFormOfChildTest}
                            >
                                <AddBoxIcon/>
                            </span>
                        </div>
                        { !this.state.isParent ?
                          <TextField
                            fullWidth
                            label="Specifications"
                            variant="outlined"
                            rows={4}
                            multiline
                            style={{ marginBottom: '10px' }}
                            onChange={(e) =>
                                this.handleInputChange('specifications', e.target.value)}
                            />
                        : null}

                        <br/>
                        { this.state.isParent
                        ? <div className={classes.childTestForm}>
                                <TextField
                                    fullWidth
                                    label="Test name"
                                    variant="outlined"
                                    style={{marginBottom: '10px'}}
                                    onChange={(e) =>
                                        this.handleInputChange('childTestName', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Specifications"
                                    variant="outlined"
                                    rows={4}
                                    multiline
                                    onChange={(e) =>
                                        this.handleInputChange('childSpecifications', e.target.value)}
                                />
                            </div>
                        : null}

                        <TextField 
                            variant="outlined"
                            label="Expression"
                            placeholder="EX: ${}"
                            style={{ marginBottom: '10px' }}
                            onChange={(e) => this.setState({
                                expression: e.target.value
                            })}

                        />

                        <TextField
                            variant="outlined"
                            label="Default"
                            style={{ marginBottom: '10px' }}
                            onChange={(e) => this.setState({
                                defaultValue: e.target.value
                            })}
                        />
                        <br/>

                        <FormControlLabel
                            control={
                                <Checkbox checked={isMinMax} onChange={this.changeValueType} />
                            }
                            label="Is min max avg"
                        />

                        <br/>

                        <Button
                            variant="outlined"
                            style={{marginTop: '20px'}}
                            color="primary"
                            onClick={this.saveTest}
                        >
                            Save
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        );
    }

}

export default withStyles(styles)(Test);
