import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import InputForm from '../Components/InputForm';

describe('InputForm', () => {
  const mockProps = {
    desiredAnnualIncome: 16000,
    setDesiredAnnualIncome: vi.fn(),
    employerMonthlyContribution: 200,
    setEmployerMonthlyContribution: vi.fn(),
    personalMonthlyContribution: 150,
    setPersonalMonthlyContribution: vi.fn(),
    currentAge: 30,
    setCurrentAge: vi.fn(),
    retirementAge: 65,
    setRetirementAge: vi.fn(),
  };

  it('should render all input fields with initial values', () => {
    render(<InputForm {...mockProps} />);

    expect(screen.getByLabelText(/Desired Annual Income in Retirement/i)).toHaveValue(16000);
    expect(screen.getByLabelText(/Employer Monthly Contribution/i)).toHaveValue(200);
    expect(screen.getByLabelText(/Personal Monthly Contribution/i)).toHaveValue(150);
    expect(screen.getByLabelText(/Current Age/i)).toHaveValue(30);
    expect(screen.getByLabelText(/Age at which you would like to retire/i)).toHaveValue(65);
  });

  it('should call the correct setter function on input change', () => {
    render(<InputForm {...mockProps} />);

    const desiredAnnualIncomeInput = screen.getByLabelText(/Desired Annual Income in Retirement/i);
    fireEvent.change(desiredAnnualIncomeInput, { target: { value: '25000' } });
    expect(mockProps.setDesiredAnnualIncome).toHaveBeenCalledWith(25000);

    const employerMonthlyContributionInput = screen.getByLabelText(/Employer Monthly Contribution/i);
    fireEvent.change(employerMonthlyContributionInput, { target: { value: '300' } });
    expect(mockProps.setEmployerMonthlyContribution).toHaveBeenCalledWith(300);

    const personalMonthlyContributionInput = screen.getByLabelText(/Personal Monthly Contribution/i);
    fireEvent.change(personalMonthlyContributionInput, { target: { value: '200' } });
    expect(mockProps.setPersonalMonthlyContribution).toHaveBeenCalledWith(200);

    const currentAgeInput = screen.getByLabelText(/Current Age/i);
    fireEvent.change(currentAgeInput, { target: { value: '32' } });
    expect(mockProps.setCurrentAge).toHaveBeenCalledWith(32);

    const retirementAgeInput = screen.getByLabelText(/Age at which you would like to retire/i);
    fireEvent.change(retirementAgeInput, { target: { value: '67' } });
    expect(mockProps.setRetirementAge).toHaveBeenCalledWith(67);
  });
});
