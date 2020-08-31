'use strict'
/** Class representing the calculator */
class MortgageCalculator {
    
  /**
   * Creates the calculator with initial values.
   * @param {number} yearsOfMortgage 
   * @param {number} interestRate 
   * @param {number} loanAmount 
   * @param {number} annualTax 
   * @param {number} annualInsurance 
   */
  constructor(yearsOfMortgage = 20, interestRate = 5, loanAmount = 30, annualTax = 1000, annualInsurance = 300) {
    this.yearsOfMortgage = yearsOfMortgage;
    this.interestRate = interestRate;
    this.loanAmount = loanAmount;
    this.annualTax = annualTax;
    this.annualInsurance = annualInsurance;
  }
  /**
   * Process calculation considering the inputs set into the class parameters.
   * @return  {Object} Object containing the result of the calculation.
   */
  calculate() {
    let principleAndInterest = this.calculatePrincipleAndInterest();
    let tax = this.calculateTax();
    let insurance = this.calculateInsurance();
    let totalMonthlyPayment = this.calculateMonthlyPayment(principleAndInterest, tax, insurance);
    return {
      principleAndInterest: principleAndInterest,
      tax: tax,
      insurance: insurance,
      totalMonthlyPayment: totalMonthlyPayment
    }
  }

  /**
   * Calculate the Principle & Interest
   * @return {number} Principle & Interest
   */
  calculatePrincipleAndInterest() {
    let interestRateCalc = (this.interestRate / 100) / 12;
    return (interestRateCalc) * this.loanAmount / (1-Math.pow((1 + (interestRateCalc)), - this.yearsOfMortgage*12));
  }

  /**
   * Calculate the Tax
   * @return {number} Tax
   */
  calculateTax() {
    return this.annualTax / 12;
  }

  /**
   * Calculate the Annual Insurance
   * @return {number} Annual Insurance
   */
  calculateInsurance() {
    return this.annualInsurance / 12;
  }

  /**
   * Calculate the Monthly Payment
   * 
   * @param {number} principleAndInterest 
   * @param {number} tax 
   * @param {number} insurance 
   * @return {number} Monthly Payment
   */
  calculateMonthlyPayment(principleAndInterest, tax, insurance) {
    return principleAndInterest + tax + insurance;
  }

}

export default MortgageCalculator;
