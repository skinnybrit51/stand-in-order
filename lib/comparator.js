function compare(left, right, ascending) {
    if (ascending == null) {
        ascending = true;
    }

    var a, b;
    if (ascending) {
        a = left;
        b = right;
    } else {
        a = right;
        b = left;
    }
    if (a === void 0) {
        return 1;
    }
    if (b === void 0) {
        return -1;
    }
    return a < b ? -1 : a > b ? 1 : 0;
}

module.exports = {

    string: function (left, right, ascending) {

        if (ascending == null) {
            ascending = true
        }

        var l = left != null ? left.toLowerCase() : '',
            r = right != null ? right.toLowerCase() : '',
            match = 0;

        if (ascending) {
            match = l.localeCompare(r);
        } else {
            match = r.localeCompare(l);
        }
        if (match < 0) {
            match = -1;
        }

        return match;
    },

    boolean: function (left, right, ascending) {

        function convertBoolean(bool) {
            return bool ? 1 : 0;
        }

        return compare(convertBoolean(left), convertBoolean(right), ascending);
    },

    date: function (left, right, ascending) {
        function convertDate(date) {
            return date != null ? Date.parse(date) : null;
        }

        return compare(convertDate(left), convertDate(right), ascending);
    },

    integer: function (left, right, ascending) {

        function convertInteger(integer) {
            return parseInt(integer);
        }

        return compare(convertInteger(left), convertInteger(right), ascending)
    },

    decimal: function (left, right, ascending) {
        function convertFloat(float) {
            return parseFloat(float, 10);
        }

        return compare(convertFloat(left), convertFloat(right), ascending);
    }
};
