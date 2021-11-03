import React from "react";
import {Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, TextField} from "@material-ui/core";
import {Edit as EditIcon} from "@material-ui/icons";

import ChipInput from 'material-ui-chip-input';

import {createStudyType, getStudyTypes} from "../../backend/study_type";

class StabilityStudyType extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            types: [],
            studyName: '',
            months: []
        }

        this.handleMonthDelete = this.handleMonthDelete.bind(this);
        this.handleMonthAdd = this.handleMonthAdd.bind(this);
        this.saveStudyType = this.saveStudyType.bind(this);
        this.getAllStudyTypes = this.getAllStudyTypes.bind(this);
    }
    componentDidMount() {
        this.getAllStudyTypes();
    }

    getAllStudyTypes()
    {
        getStudyTypes().then(res => {
            const types = res.types;
            this.setState({
                types: types
            });
        }).catch(err => {
            swal("Error","Could not fetch study types", "error");
        })
    }

    handleMonthAdd(month)
    {
        this.setState(preState => {
            const newState = {...preState};
            newState.months.push(month);
            return newState;
        });
    }

    handleMonthDelete(month, index)
    {

    }

    saveStudyType()
    {
        const {studyName, months} = this.state;
        createStudyType(studyName, months).then(res => {
            swal("Success", "New study type added successfully", "success");
            this.getAllStudyTypes();
        });
    }

    render() {
        const types = this.state.types;
        return (
            <Box width="100">
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12}>
                        <List>
                            {types.map((type, index) => {
                                const months = JSON.parse(type.StudyMonths);
                                return (
                                    <ListItem key={`study_type_${index}`}>
                                        <ListItemIcon>
                                            <EditIcon/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={type.StudyName}
                                            secondary={`Months: ${months.toString()}`}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                    <Grid item lg={6} md={12}>
                        <Box>
                            <Box my={3}>
                                <TextField
                                    label="Study name"
                                    onChange={(e) => this.setState({
                                        studyName: e.target.value
                                    })}
                                />
                            </Box>
                            <Box my={3}>
                                <ChipInput
                                    value={this.state.months}
                                    onAdd={(month) => this.handleMonthAdd(month)}
                                    onDelete={(month, index) => this.handleMonthDelete(month, index)}
                                />
                            </Box>
                            <Button variant="contained" onClick={this.saveStudyType}>
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default StabilityStudyType;
