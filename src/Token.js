module.exports = Token;


function Token(type, value) {
    this.type = type;
    this.value = value;
    this.meta = null;
}

function TokenMeta(
    indexStart,
    indexEnd,
    colStart,
    colEnd,
    lineStart,
    lineEnd
) {
    this.indexStart = indexStart;
    this.indexEnd = indexEnd;
    this.colStart = colStart;
    this.colEnd = colEnd;
    this.lineStart = lineStart;
    this.lineEnd = lineEnd;
}

Token.prototype.getMeta = function(prevState, nextState) {
    this.meta = new TokenMeta(
        prevState.index,
        nextState.index,
        prevState.col,
        nextState.col,
        prevState.row,
        nextState.row
    );
    return this;
};