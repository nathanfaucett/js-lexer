var tape = require("tape"),
    isWhitespace = require("@nathanfaucett/is_whitespace"),
    Lexer = require("..");


function whitespace(input, state) {
    var prevState = state.clone(),
        ch = input.read(state),
        string;

    if (isWhitespace(ch)) {
        string = ch;

        while (!input.done(state)) {
            ch = input.peek(state, 0);

            if (isWhitespace(ch)) {
                input.read(state);
                string += ch;
            } else {
                break;
            }
        }

        return new Lexer.Token("WHITESPACE", string)
            .getMeta(state, prevState);
    } else {
        return Lexer.NO_TOKEN;
    }
}
whitespace.priority = 1;

function number(input, state) {
    var prevState = state.clone(),
        ch = input.read(state),
        n = Number.parseInt(ch),
        string;

    if (n === n) {
        string = ch;

        while (!input.done(state)) {
            ch = input.peek(state, 0);
            n = Number.parseInt(ch);

            if (n === n) {
                input.read(state);
                string += ch;
            } else {
                break;
            }
        }

        return new Lexer.Token("NUMBER", +string)
            .getMeta(state, prevState);
    } else {
        return Lexer.NO_TOKEN;
    }
}
number.priority = 2;

function identifier(input, state) {
    var prevState = state.clone(),
        ch = input.read(state),
        string;

    if (!isWhitespace(ch)) {
        string = ch;

        while (!input.done(state)) {
            ch = input.peek(state, 0);

            if (!isWhitespace(ch)) {
                input.read(state);
                string += ch;
            } else {
                break;
            }
        }

        return new Lexer.Token("IDENTIFIER", string)
            .getMeta(state, prevState);
    } else {
        return Lexer.NO_TOKEN;
    }
}
identifier.priority = 3;


tape("Lexer read", function(assert) {
    var lexer = new Lexer("2 + 2")
        .add(whitespace)
        .add(number)
        .add(identifier)
        .sort(),
        tokens = lexer.collect();

    assert.deepEquals(tokens, [{
        meta: {
            colEnd: 1,
            colStart: 1,
            indexEnd: 0,
            indexStart: 1,
            lineEnd: 1,
            lineStart: 1
        },
        type: "NUMBER",
        value: 2
    }, {
        meta: {
            colEnd: 1,
            colStart: 2,
            indexEnd: 1,
            indexStart: 2,
            lineEnd: 1,
            lineStart: 1
        },
        type: "WHITESPACE",
        value: " "
    }, {
        meta: {
            colEnd: 2,
            colStart: 3,
            indexEnd: 2,
            indexStart: 3,
            lineEnd: 1,
            lineStart: 1
        },
        type: "IDENTIFIER",
        value: "+"
    }, {
        meta: {
            colEnd: 3,
            colStart: 4,
            indexEnd: 3,
            indexStart: 4,
            lineEnd: 1,
            lineStart: 1
        },
        type: "WHITESPACE",
        value: " "
    }, {
        meta: {
            colEnd: 4,
            colStart: 5,
            indexEnd: 4,
            indexStart: 5,
            lineEnd: 1,
            lineStart: 1
        },
        type: "NUMBER",
        value: 2
    }]);
    assert.equals(tokens.length, 5);

    assert.end();
});