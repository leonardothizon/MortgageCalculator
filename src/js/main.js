'use strict'

import  MortgageCalculator from './MortgageCalculator.js';
import { showResults, DOMElements, validateRequiredFields, updateRangeElementStyle } from './CalculatorDOMCtrl.js';

let calc = null;

const createListeners = function () {
  DOMElements.yearsMortgageRangeEl.addEventListener('input', function () {
    updateRangeElementStyle(this, this.value);
    DOMElements.yearsMortgageValueEl.value = this.value;
  });
    
  DOMElements.interestRateRangeEl.addEventListener('input', function () {
    updateRangeElementStyle(this, this.value);
    DOMElements.interestRateValueEl.value = Number(this.value).toFixed(1);
  });
  
  DOMElements.yearsMortgageValueEl.addEventListener('input', function () {
    DOMElements.yearsMortgageRangeEl.value = this.value;
    updateRangeElementStyle(DOMElements.yearsMortgageRangeEl, this.value);
  });
  
  DOMElements.interestRateValueEl.addEventListener('input', function () {
    DOMElements.interestRateRangeEl.value = this.value;
    updateRangeElementStyle(DOMElements.interestRateRangeEl, this.value);
  });
  
  DOMElements.calculateBtn.addEventListener('click', function () {
    calculate();
  });
}

const calculate = function () {
  if (!validateRequiredFields()) {
    return;
  }

  if (calc === null) {
    calc = new MortgageCalculator();
  }

  calc.yearsOfMortgage = DOMElements.yearsMortgageRangeEl.value;
  calc.interestRate = DOMElements.interestRateRangeEl.value;
  calc.loanAmount = DOMElements.loanAmountValueEl.value;
  calc.annualTax = DOMElements.annualTaxValueEl.value;
  calc.annualInsurance = DOMElements.annualInsuranceValueEl.value;  
  let result = calc.calculate();
  showResults(result);
  DOMElements.resultsSection.scrollIntoView({ behavior: 'smooth' });
  DOMElements.calculateBtn.value = 'Recalculate';
}

createListeners();
