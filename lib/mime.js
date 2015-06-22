﻿//mime获取
var types = {};
var mediaTypes = require('./mime.json');

for (var i in mediaTypes) {
    value = mediaTypes[i];
    value = Array.isArray(value)? value : [value];
    for (var j = 0, h; h = value[j]; j++) {
        types['.' + h] = i;
    }
}

/**
 * 获取相应后缀的多媒体类型
 * 
 * @param {Number} port
 * @return {Null}
 * 
 */
exports = module.exports = function (z) {
    if (z == '' || z == '.') { z = '*' }
    return types[z] || types['*'];     
}