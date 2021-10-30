let startStop = 0;
let sortSelected = -1;
let randomizeArray = 0;
let maxBoundaryYTop;
let maxBoundaryYBottom;
let maxBoundarySortSelectionYBottom;
let tealColor;
let radioTealValue;
let radioBlackValue;
let radioRGBValue;

let bubbleHasSwapped = 1;
let insertionHasSwapped = 0;
let radixHasSwapped = 0;
let mergeHasBeenCalled = 0;
let quickHasBeenCalled = 0;

let imageBubbleSort;
let imageInsertionSort;
let imageRadixSort;
let imageMergeSort;
let imageQuickSort;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Load Images
  imageBubbleSort = loadImage('Images/BubbleSortImage.png');
  imageInsertionSort = loadImage('Images/InsertionSortImage.png');
  imageRadixSort = loadImage('Images/RadixSortImage.png');
  imageMergeSort = loadImage('Images/MergeSortImage.png');
  imageQuickSort = loadImage('Images/QuickSortImage.png');

  // Set up Images/Buttons/Layout
  setupBackground();

  randomArray = new Array(width);

  // For options "Teal Blue", "Black & White", & "RGB"
  radioOptions();

  for(let i = 0; i < width; i++)
  {
    randomArray[i] = random(maxBoundaryYTop - maxBoundaryYBottom);
    // console.log("before sort: sortArray \[%d] = %d\n", i, randomArray[i]);
  }
}

function draw()
{
  let heightToValidColor;
  let heightToGreen;
  let heightToBlue;

  background(0);

  // Every time another sort is selected
  if(randomizeArray == 1)
  {
    randomizeArray = 0;

    resetGlobalValues();

    // New random array
    for(let i = 0; i < width; i++)
    {
      randomArray[i] = random(maxBoundaryYTop - maxBoundaryYBottom);
    }
  }

  // calls a sort function
  if(startStop == 1)
  {
    if(sortSelected == 0)
    {
      bubbleHasSwapped = bubbleSort(randomArray, bubbleHasSwapped);
    }
    else if(sortSelected == 1)
    {
      insertionSort(randomArray);
    }
    else if(sortSelected == 2)
    {
      radixSort(randomArray);
    }
    else if(sortSelected == 3)
    {
      if(mergeHasBeenCalled == 0)
      {
        mergeHasBeenCalled = 1;
        mergeSort(randomArray, 0, randomArray.length - 1);
      }
    }
    else if(sortSelected == 4)
    {
      if(quickHasBeenCalled == 0)
      {
        quickHasBeenCalled = 1;
        quickSort(randomArray, 0, randomArray.length - 1);
      }
    }
  }

  setupBackground();

  radioTealValue = radioTeal.value();
  radioBlackValue = radioBlack.value();
  radioRGBValue = radioRGB.value();

  // Determines line color
  if(radioTealValue)
  {

    stroke(tealColor);
  }

  let divisor1 = 255 / (maxBoundaryYTop / 3);
  let divisor2 = 255 / (maxBoundaryYTop * 2 / 3);
  let divisor3 = 255 / (maxBoundaryYTop);

  stroke(tealColor);

  for(i = 0; i < randomArray.length; i++)
  {
    // Black & White options
    if(radioBlackValue)
    {
      heightToValidColor = ((maxBoundaryYTop - randomArray[i] + 50) / 2.827) % 255;
      stroke(heightToValidColor);
    }
    // This is supposed to be a rainbow but it doesnt work. Future TODO
    else if(radioRGBValue)
    {
      if(randomArray[i] < maxBoundaryYTop / 3)
      {
        heightToRed = Math.floor(Math.abs(randomArray[i] * divisor1 - 255));
        heightToGreen = Math.floor(randomArray[i] * divisor1);
        heightToBlue = 0;
      }
      else if(randomArray[i] >= maxBoundaryYTop/3 && randomArray[i] < maxBoundaryYTop*2/3)
      {
        heightToRed = 0;
        heightToGreen = Math.floor(Math.abs(randomArray[i] * divisor2 - 255));
        heightToBlue = Math.floor(randomArray[i] * divisor2);
      }
      else
      {
        heightToRed = Math.floor(randomArray[i] * divisor3);
        heightToGreen = 0;
        heightToBlue = Math.floor(Math.abs(randomArray[i] * divisor3 - 255));
      }

      // console.log(heightToRed, heightToBlue, heightToGreen);

      stroke(heightToRed, heightToGreen, heightToBlue);
    }

    // console.log("randomArray[%d] = %d\n", i, randomArray[i]);
    line(i, height, i, height - randomArray[i]);
  }

  // console.log("sort Selected: %d", sortSelected);
  // console.log("startStop: %d", startStop);

  // noLoop();
}

function resetGlobalValues()
{
  // Bubble global variables
  isIndexed = 0;

  // Insertion global variables
  startingIndex = 1

  // Radix gloval variables
  pow = 1;
  x = new Array(10);
  sigCounter = new Array(10);
  indexThroughCounter = 0;
  radixArrayIndex = 0;
  jcounter = 0;

}

function setupBackground()
{
  tealColor= color(102, 252, 241);

  let topX = width/5;
  let topY = height/8;

  stroke(0);
  fill(31, 40, 51);
  rect(0, 0, width, height/8); // rectangle for sort selection
  for(let i = 0; i < 5; i++) // lines separating the sorts
  {
      line(topX, 0, topX, topY);
      topX += width/5;
  }

  image(imageBubbleSort, 0, 0, width/5, height/8);
  image(imageInsertionSort, width*1/5, 0, width/5, height/8);
  image(imageRadixSort, width*2/5, 0, width/5, height/8);
  image(imageMergeSort, width*3/5, 0, width/5, height/8);
  image(imageQuickSort, width*4/5, 0, width/5, height/8);

  rect(0, height/8, width, height/12);

  // OPTIONS BOX code from left to right visually
  // From left most side of screen to separating line in middle = height*3/10

  // Start/Stop button
  if(startStop == 0)
  {
    stroke(204, 50, 50);
  }
  else if(startStop == 1)
  {
    stroke(45, 201, 55);
  }

  fill(0);
  rect(width*4/160, height*7/48, width*18/160, height*1/24);

  if(startStop == 0)
  {
    fill(204, 50, 50);
  }
  else if(startStop == 1)
  {
    fill(45, 201, 55);
  }

  textSize(10);
  textAlign(CENTER, CENTER);
  text('START/STOP', width*16/200, height*8/48);

  // Randomize Button
  fill(0);
  stroke(255)
  rect(width*26/160, height*7/48, width*18/160, height*1/24);

  stroke(0)
  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text('RANDOMIZE', width*35/160, height*8/48);

  //Title / name / git account
  fill(255);
  stroke(0);
  textSize(25);
  textAlign(CENTER, CENTER);
  text('Sorting Simulator', width/2, topY + height/45);
  textSize(13);
  textAlign(CENTER, CENTER);
  text('https://github.com/JesseJ756', width/2, topY + height/18);
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Jesse Johnson', width/2, topY + height/14);

  // Sorting boxes are 3/27 of height and options box is 5/24 from top of frame
  stroke(255);
  line(width*3/10, height*7/48, width*3/10, height*9/48);
  line(width*7/10, height*7/48, width*7/10, height*9/48);

  // Text for radio options
  textSize(13);
  textAlign(CENTER, CENTER);
  fill(tealColor);
  text('Teal Blue', width*127/160, height*27/192);

  textSize(13);
  textAlign(CENTER, CENTER);
  stroke(0);
  fill(0);
  text('Black', width*125/160, height*32/192);
  fill(127);
  text(' & ', width*129/160, height*32/192);
  fill(255);
  text('White', width*133/160, height*32/192);

  textSize(13);
  textAlign(CENTER, CENTER);
  stroke(0);
  fill(255, 0, 0);
  text('R', width*123/160, height*37/192);
  fill(0, 255, 0);
  text('G', width*125/160, height*37/192);
  fill(0, 0, 255);
  text('B', width*127/160, height*37/192);

  maxBoundaryYBottom = 0;
  maxBoundaryYTop = (height - (height/8 + height/12));
  maxBoundarySortSelectionYBottom = height/8;
}

function radioOptions()
{
  radioTeal = createRadio();
  radioBlack = createRadio();
  radioRGB = createRadio();

  radioTeal.option(1, '');
  radioTeal.position(width*59/80, height*6/48);

  radioBlack.option(2, '');
  radioBlack.position(width*59/80, height*7.35/48);

  radioRGB.option(3, '');
  radioRGB.position(width*59/80, height*8.7/48);
}

function mousePressed()
{
  let lastSortSelected = sortSelected;

  // If mouseY is over any sort button
  if(mouseY <= maxBoundarySortSelectionYBottom)
  {
      if(mouseX > 0 && mouseX <= width/5)
      {
        sortSelected = 0;
      }
      else if(mouseX > width/5 && mouseX <= width*2/5)
      {
        sortSelected = 1;
      }
      else if(mouseX > width*2/5 && mouseX <= width*3/5)
      {
        sortSelected = 2;
      }
      else if(mouseX > width*3/5 && mouseX <= width*4/5)
      {
        sortSelected = 3;
      }
      else if(mouseX > width*4/5 && mouseX <= width)
      {
        if(lastSortSelected != 4)
          quickHasBeenCalled = 0;

        sortSelected = 4;
      }

      if(lastSortSelected != sortSelected)
      {
        startStop = 0;
        randomizeArray = 1;
        if(bubbleHasSwapped == 0)
          bubbleHasSwapped = 1;
      }
  }

  //console.log("mouseY: %d, height*7/18 && other: %d, %d\n", mouseY, height*7/48, height*9/48);
  //console.log("mouseX: %d, width*4/160 && other: %d, %d\n", mouseX, width*4/160, width*11/80);

  // if start/stop button is clicked
  if((mouseX >= width*4/160) && (mouseX <= width*11/80)
    && (mouseY >= height*7/48) && (mouseY <= height*9/48))
  {
    if((sortSelected == 3 || sortSelected == 4) && startStop == 1)
      randomizeArray = 1;

    startStop = startStop == 1 ? 0 : 1;
  }

  // If randomize button is clicked
  if(mouseX >= width*26/160 && mouseX <= width*44/160
    && mouseY >= height*7/48 && mouseY <= height*9/48)
  {
      startStop = 0;
      randomizeArray = 1;
  }
}

// Fit program on screen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
