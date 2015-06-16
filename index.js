var app = require('./lib/main.js');
var mysql = require('./mysql.js');

app.baseUrl(__dirname + '/public');
app.use('/', function (req, res) {
    var params;
    params = req.query.mode || req.body.mode;
    if (!params) {
        return (console.log('参数为空!')) || (res.end('what the fuck!?'));
    }
    params = params.split(',');
    if (params[0] === 'mysql') {
        params.shift();
        return mysql.usselect(params, function (results) {
            return res.end(JSON.stringify(results));
        });
    } else {
        return res.end('what the fuck!?');
    }
})
app.use('/bbb', function (req, res) {
    res.end('bbb');
})
app.start(8080);