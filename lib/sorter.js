var comparator = require('./comparator'),
    _ = require('underscore');

var VALID_TYPES = ['string', 'integer', 'float', 'boolean', 'date'];

function getValue(value, path) {
    if (path == null) {
        return value;
    }

    var split = path.split('.');

    var newValue = value[split[0]];
    if (split.length === 1) {
        return newValue;
    }
    split.shift();
    return getValue(newValue, split.join('.'));
}

var defaultOptions = {
    ascending: true,
    type: null,
    name: null
};

module.exports = function (list, options) {

    _.each(options, function (option) {
        _.defaults(option, defaultOptions);
    });

    if (options.length === 0) {
        throw new Error('No type defined for sort.  Type must be set to one of the following - ' +
            VALID_TYPES.toString());
    }

    list.sort(function (left, right) {
        for (var i = 0; i < options.length; i++) {
            var option = options[i],
                ascending = option.ascending,
                name = option.name;

            if (!_.contains(VALID_TYPES, option.type)) {
                throw new Error('Type defined is not valid.  ' +
                    'Type must be set to one of the following - ' + VALID_TYPES.toString());
            }

            var match = comparator[option.type](getValue(left, name), getValue(right, name),
                ascending);
            if (match !== 0) {
                return match;
            }
        }
    });

};