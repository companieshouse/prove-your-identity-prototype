//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})

function add_second_click() {
  var link = document.getElementById('nationalityTwoLink');
  var autocomplete = document.getElementById('nationalityTwoAutocomplete');

  link.classList.add('govuk-visually-hidden');
  autocomplete.classList.remove('govuk-visually-hidden');
}

function add_third_click() {
  var link = document.getElementById('nationalityThreeLink');
  var autocomplete = document.getElementById('nationalityThreeAutocomplete');

  link.classList.add('govuk-visually-hidden');
  autocomplete.classList.remove('govuk-visually-hidden');
}