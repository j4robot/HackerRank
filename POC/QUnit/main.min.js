function add(a, b) {
    return a + b;
}

QUnit.module('add', function () {
    QUnit.test('should add two numbers', function (assert) {
        assert.equal(add(1, 1), 2);
    });
});