import React from "react";
import {Box, Step, StepLabel, Stepper, withStyles, Button} from "@material-ui/core";

import Basic from "./parts/basic/Basic";
import Packaging from "./parts/packaging/Packaging";
import StabilityStudy from "./parts/stabilityStudy/StabilityStudy";
import SampleQuantity from "./parts/sampleQuantity/SampleQuantity";
import ContainerNumber from "./parts/containerNumber/ContainerNumber";

import {createProtocol} from "../../backend/protocol";
import {getAllTests} from "../../backend/test";

import styles from "./styles";
import swal from "sweetalert";

class ProtocolForm extends React.Component {
    constructor(props) {
        super(props);
        this.stepLabels = ["Basic", "Packaging", "Stability study", "Samples quantity", "Container number"];
        this.lastComponentCallback = null;
        this.state = {
            product: null,
            currentStep: 0,
            reference: '',
            market: null,
            manufacturer: null,
            selectedApis: [],
            stp_references: null,
            containers: {},
            containerCounts: {},
            studyTypes: [],
            tests: [],
            allTests: []
        }

        this.getFormPart = this.getFormPart.bind(this);
        this.nextFormPart = this.nextFormPart.bind(this);
        this.previousFormPart = this.previousFormPart.bind(this);
        this.saveContainerInfo = this.saveContainerInfo.bind(this);
        this.saveStudyType = this.saveStudyType.bind(this);
        this.saveTestWithQuantity = this.saveTestWithQuantity.bind(this);
        this.getAndSaveFormPartData = this.getAndSaveFormPartData.bind(this);
        this.createProtocol = this.createProtocol.bind(this);
    }

    componentDidMount()
    {
        getAllTests().then(res => {
            const tests = res.tests;
            let formattedTests = [];
            let serialId = 1;

            tests.forEach(function(test) {
                if(test.sub_tests && test.sub_tests.length > 0) {
                    const subTests = test.sub_tests;
                    subTests.forEach(subTest => {
                        subTest.serialId = serialId;
                        formattedTests.push(subTest);
                        serialId++;
                        
                    });
                } else {
                    test.serialId = serialId;
                    formattedTests.push(test);
                    serialId++;
                }
            });

            this.setState({
                allTests: formattedTests
            });
        })
    }

    resetForm = () => {
        this.setState({
            product: null,
            currentStep: 0,
            reference: '',
            market: null,
            manufacturer: null,
            selectedApis: [],
            stp_references: null,
            containers: {},
            containerCounts: {},
            studyTypes: [],
            tests: []
        });
    }

    getFormPart(stepIndex)
    {
        switch (stepIndex) {
            case 0:
                return <Basic
                    product={this.state.product}
                    market={this.state.market}
                    manufacturer={this.state.manufacturer}
                    selectedApis={this.state.selectedApis}
                    reference={this.state.reference}
                    stp_references={this.state.stp_references}
                    sendDataToParent={this.getAndSaveFormPartData}
                />
            case 1:
                return <Packaging
                    product={this.state.product}
                    containers={this.state.containers}
                    sendDataToParent={this.getAndSaveFormPartData}
                />
            case 2:
                return <StabilityStudy studyTypes={this.state.studyTypes} saveStudyType={this.saveStudyType}/>
            case 3:
                return <SampleQuantity product={this.state.product} allTests={this.state.allTests}
                                       tests = {this.state.tests}
                                       saveTestWithQunatity={this.saveTestWithQuantity}/>
            case 4:
                return <ContainerNumber
                    product={this.state.product}
                    studyTypes={this.state.studyTypes}
                    packaging={this.state.containers}
                    containerCounts={this.state.containerCounts}
                    sendDataToParent={this.getAndSaveFormPartData}
                    lastComponentCallback={this.lastComponentData}
                />
            default:
                return "Unknown form part"
        }
    }

    getAndSaveFormPartData(partialData, submit)
    {
        console.log("Partial data: ", partialData);
        this.setState(preState => {
           const newState = {...preState};
           Object.assign(newState, partialData);
           return newState;
        }, () => {
            if(submit) {
                this.createProtocol();
            }
        });
    }

    nextFormPart()
    {
        let nextStep = ++this.state.currentStep;
        this.setState({
            currentStep: nextStep
        });
    }

    previousFormPart()
    {
        let previousStep = --this.state.currentStep;
        if(previousStep >= 0) {
            this.setState({
                currentStep: previousStep
            });
        }
    }

    saveContainerInfo(variant, count, primary, secondary, tertiary)
    {
        let containers = {...this.state.containers};
        if(!containers[variant]) {
            containers[variant] = {};
        }

        containers[variant][count] = {
            primary: primary,
            secondary: secondary,
            tertiary: tertiary
        }

        this.setState({
            containers: containers
        });
    }

    saveStudyType(studyTypeId, months, conditionId)
    {
        this.setState(preState => {
            const newState = {...preState};
            const studyTypes = newState.studyTypes;
            studyTypes.push({
                studyTypeId: studyTypeId,
                months: months,
                conditionId: conditionId
            });
            return newState;
        })
    }

    saveTestWithQuantity(test)
    {
        this.setState(preState => {
            const newState = {...preState};
            const tests = newState.tests;
            tests.push(test);
            return newState;
        })
    }

    createProtocol(e)
    {
        let {product, market, manufacturer, reference, containers, selectedApis, tests, studyTypes, containerCounts, stp_references} = this.state;
        let productId = product.ProductID;
        let marketId = market.MarketID;
        let manufacturerId = manufacturer.ManufacturerID;

        // console.log("Protocol submisstion: ", {productId, marketId, manufacturerId, apiDetailId, reference, stp_references, containers, studyTypes, tests, containerCounts});

        // return;

        createProtocol(productId, marketId, manufacturerId, selectedApis, reference, stp_references, containers, studyTypes, tests, containerCounts).then(res => {
            swal("Created", "Protocol created successfully!", "success");
            this.resetForm();
        }).catch(err => {
            swal("Error", "Could not create protocol!", "error");
        });

    }

    submitProtocol = () => {
        this.lastComponentCallback(true);
    }

    lastComponentData = (callback) => {
        this.lastComponentCallback = callback;
    }


    render() {
        const classes = this.props.classes;
        return (
            <React.Fragment>
                <Box p={3} width="100">
                    <Stepper activeStep={this.state.currentStep} alternativeLabel>
                        {this.stepLabels.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box mt={2} mb={2}>
                        {this.getFormPart(this.state.currentStep)}
                    </Box>
                    <Box className={classes.stepperBtnContainer}>
                        <Button onClick={this.previousFormPart}>Back</Button>
                        {this.state.currentStep === 4
                        ? <Button onClick={this.submitProtocol}>Create</Button>
                        : <Button onClick={this.nextFormPart}>Next</Button>}
                    </Box>
                </Box>
            </React.Fragment>
        );
    }

}

export default withStyles(styles)(ProtocolForm);
