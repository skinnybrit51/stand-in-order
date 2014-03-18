stand-in-order
==============

#### Description

* Sort an array by a single variable type
* Sort an array by an object value
* Sort an array by multiple object values


#### Using

* Installation
```npm install stand-in-order```

* Basic Example
```
    var sorter = require('stand-by-order');
    sorter(['a', 'b', 'aa', 'bc'], [{type:'string', ascending: true, name: null}]);
```

* Function Explained
The ```sorter``` takes two arguments.  First argument is the array to sort and second is an array of options.

```
    {
        ascending: Boolean, // true || false - default is true
        type: String,       // ['string', 'integer', 'float', 'boolean', 'date'] - required
        name: String,       // property to sort by - leave null when not an array of objects - default null
    }
```

* Complex Example
```
    var sorter = require('stand-in-order');
    var list = [
                   {
                       foo: 1,
                       bar: 'z'
                   },
                   {
                       foo: 2,
                       bar: 'a'
                   },
                   {
                       foo: 1,
                       bar: 'g'
                   },
                   {
                       foo: 1,
                       bar: 'c'
                   }
               ];
    sorter(list, [
                    {name: 'foo', type: 'integer', ascending: true},
                    {name: 'bar', type: 'string', ascending: false}
                ]);
```
