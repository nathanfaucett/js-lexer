var tape = require("tape"),
    Lexer = require("..");


tape("lexer", function(assert) {
    var text = "this is\n some text",
        lexer = new Lexer(text),
        index = 0,
        ch;

    while ((ch = lexer.read()) !== lexer.EOF) {
        assert.equal(ch, text.charAt(index++));
    }

    assert.end();
});