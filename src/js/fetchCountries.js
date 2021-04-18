import Country from '../hbs/country.hbs';
import CountriesList from '../hbs/countries-list.hbs';
import countryCardMarkup from '../js/countries-markup.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { error } from '@pnotify/core/dist/PNotify.js';

const debounce = require('lodash.debounce');
const baseUrl = 'https://restcountries.eu/rest/v2/name/';
const inputEl = document.querySelector('input.search');
const searchResultEl = document.querySelector('div.search-result');


const clearMarkup = () => {
    searchResultEl.innerHTML = '';
}

const onCountryMurkupRender = (data, template) => {
    clearMarkup();
    const countriesMarkup = countryCardMarkup(data, template);
    searchResultEl.insertAdjacentHTML('beforeend', countriesMarkup);
}

const fetchCountries = (e) => {
    const country = `${e.target.value}`;
    fetch(baseUrl + country)   
    .then(response => response.json())
    .then(data => {
        if(data.length === 1) {
            onCountryMurkupRender(data, Country);
        } else if(data.length > 1 && data.length < 10) {
            onCountryMurkupRender(data, CountriesList);
        } else if(data.length > 10) {
            clearMarkup();
            error({
                title: 'Too many mathes found',
                text: 'Please enter a more specific query',
                addClass: 'alert',
                delay: 3000,
              });
        } else if(data.status === 404) {
            error({
                title: 'Not found',
                text: 'Please enter a more specific query',
                addClass: 'error',
                delay: 3000,
              });
        }
    })
};


inputEl.addEventListener('input', debounce(fetchCountries, 500));
