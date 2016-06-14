/**
 * Created by yk on 2016/5/27.
 */

exports.successRes = function(data) {
    return {code:0, message:``, data:data}
}

exports.failureRes = function (err, data) {
    return {code:1, message:err.toString(), data:data}
}