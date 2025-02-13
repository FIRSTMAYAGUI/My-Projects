
function updateClock(){
    const currentDate = new Date()
    let hours = currentDate.getHours()
    const meridiem = hours >= 12 ? "PM" : "AM"
    hours = hours.toString().padStart(2, 0)
    const minutes = currentDate.getMinutes().toString().padStart(2, 0)
    const seconds = currentDate.getSeconds().toString().padStart(2, 0)
    const Time = `${hours}:${minutes}:${seconds} ${meridiem}`
    document.getElementById("clock").textContent =Time
}

updateClock();
setInterval(updateClock, 1000)