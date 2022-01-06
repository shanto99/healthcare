import axios from "axios"

const generateReport = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/generate_report').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    })
}

export {generateReport};