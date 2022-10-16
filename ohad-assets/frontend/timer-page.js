const TIME_ID = "timer-value"
function updateCountdown() {
    let time = document.getElementById(TIME_ID).textContent * 60;
    return function () {
        let audio = document.getElementById("audio");
        let countdownEl = document.getElementById(TIME_ID);
        let min = Math.floor(time / 60);
        let sec = time % 60;
        if (min == 0 && sec == 0) {
            countdownEl.innerHTML = "00:00";
            return
        }

        if (sec < 10) {
            sec = '0' + sec;
        }

        if (min < 10) {
            min = '0' + min
        }

        countdownEl.innerHTML = min + ":" + sec;

        time--;
        if (time === 0) {
            audio.play();
        }
    }
}
setInterval(updateCountdown(), 1000);
