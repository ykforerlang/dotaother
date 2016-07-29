/**
 * Created by yk on 2016/4/28.
 */




var dataBlob = {};
var sectionIDs = [];
var rowIDs = [];
for (var ii = 0; ii < 10; ii++) {
    var sectionName = 'Section ' + ii;
    sectionIDs.push(sectionName);
    dataBlob[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (var jj = 0; jj < 5; jj++) {
        var rowName = 'S' + ii + ', R' + jj;
        rowIDs[ii].push(rowName);
        dataBlob[rowName] = rowName;
    }
}

console.log("dataBlob:", dataBlob)
console.log("rowIDs:", rowIDs)
