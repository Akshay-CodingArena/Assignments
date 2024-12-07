const filteredDataByPage = ()=>{

}

const filteredDataBySearch = (arr, search)=>{
    console.log("Array is", arr, search)
    const result =  arr.filter((image)=>{
        if(image.name.toLowerCase().indexOf(search.toLowerCase()) > -1){
            return true
        }
        else{
            return false
        }
    })
    console.log("res",result)
    return result
}

export {filteredDataByPage, filteredDataBySearch}