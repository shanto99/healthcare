import React from "react";

import {withStyles, Box} from "@material-ui/core";
import BasicView from "./basicView/BasicView";
import PackagingView from "./packagingView/PackagingView";
import PackagingProfile from "./packagingProfile/PackagingProfile";
import PackagingComponents from "./packagingComponents/PackagingComponents";
import StabilityStudy from "./stabilityStudy/StabilityStudy";
import ProtocolSampleQuantity from "./protocolSampleQuantity/ProtocolSampleQuantity";
import ContainerCount from "./containerCount/ContainerCount";
import styles from "./styles";

import Loader from "../../components/loader/Loader";

import {getProtocolDetail} from "../../backend/protocol";

class ProtocolView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            protocolId: props.match.params && props.match.params.id,
            protocol: {}
        }

    }

    componentDidMount() {
        const protocolId = this.state.protocolId;
        getProtocolDetail(protocolId).then(result => {
            this.setState(preState => {
               const newState = {...preState};
               newState.isLoading = false;
               newState.protocol = result.protocol;
               return newState;
            });
        }).catch(err => {
            console.log("Could not get protocol: ", err);
        });
    }

    getStrengthLabel = () => {
        const product = this.state.protocol.product;
        let strengthLabel = "";
        const variants = product.variants;
        variants.forEach(function(variant, index) {
            if(index === variants.length - 1) {
                strengthLabel += ' and '
            } else if(index !== 0) {
                strengthLabel += ', ';
            }
            strengthLabel += variant.Variant;
        });

        return strengthLabel;
    }

    formatPackagingData = (protocol) => {
        const packagings = {};
        const containers = protocol && protocol.containers || [];
        containers.forEach(container => {
            const variantId = container.VariantID;
            const count = container.Count;
            if(!packagings[variantId]) packagings[variantId] = {};
            packagings[variantId][count] = {
                primary: container.primary_container.ContainerID,
                secondary: container.secondary_container.ContainerID,
                tertiary: container.tertiary_container.ContainerID
            };
        });

        return packagings;
    }

    render() {
        const classes = this.props.classes;
        const {protocol, isLoading} = this.state;
        const containers = this.formatPackagingData(protocol);
        let studyTypes = protocol && protocol.study_types || [];
        studyTypes = studyTypes.map(studyType => {
            let newStudyType = {...studyType};
            newStudyType.Months = JSON.parse(studyType.Months);
            return newStudyType;
        });
        return (
            <React.Fragment>
                {isLoading
                ? <Loader/>
                : <Box className={classes.protocolPage}>
                        <div className={classes.protocolHeader}>
                            <div className="companyHeader">
                                <div className="companyLogo">
                                    <img alt="Company logo" src="https://seeklogo.com/images/A/aci-group-logo-BABDEC820D-seeklogo.com.png"/>
                                </div>
                                <div className="companyName">
                                    <b>{protocol.manufacturer && protocol.manufacturer.Name}</b>
                                </div>
                                <div className="documentName">
                                    <b>Stability Protocol</b>
                                </div>
                            </div>
                            <div className="productHeader">
                                <b>{ protocol.product && protocol.product.ProductName }</b>
                            </div>
                            <div className="strengthHeader">
                                <span><b>Strength: </b>{this.getStrengthLabel()}</span>
                            </div>
                        </div>
                        <BasicView
                            protocol={protocol}
                        />
                        <PackagingView
                            protocol={protocol}
                        />
                        <PackagingProfile
                            protocol={protocol}
                        />
                        <PackagingComponents
                            protocol={protocol}
                        />
                        <StabilityStudy
                            protocol={protocol}
                        />
                        <ProtocolSampleQuantity
                            protocol={protocol}
                        />
                        <ContainerCount
                            product={protocol.product}
                            studyTypes={studyTypes}
                            packaging={containers}
                            containerCounts={JSON.parse(protocol.ContainerCounts)}
                        />
                    </Box>}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProtocolView);



