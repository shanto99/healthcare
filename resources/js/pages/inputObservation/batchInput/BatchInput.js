import { FormControl, TextField, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import React from "react";
import { KeyboardDatePicker } from '@material-ui/pickers';
import { formatDate } from "../../../Utility";

import { saveBatch } from "../../../backend/observation";

import './style.css';
import swal from "sweetalert";

class BatchInput extends React.Component {
    state = {
        sampleId: this.props.sampleId,
        batchNo: '',
        batchSize: '',
        mfgDate: new Date(),
        initiationDate: new Date(),
        variants: this.props.variants,
        selectedVariant: null
    };

    selectVariant = (e) => {
        const variantId = e.target.value;
        const selectedVariant = this.state.variants.find(variant => variant.VariantID == variantId);
        if(selectedVariant) {
            this.setState({
                selectedVariant: selectedVariant
            });
        }
    }

    saveBatch = () => {
        let {sampleId, batchNo, batchSize, selectedVariant, mfgDate, initiationDate} = this.state;
        mfgDate = formatDate(mfgDate);
        initiationDate = formatDate(initiationDate);
        selectedVariant = selectedVariant.VariantID;

        saveBatch(sampleId, batchNo, batchSize, selectedVariant, mfgDate, initiationDate).then(res => {
            let newBatch = res.batch;
            console.log(newBatch);
            this.props.closeModal(newBatch);
        }).catch(err => {
            console.log("Could not save batch",err);
            swal("Error", "Could not save batch", "error");
        });
        
    }

    render(){
        const {variants, selectedVariant, batchNo, batchSize, mfgDate, initiationDate} = this.state;
        return (
            <div className="modalContainer">
                <div className="modal">
                    <FormControl className="formControl">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Batch No."
                            variant="outlined"
                            value={batchNo}
                            onChange={(e) => {
                                this.setState({
                                    batchNo: e.target.value
                                });
                            }}
                        />
                    </FormControl>
                    <FormControl className="formControl">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Batch Size"
                            variant="outlined"
                            value={batchSize}
                            onChange={(e) => {
                                this.setState({
                                    batchSize: e.target.value
                                });
                            }}
                        />
                    </FormControl>
                    <FormControl variant="outlined" className="formControl">
                            <InputLabel
                                id="select-variant"
                            >
                                Select variant
                            </InputLabel>
                            <Select
                                labelId="select-variant"
                                label="Select variant"
                                value={selectedVariant && selectedVariant.VariantID || ""}
                                onChange={this.selectVariant}
                            >
                                <MenuItem value="">
                                    Select variant
                                </MenuItem>
                                {variants.map(variant => (
                                    <MenuItem value={variant.VariantID}>
                                        { variant.Variant }
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className="formControl">
                            <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Mfg date"
                                    format="yyyy-MM-dd"
                                    value={mfgDate}
                                    fullWidth
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={(date) => this.setState({ mfgDate: date })}
                                />
                        </FormControl>
                        <FormControl className="formControl">
                            <KeyboardDatePicker
                                    autoOk
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Stability initiation date"
                                    format="yyyy-MM-dd"
                                    value={initiationDate}
                                    fullWidth
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={(date) => this.setState({ initiationDate: date })}
                                />
                        </FormControl>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <Button 
                                variant="outlined"
                                onClick={this.props.closeModal}
                            >
                                close
                            </Button>
                            <Button 
                                variant="outlined"
                                onClick={this.saveBatch}
                            >
                                Save
                            </Button>
                        </div>

                </div>
            </div>
        )
    }

}

export default BatchInput;