const useMemo = function(callBack, dependencyArr){
    const cache = useRef({dependencyArr:null, result:null})
    function isEqual(arr1, arr2){
        let len1= arr1.length
        let len2=arr2.length
        if(len1 == len2){
            for(let i=0;i<len1;i++){
                if(arr1[i]!==arr2[i]){
                    return false
                }
            }
            return true
        }else{
            return false
        }
    }
    if(cache.current.dependencyArr && isEqual(dependencyArr, cache.current.dependencyArr)){
        return cache.current.result
    }else{
        cache.current.dependencyArr = dependencyArr
        cache.current.result = callBack()
        return cache.current.result
    }
}