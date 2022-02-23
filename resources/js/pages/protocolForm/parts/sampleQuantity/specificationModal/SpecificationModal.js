import React from "react";
import nextId from "react-id-generator";
import { Button, TextField } from "@material-ui/core";

class SpecificationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variants: props.variants,
            specifications: null,
        }

        this.specifications = {};
    }

    handleSpecificationChange = (variantID, value) => {
        this.specifications[variantID] = value;
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.selectTest(this.specifications);
        this.props.close();
    }


    render() {
        const {variants} = this.state;
        return (
            <div className="modalContainer">
                <div className="modal">
                    <h4>Specifications: </h4>
                    <form className="specification-form" onSubmit={this.handleFormSubmit}>
                        {variants.map(variant => (
                            <TextField
                                key={nextId("study-type-spec-")}
                                fullWidth
                                required
                                label={variant.Variant}
                                multiline
                                rows={4}
                                onChange={(e) => this.handleSpecificationChange(variant.VariantID, e.target.value)}
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
