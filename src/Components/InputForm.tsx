interface Props {
  desiredAnnualIncome: number;
  setDesiredAnnualIncome: (value: number) => void;
  employerMonthlyContribution: number;
  setEmployerMonthlyContribution: (value: number) => void;
  personalMonthlyContribution: number;
  setPersonalMonthlyContribution: (value: number) => void;
  currentAge: number;
  setCurrentAge: (value: number) => void;
  retirementAge: number;
  setRetirementAge: (value: number) => void;
}
function InputForm({
  desiredAnnualIncome,
  setDesiredAnnualIncome,
  employerMonthlyContribution,
  setEmployerMonthlyContribution,
  personalMonthlyContribution,
  setPersonalMonthlyContribution,
  currentAge,
  setCurrentAge,
  retirementAge,
  setRetirementAge,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="flex flex-col">
        <label
          htmlFor="desiredAnnualIncome"
          className="text-sm font-medium text-gray-700 mb-1">
          Desired Annual Income in Retirement (£)
        </label>
        <input
          id="desiredAnnualIncome"
          type="number"
          value={desiredAnnualIncome}
          onChange={(e) =>
            setDesiredAnnualIncome(parseFloat(e.target.value) || 0)
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
          placeholder="e.g., 16000"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="employerMonthlyContribution"
          className="text-sm font-medium text-gray-700 mb-1">
          Employer Monthly Contribution (£)
        </label>
        <input
          id="employerMonthlyContribution"
          type="number"
          value={employerMonthlyContribution}
          onChange={(e) =>
            setEmployerMonthlyContribution(parseFloat(e.target.value) || 0)
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
          placeholder="e.g., 200"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="personalMonthlyContribution"
          className="text-sm font-medium text-gray-700 mb-1">
          Personal Monthly Contribution (£)
        </label>
        <input
          id="personalMonthlyContribution"
          type="number"
          value={personalMonthlyContribution}
          onChange={(e) =>
            setPersonalMonthlyContribution(parseFloat(e.target.value) || 0)
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
          placeholder="e.g., 150"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="currentAge"
          className="text-sm font-medium text-gray-700 mb-1">
          Current Age
        </label>
        <input
          id="currentAge"
          type="number"
          value={currentAge}
          min={25}
          onChange={(e) => setCurrentAge(parseInt(e.target.value) || 0)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
          placeholder="e.g., 30"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="retirementAge"
          className="text-sm font-medium text-gray-700 mb-1">
          Age at which you would like to retire
        </label>
        <input
          id="retirementAge"
          type="number"
          value={retirementAge}
          min={currentAge + 10} // Ensure retirement age is greater than current age
          max={81} // Limit retirement age to a reasonable maximum
          onChange={(e) => setRetirementAge(parseInt(e.target.value) || 0)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
          placeholder="e.g., 65"
        />
      </div>
    </div>
  );
}

export default InputForm;
