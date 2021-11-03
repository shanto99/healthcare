import axios from "axios";

const saveContainer = function(name, source, dmf, resin, colorant, liner) {
    return new Promise(function (resolve, reject) {
        axios.post('/save_container', {
            Name: name,
            Source: source,
            DMF: dmf,
            Resin: resin,
            Colorant: colorant,
            Liner: liner
        }).then(function(res) {
            resolve(res.data);
        }).catch(function (err) {
            if(reject) reject(err);
        })
    });
}

const getContainers = function () {
    return new Promise(function (resolve, reject) {
        axios.get('/containers').then(function(res) {
            resolve(res.data);
        }).catch(function (err) {
            if(reject) reject(err);
        })
    });
}

export {saveContainer, getContainers};
