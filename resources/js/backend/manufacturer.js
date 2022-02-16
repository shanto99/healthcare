import axios from "axios";

const createManufacturer = function(name, address, phone, email)
{
    return new Promise(function(resolve, reject) {
       axios.post('/healthcare/create_manufacturer', {
            Name: name,
           Address: address,
           Phone: phone,
           Email: email
       }).then(function (res) {
           resolve(res.data);
       }).catch(function(err) {
           if(reject) reject(err);
       })
    });
}

const getManufacturers = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/healthcare/manufacturers').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    })
}

export {createManufacturer, getManufacturers};
