let DEBUG = 0;
let quickSortCalled = 0;

async function quickSort(array, low, high)
{
  let pivotIndex;
  let pivot = low;
  let lPointer = low + 1; // wants # > to quickArray[pivot]
  let rPointer = high; // wants # <= to quickArray[pivot]

  //console.log("I'm in\n");

  // BaseCases
  if(pivot == rPointer || low >= high || startStop == 0)// NEW added startStop
  {
      if(DEBUG)
      {
        console.log("From returned quickSort: pivot: %d, lPointer: %d, rPointer: %d, quickArray[pivot]: %f, quickArray[lPointer]: %f, `` %f\n",
                      pivot, lPointer, rPointer, array[pivot], array[lPointer], array[rPointer]);
      }
      return;
  }

  //console.log("new quickSort: pivot: %d, lPointer: %d, rPointer: %d, quickArray[pivot]: %f, quickArray[lPointer]: %f, `` %f\n",
  //        pivot, lPointer, rPointer, array[pivot], array[lPointer], array[rPointer]);

  while(!(lPointer > rPointer) && (rPointer >= pivot) && (lPointer <= high))
  {
      //console.log("in WHILE, lPointer: %d, rPointer: %d, quickArray[pivot]: %f, quickArray[lPointer]: %f, `` %f\n",
      //       lPointer, rPointer, array[pivot], array[lPointer], array[rPointer]);

      if(array[lPointer] > array[pivot] && array[rPointer] <= array[pivot])
      {
          //console.log("***swap*** lPointer & rPointer cells");
          await swap(array, lPointer, rPointer);
          lPointer++;
          rPointer--;
      }
      else if(array[lPointer] <= array[pivot] && array[rPointer] > array[pivot])
      {
          lPointer++;
          rPointer--;
      }
      else if(array[lPointer] > array[pivot])
      {
          rPointer--;
      }
      else if(array[rPointer] <= array[pivot])
      {
          lPointer++;
      }
  }

  //console.log("swap");
  await swap(array, pivot, rPointer);
  //console.log("*** In left quickSort");
  await quickSort(array, low, rPointer - 1);
  //console.log("*** Left quickSort finished***");
  //console.log("*** In Right quickSort");
  await quickSort(array, rPointer + 1, high);
  //console.log("*** right quickSort finished***");
}

async function swap(array, i, j)
{
  await sleep(10);

	let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
