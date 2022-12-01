export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flag.svg,languages`).then(resp => resp.json()).then(data => console.log(data));
}