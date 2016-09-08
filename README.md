lexer [![Build Status](https://travis-ci.org/nathanfaucett/js-pseudo_random.svg?branch=master)](https://travis-ci.org/nathanfaucett/js-pseudo_random)
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
