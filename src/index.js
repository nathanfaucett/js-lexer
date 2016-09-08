var isNewline = require("@nathanfaucett/is_newline");


var EOF = -1,
    LexerPrototype;


module.exports = Lexer;


function Lexer(text) {
    this.text = text;
    this.index = 0;
    this.length = text.length;
    this.row = 1;
    this.column = 1;
}
LexerPrototype = Lexer.prototype;

Lexer.EOF = LexerPrototype.EOF = EOF;

LexerPrototype.read = function() {
    var ch;

    if (this.index < this.length) {
        ch = this.text.charAt(this.index);

        if (isNewline(ch)) {
            this.row += 1;
            this.column = 1;
        } else if (this.index !== 0) {
            this.column += 1;
        }

        this.index++;

        return ch;
    } else {
        return EOF;
    }
};

LexerPrototype.charAt = function(index) {
    index = this.index + index;

    if (index < this.length) {
        return this.text.charAt(index);
    } else {
        return EOF;
    }
};