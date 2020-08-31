'use strict'
/**
 * Responsible for DOM Elements control.
 * @module CalculatorDOMCtrl
 */

/**
 *  Map with Calculator DOM Elements that will be accessed.
 */
const calculatorDOMElements = {
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
const _resultDOMElements = {
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
const _getRequiredFields = function () {
  let requiredFields = null;
  return () => {
    if (requiredFields === null) {
      requiredFields = document.querySelectorAll('#container .calculator__input--required');
    }
    return requiredFields;
  };
}

/**
 * Makes the result section visible and fill it with given arguments.
 * 
 * @param {number} principleAndInterest 
 * @param {number} tax 
 * @param {number} insurance 
 * @param {number} totalMonthlyPayment 
 */
const showResults = function (principleAndInterest, tax, insurance, totalMonthlyPayment) {
  _resultDOMElements.principleAndInterestResultEl.innerHTML = '$ ' + principleAndInterest.toFixed(2);
  _resultDOMElements.taxResultEl.innerHTML = '$ ' + tax.toFixed(2);
  _resultDOMElements.insuranceResulEl.innerHTML = '$ ' + insurance.toFixed(2);
  _resultDOMElements.monthlyPaymentResultEl.innerHTML = '$ ' + totalMonthlyPayment.toFixed(2);
  _resultDOMElements.resultsSection.classList.add('show');
  _resultDOMElements.resultsSection.scrollIntoView({ behavior: 'smooth' });  
}

/**
 * Display a error message and add a error modifier to its parent node.
 * @param {Element} element DOM element to display error.
 */
const _displayMandatoryElementError = function (element) {
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
const _removeMandatoryElementError = function (element) {
  element.parentNode.classList.remove('input-prepend--error');
  element.parentNode.parentNode.querySelector('.calculator__input-error')?.remove();
}

/**
 * Validate if the mandatory fields are filled and display errors if necessary.
 * @returns {Boolean} True if all mandatory fields are filled. False if not.
 */
const validateMandatoryFields = function () {
  let isValid = true;
  const requiredFields = _getRequiredFields();
  requiredFields().forEach(element => {
    _removeMandatoryElementError(element);
    if (element.value === '') {
      _displayMandatoryElementError(element);
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
  calculatorDOMElements,
  validateMandatoryFields,
  updateRangeElementStyle
}
