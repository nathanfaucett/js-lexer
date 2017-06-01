var isNewline = require("@nathanfaucett/is_newline"),
    EOF = require("./EOF");


var InputPrototype = Input.prototype;


module.exports = Input;


function Input(input) {
    this.input = input;
}

InputPrototype.read = function(state) {
    var ch = this.peek(state, 0);

    if (ch === EOF) {
        return ch;
    } else {
        state.read(isNewline(ch));
        return ch;
    }
};

InputPrototype.done = function(state) {
    return state.index >= this.input.length;
};

InputPrototype.canRead = function(state, offset) {
    return (state.index + offset) < this.input.length;
};

InputPrototype.peek = function(state, offset) {
    var index = state.index + offset;

    if (index < this.input.length) {
        return this.input.charAt(index);
    } else {
        return EOF;
    }
};