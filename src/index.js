import './css/styles.css';
import { fetchCountries } from './fetchCountries';
// var debounce = require('lodash.debounce');
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

let inputValue = "";

refs.input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();

    inputValue = e.target.value.trim();
    if (inputValue === "") {
        clearMarkup();
        return;
    }

    fetchCountries(inputValue).then(countries => {
        console.log(countries);
        if (countries.length === 1) {
            createCountryInfo();
            return;
}
    })
}

function createCountriesList(countries) {
    const markup = countries.map(country => `<li class="country-item">
        <img class="country-flag" src="" alt="flag">
        <p class="country-name"></p>
      </li>`).join(" ");
    
    refs.list.insertAdjacentHTML("beforeend", markup);
}

function createCountryInfo(countries) {
    // const languages = countries.map(({languages}) => Object.values(languages).join(", "));
  
    // const languages = Object.values(countries[0].languages);

    const markup = countries.map(country => `<img class="country-info-flag" src="${country.flag.svg}" alt="">
      <h1 class="country-info-name">${country.name.official}</h1>
      <ul class="country-info-list">
        <li>
          <span class="country-info-item"></span>
          <p class="country-info-value"></p>
        </li>
        <li>
          <span class="country-info-item"></span>
          <p class="country-info-value"></p>
        </li>
        <li>
          <span class="country-info-item"></span>
          <p class="country-info-value"></p>
        </li>
      </ul>`);
    
    refs.countryInfo.insertAdjacentHTML("beforeend", markup);
}


function clearMarkup() {
    refs.list.innerHTML = "";
    refs.countryInfo.innerHTML = "";
}

function onError() {
    clearMarkup();
    Notify.failure("Oops, there is no country with that name");
}




/* <li class="country-item">
        <img class="country-flag" src="" alt="">
        <p class="country-name"></p>
      </li> */




/* <img class="country-info-flag" src="" alt="">
      <h1 class="country-info-name"></h1>
      <ul class="country-info-list">
        <li>
          <span class="country-info-item"></span>
          <p class="country-info-value"></p>
        </li>
        <li>
          <span class="country-info-item"></span>
          <p class="country-info-value"></p>
        </li>
        <li>
          <span class="country-info-item"></span>
          <p class="country-info-value"></p>
        </li>
      </ul> */
