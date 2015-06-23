var fs = require('fs');
var getMime = require('./mime.js');
var path = require('path');

exports = module.exports = function (res) {
    
    /**
     * 返回json数据
     * 
     * @param {JSON} ...
     * @api public
     */
    res.json = function (arr) { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(arr)); };
    
    /**
     * 首页判断
     * 
     * @api private
     */
    res.index = function () {
        var filepath;
        var types = ['.html', '.htm'];
        for (var i = 0, t; t = types[i]; i++) {
            if (fs.existsSync(path.join(res.config.basename, '/index' + t))) {
                filepath = path.join(res.config.basename, '/index' + t);
                break;
            }
        }
        filepath = filepath || path.join(res.config.basename, '/index');
        res.sendfile(filepath);
    }
    
    /**
     * 返回文件
     * 
     * @param {String} file's Path ...
     * @api public
     */
    res.sendfile = function (filepath) {
        if (fs.existsSync(filepath)) {
            var stat = fs.statSync(filepath);
            var mime = getMime(path.extname(filepath));
            var tag = JSON.stringify([stat['mtime'].toGMTString() + "&size:" + stat['size']]);
            res.setHeader('Etag', tag);
            res.setHeader("Last-Modified", stat['mtime'].toGMTString());
            
            if (res._head['if-none-match'] && res._head['if-none-match'] === tag) {
                res.writeHead(304, { 'Content-Type': mime });
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': mime });
                res.config.cache_key[filepath] = tag;
                // 创建读取流
                var readstream = fs.createReadStream(filepath, { encoding: 'binary' });
                var file = '';
                readstream.on('data', function (chunk) {
                    //if (stat['size'] < res.config.sizelimit) { file += chunk; }
                    res.write(chunk, 'binary');
                });
                readstream.on('error', function () {
                    res.end();
                });
                readstream.on('close', function () {
                });
                readstream.on('end', function () {
                    //if (stat['size'] < res.config.sizelimit) { res.config.cache[filepath] = file; }
                    res.end();
                });
            }
        }
        else {
            res.notFound();
        }
    }
    
    /**
     * 页面找不到
     * 
     * @param {String} notFoundString
     * @api public
     */
    res.notFound = function (message) {
        if (path.extname(message)) {
            res.sendfile(message);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html,charset=utf-8' });
            res.end(message || '<h1 style="color:blue">404 Not Found</h1>');
        }
    }
    
}