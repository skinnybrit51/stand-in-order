var expect = require('chai').expect,
    sort = require('sorter');

describe('Sort', function () {

    it('Should be able to handle nested values', function () {
        var list = [
            {
                foo: {
                    bar: {
                        name: 'Tom'
                    }
                }
            },
            {
                foo: {
                    bar: {
                        name: 'Fred'
                    }
                }
            },
            {
                foo: {
                    bar: {
                        name: 'Ann'
                    }
                }
            },
            {
                foo: {
                    bar: {
                        name: 'Ted'
                    }
                }
            }
        ];
        sort(list, [
            {name: 'foo.bar.name', type: 'string'}
        ]);
        expect(list[0].foo.bar.name).to.equal('Ann');
        expect(list[1].foo.bar.name).to.equal('Fred');
        expect(list[2].foo.bar.name).to.equal('Ted');
        expect(list[3].foo.bar.name).to.equal('Tom');
    });

    it('Should sort a list by multiple object properties', function () {
        var list = [
            {
                foo: 1,
                bar: 2
            },
            {
                foo: 2,
                bar: 2
            },
            {
                foo: 1,
                bar: 1
            },
            {
                foo: 1,
                bar: 4
            }
        ];
        sort(list, [
            {
                type: 'integer',
                name: 'foo'
            },
            {
                type: 'integer',
                name: 'bar'
            }
        ]);
        expect(list[0].foo).to.equal(1);
        expect(list[0].bar).to.equal(1);
        expect(list[1].foo).to.equal(1);
        expect(list[1].bar).to.equal(2);
        expect(list[2].foo).to.equal(1);
        expect(list[2].bar).to.equal(4);
        expect(list[3].foo).to.equal(2);
        expect(list[3].bar).to.equal(2);
    });

    it('Should sort a list by multiple object properties, one ascending and one descending',
        function () {
            var list = [
                {
                    foo: 1,
                    bar: 2
                },
                {
                    foo: 2,
                    bar: 2
                },
                {
                    foo: 1,
                    bar: 1
                },
                {
                    foo: 1,
                    bar: 4
                }
            ];
            sort(list, [
                {
                    type: 'integer',
                    name: 'foo'
                },
                {
                    type: 'integer',
                    name: 'bar',
                    ascending: false
                }
            ]);
            expect(list[0].foo).to.equal(1);
            expect(list[0].bar).to.equal(4);
            expect(list[1].foo).to.equal(1);
            expect(list[1].bar).to.equal(2);
            expect(list[2].foo).to.equal(1);
            expect(list[2].bar).to.equal(1);
            expect(list[3].foo).to.equal(2);
            expect(list[3].bar).to.equal(2);
        });

    it('Should sort a list by a single object property', function () {
        var list = [
            {foo: 'a'},
            {foo: 'z'},
            {foo: 'e'},
            {foo: 'd'}
        ];
        sort(list, [
            {
                type: 'string',
                name: 'foo'
            }
        ]);
        expect(list[0].foo).to.equal('a');
        expect(list[1].foo).to.equal('d');
        expect(list[2].foo).to.equal('e');
        expect(list[3].foo).to.equal('z');
    });

    it('Should sort a string list into ascending order', function () {
        var list = ['a', 'b', 'aa', 'bc'];
        sort(list, [
            {type: 'string'}
        ]);
        expect(list[0]).to.equal('a');
        expect(list[1]).to.equal('aa');
        expect(list[2]).to.equal('b');
        expect(list[3]).to.equal('bc');
    });

    it('Should sort a string list into descending order', function () {
        var list = ['a', 'b', 'aa', 'bc'];
        sort(list, [
            {ascending: false, type: 'string'}
        ]);
        expect(list[0]).to.equal('bc');
        expect(list[1]).to.equal('b');
        expect(list[2]).to.equal('aa');
        expect(list[3]).to.equal('a');
    });

    it('Should sort a date list into ascending order', function () {
        var list = ['2014-01-01', '2014-06-01', '2014-03-01', '2014-09-01'];
        sort(list, [
            {type: 'date'}
        ]);
        expect(list[0]).to.equal('2014-01-01');
        expect(list[1]).to.equal('2014-03-01');
        expect(list[2]).to.equal('2014-06-01');
        expect(list[3]).to.equal('2014-09-01');
    });

    it('Should sort a date list into descending order', function () {
        var list = ['2014-01-01', '2014-06-01', '2014-03-01', '2014-09-01'];
        sort(list, [
            {type: 'date', ascending: false}
        ]);
        expect(list[0]).to.equal('2014-09-01');
        expect(list[1]).to.equal('2014-06-01');
        expect(list[2]).to.equal('2014-03-01');
        expect(list[3]).to.equal('2014-01-01');
    });

    it('Should sort a boolean list into ascending order', function () {
        var list = [true, false, true];
        sort(list, [
            {type: 'boolean'}
        ]);
        expect(list[0]).to.equal(false);
        expect(list[1]).to.equal(true);
        expect(list[2]).to.equal(true);
    });

    it('Should sort a boolean list into descending order', function () {
        var list = [true, false, true];
        sort(list, [
            {type: 'boolean', ascending: false}
        ]);
        expect(list[0]).to.equal(true);
        expect(list[1]).to.equal(true);
        expect(list[2]).to.equal(false);
    });

    it('Should sort an integer list into ascending order', function () {
        var list = [1, 5, 2];
        sort(list, [
            {type: 'integer'}
        ]);
        expect(list[0]).to.equal(1);
        expect(list[1]).to.equal(2);
        expect(list[2]).to.equal(5);
    });

    it('Should sort an integer list into descending order', function () {
        var list = [1, 5, 2];
        sort(list, [
            {type: 'integer', ascending: false}
        ]);
        expect(list[0]).to.equal(5);
        expect(list[1]).to.equal(2);
        expect(list[2]).to.equal(1);
    });

    it('Should sort a float list into ascending order', function () {
        var list = [1.2, 1.1, 1.3];
        sort(list, [
            {type: 'float'}
        ]);
        expect(list[0]).to.equal(1.1);
        expect(list[1]).to.equal(1.2);
        expect(list[2]).to.equal(1.3);
    });

    it('Should sort a float list into descending order', function () {
        var list = [1.2, 1.1, 1.3];
        sort(list, [
            {type: 'float', ascending: false}
        ]);
        expect(list[0]).to.equal(1.3);
        expect(list[1]).to.equal(1.2);
        expect(list[2]).to.equal(1.1);
    });

    it('Should be able to provide a custom compare for sorting values', function () {

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

        expect(list.length).to.equal(6);
        expect(list[0]).to.equal('open');
        expect(list[1]).to.equal('open');
        expect(list[2]).to.equal('active');
        expect(list[3]).to.equal('active');
        expect(list[4]).to.equal('close');
        expect(list[5]).to.equal('close');

        sort(list, [
            {compare: compare, ascending: false}
        ]);

        expect(list[0]).to.equal('close');
        expect(list[1]).to.equal('close');
        expect(list[2]).to.equal('active');
        expect(list[3]).to.equal('active');
        expect(list[4]).to.equal('open');
        expect(list[5]).to.equal('open');
    });

});