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

        this.specifications = {};
    }

    handleSpecificationChange = (studyTypeId, value) => {
        this.specifications[studyTypeId] = value;
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.selectTest(this.specifications);
        this.props.close();
    }


    render() {
        const {studyTypes} = this.state;
        return (
            <div className="modalContainer">
                <div className="modal">
                    <h4>Specifications: </h4>
                    <form className="specification-form" onSubmit={this.handleFormSubmit}>
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
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.props.close}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>          
                    </form>
                </div>
            </div>
        )
    }


}


export default SpecificationModal;
