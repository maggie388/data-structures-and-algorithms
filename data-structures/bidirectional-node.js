const Node = require('./node');

// nodes for a double linked list also contain a pointer to the previous node
class BidirectionalNode extends Node {
    constructor(data) {
        super(data);
        this.previous = null;
    }

    setPreviousNode(node) {
        if (node instanceof Node || node === null) {
            this.previous = node;
        } else {
            throw new Error(`Previous node must be a member of the Node class`);
        }
    }

    getPreviousNode() {
        return this.previous;
    }
}


module.exports = BidirectionalNode;