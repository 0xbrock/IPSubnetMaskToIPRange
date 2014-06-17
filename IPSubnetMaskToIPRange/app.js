// The meat of this script is borrowed from http://www.tuxgraphics.org/toolbox/network_address_calculator_add.html
//      My contribution is just to automate the conversion using a list of subnet masks.

var fs = require('fs'),
    convert = require('./convertIPSubnetMasks'),
    cleanArray = require('./common').cleanArray;

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

function main() {
    var filename = process.argv[2]; // || "IPList.txt" // For testing purposes
    fs.readFile(filename, {encoding: 'utf-8'}, function(err, data) {
        if (err) throw err;

        // Node is returning the BOM when I read the file, remove it.
        data = data.replace(/^\uFEFF/, '');

        // Create the list and remove the empty items
        var ips = cleanArray(data.split(/\r?\n/), "");

        convert.processIPList(ips);
    });
}

function mainOriginal() {
    var ips = [
        "23.96.0.0/18",
        "23.96.64.0/28",
        "23.96.64.64/26",
        "23.96.64.128/27",
        "23.96.64.160/28",
        "23.96.80.0/20",
        "23.96.96.0/19",
        "23.100.16.0/20",
        "137.116.112.0/20",
        "137.117.32.0/19",
        "137.117.64.0/18",
        "137.135.64.0/18",
        "157.56.176.0/21",
        "168.61.32.0/20",
        "168.61.48.0/21",
        "168.62.32.0/19",
        "168.62.160.0/19",
        "138.91.96.0/25",
        "138.91.96.128/26",
        "138.91.96.192/28",
        "138.91.112.0/20",
        "191.234.32.0/19",
        "191.236.0.0/19",
        "191.238.0.0/25",
        "191.238.0.128/26",
        "191.238.0.192/27",
        "191.238.1.0/24",
        "191.238.2.0/23",
        "191.238.4.0/24",
        "191.238.8.0/21",
        "191.238.16.0/20",
        "191.238.32.0/19"
    ];

    convert.processIPList(ips);
}

main();