let isIndexed = 0;

function bubbleSort(bubbleArray, hasSwapped)
{
	if(hasSwapped == 1)
	{
			hasSwapped = 0;
			for(j = 0; j < bubbleArray.length - isIndexed - 1; j++)
			{
				// console.log("bubbleArray[%d]: %d, bubbleArray[%d]: %d",
				//							j, bubbleArray[j], j + 1, bubbleArray[j+1]);

				if(bubbleArray[j] > bubbleArray[j+1])
				{
					//console.log("***Swapped**");
					bubbleSwap(bubbleArray, j, j + 1);
					hasSwapped = 1;
				}
			}
			isIndexed++;
	}
	else
	{
		console.log("Finished Bubble Sort!!");
		return 0;
	}

	//console.log("hasSwapped: %d", hasSwapped);
	return hasSwapped;
}

function bubbleSwap(array, i, j)
{
	let temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}
