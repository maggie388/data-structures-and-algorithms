/*
  The bubble sort algorithm takes an array of elements and reorders the elements of the input from smallest to largest. 
  To achieve this, bubble sort works by comparing a pair of neighboring elements and swapping their positions in the array 
  so that the larger of the two elements is always on the right. 
  
  Doing this continuously results in the largest element “bubbling” up to the end of the array, giving this sort its name. 

  The algorithm only stops when there are no more values that need to be swapped.

  while array is not sorted
  for each value in array
    if current value > next value
      swap current value and next value

    return array


    Bubble sort is not the most efficient sorting algorithm. Bubble sort’s worst-case runtime is O(n^2). 
    This is because we have to compare the current element we are looking at, to each element in the array after it 
    and repeat this check for every single element in the array. Its best-case runtime is O(n) for an already-sorted list.
*/

const swap = (arr, indexOne, indexTwo) => {
    const temp = arr[indexTwo];
    arr[indexTwo] = arr[indexOne];
    arr[indexOne] = temp;
};

// another way to swap using destructuring assignment syntax
const swap2 = (arr, indexOne, indexTwo) => {
    [arr[indexOne], arr[indexTwo]] = [arr[indexTwo], arr[indexOne]];
};


const bubbleSort = input => {
    let swapCount = 0
    let swapping = true;

    while (swapping) {
        swapping = false;
        for (let i = 0; i < input.length - 1; i++) {
            if (input[i] > input[i + 1]) {
                swap(input, i, i + 1);
                swapCount++;
                swapping = true;
            }
        }
    }
    console.log(`Swapped ${swapCount} times`);
    return input;
};

console.log(bubbleSort([9, 8, 7, 6, 5, 4, 3, 2, 1]));
console.log(bubbleSort([1, 2, 3, 4, 5, 6, 7, 8, 9]));