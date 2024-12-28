const debounce = (callBack, waitTime)=>{
    let id
    return (...params)=>{
        clearTimeout(id)
        id = setTimeout(()=>callBack(params), waitTime)
    }
}

const throttle = (callBack, waitTime)=>{
    let id
    return (...params)=>{
        clearInterval(id)
        id = setInterval(()=>callBack(params), waitTime)
    }
}

const trailingDebounce = (callBack, wait)=>{
    let id = null
    return (...params)=>{
       clearTimeout(id)
       id = setTimeout(()=>{
         callBack(...params)
       }, wait)
    }
  }
  
  const leadingDebounce = (callBack, wait)=>{
    let id = null
    return (...params)=>{
      if(id==null){
        callBack()
      }
      clearTimeout(id)
      id = setTimeout(()=>{
         id=null
       }, wait)
    }
  }

const debounceCombine = (callBack, wait=1000, option={isLeading:false, isTrailing:true})=>{
    let id =null
    let isLeading = option?option.isLeading:false
    let isTrailing = option?(option.isTrailing?true:false):true
    return (...params)=>{
        let isInvoked = false
        if(id==null && isLeading){
          callBack(...params)
          isInvoked = true
        }
        clearTimeout(id)
        id=setTimeout(()=>{
          id=null
          if(isTrailing && !isInvoked){
            callBack(...params)
          }
        },wait)
    }
 }
 
const clickMe = ()=>{
  console.log("Its Me")
}
 
let trailClickMe = debounceCombine(clickMe,1000)
let leadClickMe = debounceCombine(clickMe, 1000, {isLeading:true})
let leadTrailClickMe = debounceCombine(clickMe, 1000,{isLeading:true, isTrailing:true})
const leading = document.querySelectorAll("button")[0]
const trailing = document.querySelectorAll("button")[1]
const leadingTrailing = document.querySelectorAll("button")[2]
trailing.addEventListener("click",trailClickMe)
leading.addEventListener("click", leadClickMe)
leadingTrailing.addEventListener("click", leadTrailClickMe)
