var comparator = require('./comparator'),
    _ = require('underscore');

var VALID_TYPES = ['string', 'integer', 'float', 'boolean', 'date'];

function getValue(value, path) {
    var split = path.split('.');

    var newValue = value[split[0]];
    if (split.length === 1) {
        return newValue;
    }
    split.shift();
    return getValue(newValue, split.join('.'));
}

module.exports = function (list, options) {
    options = _.defaults(options, {
        ascending: true,
        type: null,
        by: ''
    });

    if (!_.contains(VALID_TYPES, options.type)) {
        throw new Error('No type defined for sort.  Value must be set to one of the following - ' +
            VALID_TYPES.toString());
    }

    if (options.by.length) {
        if (_.isString(options.by)) {
            // make an array
            options.by = [
                {
                    name: options.by,
                    ascending: options.ascending
                }
            ];
        }

        list.sort(function (left, right) {
            for (var i = 0; i < options.by.length; i++) {
                var by = options.by[i],
                    ascending = options.ascending,
                    name = by;
                if (_.has(by, 'name')) {
                    name = by.name;
                }
                if (_.has(by, 'ascending')) {
                    ascending = by.ascending;
                }

                var match = comparator[options.type](getValue(left, name), getValue(right, name),
                    ascending);
                if (match !== 0) {
                    return match;
                }
            }
        });
    } else {
        list.sort(function (left, right) {
            return comparator[options.type](left, right, options.ascending);
        });
    }

};