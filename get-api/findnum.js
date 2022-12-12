function findMissingNumber(arr){
    let min = Math.min(...arr)
    let max = Math.max(...arr)
    let miss =[]

    for(let i = min ; i< max ; i++){
        if(arr.indexOf(i)<0){
            miss.push(i);
        }
    }return miss
}

module.exports.findMissingNumber = findMissingNumber