const BASE_URL = 'https://restcountries.com/v3.1/'
const ENDPOINT = 'name/'
const searchParams = new URLSearchParams({
    fields: ['name',
        'capital',
        ' population',
        'flags',
        'languages',
        'population']
});

export function fetchCountries(name) {
    return fetch(`${BASE_URL}${ENDPOINT}${name}?${searchParams}`).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
}