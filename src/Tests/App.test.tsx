import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

vi.mock('recharts', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as any),
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


describe('Pension Tracker App', () => {
  // Test 1: Renders the main application component
  it('should render the Pension Tracker title', () => {
    render(<App />);
    expect(screen.getByText(/Pension Tracker/i)).toBeInTheDocument();
  });

  // Test 2: Checks if all input fields are present and have initial values
  it('should display initial input values and a calculate button', () => {
    render(<App />);

    const desiredAnnualIncomeInput = screen.getByLabelText(/Desired Annual Income in Retirement/i);
    expect(desiredAnnualIncomeInput).toBeInTheDocument();
    expect(desiredAnnualIncomeInput).toHaveValue(16000);

    const employerMonthlyContributionInput = screen.getByLabelText(/Employer Monthly Contribution/i);
    expect(employerMonthlyContributionInput).toBeInTheDocument();
    expect(employerMonthlyContributionInput).toHaveValue(200);

    const personalMonthlyContributionInput = screen.getByLabelText(/Personal Monthly Contribution/i);
    expect(personalMonthlyContributionInput).toBeInTheDocument();
    expect(personalMonthlyContributionInput).toHaveValue(150);

    const currentAgeInput = screen.getByLabelText(/Current Age/i);
    expect(currentAgeInput).toBeInTheDocument();
    expect(currentAgeInput).toHaveValue(25);

    const retirementAgeInput = screen.getByLabelText(/Age at which you would like to retire/i);
    expect(retirementAgeInput).toBeInTheDocument();
    expect(retirementAgeInput).toHaveValue(65);

    expect(screen.getByPlaceholderText(/Pension Pot 1 Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Amount \(\£\)/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Calculate Pension/i })).toBeInTheDocument();
  });

  // Test 3: Ensures input values can be changed by the user
  it('should allow changing input values', () => {
    render(<App />);

    const desiredAnnualIncomeInput = screen.getByLabelText(/Desired Annual Income in Retirement/i);
    fireEvent.change(desiredAnnualIncomeInput, { target: { value: '20000' } });
    expect(desiredAnnualIncomeInput).toHaveValue(20000);

    const employerMonthlyContributionInput = screen.getByLabelText(/Employer Monthly Contribution/i);
    fireEvent.change(employerMonthlyContributionInput, { target: { value: '300' } });
    expect(employerMonthlyContributionInput).toHaveValue(300);

    const personalMonthlyContributionInput = screen.getByLabelText(/Personal Monthly Contribution/i);
    fireEvent.change(personalMonthlyContributionInput, { target: { value: '250' } });
    expect(personalMonthlyContributionInput).toHaveValue(250);

    const currentAgeInput = screen.getByLabelText(/Current Age/i);
    fireEvent.change(currentAgeInput, { target: { value: '35' } });
    expect(currentAgeInput).toHaveValue(35);

    const retirementAgeInput = screen.getByLabelText(/Age at which you would like to retire/i);
    fireEvent.change(retirementAgeInput, { target: { value: '60' } });
    expect(retirementAgeInput).toHaveValue(60);
  });

  // Test 4: Verifies that the "Calculate Pension" button triggers the calculation
  it('should display pension projections after clicking calculate button', async () => {
    render(<App />);

    const calculateButton = screen.getByRole('button', { name: /Calculate Pension/i });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText(/Based on your inputs, your pension pot will grow and then support your desired income until the assumed life expectancy/i)).toBeInTheDocument();
      expect(screen.getByText(/The desired lump sum needed at retirement/i)).toBeInTheDocument();
    });
  });

  // Test 5: Handles invalid age inputs
  it('should show an error message for invalid age inputs', async () => {
    render(<App />);

    const currentAgeInput = screen.getByLabelText(/Current Age/i);
    fireEvent.change(currentAgeInput, { target: { value: '60' } });

    const retirementAgeInput = screen.getByLabelText(/Age at which you would like to retire/i);
    fireEvent.change(retirementAgeInput, { target: { value: '55' } });

    const calculateButton = screen.getByRole('button', { name: /Calculate Pension/i });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText(/Please enter valid inputs to see your pension projections. Ensure retirement age is greater than current age./i)).toBeInTheDocument();
    });
  });

  // Test 6: Adds and removes an existing pension pot
  it('should allow adding and removing existing pension pots', async () => {
    render(<App />);

    // Add a new pot
    const addPotButton = screen.getByRole('button', { name: /Add Another Pension Pot/i });
    fireEvent.click(addPotButton);

    const newPotNameInput = screen.getByPlaceholderText(/Pension Pot 2 Name/i);
    expect(newPotNameInput).toBeInTheDocument();
    fireEvent.change(newPotNameInput, { target: { value: 'New Pot' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Amount \(\£\)/i)[1], { target: { value: '5000' } }); // Access the second amount input

    fireEvent.click(screen.getByRole('button', { name: /Calculate Pension/i }));
    await waitFor(() => {
      expect(screen.getByText(/Your existing pension pots contribute £15,000 to your starting balance./i)).toBeInTheDocument(); // 10000 (initial) + 5000 (new)
    });


    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    fireEvent.click(removeButtons[1]);

    expect(newPotNameInput).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Calculate Pension/i }));
    await waitFor(() => {
      expect(screen.getByText(/Your existing pension pots contribute £10,000 to your starting balance./i)).toBeInTheDocument(); // Back to original 10000
    });
  });
});
