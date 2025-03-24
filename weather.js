const API_KEY = "045d1e8f7d9bc8cbf59eec7cc1db2f20";
const URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

const cityName = document.getElementById("inputCity");
const button = document.querySelector("button");
const h1 = document.getElementById("city");
const temp = document.getElementById("temp");
const weatherIcon = document.querySelector("#weatherIcon");
const description = document.getElementById("description");
const errorMessage = document.getElementById("errorMessage");
function getWeather(city) {
    try {
        fetch(URL + city)
            .then((res) => res.json())
            .then((data) => {
                if (data.cod === 200) {
                    errorMessage.innerText = "";
                    h1.innerText = data.name;
                    temp.innerText = `${data.main.temp}°c`;

                    description.innerText = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;


                });
    }
    
}
/*  try {
      if (cityName !== city) {
          throw new Error("you must write city name");
 
      }
      if (cityName = " ") {
          throw new Error("write a city name");
      }
  }
  catch (error) {
      errorMessage.innerText = error;
  }
}*/

button.addEventListener("click", () => {

    getWeather(cityName.value);

});