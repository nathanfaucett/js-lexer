var Iterator = require("@nathanfaucett/iterator"),
    inherits = require("@nathanfaucett/inherits"),
    indexOf = require("@nathanfaucett/index_of"),
    NO_TOKEN = require("./NO_TOKEN"),
    EOF = require("./EOF"),
    Token = require("./Token"),
    Input = require("./Input"),
    State = require("./State");


var LexerPrototype = Lexer.prototype;


module.exports = Lexer;


function Lexer(input) {
    var _this = this;

    function next() {
        return Lexer_next(_this);
    }

    Iterator.call(this, next);

    this.index = 0;
    this.readers = [];
    this.input = new Input(input);
    this.state = new State(0, 1, 1);
}

inherits(Lexer, Iterator);
LexerPrototype = Lexer.prototype;

Lexer.Token = LexerPrototype.Token = Token;
Lexer.NO_TOKEN = LexerPrototype.NO_TOKEN = NO_TOKEN;
Lexer.EOF = LexerPrototype.EOF = EOF;

Lexer.extend = function(Child) {
    inherits(Child, this);
    return this;
};

LexerPrototype.add = function(reader) {
    this.readers.push(reader);
    return this;
};

LexerPrototype.remove = function(reader) {
    var index = indexOf(this.readers, reader);

    if (index !== -1) {
        this.readers.splice(index, 1);
    }

    return this;
};

LexerPrototype.sort = function() {
    this.readers.sort(readerSortFn);
    return this;
};

LexerPrototype.collect = function() {
    var tokens = [],
        it = this.next();

    while (!it.done) {
        tokens.push(it.value);
        it = this.next();
    }

    return tokens;
};

function readerSortFn(a, b) {
    return (a.priority || 1) - (b.priority || 1);
}

function Lexer_next(_this) {
    var token = NO_TOKEN,
        origIndex, state, newToken, readers, i, il;

    if (_this.input.done(_this.state)) {
        return Iterator.createDone();
    } else {
        origIndex = _this.state.index;
        readers = _this.readers;
        i = -1;
        il = readers.length - 1;

        while (i++ < il) {
            state = _this.state.clone();
            newToken = readers[i](_this.input, state);

            if (newToken !== NO_TOKEN) {
                token = newToken;
                break;
            }
        }

        if (token !== NO_TOKEN) {
            _this.state = state;
        }

        if (
            origIndex === _this.state.index &&
            !_this.input.done(_this.state)
        ) {
            throw new Error("Lexer: No reader was able to read at index " + origIndex);
        }

        if (token !== NO_TOKEN) {
            _this.index += 1;
            return Iterator.createValue(Iterator.VALUES, _this.index, token);
        } else {
            return Iterator.createDone();
        }
    }
}