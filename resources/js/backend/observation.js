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

const submitObservations = function(tests)
{
    return new Promise(function(resolve, reject) {
        axios.post('/submit_observations', {
            tests: tests
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
        axios.get(`/sample_variants/${sampleId}`).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

const saveBatch = function(sampleId, batchNo, batchSize, variantId, mfgDate, initiationDate) {
    return new Promise(function(resolve, reject) {
        axios.post('/save_batch', {
            VariantID: variantId,
            BatchNo: batchNo,
            BatchSize: batchSize,
            MfgDate: mfgDate,
            InitiationDate: initiationDate,
            AR: sampleId
        }).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

const getBatches = function(sampleId) {
    return new Promise(function(resolve, reject) {
        axios.get(`/get_sample_batches/${sampleId}`).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

export {getTests, getStudies, getObservations, submitObservations, getSampleVariants, saveBatch, getBatches};