IPSubnetMaskToIPRange
=====================

Expands a list of IP subnet masks into IP address ranges.  The IP address ranges are then expanded into individual a list of individual IP addresses.

This project wraps the excellent [Network and IP address calculator](http://www.tuxgraphics.org/toolbox/network_address_calculator_add.html "Network and IP address calculator") by Guido Socher to convert the IP subnet mask to an IP range. My contribution is just automating the conversion using a list of subnet masks, expanding the IP address ranges, and saving the result to csv files.

## Usage

Edit the `app.js` file and put the subnet masks in the ips array:

```js
    var ips =	[
				"23.96.0.0/18",
				...
				];
```

### Run

    /c/prj/IPSubnetMaskToIPRange/IPSubnetMaskToIPRange (master)$ node app.js

### Ouput

There will be 2 CSV files generated.  
* `range.csv` contains the ip address ranges. Columns: "IP Range Subnet Mask", "First IP", "Last IP"
* `expanded.csv` contains all of the ip addresses in the ranges. Columns: "Expanded"

## Next Tasks

* Add functionality to read the subnet masks from a file

