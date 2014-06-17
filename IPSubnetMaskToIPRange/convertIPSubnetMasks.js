var util = require('util'),
    fs = require('fs'),
    calc = require('./networkIPAddressCalculator');

function processIPList(ips) {
    var expanded = ['\"Expanded\"'];
    var ranges = ['\"IP Range Subnet Mask\", \"First IP\", \"Last IP\"'];
    for(var i = 0; i < ips.length; i++) {
        var ipsm = ips[i].trim().split("/"),
            ip = ipsm[0].split("."),
            sm = ipsm[1],
            ipform = {
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
            console.log("Saved file: " + filename);
        }
    }); 
}

exports.processIPList = processIPList;