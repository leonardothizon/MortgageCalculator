'use strict'

class MortgageCalculator {
    
  constructor() {
    this.yearsOfMortgage = 20;
    this.interestRate = 5;
    this.loanAmount = 30;
    this.annualTax = 1000;
    this.annualInsurance = 300;
  }

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

  calculatePrincipleAndInterest() {
    let interestRateCalc = (this.interestRate / 100) / 12;
    return (interestRateCalc) * this.loanAmount / (1-Math.pow((1 + (interestRateCalc)), - this.yearsOfMortgage*12));
  }

  calculateTax() {
    return this.annualTax / 12;
  }

  calculateInsurance() {
    return this.annualInsurance / 12;
  }

  calculateMonthlyPayment(principleAndInterest, tax, insurance) {
    return principleAndInterest + tax + insurance;
  }

}

export default MortgageCalculator;
