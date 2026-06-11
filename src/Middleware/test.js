let arr = [2,4,6,1,9,7]
let highest = arr[0]
let secHigh = arr[0]

for(let i=0;i<arr.length;i++){
    if(arr[i]>highest){
        highest = arr[i]
        secHigh = highest
    }else if(secHigh>highest){
        highest = secHigh
    }
}

console.log(highest)
console.log(secHigh)

