import axios from "axios";

const createCondition = function(condition) {
    return new Promise(function(resolve, reject) {
        axios.post('/create_condition', {
            Condition: condition
        }).then(function(res) {
           resolve(res.data);
        }).catch(function (err) {
            if(reject) reject(err);
        });
    });
}

const getAllConditions = function () {
    return new Promise(function(resolve, reject) {
       axios.get('/all_conditions').then(function(res) {
           resolve(res.data);
       }).catch(function (err) {
            if(reject) reject(err);
       })
    });
}

export {createCondition, getAllConditions};
