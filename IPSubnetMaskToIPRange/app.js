// The meat of this script is borrowed from http://www.tuxgraphics.org/toolbox/network_address_calculator_add.html
//      My contribution is just to automate the conversion using a list of subnet masks.

var util = require('util'),
    fs = require('fs'),
    calc = require('./networkIPAddressCalculator');

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

function main() {
    var expanded = ['\"Expanded\"'];
    var ranges = ['\"IP Range Subnet Mask\", \"First IP\", \"Last IP\"'];
    for(var i = 0; i < ips.length; i++) {
        var ipsm = ips[i].split("/"),
            ip = ipsm[0].split("."),
            sm = ipsm[1];

        var ipform = {
            ip_1: ip[0],
            ip_2: ip[1],
            ip_3: ip[2],
            ip_4: ip[3],
            bits: sm,
        };
        calc.calNBFL(ipform);
        
        expanded = expanded.concat(expandIPRange(ipform));

        ranges.push(formatIPRange(ips[i], ipform));
    }
    console.log(ranges);
    saveCSV("range.csv", ranges); 
    saveCSV("expanded.csv", expanded);
    console.log("#DONE");
}

function expandIPRange(ipform) {
    var expanded = [];
    var o1 = ipform.firstadr_1;
    while (o1 <= ipform.lastadr_1) {
        var o2 = ipform.firstadr_2;
        while ((o1 < ipform.lastadr_1 && o2 <= 255) || (o1 == ipform.lastadr_1 && o2 <= ipform.lastadr_2)) {
            var o3 = ipform.firstadr_3;
            while ((o2 < ipform.lastadr_2 && o3 <= 255) || (o2 == ipform.lastadr_2 && o3 <= ipform.lastadr_3)) {
                var o4 = ipform.firstadr_4;
                while ((o3 < ipform.lastadr_3 && o4 <= 255) || (o3 == ipform.lastadr_3 && o4 <= ipform.lastadr_4)) {
                    expanded.push(util.format("%s.%s.%s.%s", o1, o2, o3, o4));
                    o4++;
                    if (o3 <= ipform.lastadr_3 && o4 > 255) {
                        o3++;
                        o4 = 0;
                    }
                }
                o3++;
                if (o2 <= ipform.lastadr_2 && o3 > 255) {
                    o2++;
                    o3 = 0;
                }
            }
            o2++
            if (o1 <= ipform.lastadr_1 && o2 > 255) {
                o1++;
                o2 = 0;
            }
        }
        o1++;
    }

    return expanded;
}

function formatIPRange(subnetmask, ipform) {
    return util.format("%s,%s.%s.%s.%s,%s.%s.%s.%s", subnetmask, 
            ipform.firstadr_1, 
            ipform.firstadr_2, 
            ipform.firstadr_3, 
            ipform.firstadr_4, 
            ipform.lastadr_1, 
            ipform.lastadr_2, 
            ipform.lastadr_3, 
            ipform.lastadr_4);
}

function saveCSV(filename, csvArray) {
    fs.writeFile(filename, csvArray.join("\r\n"), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved: " + filename);
        }
    }); 
}

main();