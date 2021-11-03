import React from "react";
import {Box, Step, StepLabel, Stepper, withStyles, Button} from "@material-ui/core";

import Basic from "./parts/basic/Basic";
import Packaging from "./parts/packaging/Packaging";
import StabilityStudy from "./parts/stabilityStudy/StabilityStudy";
import SampleQuantity from "./parts/sampleQuantity/SampleQuantity";
import ContainerNumber from "./parts/containerNumber/ContainerNumber";

import {createProtocol} from "../../backend/protocol";

import styles from "./styles";
import swal from "sweetalert";

class ProtocolForm extends React.Component {
    constructor(props) {
        super(props);
        this.stepLabels = ["Basic", "Packaging", "Stability study", "Samples quantity", "Container number"]
        this.state = {
            product: null,
            currentStep: 0,
            reference: '',
            market: null,
            manufacturer: null,
            api: null,
            stp_references: null,
            packaging: {},
            containerCounts: {},
            studyTypes: [],
            tests: []
        }

        this.getFormPart = this.getFormPart.bind(this);
        this.nextFormPart = this.nextFormPart.bind(this);
        this.previousFormPart = this.previousFormPart.bind(this);
        this.savePackagingInfo = this.savePackagingInfo.bind(this);
        this.saveStudyType = this.saveStudyType.bind(this);
        this.saveTestWithQuantity = this.saveTestWithQuantity.bind(this);
        this.getAndSaveFormPartData = this.getAndSaveFormPartData.bind(this);
        this.createProtocol = this.createProtocol.bind(this);
    }

    getFormPart(stepIndex)
    {
        switch (stepIndex) {
            case 0:
                // return <ContainerNumber
                //     product={this.state.product}
                //     studyTypes={this.state.studyTypes}
                //     packaging={this.state.packaging}
                //     containerNumber={this.state.containerNumber}
                //     sendDataToParent={this.getAndSaveFormPartData}
                // />
                return <Basic
                    product={this.state.product}
                    market={this.state.market}
                    manufacturer={this.state.manufacturer}
                    api={this.state.api}
                    reference={this.state.reference}
                    stp_references={this.state.stp_references}
                    sendDataToParent={this.getAndSaveFormPartData}
                />
            case 1:
                return <Packaging
                    product={this.state.product}
                    packaging={this.state.packaging}
                    sendDataToParent={this.getAndSaveFormPartData}
                />
            case 2:
                return <StabilityStudy studyTypes={this.state.studyTypes} saveStudyType={this.saveStudyType}/>
            case 3:
                return <SampleQuantity product={this.state.product} tests = {this.state.tests}
                                       saveTestWithQunatity={this.saveTestWithQuantity}/>
            case 4:
                return <ContainerNumber
                    product={this.state.product}
                    studyTypes={this.state.studyTypes}
                    packaging={this.state.packaging}
                    containerCounts={this.state.containerCounts}
                    sendDataToParent={this.getAndSaveFormPartData}
                />
            default:
                return "Unknown form part"
        }
    }

    getAndSaveFormPartData(partialData)
    {
        this.setState(preState => {
           const newState = {...preState};
           Object.assign(newState, partialData);
           return newState;
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

    savePackagingInfo(variant, count, primary, secondary, tertiary)
    {
        let packaging = {...this.state.packaging};
        if(!packaging[variant]) {
            packaging[variant] = {};
        }

        packaging[variant][count] = {
            primary: primary,
            secondary: secondary,
            tertiary: tertiary
        }

        this.setState({
            packaging: packaging
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
        e.preventDefault();
        let {product, market, manufacturer, reference, packaging, api, tests, studyTypes, containerCounts, stp_references} = this.state;
        let productId = product.ProductID;
        let marketId = market.MarketID;
        let manufacturerId = manufacturer.ManufacturerID;
        let apiDetailId = api.ApiDetailID;

        createProtocol(productId, marketId, manufacturerId, apiDetailId, reference, stp_references, packaging, studyTypes, tests, containerCounts).then(res => {
            swal("Created", "Protocol created successfully!", "success");
        }).catch(err => {
            swal("Error", "Could not create protocol!", "error");
        })

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
                        ? <Button onClick={this.createProtocol}>Create</Button>
                        : <Button onClick={this.nextFormPart}>Next</Button>}
                    </Box>
                </Box>
            </React.Fragment>
        );
    }

}

export default withStyles(styles)(ProtocolForm);
