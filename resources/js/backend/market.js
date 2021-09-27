import axios from "axios";

const createMarket = function(name, marketCondition)
{
    return new Promise(function(resolve, reject) {
        axios.post('/create_market', {
            Name: name,
            MarketCondition: marketCondition
        }).then(function (res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

const getMarkets = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/markets').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    })
}

export {createMarket, getMarkets};
