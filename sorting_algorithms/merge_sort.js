export function mergeSort(array, animations) {
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    let mainArrayCopy = array.map((num, idx) => {return [num, idx]})
    mainArrayCopy = mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations, mainArrayCopy);
    return mainArrayCopy
}
  
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations, mainArrayCopy) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations, mainArrayCopy);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations, mainArrayCopy);
    mainArrayCopy = doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations, mainArrayCopy);
    return mainArrayCopy
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations, mainArrayCopy) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1; 

    mainArrayCopy = mainArray.map((num, idx) => {return [num, idx]})

    while (i <= middleIdx && j <= endIdx) {
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([[mainArrayCopy[i][1], mainArrayCopy[j][1]], null])
            mainArray[k++] = auxiliaryArray[i++];

        } 
        else {
            animations.push([[mainArrayCopy[i][1], mainArrayCopy[j][1]],[k, mainArrayCopy[j][1]]])
            let target = k
            let elToMove = mainArrayCopy[j][1]
            mainArrayCopy.forEach((arr) => {
                if(arr[1] >= target && arr[1] < elToMove){
                    arr[1]++
                }
            });
            mainArrayCopy[j][1] = k

            mainArray[k++] = auxiliaryArray[j++];
        }
        
    }

    while (i <= middleIdx) {
        mainArray[k++] = auxiliaryArray[i++];

    }

    while (j <= endIdx) {
        mainArray[k++] = auxiliaryArray[j++];

    }
    return mainArrayCopy
 
}
