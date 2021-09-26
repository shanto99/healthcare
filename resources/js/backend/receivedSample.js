import axios from "axios";

const saveReceivedSample = function(receivingDate, manufacturer, product, grn, batch, ar, remark)
{
    return new Promise(function(resolve, reject) {
        axios.post('/save_received_sample', {
            AR: ar,
            GRN: grn,
            ReceivingDate: receivingDate,
            ManufacturerID: manufacturer,
            ProductID: product,
            Batch: batch,
            Remark: remark
        }).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) {
                reject(err);
            }
        })
    })
}

const getReceivedSamples = function() {
    return new Promise(function (resolve, reject) {
        axios.get('/received_samples').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

export {saveReceivedSample, getReceivedSamples};
