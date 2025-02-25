
const time = document.getElementById("time")
const Continue = document.getElementById("btn2")
let timer = null
let startTime = 0
let elaspedTime = 0
let isRunning = false


function start(){

    if(!isRunning){
        startTime = Date.now() - elaspedTime
        timer = setInterval(update, 10)
        isRunning = true
        Continue.textContent = "Start"
    }
}
 
function reset(){
    
    clearInterval(timer)
    startTime = 0
    elaspedTime = 0
    isRunning = false

    time.textContent = "00:00:00:00"
    Continue.textContent = "Start"

}


function stop(){

    if(isRunning){
        clearInterval(timer) // clears the time interval
        elaspedTime = Date.now() - startTime
        isRunning = false
        Continue.textContent = "Continue"
    }
}

function update(){
    const currentTime = Date.now() // set the current time
    elaspedTime = currentTime - startTime // the time the stopwatch was running (from start to stop) 

    let hours = Math.floor(elaspedTime / (60 * 60 * 1000)).toString().padStart(2, 0)
    let minutes = Math.floor(elaspedTime / (60 * 1000) % 60).toString().padStart(2, 0)
    let seconds = Math.floor(elaspedTime / (1000) % 60).toString().padStart(2, 0)
    let miliseconds = Math.floor((elaspedTime % 1000) / 10).toString().padStart(2, 0)

    time.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`
}