var StatePrototype = State.prototype;


module.exports = State;


function State(index, row, col) {
    this.index = index;
    this.row = row;
    this.col = col;
}

StatePrototype.read = function(isNewline) {
    if (isNewline) {
        this.row += 1;
        this.col = 1;
    } else if (this.index !== 0) {
        this.col += 1;
    }

    this.index += 1;

    return this;
};

StatePrototype.clone = function() {
    return new State(this.index, this.row, this.col);
};