var comparator = require('./comparator'),
    _ = require('underscore');


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
    type: 'string',
    name: null,
    compare: null
};

module.exports = function (list, options) {

    _.each(options, function (option) {
        _.defaults(option, defaultOptions);
    });

    list.sort(function (left, right) {
        for (var i = 0; i < options.length; i++) {
            var option = options[i],
                ascending = option.ascending,
                name = option.name;

            var compareFnc = option.compare;

            if (compareFnc == null || !_.isFunction(compareFnc)) {
                // get default comparator if one has not been defined
                compareFnc = comparator[option.type.toLowerCase()];
            }

            var match = compareFnc(getValue(left, name), getValue(right, name),
                ascending);

            if (match == null) {
                // nothing returned so no re-order
                match = 0;
            }

            if (match !== 0) {
                return match;
            }
        }
    });

};