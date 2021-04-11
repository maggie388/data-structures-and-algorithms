const { getParent, getLeft, getRight } = require('./heap-helpers');


// Going to try to build a MaxHeap class based on what I've learned building the MinHeap class
class MaxHeap {
    constructor() {
        this.heap = [null];
        this.size = 0;
    }

    add(value) {
        console.log(`Add ${value} to the heap`);
    }

    bubbleUp() {
        console.log(`bubble up`);
    }

    popMax() {
        console.log(`popMax`);
    }

    heapify() {
        console.log(`heapify`);
    }

    // helper methods

    exists(index) {
        return index <= this.size;
    }

    canSwap(currentIndex, leftChildIndex, rightChildIndex) {
        // Check that one of the possible swap conditions exists
        return (
          this.exists(leftChildIndex) && this.heap[currentIndex] > this.heap[leftChildIndex]
          || this.exists(rightChildIndex) && this.heap[currentIndex] > this.heap[rightChildIndex]
        );
    }

    swap(a, b) {
        // this is destructuring assignment syntax
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
}

module.exports = MaxHeap;