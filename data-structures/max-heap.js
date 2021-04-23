const Heap = require('./heap');
const { getParent, getLeft, getRight } = require('./heap-helpers');

class MaxHeap extends Heap {
    constructor() {
        super()
    }

    bubbleUp() {
        let currentIndex = this.size;
        let parentIndex = getParent(currentIndex);
        while (currentIndex > 1 && this.heap[currentIndex] > this.heap[parentIndex]) {
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
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
    canSwap(currentIndex, leftChildIndex, rightChildIndex) {
        return (
          this.exists(leftChildIndex) && this.heap[currentIndex] < this.heap[leftChildIndex]
          || this.exists(rightChildIndex) && this.heap[currentIndex] < this.heap[rightChildIndex]
        );
    }
}

module.exports = MaxHeap;