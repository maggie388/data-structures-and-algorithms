const LinkedList = require('./linked-list');

class Stack {
    // if no max size is given it will be infinity by default
    constructor(maxSize = Infinity) {
        this.stack = new LinkedList();
        this.maxSize = maxSize;
        this.size = 0;
    }

    ///// helper methods /////
    hasRoom() {
        return this.size < this.maxSize;
    }

    isEmpty() {
        return this.size === 0;
    }
    //////////////////////////

    // in a stack you always add to the head
    push(value) {
        if (this.hasRoom()) {
            this.stack.addToHead(value);
            this.size++;
        } else {
            throw new Error('Stack is full');
        }
    }

    // in a stack you always remove from the head
    pop() {
        if (!this.isEmpty()) {
            const value = this.stack.removeHead();
            this.size--;
            return value;
        } else {
            throw new Error('Stack is empty');
        }
    }

    // see what is on top of teh stack without removing it
    peek() {
        if (!this.isEmpty()) {
            return this.stack.head.data;
        } else {
            return null;
        }
    }
}

module.exports = Stack;