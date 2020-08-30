'use strict'

const principleAndInterestResultEl = document.getElementById('result-principle-interest');
const taxResultEl = document.getElementById('result-tax');
const insuranceResulEl = document.getElementById('result-insurance');
const monthlyPaymentResultEl = document.getElementById('result-monthly-payment');

// Change to query DOM only when it is needed. Unecessary load at page initialization
const DOMElements = {
  yearsMortgageRangeEl: document.getElementById("years-mortgage"),
  yearsMortgageValueEl: document.getElementById("years-mortgage-value"),
  interestRateRangeEl: document.getElementById("rate-interest"),
  interestRateValueEl: document.getElementById("rate-interest-value"),
  loanAmountValueEl: document.getElementById("loan-amount-input"),
  annualTaxValueEl: document.getElementById("annual-tax-input"),
  annualInsuranceValueEl: document.getElementById("annual-insurance-input"),
  calculateBtn: document.getElementById('calculate-btn'),
  resultsSection: document.getElementById('results')
}

const showResults = function (results) {
  principleAndInterestResultEl.innerHTML = '$ ' + results.principleAndInterest.toFixed(2);
  taxResultEl.innerHTML = '$ ' + results.tax.toFixed(2);
  insuranceResulEl.innerHTML = '$ ' + results.insurance.toFixed(2);
  monthlyPaymentResultEl.innerHTML = '$ ' + results.totalMonthlyPayment.toFixed(2);
  DOMElements.resultsSection.classList.add('show');
}

const validateRequiredFields = function () {
  let isValid = true;

  if (DOMElements.loanAmountValueEl.value === '') {
    DOMElements.loanAmountValueEl.parentNode.classList.add('input-prepend--error');
    DOMElements.loanAmountValueEl.parentNode.nextElementSibling.style.display = 'inline-block';
    DOMElements.loanAmountValueEl.parentNode.nextElementSibling.innerHTML = 'Loan Amount is mandatory';
    isValid = false;
  } else {
    DOMElements.loanAmountValueEl.parentNode.classList.remove('input-prepend--error');
    DOMElements.loanAmountValueEl.parentNode.nextElementSibling.style.display = 'none';
  }

  if (DOMElements.annualTaxValueEl.value === '') {
    DOMElements.annualTaxValueEl.parentNode.classList.add('input-prepend--error');
    DOMElements.annualTaxValueEl.parentNode.nextElementSibling.style.display = 'inline-block';
    DOMElements.annualTaxValueEl.parentNode.nextElementSibling.innerHTML = 'Annual Tax is mandatory';
    isValid = false;
  } else {
    DOMElements.annualTaxValueEl.parentNode.classList.remove('input-prepend--error');
    DOMElements.annualTaxValueEl.parentNode.nextElementSibling.style.display = 'none';
  }

  if (DOMElements.annualInsuranceValueEl.value === '') {
    DOMElements.annualInsuranceValueEl.parentNode.classList.add('input-prepend--error');
    DOMElements.annualInsuranceValueEl.parentNode.nextElementSibling.style.display = 'inline-block';
    DOMElements.annualInsuranceValueEl.parentNode.nextElementSibling.innerHTML = 'Annual Insurance is mandatory';
    isValid = false;
  } else {
    DOMElements.annualInsuranceValueEl.parentNode.classList.remove('input-prepend--error');
    DOMElements.annualInsuranceValueEl.parentNode.nextElementSibling.style.display = 'none';
  }

  return isValid;
}

const updateRangeElementStyle = function (el, value) {
  let percValue = value * 100 / el.max;
  el.style.background = 'linear-gradient(to right, #000 0%, #000 ' + percValue + '%, #ccc ' + value + '%, #ccc 100%)';
}

export {
  showResults,
  DOMElements,
  validateRequiredFields,
  updateRangeElementStyle
}
