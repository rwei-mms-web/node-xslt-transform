"use strict";
//require('heapdump');
var fs = require('fs');
var addon = require('bindings')('node_xslt_nan');
var memwatch = require('memwatch-next');

var xmlFs = fs.readFileSync('./test/xmltest.xml', 'utf8');
var xsltFs = fs.readFileSync('./test/xslttest.xslt', 'utf8');

function GcThenGetHeapSize() {    
    try {
        global.gc();
    } catch (e) {
        console.log("You must run program with 'node --expose-gc index.js' or 'npm start'");
        process.exit();
    }

    var heapUsed = process.memoryUsage().heapUsed;
    console.log("Program is using " + heapUsed + " bytes of Heap.")
}

try {
    var result = addon.transform(xmlFs, xsltFs);
    console.log(result);
} catch (e) {
    console.log(e);
}

//load testing
// setInterval(() => {
//     var result = addon.transform(xmlFs, xsltFs);
//     console.log(result);
// }, 2);

// setInterval(GcThenGetHeapSize, 2000);