let startingIndex = 1;

function insertionSort(array)
{
  let j;
  let temp;
  let insertIndex;

  for( ; startingIndex < array.length; startingIndex++)
  {
    temp = array[startingIndex];
    insertIndex = startingIndex;

    for(j = startingIndex - 1; j >= 0 && array[j] > temp; j--)
    {
      // console.log("array[j] > temp?: %d, %d", array[j], temp);

      array[j + 1] = array[j];
      insertIndex--;
      insertionHasSwapped = 1;

    }

    array[insertIndex] = temp;

    if(insertionHasSwapped == 1)
    {
      insertionHasSwapped = 0;
      startingIndex++;
      return;
    }
  }

  console.log("Finished insertionSort");
}
