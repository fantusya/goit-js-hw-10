import './css/styles.css';
import fetchCountries from "./js/fetchCountries";
import countriesMarkup from './js/making-markup/many-countries';
import countryMarkup from './js/making-markup/one-country';

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
                insertingCountriesMarkup(response);
            } else {
                clearHtml();
                insertingCountryMarkup(response);
            }
        })
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
        });
}

function insertingCountriesMarkup(countries) {
    listOfCountries.insertAdjacentHTML('beforeend', countriesMarkup(countries));
}

function insertingCountryMarkup(country) {
    countryContainer.insertAdjacentHTML('beforeend', countryMarkup(country));
}

function clearHtml() {
    listOfCountries.innerHTML = '';
    countryContainer.innerHTML = '';
}