import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    infoDiv: document.querySelector('.country-info')
}

refs.input.addEventListener('input', debounce(onSearch, 300))

function onSearch(e) {
    const name = refs.input.value.trim()
    const max = 10;
    const min = 2;
    if (!name) {
        refs.list.innerHTML = ''
        refs.infoDiv.innerHTML = ''
        return
    } 

    fetchCountries(name).then(data => {
        if (data.length > max) {
            clearPage()
            Notify.info('Too many matches found. Please enter a more specific name.')
        } else if (min <= data.length && data.length <= max) {
            refs.infoDiv.innerHTML = ''
            refs.list.innerHTML = createListMarkup(data)
        } else {
            console.log(data)
            refs.list.innerHTML = ''
            refs.infoDiv.innerHTML = createInfoMarkup(data)
        }
    })
        .catch(() => { 
            clearPage()
            Notify.failure('Oops, there is no country with that name')
        });
}

function clearPage() { 
    refs.list.innerHTML = ''
    refs.infoDiv.innerHTML = ''
}

function createListMarkup(arr) {
    return arr.map(({ name: { official }, flags: { svg } }) => `<li class="country">
        <img src = "${svg}" alt="${official}" width="60px"/>
        <p class="country-name">${official}</p>
      </li>`).join('')
}

function createInfoMarkup(arr) {
    return arr.map(({ capital, population, name: { official }, flags: { svg }, languages }) => {
        const [...rest] = Object.values(languages)
        return `<div class="title-wrap">
        <img src = "${svg}" alt="${official}" width="90px"/>
        <h1 class="country-name">${official}</h1>
        </div>
        <p><span>Capital: </span>${capital}</p>
      <p><span>Population: </span>${population}</p>
      <p><span>Languages: </span>${rest}</p>
       `}
    ).join('')

}