/*
    Quicksort uses a divide and conquer strategy.

    We choose a single pivot element from the list. 
    Every other element is compared with the pivot, which partitions the array into three groups.
        1. A sub-array of elements smaller than the pivot.
        2. The pivot itself.
        3. A sub-array of elements greater than the pivot.
    The process is repeated on the sub-arrays until they contain zero or one element.

    Elements are sorted in place, there are no new arrays being created.

    The key to Quicksort’s runtime efficiency is the division of the array. 
    Here are strategies for selecting the pivot:
        1. Select a random element as the pivot for each step. 
            The benefit is that no particular data set can be chosen ahead of time to make the algorithm perform poorly.
        2. Take the first, middle, and last elements of the array and choose the median element as the pivot. 
            The benefit is that the division of the array tends to be more uniform.

    The worst case runtime is O(N^2), but the average case is O(N * logN).
    While we typically only discuss the worst case, for Quicksort it’s so uncommon that we generally refer to it as O(N * logN).
*/

const swap = (arr, indexOne, indexTwo) => {
    [arr[indexOne], arr[indexTwo]] = [arr[indexTwo], arr[indexOne]];
};

// when we first call this function we only pass in our array so we set defaults values
// for the left and right bound that will be used on that initial call
// those values will always be 0 and the last index of the array
const quicksort = (array, leftBound = 0, rightBound = array.length - 1) => {
    if (leftBound < rightBound) {
        const pivotIndex = partition(array, leftBound, rightBound);
        quicksort(array, leftBound, pivotIndex - 1);
        quicksort(array, pivotIndex, rightBound);
    }
    return array;
}

const partition = (array, leftIndex, rightIndex) => {
    const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
    while (leftIndex <= rightIndex) {
        while (array[leftIndex] < pivot) {
            leftIndex++;
        }
        while (array[rightIndex] > pivot) {
            rightIndex--;
        }
        if (leftIndex <= rightIndex) {
            swap(array, leftIndex, rightIndex);
            leftIndex++;
            rightIndex--;
        }
    }
    return leftIndex;
}

const myArray = [4, 6, 9, 1, 3, 0, 5, 1, 6, 3, 9, 4, 7];
console.log(quicksort(myArray));


// where the left pivot and right start start on the first call to partition()
// [4, 6, 9, 1, 3, 0, 5, 1, 6, 3, 9, 4, 7]
//  L                 P                 R
//  0                 6                 12

// on the first iteration of the outter while loop, the two inner while loops will stop at these positions
// then the if statement checks if the outter loop condition is still true, 
// if it is, we have to swap the numbers so the inner while loops can continue.
// [4, 6, 9, 1, 3, 0, 5, 1, 6, 3, 9, 4, 7]
//     L              P              R
//     1              6              11

// status after teh swap in the if statement, now the inner while loops will resume. 
// [4, 4, 9, 1, 3, 0, 5, 1, 6, 3, 9, 6, 7]
//        L           P           R
//        2           6           10

// this is the next time the inner while loops stop and we reach the if statement
// [4, 4, 9, 1, 3, 0, 5, 1, 6, 3, 9, 6, 7]
//        L           P        R
//        2           6        9

// the numbers get swapped and indexes incremented
// [4, 4, 3, 1, 3, 0, 5, 1, 6, 9, 9, 6, 7]
//           L        P     R
//           2        6     9

// the inner while loop continues and, the next time they stop is here
// [4, 4, 3, 1, 3, 0, 5, 1, 6, 9, 9, 6, 7]
//                    L  R
//                    P
//                    6  8

// then the numbers get swapped and indexes incremented
// now the outter loop contition is false and we return the left index (8)
// which we then use to partition the array into sub-arrays on the next call to quicksort()
// [4, 4, 3, 1, 3, 0, 1, 5, 6, 9, 9, 6, 7]
//                    R  L
//                    P
//                    6  8


// next we call quicksort() on the two resulting sub-arrays
// this will operate on [4, 4, 3, 1, 3, 0, 1, 5]
// partition([4, 4, 3, 1, 3, 0, 1, 5, 6, 9, 9, 6, 7], 0, 7);
// this will operate on [6, 9, 9, 6, 7]
// partition([4, 4, 3, 1, 3, 0, 1, 5, 6, 9, 9, 6, 7], 8, 12);