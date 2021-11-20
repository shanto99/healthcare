import axios from "axios";
const savePackaging = function(name, source, dmf, resin, colorant, liner) {
    return new Promise(function (resolve, reject) {
        axios.post('/save_packaging', {
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
const getPackagings = function (){
  return new Promise(function(resolve, reject) {
    axios.get('/packagings').then(function(res) {
        resolve(res.data);
    }).catch(function(err) {
        if(reject) reject(err);
    });
  });
};

export {getPackagings, savePackaging};
