import {mergeSort} from "./sorting_algorithms/merge_sort.js"
import {bubbleSort} from "./sorting_algorithms/bubble_sort.js"
import {quickSort} from "./sorting_algorithms/quick_sort.js"
import {insertionSort} from "./sorting_algorithms/insertion_sort.js"
import { generateRandomNumber, resetArray, adjustArraySpacing, displayArrayToScreen, removeDivArray, adjustDelay } from "./util.js";

const arrayContainer = document.getElementById("array-container")
const rangeSlider = document.getElementById("rangeSlider")
const newArrayButton = document.getElementById("new-array-button")
const sortButton = document.getElementById("sort-button")

// Sorting Algorithms
const mergeSortButton = document.getElementById("merge-sort")
const quickSortButton = document.getElementById("quick-sort")
const insertionSortButton = document.getElementById("insertion-sort")
const bubbleSortButton = document.getElementById("bubble-sort")

// array configurations
let mainArray = []
let mainArrayCopy = []
const minNumberRange = 5
const maxNumberRange = 250
const maxArrayLength = 200
let arrayLength = rangeSlider.value
let currentSelectedAlgorithm = null


// animation
let animation = []
let delay = 0

// other 
const blockMenu = document.getElementById("blockControls")
function waitFor(time){
    return new Promise((resolve) => setTimeout(resolve, time))
}

function blockControlMenuAccessability(){
    if(blockMenu.style.visibility == 'hidden'){
        blockMenu.style.visibility = 'visible'
    }
    else{
        blockMenu.style.visibility = 'hidden'
    }
    
}

async function sortingAnimation(arr, temp){
    mainArray[arr[0][0]].style.backgroundColor = 'lightgreen'
    mainArray[arr[0][1]].style.backgroundColor = 'lightgreen'
    await waitFor(delay)
    
    if(arr[1] != null){
        mainArray[arr[1][0]].style.backgroundColor = 'red'
        mainArray[arr[1][1]].style.backgroundColor = 'red'
    
        temp = mainArray[arr[1][0]]
        mainArray[arr[1][0]] = mainArray[arr[1][1]]
        mainArray[arr[1][1]] = temp
    
        removeDivArray(arrayContainer)
        displayArrayToScreen(mainArray, arrayContainer)
        await waitFor(delay)
    }
    
    mainArray[arr[0][0]].style.backgroundColor = '#4daae7'
    mainArray[arr[0][1]].style.backgroundColor = '#4daae7'
}

function updateArrays(){
    mainArray = resetArray(minNumberRange, maxNumberRange, mainArray, arrayLength, arrayContainer)
    mainArrayCopy = []
    mainArray.forEach((element, index) => {mainArrayCopy[index] = Number(element.id)})    
}

async function animationBubbleSort(){

    animation = currentSelectedAlgorithm(mainArrayCopy, animation)
    let finalIndex = mainArray.length - 1
    let temp
    for(let arr of animation){

        await sortingAnimation(arr, temp)

        // if(arr[0][1] == finalIndex){
        //     mainArray[finalIndex].style.backgroundColor = 'purple'
        //     finalIndex -= 1
        // }

    }
    // mainArray[finalIndex].style.backgroundColor = 'purple'
    $(".array-item").css('background-color', 'rgb(80, 225, 64)')
    await waitFor(1000)
    $(".array-item").css('background-color', '#b578e8')
    blockControlMenuAccessability()


}

async function animationInsertionSort(){
   animation = currentSelectedAlgorithm(mainArrayCopy, animation)
   let temp
   
   for(let arr of animation){
        await sortingAnimation(arr, temp)
   }
   $(".array-item").css('background-color', 'rgb(80, 225, 64)')
   await waitFor(1000)
   $(".array-item").css('background-color', '#b578e8')

   blockControlMenuAccessability()
}

async function animationQuickSort(){
    animation = []
    currentSelectedAlgorithm(mainArrayCopy, 0, mainArrayCopy.length-1, animation)
    let temp
    for(let arr of animation){
        await sortingAnimation(arr, temp)
    }
    $(".array-item").css('background-color', 'rgb(80, 225, 64)')
    await waitFor(1000)
    $(".array-item").css('background-color', '#b578e8')
    blockControlMenuAccessability()


}

async function animationMergeSort(){
    async function mergeHelper(arr){
        mainArray[arr[0][0]].style.backgroundColor = 'lightgreen'
        mainArray[arr[0][1]].style.backgroundColor = 'lightgreen'
        await waitFor(delay)
        if(arr[1] != null){
            mainArray[arr[1][0]].style.backgroundColor = 'red'
            mainArray[arr[1][1]].style.backgroundColor = 'red'

            let elToMove = mainArray[arr[1][1]]
            let idxOfEl = arr[1][1]
            let stop = arr[1][0]
            for(let i = idxOfEl-1; i >= stop; i--){
                mainArray[i + 1] = mainArray[i]
                if(i == stop){
                    mainArray[i] = elToMove
                }
            }

            removeDivArray(arrayContainer)
            displayArrayToScreen(mainArray, arrayContainer)

            await waitFor(delay)
        }
        mainArray[arr[0][0]].style.backgroundColor = '#4daae7'
        mainArray[arr[0][1]].style.backgroundColor = '#4daae7'
    }
    animation = []
    currentSelectedAlgorithm(mainArrayCopy, animation)

    for(let arr of animation){
        await mergeHelper(arr)
    }

    $(".array-item").css('background-color', 'rgb(80, 225, 64)')
    await waitFor(1000)
    $(".array-item").css('background-color', '#b578e8')
    blockControlMenuAccessability()
}
    


function appStart(){

    updateArrays()
    delay = adjustDelay(arrayLength)
    adjustArraySpacing(maxArrayLength, arrayLength, minNumberRange, maxNumberRange)
    
    // generate new array
    newArrayButton.addEventListener('click', () =>{
    updateArrays()
    delay = adjustDelay(arrayLength)
    adjustArraySpacing(maxArrayLength, arrayLength, minNumberRange, maxNumberRange)
    })

    // range slider
    rangeSlider.addEventListener('mouseup', () => {
        arrayLength = rangeSlider.value
        updateArrays()
        delay = adjustDelay(arrayLength)
        adjustArraySpacing(maxArrayLength, arrayLength, minNumberRange, maxNumberRange)
        console.log(mainArrayCopy)
    })

    // merge sort 
    mergeSortButton.addEventListener('click', () => {
    currentSelectedAlgorithm = mergeSort
    $(".control-texts").css('color', '#dbe9f0')
    $("#merge-sort").css('color', 'rgb(80, 225, 64)')
    if(sortButton.style.visibility == 'hidden'){
        sortButton.style.visibility = 'visible'        
    }
    })

    // quick sort
    quickSortButton.addEventListener('click', () => {
    currentSelectedAlgorithm = quickSort
    $(".control-texts").css('color', '#dbe9f0')
    $("#quick-sort").css('color', 'rgb(80, 225, 64)')
    if(sortButton.style.visibility == 'hidden'){
        sortButton.style.visibility = 'visible'
    }
    })

    // insertion sort
    insertionSortButton.addEventListener('click', () => {
    currentSelectedAlgorithm = insertionSort
    $(".control-texts").css('color', '#dbe9f0')
    $("#insertion-sort").css('color', 'rgb(80, 225, 64)')
    if(sortButton.style.visibility == 'hidden'){
        sortButton.style.visibility = 'visible'
    }
    })

    // bubble sort
    bubbleSortButton.addEventListener('click', () => {
    currentSelectedAlgorithm = bubbleSort
    $(".control-texts").css('color', '#dbe9f0')
    $("#bubble-sort").css('color', 'rgb(80, 225, 64)')
    if(sortButton.style.visibility == 'hidden'){
        sortButton.style.visibility = 'visible'
    }
    })

    // sort 
    sortButton.addEventListener('click', () => {
    blockControlMenuAccessability()

    switch(currentSelectedAlgorithm){
        case mergeSort : 
        animationMergeSort()
        break
        case bubbleSort :
        animationBubbleSort()
        break
        case insertionSort : 
        animationInsertionSort()
        break
        case quickSort : 
        animationQuickSort()
        break
    }

    })

}



appStart()
