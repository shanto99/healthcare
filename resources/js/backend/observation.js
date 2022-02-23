import axios from "axios";

const getStudies = function(sampleId)
{
    return new Promise(function(resolve, reject) {
        axios.get(`/healthcare/get_sample_studies/${sampleId}`).then(res => {
            resolve(res.data);
        }).catch(err => {
            if(reject) reject(err);
        })
    });
}

const getTests = function(sampleId) {
    return new Promise(function(resolve, reject) {
        axios.get(`/healthcare/get_sample_tests/${sampleId}`).then(res => {
            resolve(res.data);
        }).catch(err => {
            if(reject) reject(err);
        })
    });
}

const getObservations = function(sampleId) {
    return new Promise(function(resolve, reject) {
        axios.get(`/healthcare/get_sample_observations/${sampleId}`).then(res => {
            resolve(res.data);
        }).catch(err => {
            if(reject) reject(err);
        })
    });
}

const submitObservations = function(observations)
{
    return new Promise(function(resolve, reject) {
        axios.post('/healthcare/submit_observations', {
            observations: observations
        }).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        });
    });
}

const getSampleVariants = function(sampleId)
{
    return new Promise(function(resolve, reject) {
        axios.get(`/healthcare/sample_variants/${sampleId}`).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

const saveBatch = function(sampleId, batchNo, batchSize, variantId, mfgDate, expDate, initiationDate) {
    return new Promise(function(resolve, reject) {
        axios.post('/healthcare/save_batch', {
            VariantID: variantId,
            BatchNo: batchNo,
            BatchSize: batchSize,
            MfgDate: mfgDate,
            ExpDate: expDate,
            InitiationDate: initiationDate,
            SampleID: sampleId
        }).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

const getBatches = function(sampleId) {
    return new Promise(function(resolve, reject) {
        axios.get(`/healthcare/get_sample_batches/${sampleId}`).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

const observationReport = function(sampleId, studyId, batchId) {
    return new Promise(function(resolve, reject) {
        axios.get(`/healthcare/generate_obervation_report/${sampleId}/${studyId}/${batchId}`, {
            responseType: 'blob'
        }).then(function(res) {
            resolve(res.data);
        })
    })
}

const getCounts = function(sampleId) {
    return axios.get(`/healthcare/get_counts/${sampleId}`).then(res => res.data);
}

export {getTests, getStudies, getObservations, submitObservations, getSampleVariants, saveBatch, getBatches, observationReport, getCounts};
