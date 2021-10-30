let mergeDEBUG = 0;

async function mergeSort(mergeArray, low, high)
{
  let middle = Math.floor(low + (high - low) / 2);
  let i = low;
  let j = middle + 1;
  let k = 0;

  //console.log("low: %d, high: %d", low , high);
  if(low >= high || startStop == 0)
    return;

  //console.log("middle: %d\n", middle);
  await mergeSort(mergeArray, low, middle);
  await mergeSort(mergeArray, middle + 1, high);

  let tempArray = [];

  //console.log("i = %d, j = %d, middle = %d, high = %d, mergeArray[i] = %d, mergeArray[j] = %d",
  //        i, j, middle, high, mergeArray[i], mergeArray[j]);

  while(i <= middle || j <= high)
  {
    if(i > middle)
    {
      tempArray.push(mergeArray[j++]);
    }
    else if(j > high)
    {
      tempArray.push(mergeArray[i++]);
    }
    else if(mergeArray[i] < mergeArray[j])
    {
      tempArray.push(mergeArray[i++]);
    }
    else
    {
      tempArray.push(mergeArray[j++]);
    }
  }

  for(i = low; i <= high; i++)
  {
    if(startStop == 1)
      await sleep(1);
    //console.log("tempArray[%d]: %d", i-low, tempArray[i-low]);
    mergeArray[i] = tempArray[i-low];
  }

}
