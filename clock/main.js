
function setDate() {
    const secondsHand = document.querySelector('.second-hand');
    const minutesHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hour = now.getHours();

    const secondsDegree = ((seconds / 60) * 360) + 90;
    const minutesDegree = ((minutes / 60) * 360) + 90;
    const hourDegree = ((hour / 12) * 360) + 90;
    
    secondsHand.style.transform = `rotate(${secondsDegree}deg)`;
    minutesHand.style.transform = `rotate(${minutesDegree}deg)`;
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
}

setInterval(setDate, 1000);