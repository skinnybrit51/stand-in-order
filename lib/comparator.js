function compare(left, right, ascending) {
    if (ascending == null) {
        ascending = true;
    }

    var x, y;
    if (ascending) {
        x = left;
        y = right;
    } else {
        x = right;
        y = left;
    }
    if (x == null) {
        return 1;
    }
    if (y == null) {
        return -1;
    }
    return x < y ? -1 : x > y ? 1 : 0;
}

module.exports = {

    string: function (left, right, ascending) {

        if (ascending == null) {
            ascending = true;
        }

        left = (left != null) ? left.toLowerCase() : '';
        right = (right != null) ? right.toLowerCase() : '';

        var match = ascending ? left.localeCompare(right) : right.localeCompare(left);

        return match < 0 ? -1 : match;
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
            return parseInt(integer, 10);
        }

        return compare(convertInteger(left), convertInteger(right), ascending);
    },

    float: function (left, right, ascending) {
        function convertFloat(float) {
            return parseFloat(float);
        }

        return compare(convertFloat(left), convertFloat(right), ascending);
    }
};
