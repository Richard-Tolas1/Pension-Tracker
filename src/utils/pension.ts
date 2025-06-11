export function calculatePensionGrowth(input: any) {
  const { employerContribution, personalContribution, retirementAge } = input;
  const monthly = employerContribution + personalContribution;
  const years = retirementAge - 25;
  // Assuming it compounds monthly, starting from age 25
  const months = years * 12;
  const interestRate = 0.049;
  const monthlyRate = Math.pow(1 + interestRate, 1 / 12) - 1;
  
  let pot = 0;
  const data = [];

  for (let i = 0; i < months; i++) {
    pot += monthly;
    pot *= (1 + monthlyRate);
    if (i % 12 === 0) data.push({ label: `Age ${25 + Math.floor(i / 12)}`, value: Math.round(pot) });
  }
  return data;
}

export function calculatePensionDrawdown(startPot: number, input: any) {
  const { desiredIncome, retirementAge } = input;
  const monthlyDraw = desiredIncome / 12;
  const interestRate = 0.049;
  const monthlyRate = Math.pow(1 + interestRate, 1 / 12) - 1;

  let pot = startPot;
  const data = [];

  for (let i = 0; i < (81 - retirementAge) * 12; i++) {
    pot -= monthlyDraw;
    pot *= (1 + monthlyRate);
    if (i % 12 === 0) data.push({ label: `Age ${retirementAge + Math.floor(i / 12)}`, value: Math.round(pot) });
  }
  return data;
}