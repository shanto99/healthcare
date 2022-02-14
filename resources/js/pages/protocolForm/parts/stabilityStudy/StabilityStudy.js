import React from "react";
import {
    Box,
    Button, FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    MenuItem,
    Select,
    withStyles
} from "@material-ui/core";
import ChipInput from 'material-ui-chip-input';
import { Delete as DeleteIcon } from "@material-ui/icons";

import TextWithIcon from "../../../../components/TextWithIcon";

import {getAllConditions} from "../../../../backend/condition";
import {getStudyTypes} from "../../../../backend/study_type";

import styles from "./styles";

class StabilityStudy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studyTypes: [],
            selectedStudy: null,
            selectedCondition: null,
            conditions: [],
            types: [],
            studyName: '',
            storageCondition: '',
            duration: 0,
            months: []
        }

        this.handleMonthAdd = this.handleMonthAdd.bind(this);
        this.handleMonthRemove = this.handleMonthRemove.bind(this);
        this.handleStudyChange = this.handleStudyChange.bind(this);
        this.handleConditionChange = this.handleConditionChange.bind(this);
        this.saveStudyType = this.saveStudyType.bind(this);
        this.getStudyTypeById = this.getStudyTypeById.bind(this);
        this.getConditionById = this.getConditionById.bind(this);
    }

    componentDidMount() {
        Promise.all([getStudyTypes(), getAllConditions()]).then(responses => {
            const resultObj = {conditions: [], types: []};
           ['types', 'conditions'].forEach((field, index) => {
               const response = responses[index];
               resultObj[field] = response[field];
           });

           this.setState(preState => {
               const newState = {...preState};
               Object.assign(newState, resultObj);
               return newState;
           });
        });
    }

    handleMonthAdd(monthNumber)
    {
        const months = [...this.state.months];
        months.push(monthNumber);
        this.setState({
            months: months
        });
    }

    handleMonthRemove(monthNumber, index)
    {
        let months = this.state.months.filter(month => month !== monthNumber);
        this.setState({
            months: months
        })
    }

    handleStudyChange(e)
    {
        const studyTypeId = e.target.value;
        let selectedStudy = this.state.types.find(type => {
            return type.StudyTypeID === studyTypeId;
        });

        selectedStudy = {...selectedStudy};

        selectedStudy.StudyMonths = JSON.parse(selectedStudy.StudyMonths);

        if(selectedStudy) {
            this.setState({
                selectedStudy: selectedStudy,
                months: selectedStudy.StudyMonths
            });
        }
    }

    handleConditionChange(e)
    {
       const conditionId = e.target.value;
       const selectedCondition = this.state.conditions.find(condition => {
           return condition.ConditionID === conditionId;
       });

       this.setState({
          selectedCondition: selectedCondition
       });
    }

    saveStudyType()
    {
        const {selectedStudy, selectedCondition, months} = this.state;
        const studyTypeId = selectedStudy.StudyTypeID;
        const studyName = selectedStudy.StudyName;
        const conditionId = selectedCondition.ConditionID;

        this.props.saveStudyType(studyTypeId, studyName, months, conditionId);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            studyTypes: props.studyTypes,
        }
    }

    getStudyTypeById(studyTypeId)
    {
        return this.state.types.find(type => type.StudyTypeID === studyTypeId);
    }

    getConditionById(conditionId)
    {
        return this.state.conditions.find(condition => conditionId === condition.ConditionID);
    }

    render() {
        let {conditions, types, selectedStudy, selectedCondition, studyTypes} = this.state;
        let studyTypeIds = studyTypes.map(studyType => studyType.studyTypeId);
        types = types.filter(type => !studyTypeIds.includes(type.StudyTypeID));
        const {classes} = this.props;
        return (
            <Box className={classes.studyTypeForm} px={5}>
                <Grid container spacing={3}>
                    <Grid item lg={6}>
                        <Box width="100" mb={3}>
                            <FormControl fullWidth>
                                <InputLabel id="select-product-label">Study type</InputLabel>
                                <Select
                                    labelId="study-type-label"
                                    label="Study type"
                                    value={selectedStudy && selectedStudy.StudyTypeID || ""}
                                    onChange={this.handleStudyChange}
                                >
                                    {types.map((type, index) => (
                                        <MenuItem key={`type-${index}`} value={type.StudyTypeID}>{type.StudyName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box width="100" mb={3}>
                            <FormControl fullWidth>
                                <InputLabel id="select-product-label">Storage condition</InputLabel>
                                <Select
                                    labelId="storage-condition-label"
                                    label="Storage condition"
                                    value={selectedCondition && selectedCondition.ConditionID || ""}
                                    onChange={this.handleConditionChange}
                                >
                                    {conditions.map((condition, index) => (
                                        <MenuItem key={`condition-${index}`} value={condition.ConditionID}>{condition.Condition}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mb={3}>
                            <ChipInput
                                value={this.state.months}
                                onAdd={(month) => this.handleMonthAdd(month)}
                                onDelete={(month, index) => this.handleMonthRemove(month, index)}
                            />
                        </Box>

                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.saveStudyType}
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item lg={6}>
                        <List>
                            {studyTypes.map((type, index) => {
                                const studyType = this.getStudyTypeById(type.studyTypeId);
                                const condition = this.getConditionById(type.conditionId);

                                if(!studyType || !condition) return null;

                                return (
                                    <ListItem key={`saved-study-${index}`}>
                                        <ListItemText
                                            primary={studyType.StudyName}
                                            secondary={<TextWithIcon items={[
                                                {text: condition.Condition},
                                                {text: `${Math.max(...type.months)} months`},
                                                {text: type.months.toString()}
                                            ]}/>}
                                        />
                                        <ListItemIcon style={{ cursor: 'pointer' }}>
                                            <DeleteIcon color="secondary" fontSize="medium" onClick={() => this.props.removeStudyType(type.studyTypeId)}/>
                                        </ListItemIcon>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(StabilityStudy);
