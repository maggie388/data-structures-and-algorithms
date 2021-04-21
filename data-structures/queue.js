const LinkedList = require('./singly-linked-list');

class Queue {
    // if no value is passed in max value will be infinity by default
    constructor(maxSize = Infinity) {
        this.queue = new LinkedList();
        this.maxSize = maxSize;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    hasRoom() {
        return this.size < this.maxSize;
    }

    // add to end of queue (add to tail)
    enqueue(data) {
        if (this.hasRoom()) {
            this.queue.addToTail(data);
            this.size++;
        } else {
            throw new Error("Queue is full!");
        }
    }

    // remove from start of queu (remove from head)
    dequeue() {
        if (!this.isEmpty()) {
            const data = this.queue.removeHead();
            this.size--;
            return data;
        } else {
            throw new Error("Queue is empty!");
        }
    }
}

module.exports = Queue;