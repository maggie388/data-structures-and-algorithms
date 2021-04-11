const { getParent, getLeft, getRight } = require('./heap-helpers');

class MinHeap {
    // keeping one element at the begging of the array that is null willfirst value is null so that 
    constructor() {
        // having index 0 as null will allow us 
        // to always reference the min element at index 1
        // and simplify the code
        this.heap = [null];
        this.size = 0;
    }

    add(value) {
        // we always add a new value to the end of the array/heap
        this.heap.push(value);
        this.size++;
        // this reshuffles the heap to maintain its constrains 
        // children should be greater than or equal to their parent
        this.bubbleUp();
    }

    bubbleUp() {
        let currentIndex = this.size;
        let parentIndex = getParent(currentIndex);
        // traversing the heap from the bottom to top
        // swap parent and child if the child value is less than the parent value;
        while (currentIndex > 1 && this.heap[current] < this.heap[parentIndex]) {
            this.swap(currentIndex, parentIndex);
            // update the currentIndex to coninue moving up the tree
            currentIndex = parentIndex;
        }
    }

    popMin() {
        if (!this.size) return null;
        // always swap first/min element with last element before removing it
        this.swap(1, this.size);
        const min = this.heap.pop();
        this.size--;
        // this reshuffles teh heap to maintain its constraints
        // children should be greater than or equal to their parent
        this.heapify();
        return min;
    }

    heapify() {
        // after swapping the last element with the first in popMin()
        // traverse the tree from the top down to restore the min-heap conditions
        let currentIndex = 1;
        let leftChildIndex = getLeft(currentIndex);
        let rightChildIndex = getRight(currentIndex);
        // canSwap() is true if the left child exists and it is smaller then the parent OR
        // if the right child exists and it is smaller then the parent
        while (this.canSwap(currentIndex, leftChildIndex, rightChildIndex)) {
            // if the current node has two children we want to swap with the one that has the lower value
            if (this.exists(leftChildIndex) && this.exists(rightChildIndex)) {
                if (this.heap[leftChildIndex] < this.heap[rightChildIndex]) {
                    this.swap(currentIndex, leftChildIndex);
                    // update the current index to continue moving down the tree
                    currentIndex = leftChildIndex;
                } else {
                    this.swap(currentIndex, rightChildIndex);
                    // update the current index to continue moving down the tree
                    currentIndex = rightChildIndex;
                }
            // if it only has one child, we always swap with the left child
            // in a heap a parent node should always be assigned a left child before being assigned a right child
            // so if there is only one child it will always be on the left. 
            } else {
                this.swap(currentIndex, leftChildIndex);
                // update the current index to continue moving down the tree
                currentIndex = leftChildIndex;
            }
            // after the current index gets updated, update the left and right children. 
            leftChildIndex = getLeft(currentIndex);
            rightChildIndex = getRight(currentIndex);
        }
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

module.exports = MinHeap;