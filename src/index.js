import './css/styles.css';
import { fetchCountries } from './fetchCountries';
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
      clearMarkup();
      createCountryInfo(countries);
      return;
    } else if (countries.length > 1 && countries.length <= 10) {
      clearMarkup();
      createCountriesList(countries);
      return;
    } else if (countries.length > 10) {
      clearMarkup();
      Notify.info('Too many matches found. Please enter a more specific name.');
      return;
    }
  }).catch(onError);
}

function createCountriesList(countries) {
    const markup = countries.map(country => `<button type="button" class="country-item">
        <img class="country-flag" src="${country.flags.svg}" alt="flag">
        <p class="country-name">${country.name.official}</p>
      </button>`).join(" ");
    
  refs.list.insertAdjacentHTML("beforeend", markup);

  refs.list.addEventListener("click", onListElementClick);

function onListElementClick(e) {
  clearMarkup();

  const chosenCountry = e.target.lastChild.textContent;
  console.log(chosenCountry);
  fetchCountries(chosenCountry).then(countries => {
    clearMarkup();
    createCountryInfo(countries);
    return;
  }).catch(onError);
}
}

function createCountryInfo(countries) {
    const languages = Object.values(countries[0].languages).join(', ');

    const markup = countries.map(country => `<div class="country-info-head"><img class="country-info-flag" src="${country.flags.svg}" alt="flag">
      <h1 class="country-info-name">${country.name.official}</h1></div>
      <ul class="country-info-list">
        <li>
          <p class="country-info-item">Capital: </p>
          <span class="country-info-value">${country.capital}</span>
        </li>
        <li>
          <p class="country-info-item">Population: </p>
          <span class="country-info-value">${country.population}</span>
        </li>
        <li>
          <p class="country-info-item">Languages: </p>
          <span class="country-info-value">${languages}</span>
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





 
