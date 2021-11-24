import React from "react";

import {withStyles, Box} from "@material-ui/core";
import BasicView from "./basicView/BasicView";
import PackagingView from "./packagingView/PackagingView";
import PackagingProfile from "./packagingProfile/PackagingProfile";
import PackagingComponents from "./packagingComponents/PackagingComponents";
import StabilityStudy from "./stabilityStudy/StabilityStudy";
import ProtocolSampleQuantity from "./protocolSampleQuantity/ProtocolSampleQuantity";
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

    render() {
        const classes = this.props.classes;
        const {protocol, isLoading} = this.state;
        console.log(protocol);
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
                    </Box>}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProtocolView);



