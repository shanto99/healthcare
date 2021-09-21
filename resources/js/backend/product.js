import axios from "axios";

const saveProduct = function(productName) {
    return new Promise(function(resolve, reject) {
        axios.post('/create_product', {
            ProductName: productName
        }).then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) {
                reject(err);
            }
        });
    })
};

const getProducts = function()
{
    return new Promise(function (resolve, reject) {
       axios.get('/products').then(function(res) {
           resolve(res.data);
       }).catch(function(err) {
           if(reject) {
               reject(err);
           }
       })
    });
}

export {saveProduct, getProducts};
