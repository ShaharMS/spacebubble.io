const MIN_LIST_ID = "time-bus" 
const TIMER_BUTTON_ID = "timer-button"

function DisplayTime() {
    let dateTime = new Date();
    let hrs = dateTime.getHours();
    let min = dateTime.getMinutes();
    
    if (min < 10) {
        min = "0" + min
    }
    
    document.getElementById('hrs').innerHTML = hrs;
    document.getElementById('min').innerHTML = min;
}

function setURL() {
    let min_list = document.getElementById(MIN_LIST_ID).textContent;
    min_list = min_list.split(",");
    let min = Math.min(...min_list);
    let timer_el = document.getElementById(TIMER_BUTTON_ID);
    timer_el.href = "/timer/" + min;
} 

function main() {
    setURL();
    setInterval(DisplayTime, 10);
}

main();


