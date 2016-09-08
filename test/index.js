var tape = require("tape"),
    Lexer = require("..");


tape("Lexer read", function(assert) {
    var text = "a\nb\rc",
        lexer = new Lexer(text);

    assert.equal(lexer.read(), "a");
    assert.equal(lexer.row, 1);
    assert.equal(lexer.column, 1);

    assert.equal(lexer.read(), "\n");
    assert.equal(lexer.row, 2);
    assert.equal(lexer.column, 1);

    assert.equal(lexer.read(), "b");
    assert.equal(lexer.column, 2);

    assert.equal(lexer.read(), "\r");
    assert.equal(lexer.row, 3);
    assert.equal(lexer.column, 1);

    assert.equal(lexer.read(), "c");
    assert.equal(lexer.column, 2);

    assert.equal(lexer.read(), lexer.EOF);

    assert.end();
});

tape("Lexer unread", function(assert) {
    var text = "a\nb",
        lexer = new Lexer(text);

    assert.equal(lexer.read(), "a");
    assert.equal(lexer.row, 1);
    assert.equal(lexer.column, 1);

    assert.equal(lexer.read(), "\n");
    assert.equal(lexer.row, 2);
    assert.equal(lexer.column, 1);

    lexer.unread()
    assert.equal(lexer.row, 1);
    assert.equal(lexer.column, 1);

    assert.equal(lexer.read(), "\n");
    assert.equal(lexer.read(), "b");
    assert.equal(lexer.read(), lexer.EOF);

    assert.end();
});