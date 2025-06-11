import { useState, useEffect, useCallback } from "react";
import type ChartDataPoint from "./types/types";
import Charts from "./Components/Charts";
import ExistingPots from "./Components/ExistingPots";
import InputForm from "./Components/InputForm";

function App() {
  const [desiredAnnualIncome, setDesiredAnnualIncome] = useState(16000);
  const [desiredLumpSumAtRetirement, setDesiredLumpSumAtRetirement] =
    useState(0);
  const [employerMonthlyContribution, setEmployerMonthlyContribution] =
    useState(200);
  const [personalMonthlyContribution, setPersonalMonthlyContribution] =
    useState(150);
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [retirementAge, setRetirementAge] = useState<number>(65);

  const [existingPots, setExistingPots] = useState([
    { id: 1, name: "Main Pension", amount: 10000 },
  ]); // Array of existing pension pots

  // Fixed assumptions
  const interestRate = 0.049; // Annual interest rate (4.9%)
  const lifeExpectancy = 81;

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  // Callback function to calculate pension projections
  const calculatePensionProjections = useCallback(() => {
    // Validate inputs
    if (retirementAge <= currentAge || lifeExpectancy <= retirementAge) {
      console.error(
        "Invalid age inputs: Retirement age must be greater than current age, and life expectancy greater than retirement age."
      );
      setChartData([]);
      setDesiredLumpSumAtRetirement(0);
      return;
    }

    if (
      desiredAnnualIncome <= 0 ||
      employerMonthlyContribution < 0 ||
      personalMonthlyContribution < 0
    ) {
      console.error(
        "Invalid financial inputs: Income and contributions must be positive."
      );
      setChartData([]);
      setDesiredLumpSumAtRetirement(0);
      return;
    }

    const data = [];
    let currentPot = existingPots.reduce((sum, pot) => sum + pot.amount, 0); // Start with sum of existing pots
    const totalMonthlyContribution =
      employerMonthlyContribution + personalMonthlyContribution;
    const annualContribution = totalMonthlyContribution * 12;

    for (let age = currentAge; age < retirementAge; age++) {
      // Apply interest first, then add contributions
      currentPot = currentPot * (1 + interestRate) + annualContribution;
      data.push({ age: age, projectedPot: Math.max(0, currentPot) });
    }

    // Calculate desired lump sum at retirement for a given annual income, interest rate, and duration
    // PV = PMT * [ (1 - (1 + i)^-N) / i ]
    const numberOfYearsInRetirement = lifeExpectancy - retirementAge;
    if (numberOfYearsInRetirement > 0 && interestRate > 0) {
      const pvFactor =
        (1 - Math.pow(1 + interestRate, -numberOfYearsInRetirement)) /
        interestRate;
      setDesiredLumpSumAtRetirement(desiredAnnualIncome * pvFactor);
    } else {
      setDesiredLumpSumAtRetirement(0); // If no retirement period or no interest, no specific lump sum is calculated.
    }

    // Add retirement age data point
    data.push({
      age: retirementAge,
      projectedPot: Math.max(0, currentPot),
      desiredPotAtRetirement: desiredLumpSumAtRetirement, // Set desired pot at retirement age
    });

    for (let age = retirementAge + 1; age <= lifeExpectancy; age++) {
      // Apply interest, then subtract desired income
      currentPot = currentPot * (1 + interestRate) - desiredAnnualIncome;
      data.push({ age: age, projectedPot: Math.max(0, currentPot) }); // Ensure pot doesn't go below zero
    }

    setChartData(data);
  }, [
    desiredAnnualIncome,
    employerMonthlyContribution,
    personalMonthlyContribution,
    currentAge,
    retirementAge,
    existingPots,
    interestRate,
    lifeExpectancy,
  ]);

  // Effect hook to recalculate projections whenever inputs change
  useEffect(() => {
    calculatePensionProjections();
  }, [calculatePensionProjections]);

  // Handler for adding a new existing pension pot
  const handleAddPot = () => {
    setExistingPots([
      ...existingPots,
      { id: existingPots.length + 1, name: "", amount: 0 },
    ]);
  };

  // Handler for updating an existing pension pot's name or amount
  const handlePotChange = (id: number, field: string, value: string) => {
    setExistingPots(
      existingPots.map((pot) =>
        pot.id === id
          ? {
              ...pot,
              [field]: field === "amount" ? parseFloat(value) || 0 : value,
            }
          : pot
      )
    );
  };

  // Handler for removing an existing pension pot
  const handleRemovePot = (id: number) => {
    setExistingPots(existingPots.filter((pot) => pot.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-inter text-gray-800 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl mb-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Pension Tracker
        </h1>
        <InputForm
          desiredAnnualIncome={desiredAnnualIncome}
          setDesiredAnnualIncome={setDesiredAnnualIncome}
          employerMonthlyContribution={employerMonthlyContribution}
          setEmployerMonthlyContribution={setEmployerMonthlyContribution}
          personalMonthlyContribution={personalMonthlyContribution}
          setPersonalMonthlyContribution={setPersonalMonthlyContribution}
          currentAge={currentAge}
          setCurrentAge={setCurrentAge}
          setRetirementAge={setRetirementAge}
          retirementAge={retirementAge}
        />

        <ExistingPots
          existingPots={existingPots}
          handleAddPot={handleAddPot}
          handlePotChange={handlePotChange}
          handleRemovePot={handleRemovePot}
        />

        <div className="text-center mb-8">
          <button
            onClick={calculatePensionProjections}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Calculate Pension
          </button>
        </div>

        <Charts
          existingPots={existingPots}
          retirementAge={retirementAge}
          desiredAnnualIncome={desiredAnnualIncome}
          interestRate={interestRate}
          lifeExpectancy={lifeExpectancy}
          desiredLumpSumAtRetirement={desiredLumpSumAtRetirement}
          chartData={chartData}
        />
      </div>
    </div>
  );
}

export default App;
