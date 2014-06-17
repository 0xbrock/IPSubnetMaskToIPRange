
// Removes values form the array
exports.cleanArray = function(list, deleteValue) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == deleteValue) {         
            list.splice(i, 1);
            i--;
        }
    }

    return list;
};
