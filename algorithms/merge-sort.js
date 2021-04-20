/* 
    A strategy that breaks the list-to-be-sorted into smaller parts, sometimes called a divide-and-conquer algorithm.
    In a divide-and-conquer algorithm, the data is continually broken down into smaller elements until sorting them becomes really simple.
    Merge sort was the first of many sorts that use this strategy, and is still in use today in many different applications.

    Merge sorting takes two steps: splitting the data into “runs” or smaller components, and the re-combining those 
    runs into sorted lists (the “merge”).

    The best, worst, and average time complexity are all the same: Θ(N*log(N)).

    Some sorts attempt to improve upon the merge sort by first inspecting the input and looking for “runs” that are 
    already pre-sorted. Timsort is one such algorithm that attempts to use pre-sorted data in a list to the sorting 
    algorithm’s advantage. If the data is already sorted, Timsort runs in Θ(N) time.

    Merge sort also requires space. Each separation requires a temporary array, and so a merge sort would require 
    enough space to save the whole of the input a second time. This means the worst-case space complexity of merge sort is O(N).

    Merge sort returns a new array and does not mutate the original array. 
*/


const mergeSort = (startArray) => {
    const length = startArray.length;

    // base case for recursive function
    if (length === 1) {
        return startArray;
    }

    // recursive case
    const mid = Math.floor(length / 2);
    const leftArray = startArray.slice(0, mid);
    const rightArray = startArray.slice(mid, length);

    return merge(mergeSort(leftArray), mergeSort(rightArray))
}

const merge = (leftArray, rightArray) => {
    const sortedArray = [];
    while (leftArray.length > 0 && rightArray.length > 0) {
        if (leftArray[0] < rightArray[0]) {
            sortedArray.push(leftArray.shift());
        } else {
            sortedArray.push(rightArray.shift());
        }
    }
    // either leftArray or rightArray will still have elements in it after the while loop 
    // concat will add them to the end of the sorted array
    return sortedArray.concat(leftArray).concat(rightArray);
}


const inputArr = [3, 5, 2, 90, 4, 7];
console.log(mergeSort(inputArr));
