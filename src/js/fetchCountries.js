const BASE_URL = 'https://restcountries.com/v3.1/name';
const FIELDS = 'fields=name,capital,population,flags,languages'

export default function fetchCountries(name) {
    const url = `${BASE_URL}/${name}?${FIELDS}`;

    return fetch(url)
        .then(response => {
            if (response.status === 404) {
                throw new Error(response.status);
            }
            return response.json()
        })
        // .catch(error => console.log(error));
}

