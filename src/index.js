import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  listElem: document.querySelector('.country-list'),
  infoElem: document.querySelector('.country-info'),
};

const cleanMarkup = ref => (ref.innerHTML = '');

refs.input.addEventListener('input', debounce(inputCase, DEBOUNCE_DELAY));

function inputCase(e) {
  const textInput = e.target.value.trim();
  if (!textInput) {
    cleanMarkup(refs.listElem);
    cleanMarkup(refs.infoElem);
    return;
  }
  fetchCountries(textInput)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      renderCountries(data);
    })
    .catch(err => {
      cleanMarkup(refs.listElem);
      cleanMarkup(refs.infoElem);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function infoCountry(data) {
  return data
    .map(
      ({ name, capital, population, flags, languages }) =>
        ` <img src="${flags.png}" alt="country-flag" width="40px"/>
    <h1 style="display: inline;">${name.official}</h1>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Languages:</strong> ${Object.values(languages)}</p> `
    )
    .join('');
}

function listCountries(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li style="margin-bottom: 13px">
        <img src="${flags.png}" alt="country-flag" width="40px"/>
        <p style="display: inline;">${name.official}</p>
     </li> `
    )
    .join('');
}

function renderCountries(data) {
  if (data.length === 1) {
    cleanMarkup(refs.listElem);
    const markupInfo = infoCountry(data);
    refs.infoElem.innerHTML = markupInfo;
  } else {
    cleanMarkup(refs.infoElem);
    const markupList = listCountries(data);
    refs.listElem.innerHTML = markupList;
  }
}