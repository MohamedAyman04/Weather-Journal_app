/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="; // the base url that won't change
const apiKey = "&units=imperial&appid=9408cb5720cfd88b20fd50dd26efb5f3"; // the api key that differs from one to another
const zip = document.querySelector("#zip"); // created zip to hold the element with the id #zip
const feel = document.querySelector("#feelings"); // created feel to hold the element with the id #feelings
const gen = document.querySelector("#generate"); // created gen to hold the element with the id #generate

// Create a new date instance dynamically with JS
let d = new Date(); // ceated an instance from Date() {already given by udacity}
let newDate = d.getMonth() + 1 + " / " + d.getDate() + " / " + d.getFullYear(); // set the date approperiatly {already given by udacity}

// the main function that is responsible for everything
gen.addEventListener("click", () => {
  // adding an event listener for the gen to click and the callback function doesn't have any parameters
  let zipVal = zip.value; // created zipVal and assigned it to zip.value
  let feelVal = feel.value; // created feelVal and assigned it to feel.value
  getWeatherInfo(baseURL, zipVal, apiKey) // called the function getWeatherInfo with the baseURL, zipVal and apiKey as arguments
    .then((weather) => { // then after that took the weather
      postWeatherData("/weather", { // called the postWeatherData
        temp: weather.main.temp, // the temp of the object is now the temp given by the api
        content: feelVal, // the content of the object is the user feelings
        date: newDate, // the date is the newDate
      }); // end modifying object
      changeUserInterface("/allData"); // called the function changeUserInterface with the url of /allData
    }); // end of the .then function
}); // end of the add event listener function

// function responsible for taking info from the api
async function getWeatherInfo(url, zip, api) { // the getWeatherInfo is an async function that has three parameters url, zip and api
  const res = await fetch(url + zip + api); // created a constant variable res and waited for fetching the concatenated url
  try { // tried to do something
    const weather = res.json(); // created a constant variable weather and assigned it to res but converted to json
    return weather; // reutned the weather
  } catch (error) { // if there is an error catch it
    console.log("error", error); // display it in the console
  } // end of catch statement
} // end of the async function getWeatherInfo

// function responsible for posting the data to the server
async function postWeatherData(url = "", data = {}) { // created async function named postWeatherData with two parameters
  console.log(data); // logged the data to the console
  const response = await fetch(url, { // created a constant variable response and waited for the fetch to finish
    method: "POST", // changed the method to POST
    credentials: "same-origin", // changed the credentials to same-origin
    headers: { // changed the headers
      "Content-Type": "application/json", // made Content-Type set to application/json
    }, // end of headers
    body: JSON.stringify(data), // changed the data datatype to string instead of json
  }); // end of modifying the second parameter

  try { // tried to do something
    const anotherData = await response.json(); // created anotherData and waited for response to change to json again
    return anotherData; // returned the anotherData
  } catch (error) { // if there is an error catch it
    console.log("error", error); // looged the error out to the console
  } // end of catch statement
} // end of the async function postWeatherData

// function responsible for getting the data from the server
async function changeUserInterface(url = "") { // created async function named changeUserInterface with one parameter
  const request = await fetch(url); // created a constant variable names request and waited to fetch the url and assigned it to the request
  try { // tried to do something
    const getInfo = await request.json(); // created getInfo and waited for the request to be json
    document.querySelector("#date").innerHTML = 'date: ' + getInfo.date; // selected the element with the id #date and setted it's innerHTML to the date key in getInfo and added label
    document.querySelector("#temp").innerHTML = 'temperature: ' + Math.round(getInfo.temp) + " degrees fahrenheit"; // selected the element with the id #temp and setted it's innerHTML to the temp key in getInfo and made it an integer and added label
    document.querySelector("#content").innerHTML = 'feelings: ' + getInfo.content; // selected the element with the id #content and setted it's innerHTML to the content key in getInfo and added label
  } catch (error) { // if there is an error catch it
    console.log("error", error); // logged the error out to the console
  } // end of catch statement
} // end of the async function changeUserInterface

/*
  Resources used
    MDN: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
    open weather app: https://openweathermap.org/current
    Youtube: https://www.youtube.com/watch?v=GXrDEA3SIOQ
    w3schools: https://www.w3schools.com/js/js_async.asp
    google: https://www.google.com/search?q=weather+image&rlz=1C5CHFA_enEG972EG1000&sxsrf=ALiCzsaT3Wor-29IMX3zZcS4q3YfdUmacw:1653166575449&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj7qu-zvfH3AhV3iv0HHcu2BxkQ_AUoAXoECAEQAw&biw=2560&bih=1329&dpr=2#imgrc=DWLD3vgRlTiilM
*/
