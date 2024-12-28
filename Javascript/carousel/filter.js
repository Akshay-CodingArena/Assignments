const filteredDataBySearch = (arr, search)=>{
    const result =  arr.filter((image)=>{
        if(image.name.toLowerCase().indexOf(search.toLowerCase()) > -1){
            return true
        }
        else{
            return false
        }
    })
    return result
}

export {filteredDataBySearch}