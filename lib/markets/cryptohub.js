var request = require('request');

var base_url = 'https://cryptohub.online/api/market/ticker/';
function get_summary(coin, exchange, cb) {
    var summary = {};
    request({ uri: base_url + coin, json: true }, function (error, response, body) {
        if (error) {
            return cb(error, null);
        } else if (body.Success === true) {
            summary['bid'] = body.Data['highestBid'].toFixed(8);
            summary['ask'] = body.Data['lowestAsk'].toFixed(8);
            summary['volume'] = body.Data['Volume'];
            summary['high'] = body.Data['high24hr'].toFixed(8);
            summary['low'] = body.Data['low24hr'].toFixed(8);
            summary['last'] = body.Data['last'].toFixed(8);
            summary['change'] = body.Data['percentChange'];
            return cb(null, summary);
        } else {
            return cb(error, null);
        }
    });

}


module.exports = {
    get_data: function (coin, exchange, cb) {
        var error = null;
        get_summary(coin, exchange, function (err, stats) {
            if (err) { error = err; }
            return cb(error, { buys: buys, sells: sells, chartdata: [], trades: trades, stats: stats });
        });
    }
};

