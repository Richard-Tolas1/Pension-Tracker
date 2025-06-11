import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type ChartDataPoint from "../types/types";

interface Props {
  existingPots: { amount: number }[];
  retirementAge: number;
  desiredAnnualIncome: number;
  interestRate: number;
  lifeExpectancy: number;
  desiredLumpSumAtRetirement: number;
  chartData: ChartDataPoint[];
}

function Charts({
  existingPots,
  retirementAge,
  desiredAnnualIncome,
  interestRate,
  lifeExpectancy,
  desiredLumpSumAtRetirement,
  chartData,
}: Props) {
  return (
    <div>
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Pension Projections
        </h2>

        {/* Display Summary Information */}
        <div className="mb-8 text-center text-lg">
          <p className="mb-2">
            Based on your inputs, your pension pot will grow and then support
            your desired income until the assumed life expectancy of{" "}
            {lifeExpectancy} years.
          </p>
          <p className="font-semibold text-indigo-600">
            The desired lump sum needed at retirement ({retirementAge} years
            old) to provide £{desiredAnnualIncome.toLocaleString()} annually
            until age {lifeExpectancy} (at {interestRate * 100}%) is: £
            {desiredLumpSumAtRetirement.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          {existingPots.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Your existing pension pots contribute £
              {existingPots
                .reduce((sum, pot) => sum + pot.amount, 0)
                .toLocaleString()}{" "}
              to your starting balance.
            </p>
          )}
        </div>

        {/* Pension Projection Chart */}
        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="age"
                label={{
                  value: "Age",
                  position: "insideBottomRight",
                  offset: -2.5,
                }}
                interval="preserveStartEnd"
                minTickGap={20}
                tickFormatter={(tick) => `${tick}`}
              />
              <YAxis
                label={{
                  value: "Pension Pot (£)",
                  angle: -90,
                  position: "right",
                  offset: 15,
                }}
                tickFormatter={(tick) => `£${tick.toLocaleString()}`} // Format Y-axis labels as currency
              />
              <Tooltip
                formatter={(value) =>
                  `£${value.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}`
                }
                labelFormatter={(label) => `Age: ${label}`}
                wrapperStyle={{ borderRadius: "8px", overflow: "hidden" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "#333", fontWeight: "bold" }}
              />
              <Legend verticalAlign="top" height={36} />

              {/* Projected Pension Pot Line */}
              <Line
                type="monotone"
                dataKey="projectedPot"
                name="Projected Pension Pot"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />

              {/* Desired Pension Pot Reference Line at Retirement Age */}
              {desiredLumpSumAtRetirement > 0 && (
                <ReferenceLine
                  x={retirementAge}
                  y={desiredLumpSumAtRetirement}
                  stroke="#FF7300"
                  strokeDasharray="3 3"
                  label={{
                    value: `Desired Pot at Retirement: £${desiredLumpSumAtRetirement.toLocaleString(
                      undefined,
                      { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                    )}`,
                    position: "top",
                    fill: "#FF7300",
                    fontSize: 12,
                    offset: 10,
                  }}
                />
              )}
              <ReferenceLine
                x={retirementAge}
                stroke="#82ca9d"
                label="Retirement Age"
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartData.length === 0 && (
          <div className="text-center text-red-500 font-medium py-4">
            Please enter valid inputs to see your pension projections. Ensure
            retirement age is greater than current age.
          </div>
        )}
      </div>
    </div>
  );
}

export default Charts;
