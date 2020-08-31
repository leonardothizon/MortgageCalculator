'use strict'
/**
 * Responsible for DOM Elements control.
 * @module CalculatorDOMCtrl
 */

/**
 *  Map with Calculator DOM Elements that will be accessed.
 */
const CalculatorDOMElements = {
  yearsMortgageRangeEl: document.getElementById("years-mortgage"),
  yearsMortgageValueEl: document.getElementById("years-mortgage-value"),
  interestRateRangeEl: document.getElementById("rate-interest"),
  interestRateValueEl: document.getElementById("rate-interest-value"),
  loanAmountValueEl: document.getElementById("loan-amount-input"),
  annualTaxValueEl: document.getElementById("annual-tax-input"),
  annualInsuranceValueEl: document.getElementById("annual-insurance-input"),
  calculateBtn: document.getElementById('calculate-btn'),
}

/**
 *  Map with Result section DOM Elements that will be accessed.
 */
const ResultDOMElements = {
  resultsSection: document.getElementById('results'),
  principleAndInterestResultEl: document.getElementById('result-principle-interest'),
  taxResultEl: document.getElementById('result-tax'),
  insuranceResulEl: document.getElementById('result-insurance'),
  monthlyPaymentResultEl: document.getElementById('result-monthly-payment'),
}

/**
 *  Retrieves all input element containing the --required modifier. 
 *  It uses closure to protect the element and make sure to be queried only once.
 *  
 *  @return {NodeList} List containing all input fields which value is required.
 */
const getRequiredFields = function () {
  let requiredFields = null;
  return () => requiredFields || document.querySelectorAll('#container .calculator__input--required');
}

/**
 * Take the result of mortgage calculation as parameter and set the values in its respectives DOM elements.
 * Make the Result Section visible.
 * @param {Object} results Object containing the result of mortgage calculation.
 */
const showResults = function (results) {
  ResultDOMElements.principleAndInterestResultEl.innerHTML = '$ ' + results.principleAndInterest.toFixed(2);
  ResultDOMElements.taxResultEl.innerHTML = '$ ' + results.tax.toFixed(2);
  ResultDOMElements.insuranceResulEl.innerHTML = '$ ' + results.insurance.toFixed(2);
  ResultDOMElements.monthlyPaymentResultEl.innerHTML = '$ ' + results.totalMonthlyPayment.toFixed(2);
  ResultDOMElements.resultsSection.classList.add('show');
  ResultDOMElements.resultsSection.scrollIntoView({ behavior: 'smooth' });  
}

/**
 * Display a error message and add a error modifier to its parent node.
 * @param {Element} element DOM element to display error.
 */
const displayMandatoryElementError = function (element) {
  let labelValue = element.parentNode.parentNode.querySelector('.calculator__label')?.innerHTML;
  element.parentNode.classList.add('input-prepend--error');
  let labelElement = document.createElement('span');
  labelElement.className = 'calculator__input-error';
  labelElement.innerHTML = labelValue + ' is mandatory';
  element.parentNode.insertAdjacentElement('afterend', labelElement);
}

/**
 * Removes the error message and removes the error modifier from its parent node.
 * @param {Element} element DOM element to remove error.
 */
const removeMandatoryElementError = function (element) {
  element.parentNode.classList.remove('input-prepend--error');
  element.parentNode.parentNode.querySelector('.calculator__input-error')?.remove();
}

/**
 * Validate if the mandatory fields are filled and display errors if necessary.
 * @returns {Boolean} True if all mandatory fields are filled. False if not.
 */
const validateMandatoryFields = function () {
  let isValid = true;
  let requiredFields = getRequiredFields();
  requiredFields().forEach(element => {
    removeMandatoryElementError(element);
    if (element.value === '') {
      displayMandatoryElementError(element);
      isValid = false;
    }
  });
  return isValid;
}

/**
 * Update range input's background according to given value.
 * @param {Element} element DOM input range element
 * @param {number} value Value to be set.
 */
const updateRangeElementStyle = function (element, value) {
  let percValue = value * 100 / element.max;
  element.style.background = 'linear-gradient(to right, #000 0%, #000 ' + percValue + '%, #ccc ' + value + '%, #ccc 100%)';
}

export {
  showResults,
  CalculatorDOMElements,
  validateMandatoryFields,
  updateRangeElementStyle
}
