const { getParent, getLeft, getRight } = require('./heap-helpers');

// basic Heap that will be extended to create a MinHeap and MaxHeap
class Heap {
    constructor() {
        // having index 0 as null will allow us 
        // to always reference the first (min or max) element at index 1
        // and simplify the code
        this.heap = [null];
        this.size = 0
    }

    add(value) {
        // we always add a new value to the end of the array/heap
        this.heap.push(value);
        this.size++;
        // next we reshuffle the heap to maintain its constrains
        this.bubbleUp();
    }

    popFirst() {
        if (!this.size) return null;
        // we only ever remove the first element in a heap (index 1)
        // always swap the first element with last element before removing it
        this.swap(1, this.size);
        const popped = this.heap.pop();
        this.size--;
        // next reshuffle the heap to maintain its constraints
        this.heapify();
        return popped;
    }

    /// HELPER METHODS ///
    isEmpty() {
        return this.size === 0;
    }

    exists(index) {
        return index <= this.size;
    }

    swap(a, b) {
        // this is destructuring assignment syntax
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
}

module.exports = Heap;