'use strict'

import  MortgageCalculator from './MortgageCalculator.js';
import { showResults, CalculatorDOMElements, validateMandatoryFields, updateRangeElementStyle } from './CalculatorDOMCtrl.js';

/**
 * Get the instance of the calculator class - MortgageCalculator.
 * @returns {function():MortgageCalculator} Instance of the calculator
 */
let getCalculator = (function () {
  let calc = null;
  return () => calc || new MortgageCalculator();
})();

/**
 * Creates the listeners for DOM Elements and add its behaviors
 */
const createListeners = function () {
  CalculatorDOMElements.yearsMortgageRangeEl.addEventListener('input', function () {
    updateRangeElementStyle(this, this.value);
    CalculatorDOMElements.yearsMortgageValueEl.value = this.value;
  });
    
  CalculatorDOMElements.interestRateRangeEl.addEventListener('input', function () {
    updateRangeElementStyle(this, this.value);
    CalculatorDOMElements.interestRateValueEl.value = Number(this.value).toFixed(1);
  });
  
  CalculatorDOMElements.yearsMortgageValueEl.addEventListener('input', function () {
    CalculatorDOMElements.yearsMortgageRangeEl.value = this.value;
    updateRangeElementStyle(CalculatorDOMElements.yearsMortgageRangeEl, this.value);
  });
  
  CalculatorDOMElements.interestRateValueEl.addEventListener('input', function () {
    CalculatorDOMElements.interestRateRangeEl.value = this.value;
    updateRangeElementStyle(CalculatorDOMElements.interestRateRangeEl, this.value);
  });
  
  CalculatorDOMElements.calculateBtn.addEventListener('click', function () {
    calculate();
  });
}

/**
 * Validate data and show the results.
 */
const calculate = function () {
  if (!validateMandatoryFields()) {
    return;
  }

  let calc = getCalculator();
  calc.yearsOfMortgage = CalculatorDOMElements.yearsMortgageRangeEl.value;
  calc.interestRate = CalculatorDOMElements.interestRateRangeEl.value;
  calc.loanAmount = CalculatorDOMElements.loanAmountValueEl.value;
  calc.annualTax = CalculatorDOMElements.annualTaxValueEl.value;
  calc.annualInsurance = CalculatorDOMElements.annualInsuranceValueEl.value;  
  let result = calc.calculate();
  showResults(result);
  CalculatorDOMElements.calculateBtn.value = 'Recalculate';
}

createListeners();
