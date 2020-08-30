import MortgageCalculator from '../src/js/MortgageCalculator.js';

describe("Calculate function", () => {
  test("it should return correct value", () => {
    let calc = new MortgageCalculator();
    let result = calc.calculatePrincipleAndInterest();
    expect(result).toEqual(0.19798672176499682);
  });
});

describe("Calculate Tax Function", () => {
  test("it should calculate the tax considering given annual tax", () => {
    let calc = new MortgageCalculator();
    calc.annualTax = 12;
    let result = calc.calculateTax();
    expect(result).toEqual(1);
  });
});

describe("Calculate Insurance Function", () => {
  test("it should calculate the insurance considering given annual insurance", () => {
    let calc = new MortgageCalculator();
    calc.annualInsurance = 12;
    let result = calc.calculateInsurance();
    expect(result).toEqual(1);
  });
});

describe("Calculate Monthly Payment Function", () => {
  test("it should calculate the monthly payment considering given data", () => {
    let calc = new MortgageCalculator();
    calc.annualInsurance = 12;
    let result = calc.calculateMonthlyPayment(.2, 5, 25.5);
    expect(result).toEqual(30.7);
  });
});

describe("Calculate Mortgage", () => {
  test("it should calculate the mortgage considering given data", () => {
    let calc = new MortgageCalculator();
    calc.yearsOfMortgage = 30;
    calc.interestRate = 5;
    calc.loanAmount = 200000;
    calc.annualTax = 1000;
    calc.annualInsurance = 300;
    let result = calc.calculate();
    expect(result.principleAndInterest).toEqual(1073.6432460242763);
    expect(result.tax).toEqual(83.33333333333333);
    expect(result.insurance).toEqual(25);
    expect(result.totalMonthlyPayment).toEqual(1181.9765793576096);
  });
});

