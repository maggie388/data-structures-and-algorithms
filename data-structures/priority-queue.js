const MinHeap = require('./min-heap');

// created for use in the graph class in dijkstra's algorithm
class PriorityQueue extends MinHeap {
    constructor() {
        super()
    }
    
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

module.exports = PriorityQueue;