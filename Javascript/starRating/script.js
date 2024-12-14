const container = document.querySelector("#star-container")
const nodes = Array.from(document.querySelectorAll("#star-container span"))
console.log(nodes)
let isClicked = false
let trackElement
let containerDimensions
let haveHalf = false

const trackFunction = (e)=>{
    console.log("My loc",e.clientX, containerDimensions)
    let {left, width} = containerDimensions
    let half = width/2
    if(e.clientX > left+half){
        trackElement.classList.remove("half")
        trackElement.classList.add("active")
        haveHalf=true
    }else{
        trackElement.classList.remove("active")
        trackElement.classList.add("half")
    }
}

function init() {
  nodes.forEach((node) => {
    node.addEventListener("mouseover", (e) => {
        containerDimensions = e.target.getBoundingClientRect()
        trackElement = e.target
        trackElement.addEventListener("mousemove", trackFunction)
        // setInterval(()=>{
        //     console.log("Current",e.clientX)
        // },500)
      if (!isClicked) {
        const currentId = e.target.id.slice(4)
        for (let i = 0; i < currentId-1; i++) {
          //    console.log("data",document.querySelector(`#star-container #${i+1}`))
          console.log(
            "selected",
            document.querySelector(`#star-container #star${i + 1}`)
          )
          document
            .querySelector(`#star-container #star${i + 1}`)
            .classList.add("active")
        }
      }
    })
    node.addEventListener("mouseleave", (e) => {
        console.log(trackElement, trackElement.removeEventListener("mousemove",trackFunction))
        trackElement.removeEventListener("mousemove",trackFunction)
        const currentId = e.target.id.slice(4)
        for (let i = 0; i < parseInt(currentId); i++) {
            console.log("node", nodes[i], nodes[i].id)
            nodes[i].classList.remove("active")
        }
        trackElement.classList.remove("half")
    })
    node.addEventListener("click", (e) => {
      if (!isClicked) {
        const currentId = parseInt(e.target.id.slice(4))
        container.classList.add("final")
        for (let i = 0; i < 5; i++) {
            if(i<currentId){
                console.log("node", nodes[i], nodes[i].id)
                nodes[i].classList.add("final")
                nodes[i].classList.add("orig")
                if(i==currentId-1){
                    console.log("Yeeess")
                    if(haveHalf){
                        nodes[i].classList.add("final-half")
                    }
                }
            }else{
                nodes[i].classList.add("orig")
            }

        }
        isClicked = true
      }
    })
  })
}

document.addEventListener("DOMContentLoaded", init)
