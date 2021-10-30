let pow = 1;
let x = new Array(10);
let sigCounter = new Array(10);
let indexThroughCounter = 0;
let radixArrayIndex = 0;
let jcounter = 0;

function radixSort(array)
{
  let max = Math.max(...array);
  let len = array.length;
  let xLen;

  if(radixHasSwapped == 0)
  {
    for(j = 0; j < x.length; j++)
    {
      sigCounter[j] = 0;
      x[j] = new Array();
    }

    indexThroughCounter = 0;
  }

  for( ; Math.floor(max / pow) > 0; pow *= 10)
  {
    //console.log("pow: %d, max/pow: %d", pow, Math.floor(max / pow));
    if(radixHasSwapped == 0)
    {
      // Put curretn significant digit into new sigCounter array
      for(j = 0; j < len; j++)
      {
        let currentSigDigit = Math.floor((array[j] / pow) % 10);
        // console.log("array[%d]: %d, currentSigDigit: %d\n", j, array[j], currentSigDigit);
        let temp = array[j];
        sigCounter[currentSigDigit]= x[currentSigDigit].push(temp);
        // console.log("sigCounter[%d]: %d", currentSigDigit, sigCounter[currentSigDigit]);
      }
    }

    for( ; jcounter < 10; jcounter++)
    {

      if(sigCounter[jcounter] == 0)
      {
        continue;
      }

      // console.log("indexThroughCounter: %d, jcounter: %d, sigCounter[jcounter]: %d\n", indexThroughCounter, jcounter, sigCounter[jcounter]);

      for( ; indexThroughCounter < sigCounter[jcounter]; )
      {
        array[radixArrayIndex++] = x[jcounter].shift();

        // console.log("in for loop, indexThroughCounter: %d, array[%d]: %d\n"
        //                          , indexThroughCounter, radixArrayIndex - 1
        //                          , array[radixArrayIndex - 1]);
        // console.log("sigCounter[%d]: %d", jcounter, sigCounter[jcounter]);

        radixHasSwapped = 1;
        indexThroughCounter++;

        return;
      }

      indexThroughCounter = 0;
    }

    // sigCounter reset
    for(j = 0; j < 10; j++)
    {
      sigCounter[j] = 0;
      x[j] = [];
    }

    radixArrayIndex = 0;
    jcounter = 0;
    radixHasSwapped = 0;
  }
}
