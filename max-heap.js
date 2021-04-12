const { getParent, getLeft, getRight } = require('./heap-helpers');

class MaxHeap {
    constructor() {
        this.heap = [null];
        this.size = 0;
    }

    add(value) {
        this.heap.push(value);
        this.size++;
        this.bubbleUp();
    }

    bubbleUp() {
        let currentIndex = this.size;
        let parentIndex = getParent(currentIndex);
        while (currentIndex > 1 && this.heap[currentIndex] > this.heap[parentIndex]) {
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    popMax() {
        if (!this.size) return null;
        this.swap(1, this.size);
        const max = this.heap.pop();
        this.size--;
        this.heapify();
        return max;
    }

    heapify() {
        let currentIndex = 1;
        let leftChildIndex = getLeft(currentIndex);
        let rightChildIndex = getRight(currentIndex);
        while (this.canSwap(currentIndex, leftChildIndex, rightChildIndex)) {
            if (this.exists(leftChildIndex) && this.exists(rightChildIndex)) {
                if (this.heap[leftChildIndex] < this.heap[rightChildIndex]) {
                    this.swap(currentIndex, rightChildIndex);
                    currentIndex = rightChildIndex;
                } 
            } else {
                this.swap(currentIndex, leftChildIndex);
                currentIndex = leftChildIndex;
            }
            leftChildIndex = getLeft(currentIndex);
            rightChildIndex = getRight(currentIndex);
        }
    }

    // HELPER METHODS
    exists(index) {
        return index <= this.size;
    }

    canSwap(currentIndex, leftChildIndex, rightChildIndex) {
        return (
          this.exists(leftChildIndex) && this.heap[currentIndex] < this.heap[leftChildIndex]
          || this.exists(rightChildIndex) && this.heap[currentIndex] < this.heap[rightChildIndex]
        );
    }

    swap(a, b) {
        // this is destructuring assignment syntax
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
}

module.exports = MaxHeap;