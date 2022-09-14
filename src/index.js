import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries";
// import { someCountriesMarkup, countryMarkup } from './js/countries-markup';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-box');
const listOfCountries = document.querySelector('.countries__list');
const countryContainer = document.querySelector('.country__container');


searchForm.addEventListener('input', debounce(onSearchFormInput, DEBOUNCE_DELAY));

function onSearchFormInput(e) {
    e.preventDefault();
    
    if (searchForm.value === '') {
        clearHtml();
        return;
    }

    fetchCountries(searchForm.value.trim())
        .then(response => {
            clearHtml();
            
                if (response.length > 10) {
                    Notify.info('Too many matches found. Please enter a more specific name.');
                    return;
                } else if (response.length >= 2 && response.length <= 10) {
                    clearHtml();
                    someCountriesMarkup(response);
                } else {
                    clearHtml();
                    countryMarkup(response);
                }
            })
            .catch(error => {
                Notify.failure('Oops, there is no country with that name');
            });
}

function someCountriesMarkup(countries) {
    const countriesMarkup = countries.map(({ flags, name }) =>
        `<li class="countries__item">
            <img class="countries__img" src="${flags.svg}" alt="flag of ${name.official} "/>
            <p class="countries__name">${name.official}</p>
        </li>`
    ).join('');

    listOfCountries.insertAdjacentHTML('beforeend', countriesMarkup);
}

function countryMarkup(country) {
    const countryMarkup = country.map(({ name, capital, population, flags, languages }) =>
        `<div class="country__title">
            <img class="country__title-img" src="${flags.svg}" alt="flag of ${name.official}">
            <h1 class="country__title-name">${name.official}</h1>
        </div>
        <ul class="country__info-list">
            <li class="country__info-item">
                <h2 class="country__subtitle">Capital:</h2>
                <p class="country__info-text">${capital}</p>
            </li>
                <li class="country__info-item">
                <h2 class="country__subtitle">Population:</h2>
                <p class="country__info-text">${population}</p>
            </li>
            <li class="country__info-item">
                <h2 class="country__subtitle">Languages:</h2>
                <p class="country__info-text">${Object.values(languages)}</p>
            </li>
        </ul>`
    ).join('');

    countryContainer.insertAdjacentHTML('beforeend', countryMarkup);
}

function clearHtml() {
    listOfCountries.innerHTML = '';
    countryContainer.innerHTML = '';
}