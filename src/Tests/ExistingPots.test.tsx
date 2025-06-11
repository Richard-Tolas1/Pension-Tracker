import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExistingPots from '../Components/ExistingPots';

describe('ExistingPots', () => {
  const mockExistingPots = [
    { id: 1, name: 'Main Pension', amount: 10000 },
    { id: 2, name: 'Old Employer Pot', amount: 5000 },
  ];

  const mockProps = {
    existingPots: mockExistingPots,
    handleAddPot: vi.fn(),
    handlePotChange: vi.fn(),
    handleRemovePot: vi.fn(),
  };

  it('should render existing pension pots', () => {
    render(<ExistingPots {...mockProps} />);

    expect(screen.getByDisplayValue('Main Pension')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Old Employer Pot')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5000')).toBeInTheDocument();
  });

  it('should call handleAddPot when "Add Another Pension Pot" button is clicked', () => {
    render(<ExistingPots {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Add Another Pension Pot/i }));
    expect(mockProps.handleAddPot).toHaveBeenCalledTimes(1);
  });

  it('should call handlePotChange when a pot name or amount is changed', () => {
    render(<ExistingPots {...mockProps} />);

    const mainPensionNameInput = screen.getByDisplayValue('Main Pension');
    fireEvent.change(mainPensionNameInput, { target: { value: 'New Main Pension' } });
    expect(mockProps.handlePotChange).toHaveBeenCalledWith(1, 'name', 'New Main Pension');

    const mainPensionAmountInput = screen.getByDisplayValue('10000');
    fireEvent.change(mainPensionAmountInput, { target: { value: '12000' } });
    expect(mockProps.handlePotChange).toHaveBeenCalledWith(1, 'amount', '12000');
  });

  it('should call handleRemovePot when "Remove" button is clicked for a pot', () => {
    render(<ExistingPots {...mockProps} />);

    // Get all remove buttons and click the one for the first pot
    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    fireEvent.click(removeButtons[0]); // Click the first remove button
    expect(mockProps.handleRemovePot).toHaveBeenCalledWith(1); // Expect it to remove the pot with id 1
  });
});
