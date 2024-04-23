"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureConsoleLog = void 0;
function secureConsoleLog(data, mappings) {
    var newData = deepClone(data);
    mappings.forEach(function (mapping) {
        var regex = new RegExp(mapping.value, 'g');
        newData = newData.replace(regex, "".concat(mapping.name, ": *****"));
    });
    console.log(newData);
}
exports.secureConsoleLog = secureConsoleLog;
function deepClone(obj) {
    if (Array.isArray(obj)) {
        return obj.map(function (item) { return deepClone(item); });
    }
    else if (typeof obj === 'object' && obj !== null) {
        var newObj = {};
        for (var key in obj) {
            newObj[key] = deepClone(obj[key]);
        }
        return newObj;
    }
    else {
        return obj;
    }
}
