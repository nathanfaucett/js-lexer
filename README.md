lexer [![Build Status](https://travis-ci.org/nathanfaucett/js-lexer.svg?branch=master)](https://travis-ci.org/nathanfaucett/js-lexer)
=======

plugin based lexical reader

```javascript
var isWhitespace = require("@nathanfaucett/is_whitespace"),
    Lexer = require("@nathanfaucett/lexer");


function whitespace(input, state) {
    var ch = input.read(state),
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

        return new Lexer.Token("WHITESPACE", string);
    } else {
        return Lexer.NO_TOKEN;
    }
}
whitespace.priority = 1;

var lexer = new Lexer("    ")
    .add(whitespace)
    .sort(),
    tokens = lexer.collect();

console.log(tokens);
```
