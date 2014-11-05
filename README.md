stand-in-order
==============

[![NPM version](https://badge.fury.io/js/stand-in-order.svg)](http://badge.fury.io/js/stand-in-order)

#### Description

* Sort an array by a primitive type.
* Sort an array by an object property value.
* Sort an array by multiple object property values.


#### Installation

```npm install stand-in-order```

#### Using

Available options:

```
    {
        // true || false - default is true
        ascending: true, 
        
        // 'string' || 'integer' || 'float' || 'boolean' || 'date' - default is 'string'
        type: 'string',       
        
        // property name to sort by
        name: 'foo',
               
        // comparator function - defining one will overwrite 'type'        
        compare: null
    }
```

##### Primitive Type Example

The ```sorter``` takes two arguments.  First argument is the array to sort and second is an array of options.
```
    var sorter = require('stand-in-order');
    sorter(
        ['a', 'b', 'aa', 'bc'],
        [
            {type: 'string', ascending: true, name: null}
        ]
    );
```

##### Object Example

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

##### Defining Custom Sort

```
    var compare = function (left, right, ascending) {
    
        var value = 0;
        if (left === 'open' && (right === 'active' || right === 'close')) {
            value = -1;
        }
    
        if (left === 'active' && right === 'close') {
            value = -1;
        }
    
        if (left === 'active' && right === 'open') {
            value = 1;
        }
    
        if (left === 'close' && (right === 'open' || right === 'active')) {
            value = 1;
        }
    
        if (left === right) {
            value = 0;
        }
    
        if (!ascending) {
            if (value === -1 || value === 1) {
                value = value * -1;
            }
        }
    
        return value;
    };

    var list = ['open', 'close', 'active', 'close', 'active', 'open'];
    sort(list, [
        {compare: compare}
    ]);
    console.log(list);
    // [ 'open', 'open', 'active', 'active', 'close', 'close' ]
    
```