var request = require('request');

var base_url = 'https://cryptohub.online/api/market/ticker/';
function get_summary(coin, exchange, cb) {
    var summary = {};
    request({ uri: base_url + coin, json: true }, function (error, response, body) {
        if (error) {
            return cb(error, null);
        } else if (response.statusCode === 200) {
            var res = body[Object.keys(body)[0]];

            summary['bid'] = res.highestBid.toFixed(8);
            summary['ask'] = res.lowestAsk.toFixed(8);
            summary['volume'] = res.baseVolume;
            summary['high'] = res.high24hr.toFixed(8);
            summary['low'] = res.low24hr.toFixed(8);
            summary['last'] = res.last.toFixed(8);
            summary['change'] = res.percentChange;
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
            return cb(error, { buys: [], sells: [], chartdata: [], trades: [], stats: stats });
        });
    }
};

