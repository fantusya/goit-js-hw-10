export default function countriesMarkup(countries) {
    return countries.map(({ flags, name }) =>
        `<li class="countries__item">
            <img class="countries__img" src="${flags.svg}" alt="flag of ${name.official} "/>
            <p class="countries__name">${name.official}</p>
        </li>`
    ).join('');
}