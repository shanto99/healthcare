import axios from "axios";

const createApiDetail = function(name, source)
{
    return new Promise(function(resolve, reject) {
        axios.post('/healthcare/create_api_detail', {
            Name: name,
            Source: source
        }).then(function (res) {
            resolve(res.data);
        }).catch(function(err) {
            console.log(err);
            if(reject) reject(err);
        })
    });
}

const getApiDetails = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/healthcare/api_details').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    })
}

export {createApiDetail, getApiDetails};
