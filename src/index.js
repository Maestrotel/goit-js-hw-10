import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input'),
  listElem: document.querySelector('.country-list'),
  infoElem: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', e => {
  e.preventDefault();
  const findCountry = e.target.value;
  fetchCountries(findCountry).then((data) => {
    (data[0]);
  });
});

function infoCountries(data) {
  let markup = data.map(({ name, capital, population, flags, languages }) =>
    ` <img src="${flags.png}" alt="country-flag" />
    <h1>${name}</h1>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>
  `).join('');
}



function listCountries(data) {
  let markup = data.map(({ name, flags }) =>
    ` <li>
    <img src="${flags.png}" alt="country-flag" />
    <p>${name}</p>
  </li>
  <li>
    <img src="${flags.png}" alt="country-flag" />
    <p>${name}</p>
  </li>
  <li>
    <img src="${flags.png}" alt="country-flag" />
    <p>${name}</p>
  </li>
  <li>
    <img src="${flags.png}" alt="country-flag" />
    <p>${name}</p>
  </li>
  `).join('');
}

function renderCountries(data) {
  if (data.length === 1) {
    const markInfo = infoCountries(data);
    refs.infoElem.innerHTML = markInfo;
  } else {
    const markList = listCountries(data);
    refs.listElem.innerHTML = markList;
  }
}


renderCountries(data);

fetchCountries(name)