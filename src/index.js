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
    this.lastColumn = 1;
}
LexerPrototype = Lexer.prototype;

Lexer.EOF = LexerPrototype.EOF = EOF;

LexerPrototype.read = function() {
    var ch;

    if (this.index < this.length) {
        ch = this.text.charAt(this.index);

        if (isNewline(ch)) {
            this.row += 1;
            this.lastColumn = this.column;
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

LexerPrototype.unread = function() {
    if (this.index > 0) {
        ch = this.text.charAt(this.index - 1);

        if (isNewline(ch)) {
            this.row -= 1;
            this.column = this.lastColumn;
        } else if (this.index !== 0) {
            this.column += 1;
        }

        this.index--;
    }
};

LexerPrototype.charAt = function(index) {
    index = this.index + index;

    if (index >= 0 && index < this.length) {
        return this.text.charAt(index);
    } else {
        return EOF;
    }
};