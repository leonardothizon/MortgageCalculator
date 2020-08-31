'use strict'

import  MortgageCalculator from './MortgageCalculator.js';
import { showResults, calculatorDOMElements, validateMandatoryFields, updateRangeElementStyle } from './CalculatorDOMCtrl.js';

/**
 * Get the instance of the calculator class - MortgageCalculator.
 * @returns {function():MortgageCalculator} Instance of the calculator
 */
const getCalculator = (function () {
  let calc = null;
  return () => {
    if (calc === null) {
      calc = new MortgageCalculator();
    }
    return calc;
  };
})();

/**
 * Creates the listeners for DOM Elements and add its behaviors
 */
const createListeners = function () {
  calculatorDOMElements.yearsMortgageRangeEl.addEventListener('input', function () {
    updateRangeElementStyle(this, this.value);
    calculatorDOMElements.yearsMortgageValueEl.value = this.value;
  });
    
  calculatorDOMElements.interestRateRangeEl.addEventListener('input', function () {
    updateRangeElementStyle(this, this.value);
    calculatorDOMElements.interestRateValueEl.value = Number(this.value).toFixed(1);
  });
  
  calculatorDOMElements.yearsMortgageValueEl.addEventListener('input', function () {
    calculatorDOMElements.yearsMortgageRangeEl.value = this.value;
    updateRangeElementStyle(calculatorDOMElements.yearsMortgageRangeEl, this.value);
  });
  
  calculatorDOMElements.interestRateValueEl.addEventListener('input', function () {
    calculatorDOMElements.interestRateRangeEl.value = this.value;
    updateRangeElementStyle(calculatorDOMElements.interestRateRangeEl, this.value);
  });
  
  calculatorDOMElements.calculateBtn.addEventListener('click', function () {
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

  const calc = getCalculator();
  calc.yearsOfMortgage = calculatorDOMElements.yearsMortgageRangeEl.value;
  calc.interestRate = calculatorDOMElements.interestRateRangeEl.value;
  calc.loanAmount = calculatorDOMElements.loanAmountValueEl.value;
  calc.annualTax = calculatorDOMElements.annualTaxValueEl.value;
  calc.annualInsurance = calculatorDOMElements.annualInsuranceValueEl.value;  
  const { principleAndInterest, tax, insurance, totalMonthlyPayment } = calc.calculate();
  showResults(principleAndInterest, tax, insurance, totalMonthlyPayment);
  calculatorDOMElements.calculateBtn.value = 'Recalculate';
}

createListeners();
