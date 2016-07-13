/**
 * Created by yk on 2016/6/15.
 */
var fs = require('fs')
fs.readFile("./fstest.txt", function(err, other) {
    console.log("7..")
    console.log("err:",err)
    console.log("data:", other)
})

console.log("11")

fs.exists("./fstest.txt", function(err, other) {
    console.log("14..")
    console.log("err:",err)
    console.log("data:", other)
})

console.log("19")
/*fs.on("end", function() {
    console.log("end..")
})*/

var stream = fs.createReadStream()
stream.write("dfsfsdfs")

stream.on("data", function(){
    console.log("28")
})
