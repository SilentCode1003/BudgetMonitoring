export const formatBudget = (budget) => {
    const formattedBudget = Number(budget).toFixed(2);
    const [integerPart, decimalPart] = formattedBudget.split('.');
    const formattedIntegerPart = parseInt(integerPart).toLocaleString('en');
    return `₱ ${formattedIntegerPart}.${decimalPart}`;
  };
  