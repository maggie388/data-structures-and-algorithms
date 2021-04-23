const Heap = require('./heap');
const { getParent, getLeft, getRight } = require('./heap-helpers');

class MinHeap extends Heap {
    constructor() {
        super()
    }

    // used after a value is added to maintian the contraints of the MinHeap
    bubbleUp() {
        let currentIndex = this.size;
        let parentIndex = getParent(currentIndex);
        // traversing the heap from the bottom to top
        // swap parent and child if the child value is less than the parent value;
        while (currentIndex > 1 && this.heap[currentIndex] < this.heap[parentIndex]) {
            this.swap(currentIndex, parentIndex);
            // update the currentIndex to coninue moving up the tree
            currentIndex = parentIndex;
        }
    }

    // used after a value is removed to maintain the constraints of the MinHeap
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

    // HELPER METHODS
    canSwap(currentIndex, leftChildIndex, rightChildIndex) {
        // Check that one of the possible swap conditions exists
        return (
          this.exists(leftChildIndex) && this.heap[currentIndex] > this.heap[leftChildIndex]
          || this.exists(rightChildIndex) && this.heap[currentIndex] > this.heap[rightChildIndex]
        );
    }
}


// created for use in the graph class in dijkstra's algorithm
class PriorityQueue extends MinHeap {
    bubbleUp() {
        let current = this.size;
        while (current > 1 && this.heap[getParent(current)].priority > this.heap[current].priority) {
            this.swap(current, getParent(current));
            current = getParent(current);
        }
    }

    heapify() {
        let current = 1;
        let leftChild = getLeft(current);
        let rightChild = getRight(current);

        // Check that there is something to swap (only need to check the left if both exist)
        while (this.canSwap(current, leftChild, rightChild)) {
            // Only compare left & right if they both exist
            if (this.exists(leftChild) && this.exists(rightChild)) {
                // Make sure to swap with the smaller of the two children
                if (this.heap[leftChild].priority < this.heap[rightChild].priority) {
                    this.swap(current, leftChild);
                    current = leftChild;
                } else {
                    this.swap(current, rightChild);
                    current = rightChild;
                }
            } else {
                // If only one child exist, always swap with the left
                this.swap(current, leftChild);
                current = leftChild;
            }
            leftChild = getLeft(current);
            rightChild = getRight(current);
        }
    }

    canSwap(current, leftChild, rightChild) {
        // Check that one of the possible swap conditions exists
        return (
            this.exists(leftChild) && this.heap[current].priority > this.heap[leftChild].priority
            || this.exists(rightChild) && this.heap[current].priority > this.heap[rightChild].priority
        );
    }
}

module.exports = {
    MinHeap,
    PriorityQueue
};