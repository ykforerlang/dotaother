/**
 * Created by yk on 2016/5/27.
 */
"use strict";
exports.successRes = function(data) {
    return {code:0, message:``, data:data}
}

exports.failureRes = function (err, data) {
    return {code:1, message:err.toString(), data:data}
}

exports.getCallStack = function() {
    var stack = [];
    var fun ;
    while (fun = fun.caller) {
        stack.push(fun)
    }
    return stack
}