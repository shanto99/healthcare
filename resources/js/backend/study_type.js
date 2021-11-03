import axios from "axios";

const createStudyType = function(studyName, studyMonths) {
    return new Promise(function (resolve, reject) {
       axios.post('/create_study_type', {
           StudyName: studyName,
           StudyMonths: JSON.stringify(studyMonths)
       }).then(function(res) {
           resolve(res.data);
       }).catch(function (err) {
           if(reject) reject(err);
       })
    });
}

const getStudyTypes = function()
{
    return new Promise(function (resolve, reject) {
        axios.get('/get_study_types').then(function (res) {
            resolve(res.data)
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

export {createStudyType, getStudyTypes};
