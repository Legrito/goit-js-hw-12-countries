
const countryCardMarkup = (countries, template) => {
    return countries.map((country) => template(country)).join('');
}

export default countryCardMarkup;