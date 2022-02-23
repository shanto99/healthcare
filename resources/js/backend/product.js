import axios from "axios";

const saveProduct = function(productName, variants) {
    return new Promise(function(resolve, reject) {
        axios.post('/healthcare/create_product', {
            ProductName: productName,
            Variants: variants
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
       axios.get('/healthcare/products').then(function(res) {
           resolve(res.data);
       }).catch(function(err) {
           if(reject) {
               reject(err);
           }
       })
    });
}

export {saveProduct, getProducts};
