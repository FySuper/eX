var url = require('url');
/* 暴露模块req */
exports = module.exports = {
    get query() {
        return url.parse(this.req.url, true)['query'];
    }
}