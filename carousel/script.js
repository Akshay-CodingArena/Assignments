console.log("hey")
window.onload = ()=>{
    let prevButton = document.querySelector("#prev")
    let nextButton = document.querySelector("#next")
    let images = Array.from(document.querySelectorAll("#container img"))
    let length = images.length
    var currIndex = 0
    console.log(Array.from(images))
    images.map((img, ind)=>{
        if(ind>0){
        img.classList.add("d-none")
    }
    })

    prevButton.addEventListener("click", (e)=>{
        images[currIndex].classList.add("d-none")
        if(currIndex > 0){
            currIndex--
            images[currIndex].classList.remove("d-none")
        }else{
            currIndex = length-1
            images[currIndex].classList.remove("d-none")
        }
    })

    nextButton.addEventListener("click",()=>{
        images[currIndex].classList.add("d-none")
        if(currIndex < length-1){
            currIndex++
            images[currIndex].classList.remove("d-none")
        }else{
            currIndex = 0
            images[currIndex].classList.remove("d-none")
        }
    })
}