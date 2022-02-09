import React from "react";
import nextId from "react-id-generator";
import { Button, TextField } from "@material-ui/core";

class SpecificationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studyTypes: props.studyTypes,
            specifications: null,

        }
    }

    handleSpecificationChange = (studyTypeId, value) => {
        console.log({studyTypeId, value});
    }


    render() {
        const {studyTypes} = this.state;
        return (
            <div className="modalContainer">
                <div className="modal">
                    <h4>Specifications: </h4>
                    <form className="specification-form">
                        {studyTypes.map(type => (
                            <TextField
                                key={nextId("study-type-spec-")}
                                fullWidth
                                required
                                label={type.studyName}
                                multiline
                                rows={4}
                                onChange={(e) => this.handleSpecificationChange(type.studyTypeId, e.target.value)}
                            />
                        ))}
                        <br/>
                        <Button
                            style={{marginTop: '20px'}}
                            color="secondary"
                            variant="contained"
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        )
    }


}


export default SpecificationModal;
