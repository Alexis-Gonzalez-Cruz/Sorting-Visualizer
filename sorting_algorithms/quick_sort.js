
export function quickSort(array, start, end, animation){
    if(end <= start){
        return null
    }

    let pivot = partition(array, start, end, animation)
    quickSort(array, start, pivot - 1, animation)
    quickSort(array, pivot + 1, end, animation)
}

function partition(array, start, end, animation){
    let pivot = array[end]
    let i = start - 1
    let temp

    for(let j = start; j <= end; j++){

        if(array[j] < pivot){
            i += 1
            animation.push([[i, j], [i, j]])
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    i+=1
    animation.push([[i, end], [i, end]])
    temp = array[i]
    array[i] = array[end]
    array[end] = temp

    return i
}
