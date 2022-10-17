export function calculateTax(price: number, tax_rate = 18): {
  rate: number,
  tax_rate: number,
  tax_amount: number,
  after_tax: number
}{

   // Sometimes tax_rate can be string ("18"), so convert it to number for calculation
  tax_rate  = Number(tax_rate);

  // Convert integer tax_rate to decimal, 18 => 1.18, 8 => 1.08
  const tax_percent = 1 + (tax_rate / 100);

  // Calculate tax_amount, PRICE_AMOUNT - BEFORE_TAX_PRICE_AMOUNT
  const tax_amount  = Number((price - (price / tax_percent)).toFixed(2));

  const after_tax   = price - tax_amount;

  return {
    rate: tax_rate,
    tax_rate: tax_rate,
    tax_amount: tax_amount,
    after_tax: after_tax
  };

}

export function Money(value, currency = 'TRY'){
  const locale = 'tr-TR';
  // Add If condition to change locale
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
  }).format(value);
}
