let APIkey = "e9bdfa2ff8c9c51debd47094df89139e";

/* List of Data needed:
    
    lat
    lon
    todays date
    current temp
    todays high
    todays low
    current time
    temp at 8am
        weather condition
    temp at 12pm
        weather condition
    temp at 7pm
        weather condition

    day1-5:
        high
        low
        weather condition
*/
navigator.geolocation.getCurrentPosition(success, errorFunc);

let lat;
let lon;

let date;
let currentTemp;
let todaysHigh;
let todaysLow;
let currentTime;
let temp8am;
let weather8am;
let temp12am;
let weather12am;
let temp7pm;
let weather7pm;

let day1High;
let day1Low;
let day1Weather;

let day2High;
let day2Low;
let day2Weather;

let day3High;
let day3Low;
let day3Weather;

let day4High;
let day4Low;
let day4Weather;

let day5High;
let day5Low;
let day5Weather;

function success(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    GetCurrentWeatherData();
    GetFiveDayData(); 
}

function errorFunc(error) {
    console.log(error.message);
}

async function GetCurrentWeatherData() {

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);
    const data = await promise.json();

    console.log(data);

    date = convertUnixTimeToDate(data.dt);
    currentTemp = data.main.temp;
    currentTime = convertMillisecondsToHHMM(data.dt);

    console.log("The latitude is " + lat);
    console.log("The longitude is " + lon);
    console.log("The date is " + date);
    console.log("The time is " + currentTime);
    console.log("The current Temperature is " + currentTemp + "K");
}


async function GetFiveDayData(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`);
    const data = await promise.json();
    

    console.log(data);
}


function convertUnixTimeToDate(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);

    return dateObject.toLocaleDateString();
}

function convertMillisecondsToHHMM(seconds) {
    let milliseconds = seconds*1000;
    const dateObject = new Date(milliseconds);

    const hours = dateObject.getHours().toString().padStart(2, '0'); 
    const minutes = dateObject.getMinutes().toString().padStart(2, '0'); 

    return `${hours}:${minutes}`;
}
// 1701734400

console.log(convertMillisecondsToHHMM(1701734400));