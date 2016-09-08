lexer [![Build Status](https://travis-ci.org/nathanfaucett/js-lexer.svg?branch=master)](https://travis-ci.org/nathanfaucett/js-lexer)
======
simple text lexer


```javascript
var Lexer = require("@nathanfaucett/lexer");


var lexer = new Lexer("this is some text"),
    ch;

while ((ch = lexer.read()) !== lexer.EOF) {
    console.log(ch);
}
```
