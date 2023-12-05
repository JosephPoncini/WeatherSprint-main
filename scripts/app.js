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

/* We need */
navigator.geolocation.getCurrentPosition(success, errorFunc);

let lat;
let lon;

let dt;
let date;
let currentTemp;
let todaysHigh;
let todaysLow;
let currentTime;
let timeZone;


let temps = [];
let maxTemps;
let minTemps;
let timeArray;


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

let startTime;
let firstTime;
let lastTime;
let endTime;

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

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`);
    const data = await promise.json();

    console.log(data);

    dt = data.dt;
    timeZone = data.timezone;    
    date = convertUnixTimeToDate(dt + timeZone);
    currentTemp = data.main.temp;
    currentTime = convertSecondsToHHMM(dt+timeZone) ;
    todaysHigh = data.main.temp_max;
    todaysLow  = data.main.temp_min;



    console.log("The latitude is " + lat);
    console.log("The longitude is " + lon);
    console.log("The date is " + date);
    console.log("The time is " + currentTime);
    console.log("Your timezone is: " + timeZone);
    console.log("The current Temperature is " + currentTemp + "C");
    console.log("The max temp today is: " + todaysHigh + "C");
    console.log("The min temp today is: " + todaysLow + "C")
}


async function GetFiveDayData(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`);
    const data = await promise.json();
    
    let hourOffset = (((timeZone/3600)%3)+3)%3;

    let midTemps = FillTempArray(data);
    let midMaxTemps = FillMaxTempArray(data);
    let midMinTemps = FillMinTempArray(data);
    let midTimes = FillTimeArray(data, timeZone)

    firstTime = data.list[0].dt + timeZone;
    lastTime = data.list[39].dt + timeZone;
    startTime = firstTime - (firstTime%86400) + (hourOffset*3600);
    endTime = startTime + 518400;

    let n = (firstTime - startTime)/10800; // number of three hour segments from midnight today to first time bracket
    let earlierTime = [];
    let earlyZeros = [];
    for(let i = 0; i<n; i++){
        earlierTime[i] = startTime + (i*10800);
        earlyZeros[i] = 0;
    }

    let earlyTemps = [];
    for(let i = 0; i<n; i++){
        let x = [];
        let y = [];
        for(let j = 0; j < 5; j++){
            x[j] = midTimes[(8-n)+(j*8)];
            y[j] = midTemps[(8-n)+(j*8)];
        }
        const regressionLine = linearRegression(x, y);
        earlyTemps[i] = regressionLine.slope*earlierTime[i] + regressionLine.intercept;
    }
    

    let m = (endTime - lastTime)/10800; // number of three hour segments from last given time slot to midnight of the following day
    let laterTime = [];
    let lateZeros = [];
    for(let i = 1; i<m; i++){
        laterTime[i-1] = lastTime + (i*10800);
        lateZeros[i-1] = 0;
    }

    temps = [...earlyTemps, ...midTemps, ...lateZeros];
    maxTemps = [...earlyZeros, ...midMaxTemps, ...lateZeros];
    minTemps = [...earlyZeros, ...midMinTemps, ...lateZeros];
    timeArray = [...earlierTime, ...midTimes, ...laterTime];

    console.log(timeArray);
    for(let i = 0; i < timeArray.length; i++){
        console.log(convertSecondsToHHMM(timeArray[i]));
    }


    console.log("This is when the 5 day 3 hr forecast starts: " + firstTime);
    console.log("Today started at "+ startTime);
    console.log(temps);
    console.log(maxTemps);
    console.log(minTemps);
    console.log(timeArray);


    console.log(data);
}


function convertUnixTimeToDate(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);

    return dateObject.toDateString();
}

function convertSecondsToHHMM(seconds) {
    let milliseconds = seconds*1000;
    const dateObject = new Date(milliseconds);

    const hours = dateObject.getUTCHours().toString().padStart(2, '0'); 
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0'); 

    return `${hours}:${minutes}`;
}

function FillTempArray(data){
    let tempArray = [];

    for(let i = 0; i<40; i++){
        tempArray[i] = data.list[i].main.temp;
    }

    return tempArray;
}

function FillMaxTempArray(data){
    let tempMaxArray = [];

    for(let i = 0; i<40; i++){
        tempMaxArray[i] = data.list[i].main.temp_max;
    }

    return tempMaxArray;
}

function FillMinTempArray(data){
    let tempMinArray = [];

    for(let i = 0; i<40; i++){
        tempMinArray[i] = data.list[i].main.temp_min;
    }

    return tempMinArray;
}

function FillTimeArray(data, timeZone){
    let timeArray = [];

    for(let i = 0; i<40; i++){
        timeArray[i] = data.list[i].dt + timeZone;
    }

    return timeArray;
}

function linearRegression(x, y) {
    const n = x.length;
  
    // Calculate sums of x, y, x*y, x^2
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    for (let i = 0; i < n; i++) {
      sumX += x[i];
      sumY += y[i];
      sumXY += x[i] * y[i];
      sumX2 += x[i] * x[i];
    }
  
    // Calculate slope (m) and y-intercept (b)
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY - slope * sumX) / n;
  
    return { slope, intercept };
  }

console.log(convertSecondsToHHMM(1701734400));