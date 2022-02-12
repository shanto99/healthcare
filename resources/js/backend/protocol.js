import axios from "axios";

const createProtocol = function(productId, marketId, manufacturerId, apiDetails, reference,
                                stpReferences, packaging, studyTypes, tests, containerNumber) {


    return new Promise(function (resolve, reject) {
        axios.post('/create_protocol', {
            productId, marketId, manufacturerId, apiDetails, reference,
            stpReferences, packaging, studyTypes, tests, containerNumber
        }).then(function (res) {
            resolve(res.data);
        }).catch(function (err) {
            reject(err);
        })
    });
}

const getProtocols = function () {
    return new Promise(function (resolve, reject) {
        axios.get('/get_protocols').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

const getProtocolDetail = function(protocolId) {
    return new Promise(function(resolve, reject) {
       axios.get(`/protocol_detail/${protocolId}`).then(function(res) {
           resolve(res.data);
       }).catch(function(err) {
           reject(err);
       })
    });
}

export {createProtocol, getProtocols, getProtocolDetail};


