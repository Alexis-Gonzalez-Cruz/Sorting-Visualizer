
export const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export function insertElementIntoContainer(container, elementToInsert, insertAmount){

    for(let i = 0; i < insertAmount; i+=1){
        container.append(elementToInsert)
    }
}

export function compareArrays(arrayOne, arrayTwo){
    var arrayOneLength = arrayOne.length
    var arrayTwoLength = arrayTwo.length
    var maxIndex = Math.max(arrayOneLength, arrayTwoLength)

    for(let i = 0; i < maxIndex; i+=1){
        if(i < arrayOneLength && i < arrayTwoLength){

            if(arrayOne[i] != arrayTwo[i]){
                return false
            }
        }
        else{
            return false
        }
    }
    return true
}

export function resetArray(min, max, array, arrayLength, arrayContainer){
    array = []
    removeDivArray(arrayContainer)
    fillArray(array, min, max, arrayLength)
    fillArrayWithElements(array, arrayLength, max)
    displayArrayToScreen(array, arrayContainer)
    return array
}

function fillArray(array, min, max, arrayLength){
    for(let i = 0; i < arrayLength; i+=1){
        array[i] = generateRandomNumber(min, max)
    }
}
function fillArrayWithElements(array, arrayLength, max){
    let copyArray = array
    let i = 0
    for(let randNum of copyArray){
        let element = document.createElement("div")
        element.setAttribute("id", `${randNum}`)
        element.setAttribute("class", 'array-item')
        if(checkToRemoveArrayText(arrayLength)){
            element.textContent = randNum
        }
        element.style.height = `${randNum / max * 100}%`
        array[i] = element
        i += 1
    }
    
}
export function displayArrayToScreen(array, arrayContainer){
    for(let element of array){
        arrayContainer.append(element)
    }
}

export function removeDivArray(arrayContainer){
    const arrayItems = document.querySelectorAll(".array-item")
    const newArray = Array.from(arrayItems)
    
    for(let element of newArray){
        arrayContainer.removeChild(element)
    }
}

export function adjustArraySpacing(maxArrayLength, arrayLength, minNumberRange, maxNumberRange){
    const phaseOne = Math.floor(maxArrayLength / 4)
    const phaseTwo = Math.floor(maxArrayLength / 4 * 2)
    const phaseThree = Math.floor(maxArrayLength / 4 * 3)
    
    // phase 1
    if(arrayLength >= minNumberRange && arrayLength <= phaseOne){
        $(".array-item").css('margin-left', '4px')
        $(".array-item").css('margin-right', '4px')
    }
    else if(arrayLength >= phaseOne && arrayLength <= phaseTwo){
        $(".array-item").css('margin-left', '2px')
        $(".array-item").css('margin-right', '2px')
    }
    else if(arrayLength >= phaseTwo && (arrayLength <= phaseThree || arrayLength > phaseThree)){
        $(".array-item").css('margin-left', '1px')
        $(".array-item").css('margin-right', '1px')
    }
}

function checkToRemoveArrayText(arrayLength){
    if(arrayLength < 30){
        return true
    }
    return false
}

export function adjustDelay(arrayLength){
    var rangeOne = 900 // 5 - 13
    var rangeTwo = 600 // 13 - 20
    var rangeThree = 150 // 20 - 50
    var rangeFour = 75 // 50 - 75
    var rangeFive = 10 // 75 - 175
    var finalRange = 0 // 175 - 250

    if(arrayLength >= 5 && arrayLength <= 13){
        return rangeOne
    }
    else if(arrayLength >= 13 && arrayLength <= 20){
        return rangeTwo
    }
    else if(arrayLength >= 20 && arrayLength <= 50){
        return rangeThree
    }
    else if(arrayLength >= 50 && arrayLength <= 75){
        return rangeFour
    }
    else if(arrayLength >= 75 && arrayLength <= 175){
        return rangeFive
    }
    else{
        return finalRange
    }
}