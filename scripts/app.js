let APIkey = "e9bdfa2ff8c9c51debd47094df89139e";

let imperial = true;
let nightMode = false;

let units
if (imperial) {
    units = 'imperial';
} else {
    units = "metric";
}

let unit;
if (imperial) {
    unit = "°F";
} else {
    unit = "°C"
}

function ChangeUnits(){


    let changeUnitsID = document.getElementById("changeUnitsID");

    if (imperial) {
        units = 'imperial';
        unit = "°F";
        changeUnitsID.innerText = "temperature view: Celsius (click to change)";  
        imperial =false;              
    } else {
        units = "metric";
        unit = "°C"; 
        changeUnitsID.innerText = "temperature view: Fahrenheit (click to change)";
        imperial = true;    
    }
    



    APICall1();
    APICall2();
}

function Go(button){
    let child = button.querySelector('div');

    APICall1Go(child.innerText);
    APICall2Go(child.innerText);
    if (favorited) {
        const image = document.getElementById('favoriteBtnID');
        image.src = './assets/FavoriteIcon.png';
        favorited = false;
    }
    newFavoriteElement = document.getElementById("emptyDiv");
}

function search(){
    APICall1Search();
    APICall2Search();
    if (favorited) {
        const image = document.getElementById('favoriteBtnID');
        image.src = './assets/FavoriteIcon.png';
        favorited = false;
    }
    newFavoriteElement = document.getElementById("emptyDiv");
}

let searchTxt = document.getElementById("searchTxt");

searchTxt.addEventListener('keydown', function (event) {
    console.log(searchTxt.value);
    if (event.key === "Enter") {

        event.preventDefault();
        search()
        searchTxt.value = "";
    }
})


//Initialize elements
//#region 
let newFavoriteElement;

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

let DayOfTheWeek1_ForecastName = document.getElementById("DayOfTheWeek1_ForecastName");
let DayOfTheWeek1_8amWeather = document.getElementById("DayOfTheWeek1_8amWeather");
let DayOfTheWeek1_12pmWeather = document.getElementById("DayOfTheWeek1_12pmWeather");
let DayOfTheWeek1_8pmWeather = document.getElementById("DayOfTheWeek1_8pmWeather");
let DayOfTheWeek1_8amTemp = document.getElementById("DayOfTheWeek1_8amTemp");
let DayOfTheWeek1_12pmTemp = document.getElementById("DayOfTheWeek1_12pmTemp");
let DayOfTheWeek1_8pmTemp = document.getElementById("DayOfTheWeek1_8pmTemp");

let DayOfTheWeek2_ForecastName = document.getElementById("DayOfTheWeek2_ForecastName");
let DayOfTheWeek2_8amWeather = document.getElementById("DayOfTheWeek2_8amWeather");
let DayOfTheWeek2_12pmWeather = document.getElementById("DayOfTheWeek2_12pmWeather");
let DayOfTheWeek2_8pmWeather = document.getElementById("DayOfTheWeek2_8pmWeather");
let DayOfTheWeek2_8amTemp = document.getElementById("DayOfTheWeek2_8amTemp");
let DayOfTheWeek2_12pmTemp = document.getElementById("DayOfTheWeek2_12pmTemp");
let DayOfTheWeek2_8pmTemp = document.getElementById("DayOfTheWeek2_8pmTemp");

let DayOfTheWeek3_ForecastName = document.getElementById("DayOfTheWeek3_ForecastName");
let DayOfTheWeek3_8amWeather = document.getElementById("DayOfTheWeek3_8amWeather");
let DayOfTheWeek3_12pmWeather = document.getElementById("DayOfTheWeek3_12pmWeather");
let DayOfTheWeek3_8pmWeather = document.getElementById("DayOfTheWeek3_8pmWeather");
let DayOfTheWeek3_8amTemp = document.getElementById("DayOfTheWeek3_8amTemp");
let DayOfTheWeek3_12pmTemp = document.getElementById("DayOfTheWeek3_12pmTemp");
let DayOfTheWeek3_8pmTemp = document.getElementById("DayOfTheWeek3_8pmTemp");

let DayOfTheWeek4_ForecastName = document.getElementById("DayOfTheWeek4_ForecastName");
let DayOfTheWeek4_8amWeather = document.getElementById("DayOfTheWeek4_8amWeather");
let DayOfTheWeek4_12pmWeather = document.getElementById("DayOfTheWeek4_12pmWeather");
let DayOfTheWeek4_8pmWeather = document.getElementById("DayOfTheWeek4_8pmWeather");
let DayOfTheWeek4_8amTemp = document.getElementById("DayOfTheWeek4_8amTemp");
let DayOfTheWeek4_12pmTemp = document.getElementById("DayOfTheWeek4_12pmTemp");
let DayOfTheWeek4_8pmTemp = document.getElementById("DayOfTheWeek4_8pmTemp");

let DayOfTheWeek5_ForecastName = document.getElementById("DayOfTheWeek5_ForecastName");
let DayOfTheWeek5_8amWeather = document.getElementById("DayOfTheWeek5_8amWeather");
let DayOfTheWeek5_12pmWeather = document.getElementById("DayOfTheWeek5_12pmWeather");
let DayOfTheWeek5_8pmWeather = document.getElementById("DayOfTheWeek5_8pmWeather");
let DayOfTheWeek5_8amTemp = document.getElementById("DayOfTheWeek5_8amTemp");
let DayOfTheWeek5_12pmTemp = document.getElementById("DayOfTheWeek5_12pmTemp");
let DayOfTheWeek5_8pmTemp = document.getElementById("DayOfTheWeek5_8pmTemp");

let DayOfTheWeek1_ForecastDescription = document.getElementById("DayOfTheWeek1_ForecastDescription");
let DayOfTheWeek2_ForecastDescription = document.getElementById("DayOfTheWeek2_ForecastDescription");
let DayOfTheWeek3_ForecastDescription = document.getElementById("DayOfTheWeek3_ForecastDescription");
let DayOfTheWeek4_ForecastDescription = document.getElementById("DayOfTheWeek4_ForecastDescription");
let DayOfTheWeek5_ForecastDescription = document.getElementById("DayOfTheWeek5_ForecastDescription");

//flag-------------------------------------------------------------------------------------------------------------------


//#endregion

// Initialize data variables
//#region
navigator.geolocation.getCurrentPosition(success, errorFunc);

let lat;
let lon;

let place;
let country;

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
let weather8pm;

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

let sunset;
let sunrise;
//#endregion

function success(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    APICall1();
    APICall2();

}

function errorFunc(error) {
    console.log(error.message);
}

//async functions

async function APICall1Go(cityStr){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityStr}&appid=${APIkey}&units=${units}`);
    const data = await promise.json();

    GetCurrentWeatherData(data)

}

async function APICall2Go(cityStr){

    const promise = await fetch(`api.openweathermap.org/data/2.5/forecast?q=${cityStr}&appid=${APIkey}&units=${units}`);
    const data = await promise.json();

    GetFiveDayData(data);
}

async function APICall1Search(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTxt.value}&appid=${APIkey}&units=${units}`);
    const data = await promise.json();

    GetCurrentWeatherData(data)

}

async function APICall2Search() {

    const promise = await fetch(`api.openweathermap.org/data/2.5/forecast?q=${searchTxt.value}&appid=${APIkey}&units=${units}`);
    const data = await promise.json();

    GetFiveDayData(data);
}

async function APICall1(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}`);
    const data = await promise.json();

    GetCurrentWeatherData(data)

}

async function APICall2() {

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}`);
    const data = await promise.json();

    GetFiveDayData(data);
}

//main functions

function GetCurrentWeatherData(data) {

    lat = data.coord.lat;
    lon = data.coord.lon;

    console.log(data);

    place = data.name;
    country = data.sys.country;

    dt = data.dt;
    timeZone = data.timezone;

    sunset = data.sys.sunset + timeZone;
    console.log("Sunset is at " + convertSecondsToHHMM(sunset));

    sunrise = data.sys.sunrise + timeZone;
    console.log("Sunrise is at " + convertSecondsToHHMM(sunrise));

    date = convertUnixTimeToDate(dt + timeZone);
    currentTemp = data.main.temp;
    currentTime = convertSecondsToHHMM(dt + timeZone);
    // todaysHigh = data.main.temp_max;
    // todaysLow = data.main.temp_min;
    currentWeatherMain = data.weather[0].main;
    currentWeatherDescription = data.weather[0].main;



    //----------------------------------------------GetDaysofWeek
    currentDayOfTheWeek = GetCurrentDay(dt + timeZone);
    day1Name = GetDayOfWeek(currentDayOfTheWeek);
    day2Name = GetDayOfWeek(day1Name);
    day3Name = GetDayOfWeek(day2Name);
    day4Name = GetDayOfWeek(day3Name);
    day5Name = GetDayOfWeek(day4Name);

    //----------------------------------------------Console Logging

    console.log("We are in " + place)
    console.log("The latitude is " + lat);
    console.log("The longitude is " + lon);
    console.log(`Today is ${currentDayOfTheWeek.day}, ${currentDayOfTheWeek.date}`)
    console.log(`Day 1 is ${day1Name.day}, ${day1Name.date}`);
    console.log(`Day 2 is ${day2Name.day}, ${day2Name.date}`);
    console.log(`Day 3 is ${day3Name.day}, ${day3Name.date}`);
    console.log(`Day 4 is ${day4Name.day}, ${day4Name.date}`);
    console.log(`Day 5 is ${day5Name.day}, ${day5Name.date}`);

    console.log("The date is " + date);
    console.log("The time is " + convertToNormalTime(currentTime));
    console.log("Your timezone is: " + timeZone);
    console.log("The current Temperature is " + currentTemp + " " + unit);
    // console.log("The max temp today is: " + todaysHigh +  " " + unit);
    // console.log("The min temp today is: " + todaysLow +  " " + unit);
    console.log("The general weather right now is " + currentWeatherMain);
    console.log("Specifically right now it is " + currentWeatherDescription);

    //------------------------------------------------Displaying values

    placeID.innerText = place.toUpperCase();
    currentWeatherTempID.innerText = Math.round(currentTemp) + unit;
    currentWeatherDescriptionID.innerText = currentWeatherDescription.toLowerCase();
    day1NameID.innerText = `${day1Name.day} ${day1Name.date}`;
    day2NameID.innerText = `${day2Name.day} ${day2Name.date}`;
    day3NameID.innerText = `${day3Name.day} ${day3Name.date}`;
    day4NameID.innerText = `${day4Name.day} ${day4Name.date}`;
    day5NameID.innerText = `${day5Name.day} ${day5Name.date}`;

    DayOfTheWeek1_ForecastName.innerText = DayOfWeekElongated(day1Name.day);
    DayOfTheWeek2_ForecastName.innerText = DayOfWeekElongated(day2Name.day);
    DayOfTheWeek3_ForecastName.innerText = DayOfWeekElongated(day3Name.day);
    DayOfTheWeek4_ForecastName.innerText = DayOfWeekElongated(day4Name.day);
    DayOfTheWeek5_ForecastName.innerText = DayOfWeekElongated(day5Name.day);

    //flag-------------------------------------------------------------------------------------------------------------------

    currentWeatherIconID.innerText = Description2Icon(currentWeatherMain, dt + timeZone, currentWeatherIconID);
    timeID.innerText = convertToNormalTime(currentTime);

}


function GetFiveDayData(data) {

    // --------------------------------------- Get Arrays for forecasted temps, max temps, min temps with estimated temps
    let hourOffset = (((timeZone / 3600) % 3) + 3) % 3;

    let midTemps = FillTempArray(data);
    let midMaxTemps = FillMaxTempArray(data);
    let midMinTemps = FillMinTempArray(data);
    let midTimes = FillTimeArray(data, timeZone)
    let weathers = FillWeatherArray(data);

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
        earlyTemps[i] = parseFloat((regressionLine.slope * earlierTime[i] + regressionLine.intercept).toFixed(3));
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
        earlyMaxTemps[i] = parseFloat((regressionLine.slope * earlierTime[i] + regressionLine.intercept).toFixed(3));
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
        earlyMinTemps[i] = parseFloat((regressionLine.slope * earlierTime[i] + regressionLine.intercept).toFixed(3));
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
        laterMaxTemps[i - 1] = parseFloat((regressionLine.slope * laterTime[i - 1] + regressionLine.intercept).toFixed(3));
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
        laterMinTemps[i - 1] = parseFloat((regressionLine.slope * laterTime[i - 1] + regressionLine.intercept).toFixed(3));
    }

    let laterTemps = [];
    for (let i = 1; i < m; i++) {
        let x = [];
        let y = [];
        for (let j = 0; j < 5; j++) {
            x[j] = midTimes[(8 - m) + (j * 8) + i];
            y[j] = midTemps[(8 - m) + (j * 8) + i];
        }
        let regressionLine = linearRegression(x, y);
        laterTemps[i - 1] = parseFloat((regressionLine.slope * laterTime[i - 1] + regressionLine.intercept).toFixed(3));
    }


    //#endregion
    //------------------- estimated temps calcs end here

    // ------------------- arrays assembled
    temps = [...earlyTemps, ...midTemps, ...laterTemps];
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


    //---------------------------------------Get 8am 12pm 8pm temps and weather

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

    let todaysWeatherForecast = DetermineTodaysWeather(weathers, n);
    weather8am = todaysWeatherForecast.weather8am;
    weather12pm = todaysWeatherForecast.weather12pm;
    weather8pm = todaysWeatherForecast.weather8pm;


    //------------------------------------- Getting Forecasted Weather



    day1Weather = DetermineForecastedWeather(weathers, 1, m);
    day2Weather = DetermineForecastedWeather(weathers, 2, m);
    day3Weather = DetermineForecastedWeather(weathers, 3, m);
    day4Weather = DetermineForecastedWeather(weathers, 4, m);
    day5Weather = DetermineForecastedWeather(weathers, 5, m);

    //day1Forecasted
    let day1WeatherForecast = DetermineDaysWeather(weathers, n, 1);
    let day2WeatherForecast = DetermineDaysWeather(weathers, n, 2);
    let day3WeatherForecast = DetermineDaysWeather(weathers, n, 3);
    let day4WeatherForecast = DetermineDaysWeather(weathers, n, 4);
    let day5WeatherForecast = DetermineLastDaysWeather(weathers, m);

    let day1WeatherTemps = GetWeatherTemp(hourOffset, 1);
    let day2WeatherTemps = GetWeatherTemp(hourOffset, 2);
    let day3WeatherTemps = GetWeatherTemp(hourOffset, 3);
    let day4WeatherTemps = GetWeatherTemp(hourOffset, 4);
    let day5WeatherTemps = GetWeatherTemp(hourOffset, 5);


    //flag-------------------------------------------------------------------------------------------------------------------





    //------------------------------------- Console Logging
    console.log("At 8am today the temp is " + temp8am + " C")
    console.log("At 8am today the weather will be " + weather8am)
    console.log("At 12pm today the temp is " + temp12pm + " C")
    console.log("At 12pm today the weather will be " + weather12pm)
    console.log("At 8pm today the temp is " + temp8pm + " C")
    console.log("At 8pm today the weather will be " + weather8pm)

    console.log("The max temp today is: " + todaysHigh + " " + unit);
    console.log("The min temp today is: " + todaysLow + " " + unit);

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

    // -----------------------------------Displaying values

    currentHLID.innerText = `H: ${Math.round(todaysHigh)}${unit} L:${Math.round(todaysLow)}${unit}`;
    temp8amID.innerText = Math.round(temp8am) + "°";
    temp12pmID.innerText = Math.round(temp12pm) + "°";
    temp8pmID.innerText = Math.round(temp8pm) + "°";
    day1HLID.innerText = `${Math.round(day1High)}${unit} | ${Math.round(day1Low)}${unit}`;
    day2HLID.innerText = `${Math.round(day2High)}${unit} | ${Math.round(day2Low)}${unit}`;
    day3HLID.innerText = `${Math.round(day3High)}${unit} | ${Math.round(day3Low)}${unit}`;
    day4HLID.innerText = `${Math.round(day4High)}${unit} | ${Math.round(day4Low)}${unit}`;
    day5HLID.innerText = `${Math.round(day5High)}${unit} | ${Math.round(day5Low)}${unit}`;
    day1WeatherIconID.innerText = Description2Icon(day1Weather, 60 * 60 * 12, day1WeatherIconID);
    day2WeatherIconID.innerText = Description2Icon(day2Weather, 60 * 60 * 12, day2WeatherIconID);
    day3WeatherIconID.innerText = Description2Icon(day3Weather, 60 * 60 * 12, day3WeatherIconID);
    day4WeatherIconID.innerText = Description2Icon(day4Weather, 60 * 60 * 12, day4WeatherIconID);
    day5WeatherIconID.innerText = Description2Icon(day5Weather, 60 * 60 * 12, day5WeatherIconID);

    weatherIcon8amID.innerText = Description2Icon(weather8am, 60 * 60 * 8, weatherIcon8amID);
    weatherIcon12pmID.innerText = Description2Icon(weather12pm, 60 * 60 * 12, weatherIcon12pmID);
    weatherIcon8pmID.innerText = Description2Icon(weather8pm, 60 * 60 * 20, weatherIcon8pmID);

    //-------------------------------------------------------------------------------------------------------------------------------

    DayOfTheWeek1_8amWeather.innerText = Description2Icon(day1WeatherForecast.weather8am, 60 * 60 * 8, DayOfTheWeek1_8amWeather);
    DayOfTheWeek1_12pmWeather.innerText = Description2Icon(day1WeatherForecast.weather12pm, 60 * 60 * 12, DayOfTheWeek1_12pmWeather);
    DayOfTheWeek1_8pmWeather.innerText = Description2Icon(day1WeatherForecast.weather8pm, 60 * 60 * 20, DayOfTheWeek1_8pmWeather);

    DayOfTheWeek1_8amTemp.innerText = Math.round(day1WeatherTemps.temp8am) + "°";
    DayOfTheWeek1_12pmTemp.innerText = Math.round(day1WeatherTemps.temp12pm) + "°";
    DayOfTheWeek1_8pmTemp.innerText = Math.round(day1WeatherTemps.temp8pm) + "°";


    DayOfTheWeek2_8amWeather.innerText = Description2Icon(day2WeatherForecast.weather8am, 60 * 60 * 8, DayOfTheWeek2_8amWeather);
    DayOfTheWeek2_12pmWeather.innerText = Description2Icon(day2WeatherForecast.weather12pm, 60 * 60 * 12, DayOfTheWeek2_12pmWeather);
    DayOfTheWeek2_8pmWeather.innerText = Description2Icon(day2WeatherForecast.weather8pm, 60 * 60 * 20, DayOfTheWeek2_8pmWeather);

    DayOfTheWeek2_8amTemp.innerText = Math.round(day2WeatherTemps.temp8am) + "°";
    DayOfTheWeek2_12pmTemp.innerText = Math.round(day2WeatherTemps.temp12pm) + "°";
    DayOfTheWeek2_8pmTemp.innerText = Math.round(day2WeatherTemps.temp8pm) + "°";

    DayOfTheWeek3_8amWeather.innerText = Description2Icon(day3WeatherForecast.weather8am, 60 * 60 * 8, DayOfTheWeek3_8amWeather);
    DayOfTheWeek3_12pmWeather.innerText = Description2Icon(day3WeatherForecast.weather12pm, 60 * 60 * 12, DayOfTheWeek3_12pmWeather);
    DayOfTheWeek3_8pmWeather.innerText = Description2Icon(day3WeatherForecast.weather8pm, 60 * 60 * 20, DayOfTheWeek3_8pmWeather);

    DayOfTheWeek3_8amTemp.innerText = Math.round(day3WeatherTemps.temp8am) + "°";
    DayOfTheWeek3_12pmTemp.innerText = Math.round(day3WeatherTemps.temp12pm) + "°";
    DayOfTheWeek3_8pmTemp.innerText = Math.round(day3WeatherTemps.temp8pm) + "°";

    DayOfTheWeek4_8amWeather.innerText = Description2Icon(day4WeatherForecast.weather8am, 60 * 60 * 8, DayOfTheWeek4_8amWeather);
    DayOfTheWeek4_12pmWeather.innerText = Description2Icon(day4WeatherForecast.weather12pm, 60 * 60 * 12, DayOfTheWeek4_12pmWeather);
    DayOfTheWeek4_8pmWeather.innerText = Description2Icon(day4WeatherForecast.weather8pm, 60 * 60 * 20, DayOfTheWeek4_8pmWeather);

    DayOfTheWeek4_8amTemp.innerText = Math.round(day4WeatherTemps.temp8am) + "°";
    DayOfTheWeek4_12pmTemp.innerText = Math.round(day4WeatherTemps.temp12pm) + "°";
    DayOfTheWeek4_8pmTemp.innerText = Math.round(day4WeatherTemps.temp8pm) + "°";

    DayOfTheWeek5_8amWeather.innerText = Description2Icon(day5WeatherForecast.weather8am, 60 * 60 * 8, DayOfTheWeek5_8amWeather);
    DayOfTheWeek5_12pmWeather.innerText = Description2Icon(day5WeatherForecast.weather12pm, 60 * 60 * 12, DayOfTheWeek5_12pmWeather);
    DayOfTheWeek5_8pmWeather.innerText = Description2Icon(day5WeatherForecast.weather8pm, 60 * 60 * 20, DayOfTheWeek5_8pmWeather);

    DayOfTheWeek5_8amTemp.innerText = Math.round(day5WeatherTemps.temp8am) + "°";
    DayOfTheWeek5_12pmTemp.innerText = Math.round(day5WeatherTemps.temp12pm) + "°";
    DayOfTheWeek5_8pmTemp.innerText = Math.round(day5WeatherTemps.temp8pm) + "°";

    DayOfTheWeek1_ForecastDescription.innerText = day1Weather;
    DayOfTheWeek2_ForecastDescription.innerText = day2Weather;
    DayOfTheWeek3_ForecastDescription.innerText = day3Weather;
    DayOfTheWeek4_ForecastDescription.innerText = day4Weather;
    DayOfTheWeek5_ForecastDescription.innerText = day5Weather;


    //flag-------------------------------------------------------------------------------------------------------------------------------
}

// other functions
//#region

function GetCurrentDay(dt) {

    let dateString = convertUnixTimeToDate(dt);

    let day = dateString.slice(0, 3).toUpperCase();
    let date = convertDateFormat(dateString.slice(5, 11));

    return { day, date, dt };
}

function GetDayOfWeek(yesterday) {

    let dt = yesterday.dt + 86400;
    let dateString = convertUnixTimeToDate(dt);

    let day = dateString.slice(0, 3).toUpperCase();
    let date = convertDateFormat(dateString.slice(5, 11));

    return { day, date, dt };
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


function Description2Icon(description, dt, element) {

    nightTime = false;
    if ((dt % 86400) > (sunset % 86400) || (dt % 86400) < (sunrise % 86400)) {

        nightTime = true;
    }

    let weatherOptions = ['Tornado', 'Snow', 'Thunderstorm', 'Rain', 'Drizzle', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Clouds', 'Clear', 'Partly Cloudy'];
    let weatherIcons = ['?', 'I', 'Y', 'U', 'W', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', 'Z', '3', '1', 'A'];
    let blue = "UWZA3";


    for (let i = 0; i < weatherOptions.length; i++) {

        if (description == weatherOptions[i]) {

            if (weatherIcons[i] == 1 && nightTime) {
                element.style.color = "#8679BE";  //#d1c0d8
                element.style.fontSize = "200px";
                element.style.marginLeft = "10px";
                return 6;
            } else if (weatherIcons[i] == 1) {
                element.style.color = "#ffc400";
                return 1;
            } else if (blue.includes(weatherIcons[i])) {
                element.style.color = "#6dabd1";
                return weatherIcons[i];
            } else {
                element.style.color = "grey";
                return weatherIcons[i];
            }

        }
    }

    return "---";
}

function DetermineLastDaysWeather(weathers, m) {
    let weather8am;
    let weather12pm;
    let weather8pm;
    if (m > 5) { //(8-m < 3) = m > 5
        weather8am = weathers[m + 38 - 8];
        weather12pm = weathers[m + 36 - 8];
        weather8pm = weathers[m + 34 - 8];
    } else if (m > 3) { //(8-m < 5) = m > 3
        weather8am = weathers[m + 38 - 8];
        weather12pm = weathers[m + 36 - 8];
        weather8pm = weathers[m + 42 - 8];
    } else if (m > 1) {// (8-m) < 7 = m > 1
        weather8am = weathers[m + 38 - 8];
        weather12pm = weathers[m + 44 - 8];
        weather8pm = weathers[m + 42 - 8];
    } else {
        weather8am = weathers[m + 46 - 8];
        weather12pm = weathers[m + 44 - 8];
        weather8pm = weathers[m + 42 - 8];
    }
    return { weather8am, weather12pm, weather8pm };
};

function DetermineTodaysWeather(weathers, n) {
    let weather8am;
    let weather12pm;
    let weather8pm;
    if (n < 3) {
        weather8am = weathers[2 - n];
        weather12pm = weathers[4 - n];
        weather8pm = weathers[6 - n];
    } else if (n < 5) {
        weather8am = weathers[10 - n];
        weather12pm = weathers[4 - n];
        weather8pm = weathers[6 - n];
    } else if (n < 7) {
        weather8am = weathers[10 - n];
        weather12pm = weathers[12 - n];
        weather8pm = weathers[6 - n];
    } else {
        weather8am = weathers[10 - n];
        weather12pm = weathers[12 - n];
        weather8pm = weathers[14 - n];
    }
    return { weather8am, weather12pm, weather8pm };
};

function DetermineDaysWeather(weathers, n, dayNumber) {

    let weather8am;
    let weather12pm;
    let weather8pm;

    weather8am = weathers[(2 - n) + (8 * dayNumber)]; //m +6 + 40
    weather12pm = weathers[(4 - n) + (8 * dayNumber)];//m + 4 + 40
    weather8pm = weathers[(6 - n) + (8 * dayNumber)];// m + 2 + 40

    return { weather8am, weather12pm, weather8pm };
}

function DetermineForecastedWeather(weathers, dayNumber, m) {
    weatherOptions = ['Tornado', 'Snow', 'Thunderstorm', 'Rain', 'Drizzle', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Clouds', 'Clear'];
    //                    ?         I           Y            U        W        Z       Z        Z       Z       Z      Z       Z       Z         3        1/6

    weatherTriggers = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    let cloudCounter = 0;
    m = m - 1;

    if (dayNumber == 5) {
        for (let i = 0; i < m; i++) {
            let currentWeather = weathers[8 * (dayNumber - 1) + (8 - m) + i];
            for (let j = 0; j < 15; j++) {
                if (currentWeather == weatherOptions[j]) {
                    weatherTriggers[j] = true;
                    if (j == 13) {
                        cloudCounter++;
                    }
                }
            }

        }
        cloudCounter = cloudCounter * (8 / (m - 1));
    } else {
        for (let i = 0; i < 8; i++) {
            let currentWeather = weathers[8 * (dayNumber - 1) + (8 - m) + i];
            for (let j = 0; j < 15; j++) {
                if (currentWeather == weatherOptions[j]) {
                    weatherTriggers[j] = true;
                    if (j == 13) {
                        cloudCounter++;
                    }
                }
            }
        }
    }


    for (let i = 0; i < 15; i++) {
        if (weatherTriggers[i]) {
            if (i == 13) {
                if (cloudCounter < 3) {
                    return 'Clear';
                } else if (cloudCounter < 7) {
                    return 'Partly Cloudy';
                }
            }
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

function convertToNormalTime(militaryTime) {
    let hour = parseInt(militaryTime.substring(0, 2), 10);
    let minute = militaryTime.substring(3);

    let period = (hour >= 12) ? 'PM' : 'AM';

    if (hour === 0) {
        hour = 12; // 12 AM
    } else if (hour > 12) {
        hour = hour - 12; // Convert to 12-hour format
    }

    return `${hour}:${minute} ${period}`;
}

//#endregion

let favorited = false;

function favorite() {


    const image = document.getElementById('favoriteBtnID');
    if (favorited) {
        image.src = './assets/FavoriteIcon.png';
        favorited = false;


        slider.removeChild(newFavoriteElement);
    } else {
        image.src = './assets/FavoritedIcon.png';
        favorited = true;


        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        var img1 = document.createElement('img');
        
        div1.className = 'container'; 
        div1.style.paddingLeft = "0px";
        div1.style.paddingRight = "20px";
        div1.style.marginBottom = "20px";
    
    
        div2.className = "favoritedCity container";
        div2.onclick = function() {
            Go(this);
        }
    
        div3.className = "text";
    
        div3.textContent = `${place}, ${country}`;
    
        img1.onclick = function() {
            RemoveParent(this);
        }
        img1.className = "x";
        img1.src = "./assets/X.png";
        img1.alt = "X";
    
        let slider = document.getElementById("slider");
        let emptyDiv = document.getElementById("emptyDiv");
        
        slider.insertBefore(div1, emptyDiv.nextSibling);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div2.appendChild(img1);
    
        newFavoriteElement = div1;

    }

}



//   <div class="container" style="padding-left: 0; padding-right: 20px; margin-bottom: 20px;">
//     <div class="favoritedCity container">
//       <div class="text">Stockton, California</div>
//       <img onclick="RemoveParent(this)" class="x" src="./assets/X.png" alt="X">
//     </div>
//   </div>


function RemoveParent(button) {
    // Find the parent element of the button
    var parentElement = button.parentElement;

    // Hide the parent element (set display to none)
    // parentElement.style.display = 'none';

    // Alternatively, to remove the parent element from the DOM entirely:
    parentElement.remove();
}

function CloseGrandParent(button) {
    // Find the parent element of the button
    var parentElement = button.parentElement;
    var grandParentElement = parentElement.parentElement;

    // Hide the parent element (set display to none)
    grandParentElement.style.display = 'none';

    // Alternatively, to remove the parent element from the DOM entirely:
    // parentElement.remove();
}

function OpenFavorites() {
    var container = document.getElementById("side-containerID");
    container.style.display = 'block';
}

let forecastOpen = false;
let forecastDisplayedArray = [false, false, false, false, false];

let day1Forecast = document.getElementById("day1Forecast");
let day2Forecast = document.getElementById("day2Forecast");
let day3Forecast = document.getElementById("day3Forecast");
let day4Forecast = document.getElementById("day4Forecast");
let day5Forecast = document.getElementById("day5Forecast");



let forecastArray = [day1Forecast, day2Forecast, day3Forecast, day4Forecast, day5Forecast];
function OpenForecast(index) {
    let btn = document.getElementById("openFavoritesBtn");
    let trigger = true;
    for (let i = 0; i < 5; i++) {

        if (forecastDisplayedArray[i]) {
            if ((i == index - 1)&&trigger) {
                forecastArray[i].style.display = "none";
                forecastDisplayedArray[i] = false;
                btn.classList.toggle("location7");
                btn.classList.toggle("location7B");
            } else if(trigger){
                forecastArray[i].style.display = "none";
                forecastDisplayedArray[i] = false;
                forecastArray[index-1].style.display = "";
                forecastDisplayedArray[index-1] = true;
            }
            trigger = false;
        }
    }
    if (trigger) {
        forecastArray[index-1].style.display = "";
        forecastDisplayedArray[index-1] = true;
        btn.classList.toggle("location7");
        btn.classList.toggle("location7B");
    }






}

function DayOfWeekElongated(WWW) {
    WWW = WWW.toUpperCase();
    switch (WWW) {
        case "MON":
            return "MONDAY";
            break;
        case "TUE":
            return "TUESDAY";
            break;
        case "WED":
            return "WEDNESDAY";
            break;
        case "THU":
            return "THURSDAY";
            break;
        case "FRI":
            return "FRIDAY";
            break;
        case "SAT":
            return "SATURDAY";
            break;
        case "SUN":
            return "SUNDAY";
            break;
        default:
            return "Err"

    }
}

function GetWeatherTemp(hourOffset, dayNumber) {

    let temp8am;
    let temp12pm;
    let temp8pm;

    let x = dayNumber * 8;

    switch (hourOffset) {
        case 0:
            temp8am = ((temps[2 + x] + (2 * temps[3 + x])) / 3).toFixed(2);
            temp12pm = temps[4 + x].toFixed(2);
            temp8pm = ((temps[6 + x] + (2 * temps[7 + x])) / 3).toFixed(2);
            break;
        case 1:
            temp8am = (((2 * temps[2 + x]) + temps[3 + x]) / 3).toFixed(2);
            temp12pm = ((temps[3 + x] + (2 * temps[4 + x])) / 3).toFixed(2);
            temp8pm = (((2 * temps[6 + x]) + temps[7 + x]) / 3).toFixed(2);
            break;
        case 2:
            temp8am = temps[2 + x].toFixed(2);
            temp12pm = (((2 * temps[3]) + temps[4 + x]) / 3).toFixed(2);
            temp8pm = temps[6 + x].toFixed(2);
            break;
        default:
            break;
    }

    return { temp8am, temp12pm, temp8pm };
}

