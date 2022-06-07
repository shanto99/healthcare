import axios from "axios";

const createMarket = function(name, marketCondition, marketId)
{
    return new Promise(function(resolve, reject) {
        axios.post('/healthcare/create_market', {
            Name: name,
            MarketCondition: marketCondition,
            MarketID: marketId
        }).then(function (res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    });
}

const getMarkets = function() {
    return new Promise(function(resolve, reject) {
        axios.get('/api/markets').then(function(res) {
            resolve(res.data);
        }).catch(function(err) {
            if(reject) reject(err);
        })
    })
}

export {createMarket, getMarkets};
