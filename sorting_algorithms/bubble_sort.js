
export function bubbleSort(array, animation){
    animation = []
    let object = {
        comparison: null,
        swap: null
    }

    for(let i = 0; i < array.length - 1; i+=1){
        for(let j = 0; j < array.length - i -1; j+=1){
            object.comparison = [j, j + 1]
            if(array[j] > array[j + 1]){
                object.swap = [j, j + 1]
                let temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
            animation.push([object.comparison, object.swap])
            object.comparison = null
            object.swap = null

        }

    }
    return animation
}
