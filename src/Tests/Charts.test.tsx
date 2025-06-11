import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Charts from "../Components/Charts";
import { ResponsiveContainer, LineChart } from "recharts";

vi.mock("recharts", async (importOriginal) => {
  const original = await importOriginal<typeof import("recharts")>();
  return {
    ...original,
    LineChart: vi.fn(() => null),
    Line: vi.fn(() => null),
    XAxis: vi.fn(() => null),
    YAxis: vi.fn(() => null),
    CartesianGrid: vi.fn(() => null),
    Tooltip: vi.fn(() => null),
    Legend: vi.fn(() => null),
    ResponsiveContainer: vi.fn(({ children }) => children),
    ReferenceLine: vi.fn(() => null),
  };
});

describe("Charts", () => {
  const mockChartData = [
    { age: 30, projectedPot: 10000 },
    { age: 31, projectedPot: 11000 },
    { age: 65, projectedPot: 500000, desiredPotAtRetirement: 450000 },
    { age: 66, projectedPot: 480000 },
  ];

  const mockProps = {
    chartData: mockChartData,
    desiredLumpSumAtRetirement: 450000,
    retirementAge: 65,
    desiredAnnualIncome: 16000,
    lifeExpectancy: 81,
    interestRate: 0.049,
    existingPotsTotal: 10000,
    currentAge: 30,
    existingPots: [{ id: 1, name: "Initial Pot", amount: 10000 }],
  };

  it("should render the pension projections title", () => {
    render(<Charts {...mockProps} />);
    expect(screen.getByText(/Pension Projections/i)).toBeInTheDocument();
  });

  it("should display summary information based on props", () => {
    render(<Charts {...mockProps} />);
    expect(
      screen.getByText(
        /Based on your inputs, your pension pot will grow and then support your desired income until the assumed life expectancy of/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The desired lump sum needed at retirement \(65 years old\) to provide £16,000 annually until age 81 \(at 4.9%\) is: £450,000/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your existing pension pots contribute £10,000 to your starting balance./i
      )
    ).toBeInTheDocument();
  });

  it("should render the ResponsiveContainer and LineChart components when chartData is present", () => {
    render(<Charts {...mockProps} />);
    expect(ResponsiveContainer).toHaveBeenCalledTimes(3);
    expect(LineChart).toHaveBeenCalledTimes(3);
  });

  it('should render the error message when chartData is empty', () => {
    render(<Charts {...mockProps} chartData={[]} />);
    expect(screen.getByText(/Please enter valid inputs to see your pension projections. Ensure retirement age is greater than current age./i)).toBeInTheDocument();
    expect(ResponsiveContainer).toHaveBeenCalled();
  });
});
