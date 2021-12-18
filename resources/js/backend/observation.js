import axios from "axios";

const getStudies = function(sampleId)
{
    return new Promise(function(resolve, reject) {
        axios.get(`/get_sample_studies/${sampleId}`).then(res => {
            resolve(res.data);
        }).catch(err => {
            if(reject) reject(err);
        })
    });
}

const getTests = function(sampleId) {
    return new Promise(function(resolve, reject) {
        axios.get(`/get_sample_tests/${sampleId}`).then(res => {
            resolve(res.data);
        }).catch(err => {
            if(reject) reject(err);
        })
    });
}

const getObservations = function(sampleId) {
    return new Promise(function(resolve, reject) {
        axios.get(`/get_sample_observations/${sampleId}`).then(res => {
            resolve(res.data);
        }).catch(err => {
            if(reject) reject(err);
        })
    });
}

export {getTests, getStudies, getObservations};