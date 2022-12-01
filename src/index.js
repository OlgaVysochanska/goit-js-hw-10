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

    fetchCountries(inputValue);
}

function createCountriesList(countries) {

}

function createCountryInfo(countries) {

}


function clearMarkup() {
    refs.list.innerHTML = "";
    refs.countryInfo.innerHTML = "";
}

function onError() {

}


/* <li class="country-item">
        <img class="country-flag" src="" alt="">
        <p class="country-name"></p>
      </li> */


      