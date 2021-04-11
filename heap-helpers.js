// helper functions - applicable to any heap class so they can live outside of our MinHeap and MaxHeap classes
// get the index of a given node's parent and children.
const getParent = (currentIndex) => Math.floor(currentIndex / 2);
const getLeft = (currentIndex) => currentIndex * 2;
const getRight = (currentIndex) => currentIndex * 2 + 1;

module.exports = {
    getParent,
    getLeft,
    getRight
}