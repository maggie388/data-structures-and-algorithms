// a node is the basis of many data structures
// a linked list is made up of nodes that hold some data and point to the next node on the list
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    setNextNode(node) {
        if (node instanceof Node || node === null) {
            this.next = node;
        } else {
            throw new Error(`Next node must be a member of the Node class`);
        }
    }

    getNextNode() {
        return this.next;
    }
}

module.exports = Node;