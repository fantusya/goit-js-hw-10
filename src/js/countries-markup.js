export function someCountriesMarkup (countries) {
    const countriesMarkup = countries.map(({ flags, name }) =>
        `<li class="countries__item">
            <img class="countries__img" src="${flags.svg}" alt="flag of ${name.official} "/>
            <p class="countries__name">${name.official}</p>
        </li>`
    ).join('');

    listOfCountries.insertAdjacentHTML('beforeend', countriesMarkup);
}

export function countryMarkup(country) {
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