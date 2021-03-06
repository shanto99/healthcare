import axios from "axios";

const saveReceivedSample = function(receivingDate, manufacturer, product, protocol, grn, remark)
{
    return new Promise(function(resolve, reject) {
        axios.post('/healthcare/save_received_sample', {
            GRN: grn,
            ReceivingDate: receivingDate,
            ManufacturerID: manufacturer,
            ProductID: product,
            ProtocolID: protocol,
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
        axios.get('/healthcare/received_samples').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

export {saveReceivedSample, getReceivedSamples};
