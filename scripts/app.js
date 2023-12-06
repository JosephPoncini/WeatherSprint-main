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
let currentWeatherMain;
let currentWeatherDescription;
let timeZone;

let currentDayOfTheWeek;


let temps = [];
let maxTemps;
let minTemps;
let timeArray;


let temp8am;
let weather8am;
let temp12pm;
let weather12pm;
let temp8pm;
let weather7pm;

let day1Name;
let day1High;
let day1Low;
let day1Weather;

let day2Name;
let day2High;
let day2Low;
let day2Weather;

let day3Name;
let day3High;
let day3Low;
let day3Weather;

let day4Name;
let day4High;
let day4Low;
let day4Weather;

let day5Name;
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
    currentTime = convertSecondsToHHMM(dt + timeZone);
    todaysHigh = data.main.temp_max;
    todaysLow = data.main.temp_min;
    currentWeatherMain = data.weather[0].main;
    currentWeatherDescription = data.weather[0].description;


    //----------------------------------------------GetDaysofWeek
    currentDayOfTheWeek = GetCurrentDayOfWeek(dt + timeZone);
    day1Name = GetDayOfWeek(currentDayOfTheWeek);
    day2Name = GetDayOfWeek(day1Name);
    day3Name = GetDayOfWeek(day2Name);
    day4Name = GetDayOfWeek(day3Name);
    day5Name = GetDayOfWeek(day4Name);

    //----------------------------------------------Console Logging
    console.log("The latitude is " + lat);
    console.log("The longitude is " + lon);
    console.log("Today is " + currentDayOfTheWeek)
    console.log("Day 1 is " + day1Name);
    console.log("Day 2 is " + day2Name);
    console.log("Day 3 is " + day3Name);
    console.log("Day 4 is " + day4Name);
    console.log("Day 5 is " + day5Name);

    console.log("The date is " + date);
    console.log("The time is " + currentTime);
    console.log("Your timezone is: " + timeZone);
    console.log("The current Temperature is " + currentTemp + "C");
    console.log("The max temp today is: " + todaysHigh + "C");
    console.log("The min temp today is: " + todaysLow + "C");
    console.log("The general weather right now is " + currentWeatherMain);
    console.log("Specifically right now it is " + currentWeatherDescription);

}


async function GetFiveDayData() {

    // --------------------------------------- async fetch
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`);
    const data = await promise.json();

    // --------------------------------------- Get Arrays for forecasted temps, max temps, min temps with estimated temps
    let hourOffset = (((timeZone / 3600) % 3) + 3) % 3;

    let midTemps = FillTempArray(data);
    let midMaxTemps = FillMaxTempArray(data);
    let midMinTemps = FillMinTempArray(data);
    let midTimes = FillTimeArray(data, timeZone)
    let weathers = FillWeatherArray(data);
    console.log(weathers);

    //------------------- estimated temps calcs start here
    //#region 


    firstTime = data.list[0].dt + timeZone;
    lastTime = data.list[39].dt + timeZone;
    startTime = firstTime - (firstTime % 86400) + (hourOffset * 3600);
    endTime = startTime + 518400;

    let n = (firstTime - startTime) / 10800; // number of three hour segments from midnight today to first time bracket
    let earlierTime = [];
    let earlyZeros = [];
    for (let i = 0; i < n; i++) {
        earlierTime[i] = startTime + (i * 10800);
        earlyZeros[i] = 0;
    }

    let earlyTemps = [];
    for (let i = 0; i < n; i++) {
        let x = [];
        let y = [];
        for (let j = 0; j < 5; j++) {
            x[j] = midTimes[(8 - n) + (j * 8) + i];
            y[j] = midTemps[(8 - n) + (j * 8) + i];
        }
        let regressionLine = linearRegression(x, y);
        earlyTemps[i] =  parseFloat((regressionLine.slope * earlierTime[i] + regressionLine.intercept).toFixed(2));
    }

    let m = (endTime - lastTime) / 10800; // number of three hour segments from last given time slot to midnight of the following day
    let laterTime = [];
    let lateZeros = [];
    for (let i = 1; i < m; i++) {
        laterTime[i - 1] = lastTime + (i * 10800);
        lateZeros[i - 1] = 0;
    }

    let laterMaxTemps = [];
    for (let i = 1; i < m; i++) {
        let x = [];
        let y = [];
        for (let j = 0; j < 5; j++) {
            x[j] = midTimes[(8 - m) + (j * 8) + i];
            y[j] = midMaxTemps[(8 - m) + (j * 8) + i];
        }
        let regressionLine = linearRegression(x, y);
        laterMaxTemps[i - 1] =  parseFloat((regressionLine.slope * laterTime[i - 1] + regressionLine.intercept).toFixed(2));
    }

    let laterMinTemps = [];
    for (let i = 1; i < m; i++) {
        let x = [];
        let y = [];
        for (let j = 0; j < 5; j++) {
            x[j] = midTimes[(8 - m) + (j * 8) + i];
            y[j] = midMinTemps[(8 - m) + (j * 8) + i];
        }
        let regressionLine = linearRegression(x, y);
        laterMinTemps[i - 1] = parseFloat((regressionLine.slope * laterTime[i - 1] + regressionLine.intercept).toFixed(2));
    }


    //#endregion
    //------------------- estimated temps calcs end here

    // ------------------- arrays assembled
    temps = [...earlyTemps, ...midTemps, ...lateZeros];
    maxTemps = [...earlyZeros, ...midMaxTemps, ...laterMinTemps];
    minTemps = [...earlyZeros, ...midMinTemps, ...laterMinTemps];
    timeArray = [...earlierTime, ...midTimes, ...laterTime];

    //---------------------------------------Get Highs and Lows
    day1High = GetDaysMaxTemp(maxTemps, 1);
    day2High = GetDaysMaxTemp(maxTemps, 2);
    day3High = GetDaysMaxTemp(maxTemps, 3);
    day4High = GetDaysMaxTemp(maxTemps, 4);
    day5High = GetDaysMaxTemp(maxTemps, 5);

    day1Low = GetDaysMinTemp(minTemps, 1);
    day2Low = GetDaysMinTemp(minTemps, 2);
    day3Low = GetDaysMinTemp(minTemps, 3);
    day4Low = GetDaysMinTemp(minTemps, 4);
    day5Low = GetDaysMinTemp(minTemps, 5);

    console.log(maxTemps);
    console.log(minTemps);

    //---------------------------------------Get 8am 12pm 8pm temps

    switch (hourOffset) {
        case 0:
            temp8am = ((temps[2] + (2 * temps[3])) / 3).toFixed(2);
            temp12pm = temps[4].toFixed(2);
            temp8pm = ((temps[6] + (2 * temps[7])) / 3).toFixed(2);
            break;
        case 1:
            temp8am = (((2 * temps[2]) + temps[3]) / 3).toFixed(2);
            temp12pm = ((temps[3] + (2 * temps[4])) / 3).toFixed(2);
            temp8pm = (((2 * temps[6]) + temps[7]) / 3).toFixed(2);
            break;
        case 2:
            temp8am = temps[2].toFixed(2);
            temp12pm = (((2 * temps[3]) + temps[4]) / 3).toFixed(2);
            temp8pm = temps[6].toFixed(2);
            break;
        default:
            break;
    }


    //------------------------------------- Getting Forecasted Weather



    day1Weather = DetermineForecastedWeather(weathers, 1, m);
    day2Weather = DetermineForecastedWeather(weathers, 2, m);
    day3Weather = DetermineForecastedWeather(weathers, 3, m);
    day4Weather = DetermineForecastedWeather(weathers, 4, m);
    day5Weather = DetermineForecastedWeather(weathers, 5, m);




    //------------------------------------- Console Logging
    console.log("At 8am today the temp is " + temp8am + " C")
    console.log("At 12pm today the temp is " + temp12pm + " C")
    console.log("At 8pm today the temp is " + temp8pm + " C")

    console.log("Day 1 Max Temp is " + day1High);
    console.log("Day 1 Min Temp is " + day1Low);
    console.log("Day 2 Max Temp is " + day2High);
    console.log("Day 2 Min Temp is " + day2Low);
    console.log("Day 3 Max Temp is " + day3High);
    console.log("Day 3 Min Temp is " + day3Low);
    console.log("Day 4 Max Temp is " + day4High);
    console.log("Day 4 Min Temp is " + day4Low);
    console.log("Day 5 Max Temp is " + day5High);
    console.log("Day 5 Min Temp is " + day5Low);

    console.log("On Day 1 it will be " + day1Weather);
    console.log("On Day 2 it will be " + day2Weather);
    console.log("On Day 3 it will be " + day3Weather);
    console.log("On Day 4 it will be " + day4Weather);
    console.log("On Day 5 it will be " + day5Weather);
    // console.log(maxTemps);
    // console.log(minTemps);

    // -----------------------------------
}

function GetCurrentDayOfWeek(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);

    return dateObject.toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' });
}

function GetDayOfWeek(yesterday) {

    let today;

    switch (yesterday) {
        case "Sunday":
            today = "Monday";
            break;

        case "Monday":
            today = "Tuesday";
            break;
        case "Tuesday":
            today = "Wednesday";
            break;
        case "Wednesday":
            today = "Thursday";
            break;
        case "Thursday":
            today = "Friday";
            break;
        case "Friday":
            today = "Saturday";
            break;
        case "Saturday":
            today = "Sunday";
            break;
        default:
            today = "Invalid day";
            break;
    }

    return today;

}

function convertUnixTimeToDate(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);

    return dateObject.toDateString();
}

function convertSecondsToHHMM(seconds) {
    let milliseconds = seconds * 1000;
    const dateObject = new Date(milliseconds);

    const hours = dateObject.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

function FillTempArray(data) {
    let tempArray = [];

    for (let i = 0; i < 40; i++) {
        tempArray[i] = data.list[i].main.temp;
    }

    return tempArray;
}

function FillMaxTempArray(data) {
    let tempMaxArray = [];

    for (let i = 0; i < 40; i++) {
        tempMaxArray[i] = data.list[i].main.temp_max;
    }

    return tempMaxArray;
}

function FillMinTempArray(data) {
    let tempMinArray = [];

    for (let i = 0; i < 40; i++) {
        tempMinArray[i] = data.list[i].main.temp_min;
    }

    return tempMinArray;
}

function FillWeatherArray(data) {
    let weatherArray = [];

    for (let i = 0; i < 40; i++) {
        weatherArray[i] = data.list[i].weather[0].main;
    }

    return weatherArray;
}

function FillTimeArray(data, timeZone) {
    let timeArray = [];

    for (let i = 0; i < 40; i++) {
        timeArray[i] = data.list[i].dt + timeZone;
    }

    return timeArray;
}

function GetDaysMaxTemp(temps, dayNumber) {
    let maxTemp = temps[dayNumber * 8]
    for (let i = 1; i < 8; i++) {
        if (temps[dayNumber * 8 + i] > maxTemp) {
            maxTemp = temps[dayNumber * 8 + i];
        }
    }
    return maxTemp;
}

function GetDaysMinTemp(temps, dayNumber) {
    let minTemp = temps[dayNumber * 8]
    for (let i = 1; i < 8; i++) {
        if (temps[dayNumber * 8 + i] < minTemp) {
            minTemp = temps[dayNumber * 8 + i];
        }
    }
    return minTemp;
}



function linearRegression(x, y) {
    const n = x.length;
    let sumX = 0, sumY = 0;
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
    }
    let x_avg = sumX / n;
    let y_avg = sumY / n;
    // Calculate sums of x, y, x*y, x^2
    let sumXY = 0, sumX2 = 0;
    for (let i = 0; i < n; i++) {
        sumXY += (x[i] - x_avg) * (y[i] - y_avg);
        sumX2 += (x[i] - x_avg) ** 2;
    }

    // Calculate slope (m) and y-intercept (b)
    const slope = sumXY / sumX2;
    const intercept = (y_avg - (slope * x_avg));

    return { slope, intercept };
}

function DetermineForecastedWeather(weathers, dayNumber, m) {
    weatherOptions = ['Snow', 'Thunderstorm', 'Rain', 'Drizzle', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado', 'Clouds', 'Clear'];

    weatherTriggers = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    if (dayNumber == 5) {
        for (let i = 0; i < (8 - m); i++) {
            let currentWeather = weathers[8 * (dayNumber - 1) + m];
            for(let j = 0; j < 15; j++){
                if(currentWeather == weatherOptions[j]){
                    weatherTriggers[j] = true;
                }
            }
        }
    }else{
        for (let i = 0; i < 8; i++) {
            let currentWeather = weathers[8 * (dayNumber - 1) + m];
            for(let j = 0; j < 15; j++){
                if(currentWeather == weatherOptions[j]){
                    weatherTriggers[j] = true;
                }
            }
        }
    }

    for(let i = 0; i < 15; i++){
        if(weatherTriggers[i]){
            return weatherOptions[i];
        }
    }

    return "Something went wrong";

}