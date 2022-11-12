
export function insertionSort(array, animation){
    animation = []
    let temp
    let j
    for(let i = 1; i < array.length; i+=1){
        temp = array[i]
        j = i - 1
        if(!(j >= 0 && array[j] > temp)){
            animation.push([[j, i], null])
        }
        while(j >= 0 && array[j] > temp){
            animation.push([[j, j + 1], [j, j + 1]])
            array[j + 1] = array[j]
            j -= 1
        }
        array[j + 1] = temp
    }
    return animation
}