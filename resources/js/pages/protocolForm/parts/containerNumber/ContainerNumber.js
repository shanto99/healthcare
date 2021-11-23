import React from "react";
import {
    Box, Chip,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    withStyles
} from "@material-ui/core";
import ChipInput from 'material-ui-chip-input';

import {getStudyTypes} from "../../../../backend/study_type";

import styles from "./styles";

class ContainerNumber extends React.Component {
    constructor(props) {
        super(props);
        this.containerNumber = props.containerNumber || {}
        this.months = [];
        props.studyTypes.forEach((studyType) => {
            const studyMonths = studyType.months;
            studyMonths.forEach(month => {
                month = Number(month);
                if(!this.months.includes(month)) {
                    this.months.push(month);
                }
            });
        });
        this.months = this.months.sort();
        this.state = {
            studies: [],
            selectedProduct: props.product,
            studyTypes: props.studyTypes,
            packaging: props.packaging,
            studyMonths: this.months,
            containerCounts: Object.keys(this.props.containerCounts).length > 0
                ? this.props.containerCounts : this.initiateContainerState()
        }

        // this.selectedProduct = {
        //     ProductID: 8,
        //     ProductName: "Azith",
        //     variants: [{
        //         ProductID: "8",
        //         Variant: "100mg",
        //         VariantID: 6
        //     }, {
        //         ProductID: "8",
        //         Variant: "200mg",
        //         VariantID: 7
        //     }]
        // };
        //
        // this.packaging = {
        //     6: {
        //         30: {primary: '3', secondary: '3', tertiary: '3'},
        //         50: {primary: '3', secondary: '3', tertiary: '3'}
        //     },
        //     7: {
        //         30: {primary: '3', secondary: '3', tertiary: '3'},
        //         50: {primary: '3', secondary: '3', tertiary: '3'}
        //     }
        // };
        //
        // this.studyMonths = [1, 2, 3, 6, 9, 12];
        //
        // this.state = {
        //     studies: [],
        //     selectedProduct: this.selectedProduct,
        //     studyTypes: [
        //         {
        //             conditionId: "1",
        //             months: ['1', '2', '3'],
        //             studyTypeId: 3
        //         },
        //         {
        //             conditionId: "2",
        //             months: ['3', '6', '9', '12'],
        //             studyTypeId: 4
        //         }
        //     ],
        //     packaging: this.packaging,
        //     studyMonths: this.studyMonths,
        //     containerCounts: this.initiateContainerState()
        // }


        this.getStudyNameForMonth = this.getStudyNameForMonth.bind(this);
        this.generateRowsForVariant = this.generateRowsForVariant.bind(this);
        this.initiateContainerState = this.initiateContainerState.bind(this);
        this.getContainerCountForAMonth = this.getContainerCountForAMonth.bind(this);
        this.changeContainerState = this.changeContainerState.bind(this);
        this.calculateContainerSum = this.calculateContainerSum.bind(this);
    }

    initiateContainerState()
    {
        const variants = this.props.product.variants || [];
        const packaging = this.props.packaging;
        const months = this.months;

        const containerState = {};

        variants.forEach(variant => {
            let variantId = variant.VariantID;
            containerState[variantId] = {};
            let variantCounts = packaging[variantId];
            Object.keys(variantCounts).forEach(variantCount => {
                containerState[variantId][variantCount] = {};
                months.forEach(month => {
                    containerState[variantId][variantCount][month] = []
                });

                containerState[variantId][variantCount]['additional'] = ''
            });
            containerState[variantId]['total'] = 0;
        });

        containerState['placebo'] = {
            'N/A': {},
            total: 0
        };

        months.forEach(month => {
            containerState['placebo']['N/A'][month] = ''
        });


        return containerState;
    }

    changeContainerState(variantId, count, month, value, type)
    {
        this.setState(preState => {
            const newState = {...preState};
            if(type === "change") {
                newState.containerCounts[variantId][count][month] = value;
            } else {
                let countState = newState.containerCounts[variantId][count][month];
                if(type === "add") {
                    countState.push(value);
                } else if(type === "delete") {
                    countState.splice(value, 1);
                }
            }
            newState.containerCounts[variantId]['total'] = this.calculateContainerSum(variantId);
            return newState;
        });
    }

    calculateContainerSum(variantId)
    {
        let total = 0;
        const variantCounts = this.state.containerCounts[variantId];
        Object.keys(variantCounts).forEach(count => {
            let months = variantCounts[count];
            Object.keys(months).forEach(month => {
                let countingMonths = months[month];
                if(Array.isArray(countingMonths)) {
                    total += countingMonths.reduce((a, b) => Number(a)+Number(b), 0);
                } else {
                    // if not array then it should be additional count. which is an integer
                    total += Number(countingMonths);
                }
            })
        });

        return total;
    }

    componentDidMount() {
        this.props.lastComponentCallback(this.sendDataToParent);
        getStudyTypes().then(res => {
            const studies = res.types;
            if(studies)
            {
                this.setState({
                    studies: studies
                });
            }
        });
    }


    getStudyTypeById(studyTypeId)
    {
        const studyType = this.state.studies.find(study => study.StudyTypeID === studyTypeId);
        if(studyType) {
            return studyType.StudyName;
        } else {
            return 'N/A';
        }
    }

    componentWillUnmount() {
        this.sendDataToParent();
    }

    sendDataToParent = (submit) => {
        this.props.sendDataToParent({
            containerCounts: this.state.containerCounts
        }, submit);
    }

    getStudyNameForMonth(month)
    {
        const studies = [];
        const studyTypes = this.state.studyTypes;
        studyTypes.forEach(studyType => {
            const months = studyType.months;
            if(months.includes(month.toString())) {
                studies.push(this.getStudyTypeById(studyType.studyTypeId).substring(0, 2));
            }
        });

        return studies.toString();
    }

    getContainerCountForAMonth(variantId, count, month) {
        const containerState = this.state.containerCounts;
        return containerState[variantId] && containerState[variantId][count]
            && containerState[variantId][count][month] || [];
    }

    generateRowsForVariant(variant)
    {
        const variantId = variant.VariantID;
        const packaging = this.state.packaging;
        const variantCounts = Object.keys(packaging[variantId]);
        const months = this.state.studyMonths;

        return variantCounts.map((variantCount, index) => {
            return (
                <TableRow key={`variant-count-row-${index}`}>
                    {index === 0
                    ? <TableCell rowSpan={variantCounts.length}>
                        {variant.Variant}
                      </TableCell>
                    : null}
                    <TableCell>
                        {variantCount}
                    </TableCell>
                    {months.map(month => (
                        <TableCell key={`variant-count-${month}`}>
                            <ChipInput
                                value={this.getContainerCountForAMonth(variantId, variantCount, month)}
                                onAdd={(value) => this.changeContainerState(variantId, variantCount, month, value, 'add')}
                                onDelete={(value, index) => this.changeContainerState(variantId, variantCount, month, index, 'delete')}
                                allowDuplicates = {true}
                            />
                        </TableCell>
                    ))}
                    <TableCell>
                        <TextField
                            value={this.getContainerCountForAMonth(variantId, variantCount, 'additional')}
                            onChange={(e) => this.changeContainerState(variantId, variantCount, 'additional', e.target.value, 'change')}
                        />
                    </TableCell>
                    {index === 0
                        ? <TableCell rowSpan={variantCounts.length}>
                            {this.state.containerCounts[variantId]['total']}
                        </TableCell>
                        : null}
                </TableRow>
            )
        })
    }

    render() {
        const classes = this.props.classes;
        const variants = this.state.selectedProduct.variants || [];
        const months = this.state.studyMonths;

        return (
            <Box width="100" px={3}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell rowSpan={2}>
                                    Strength
                                </TableCell>
                                <TableCell rowSpan={2}>
                                    Count
                                </TableCell>
                                {months.map(month => (
                                    <TableCell key={`study_month_${month}`}>
                                        {`${month}M`}
                                    </TableCell>
                                ))}
                                <TableCell rowSpan={2}>
                                    Additional Sample
                                </TableCell>
                                <TableCell rowSpan={2}>
                                    Total
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {months.map(month => (
                                    <TableCell>
                                        {this.getStudyNameForMonth(month)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variants.map(variant => {
                                return this.generateRowsForVariant(variant);
                            })}
                            <TableRow>
                                <TableCell>
                                    Placebo
                                </TableCell>
                                <TableCell>
                                    N/A
                                </TableCell>
                                {months.map((month,index) => (
                                    <TableCell key={`placebo-${index}`}>
                                        <TextField
                                            value={this.getContainerCountForAMonth('placebo', 'N/A', month)}
                                            onChange={(e) => this.changeContainerState('placebo', 'N/A', month, e.target.value, 'change')}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <TextField
                                        value={this.getContainerCountForAMonth('placebo', 'N/A', 'additional')}
                                        onChange={(e) => this.changeContainerState('placebo', 'N/A', 'additional', e.target.value, 'change')}
                                    />
                                </TableCell>
                                <TableCell>
                                    {this.state.containerCounts['placebo']['total']}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }
}

export default withStyles(styles)(ContainerNumber);
