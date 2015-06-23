var urlParse = require('url').parse;
var qsParse = require('querystring').parse;
var path = require('path');
var resdo = require('./res.js');
var reqdo = require('./req.js');

/* exports the loop module */
var loop = exports = module.exports = function (req, res) {
    res._head = req.headers;
    // use static
    resdo(res);
    reqdo(req);
    
    bodyParse(req, res);
}

/**
 * if have form upload , let the req on the data. 
 * 
 * @api private
 */
function bodyParse(req, res) {
    req.data = '';
    req.on('data', dataAysn);
    req.on('end', endAysn);
    function dataAysn(d) { req.data += d; }
    function endAysn() {
        // get form req.body    
        if (req.headers['content-type'] && ~req.headers['content-type'].indexOf('application/x-www-form-urlencoded')) {
            req.body = qsParse(req.data, '&', '=');
        }
        router(req, res);
    }
}

/**
 * throngth the bodyParse and loop ; all ready to detail with router
 * 
 * @api private
 */
function router(req, res) {

    pathname = urlParse(req.url)['pathname'];
    
    if (path.extname(pathname)) {
        var filepath = path.join(res.config.basename, pathname);
        res.sendfile(filepath);
    }
    else if (pathname === '/' && req.method === 'GET') {
        res.index();
    }
    // 全字匹配路径规则
    else if (res.config.router[pathname]) {
        res.config.router[pathname](req, res);
    }
    else {
        res.notFound();
    }
}