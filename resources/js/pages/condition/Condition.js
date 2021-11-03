import React from "react";
import {Box, Button, Grid, List, ListItem, ListItemText, TextField} from "@material-ui/core";

import {createCondition, getAllConditions} from "../../backend/condition";
import swal from "sweetalert";

class Condition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            conditions: [],
            condition: ''
        }

        this.saveCondition = this.saveCondition.bind(this);
        this.getConditions = this.getConditions.bind(this);
    }

    componentDidMount() {
        this.getConditions();
    }

    saveCondition()
    {
        const condition = this.state.condition;
        createCondition(condition).then(res => {
            swal("Success", "New condition created successfully", "success");
        }).catch(err => {
            swal("Error", "Could not create condition", "error");
        })
    }

    getConditions()
    {
        getAllConditions().then(res => {
            const conditions = res.conditions || [];
            this.setState(preState => {
               const newState = {...preState};
               newState.conditions = conditions;
               return newState;
            });
        }).catch(err => {
            swal("Error", "Could not fetch conditions", "error");
        })
    }

    render() {
        const conditions = this.state.conditions;
        return (
            <Box width="100">
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <Box>
                            <List>
                                {conditions.map((condition, index) => {
                                    return (
                                        <ListItem key={`condition-${index}`}>
                                            <ListItemText primary={condition.Condition}/>
                                        </ListItem>
                                    )
                                })}

                            </List>
                        </Box>
                    </Grid>
                    <Grid item lg={6}>
                        <Box my={3}>
                            <TextField
                                label="Condition"
                                onChange={(e) => {
                                    this.setState({
                                        condition: e.target.value
                                    })
                                }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            onClick={this.saveCondition}
                        >
                            save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default Condition;
