const countryName = document.getElementById("inputCountry");
const button = document.querySelector("button");
const h1 = document.getElementById("country");
const currency = document.getElementById("currency");
const flag = document.querySelector("#flag");
const language = document.getElementById("language");
const errorMessage = document.getElementById("errorMessage");

const url = "https://restcountries.com/v3.1/all?fields=name,flags,currencies,languages";
const getCountry = async () => {



    const response = await fetch(url);
    const data = await response.json()


    const inputValue = countryName.value.trim().toLowerCase();
    const country = data.find(c => c.name.common.toLowerCase() === inputValue)
    if (country) {
        h1.innerText = `${country.name.common}`;
        currency.innerText = `Currency: ${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol})`

        language.innerText = `Language: ${Object.values(country.languages)}`;

        flag.src = country.flags.png;

        
        errorMessage.innerText = "";
    } else {
        errorMessage.innerText = "Country not found.Please try again"
        h1.innerText = "";
        currency.innerText = "";
        language.innerText = "";
        flag.src = "";
    }


}

button.addEventListener("click", getCountry);



