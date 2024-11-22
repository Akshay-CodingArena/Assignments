const findVowels = function(){
    let vowels = ['a','e','i','o','u']
    let length = this.length
    let temp = this.toLowerCase()
    let result = []
    for(let i=0; i<length; i++){
        if(vowels.indexOf(temp[i])>=0){
            result.push(temp[i])
        }
    }
    return result
}

String.prototype.findVowels = findVowels

const repeat = function(nums){
    let final = ""
    for(let i=0;i<=nums;i++){
        final+=this
    }
    return final
}

String.prototype.repeatStr = repeatStr