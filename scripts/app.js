let APIkey = "e9bdfa2ff8c9c51debd47094df89139e";

let imperial = true;
let nightMode = false;

let units
if(imperial){
    units = 'imperial';
}else{
    units = "metric";
}

let unit;
if(imperial){
    unit = "°F";
}else{
    unit = "°C"
}

//Initialize elements
//#region 
let placeID = document.getElementById("placeID");
let heartID = document.getElementById("heartID");
let currentWeatherIconID = document.getElementById("currentWeatherIconID");
let currentWeatherTempID = document.getElementById("currentWeatherTempID");
let currentWeatherDescriptionID = document.getElementById("currentWeatherDescriptionID");
let currentHLID = document.getElementById("currentHLID");
let timeID = document.getElementById("timeID");
let weatherIcon8amID = document.getElementById("weatherIcon8amID");
let temp8amID = document.getElementById("temp8amID");
let weatherIcon12pmID = document.getElementById("weatherIcon12pmID");
let temp12pmID = document.getElementById("temp12pmID");
let weatherIcon8pmID = document.getElementById("weatherIcon8pmID");
let temp8pmID = document.getElementById("temp8pmID");
let day1NameID = document.getElementById("day1NameID");
let day1WeatherIconID = document.getElementById("day1WeatherIconID");
let day1HLID = document.getElementById("day1HLID");
let day2NameID = document.getElementById("day2NameID");
let day2WeatherIconID = document.getElementById("day2WeatherIconID");
let day2HLID = document.getElementById("day2HLID");
let day3NameID = document.getElementById("day3NameID");
let day3WeatherIconID = document.getElementById("day3WeatherIconID");
let day3HLID = document.getElementById("day3HLID");
let day4NameID = document.getElementById("day4NameID");
let day4WeatherIconID = document.getElementById("day4WeatherIconID");
let day4HLID = document.getElementById("day4HLID");
let day5NameID = document.getElementById("day5NameID");
let day5WeatherIconID = document.getElementById("day5WeatherIconID");
let day5HLID = document.getElementById("day5HLID");
//#endregion

// Initialize data variables
//#region
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

//#endregion

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



    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}`);
    const data = await promise.json();

    console.log(data);

    dt = data.dt;
    timeZone = data.timezone;
    date = convertUnixTimeToDate(dt + timeZone);
    currentTemp = data.main.temp;
    currentTime = convertSecondsToHHMM(dt + timeZone);
    // todaysHigh = data.main.temp_max;
    // todaysLow = data.main.temp_min;
    currentWeatherMain = data.weather[0].main;
    currentWeatherDescription = data.weather[0].description;


    //----------------------------------------------GetDaysofWeek
    currentDayOfTheWeek = GetCurrentDay(dt + timeZone);
    day1Name = GetDayOfWeek(currentDayOfTheWeek);
    day2Name = GetDayOfWeek(day1Name);
    day3Name = GetDayOfWeek(day2Name);
    day4Name = GetDayOfWeek(day3Name);
    day5Name = GetDayOfWeek(day4Name);

    //----------------------------------------------Console Logging

    console.log("The latitude is " + lat);
    console.log("The longitude is " + lon);
    console.log(`Today is ${currentDayOfTheWeek.day}, ${currentDayOfTheWeek.date}`)
    console.log(`Day 1 is ${day1Name.day}, ${day1Name.date}`);
    console.log(`Day 2 is ${day2Name.day}, ${day2Name.date}`);
    console.log(`Day 3 is ${day3Name.day}, ${day3Name.date}`);
    console.log(`Day 4 is ${day4Name.day}, ${day4Name.date}`);
    console.log(`Day 5 is ${day5Name.day}, ${day5Name.date}`);

    console.log("The date is " + date);
    console.log("The time is " + currentTime);
    console.log("Your timezone is: " + timeZone);
    console.log("The current Temperature is " + currentTemp + " " + unit);
    // console.log("The max temp today is: " + todaysHigh +  " " + unit);
    // console.log("The min temp today is: " + todaysLow +  " " + unit);
    console.log("The general weather right now is " + currentWeatherMain);
    console.log("Specifically right now it is " + currentWeatherDescription);

    //------------------------------------------------Displaying values

    currentWeatherTempID.innerText = Math.round(currentTemp) + unit;
    currentWeatherDescriptionID.innerText = currentWeatherDescription;
    day1NameID.innerText = `${day1Name.day} ${day1Name.date}`;
    day2NameID.innerText = `${day2Name.day} ${day2Name.date}`;
    day3NameID.innerText = `${day3Name.day} ${day3Name.date}`;
    day4NameID.innerText = `${day4Name.day} ${day4Name.date}`;
    day5NameID.innerText = `${day5Name.day} ${day5Name.date}`;
    currentWeatherIconID.innerText = Description2Icon(currentWeatherMain);
    
}


async function GetFiveDayData() {

    // --------------------------------------- async fetch
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}`);
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

    let earlyMaxTemps = [];
    for (let i = 0; i < n; i++) {
        let x = [];
        let y = [];
        for (let j = 0; j < 5; j++) {
            x[j] = midTimes[(8 - n) + (j * 8) + i];
            y[j] = midMaxTemps[(8 - n) + (j * 8) + i];
        }
        let regressionLine = linearRegression(x, y);
        earlyMaxTemps[i] =  parseFloat((regressionLine.slope * earlierTime[i] + regressionLine.intercept).toFixed(2));
    }

    let earlyMinTemps = [];
    for (let i = 0; i < n; i++) {
        let x = [];
        let y = [];
        for (let j = 0; j < 5; j++) {
            x[j] = midTimes[(8 - n) + (j * 8) + i];
            y[j] = midMinTemps[(8 - n) + (j * 8) + i];
        }
        let regressionLine = linearRegression(x, y);
        earlyMinTemps[i] =  parseFloat((regressionLine.slope * earlierTime[i] + regressionLine.intercept).toFixed(2));
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
    maxTemps = [...earlyMaxTemps, ...midMaxTemps, ...laterMinTemps];
    minTemps = [...earlyMinTemps, ...midMinTemps, ...laterMinTemps];
    timeArray = [...earlierTime, ...midTimes, ...laterTime];

    //---------------------------------------Get Highs and Lows
    
    todaysHigh = GetDaysMaxTemp(maxTemps, 0);
    day1High = GetDaysMaxTemp(maxTemps, 1);
    day2High = GetDaysMaxTemp(maxTemps, 2);
    day3High = GetDaysMaxTemp(maxTemps, 3);
    day4High = GetDaysMaxTemp(maxTemps, 4);
    day5High = GetDaysMaxTemp(maxTemps, 5);

    todaysLow = GetDaysMinTemp(minTemps, 0);
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

    console.log("The max temp today is: " + todaysHigh +  " " + unit);
    console.log("The min temp today is: " + todaysLow +  " " + unit);

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

    // -----------------------------------Displaying values

    currentHLID.innerText = `H:${Math.round(todaysHigh)}${unit} L:${Math.round(todaysLow)}${unit}`; 
    temp8amID.innerText = Math.round(temp8am)+unit;
    temp12pmID.innerText = Math.round(temp12pm)+unit;
    temp8pmID.innerText = Math.round(temp8pm)+unit;
    day1HLID.innerText = `${Math.round(day1High)}${unit} | ${Math.round(day1Low)}${unit}`;
    day2HLID.innerText = `${Math.round(day2High)}${unit} | ${Math.round(day2Low)}${unit}`;
    day3HLID.innerText = `${Math.round(day3High)}${unit} | ${Math.round(day3Low)}${unit}`;
    day4HLID.innerText = `${Math.round(day4High)}${unit} | ${Math.round(day4Low)}${unit}`;
    day5HLID.innerText = `${Math.round(day5High)}${unit} | ${Math.round(day5Low)}${unit}`;
}

function GetCurrentDay(dt) {

    let dateString = convertUnixTimeToDate(dt);

    let day = dateString.slice(0,3).toUpperCase();
    let date = convertDateFormat(dateString.slice(5,11));

    return {day, date, dt};
}

function GetDayOfWeek(yesterday) {

    let dt = yesterday.dt + 86400;
    let dateString = convertUnixTimeToDate(dt);

    let day = dateString.slice(0,3).toUpperCase();
    let date = convertDateFormat(dateString.slice(5,11));

    return {day, date, dt};
}

function convertUnixTimeToDate(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);

    return dateObject.toUTCString();
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

function linearRegression(x, y) { //Got help at the following link https://study.com/academy/lesson/line-of-fit-line-of-best-fit-definitions-equations.html#:~:text=has%20no%20correlation.-,The%20line%20of%20best%20fit%20equation%20is%20y%20%3D%20m(x,the%20amount%20below%20the%20line.
    const n = x.length;
    let sumX = 0, sumY = 0;
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
    }
    let x_avg = sumX / n;
    let y_avg = sumY / n;

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

function Description2Icon(description){

    let weatherOptions = ['Tornado', 'Snow', 'Thunderstorm', 'Rain', 'Drizzle', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Clouds', 'Clear'];
    let weatherIcons =   ['?' ,       'I' ,       'Y',         'U',     'W',     'Z',     'Z',     'Z',    'Z',   'Z',    'Z',   'Z',     'Z',      '3',     '1'  ];

    for(let i = 0; i<weatherOptions.length; i++){
        if(description == weatherOptions[i]){
            if(weatherIcons[i] == 1 && nightMode){
                return 6;
            }else{
                return weatherIcons[i];
            }
            
        }
    }

    return "---";
}

function DetermineForecastedWeather(weathers, dayNumber, m) {
    weatherOptions = ['Tornado', 'Snow', 'Thunderstorm', 'Rain', 'Drizzle', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Clouds', 'Clear'];
    //                    ?         I           Y            U        W        Z       Z        Z       Z       Z      Z       Z       Z         3        1/6

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

function convertDateFormat(dateString) { //Got help from ChatGPT to make this function real quick
    const dateParts = dateString.split(' '); // Split the date string into parts
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const monthIndex = monthNames.findIndex(month => month === dateParts[1]);
    
    if (monthIndex !== -1) {
      const month = (monthIndex + 1).toString().padStart(2, '0'); // Convert month to 'MM' format
      const day = dateParts[0].padStart(2, '0'); // Convert day to 'DD' format
      
      return `${month}/${day}`;
    }
    
    return null; // Return null if the month abbreviation is not found
  }