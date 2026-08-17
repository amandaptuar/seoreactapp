// Price is ALWAYS shown in USD, matching exactly what the Stripe Checkout
// Session actually charges (see backend/src/routes/payment.routes.js —
// currency: 'usd', unit_amount: 1900, fixed).
//
// This used to guess a display currency from the page's Google Translate
// language cookie and convert using a hardcoded, stale exchange rate. That
// number never matched what Stripe's own checkout page actually charges
// (Stripe applies its own live conversion + a disclosed ~4% fee for
// non-USD cards) — showing customers one price and charging a different
// one is both confusing and a real compliance risk. Do not reintroduce a
// second, independent price estimate here; if localized pricing is wanted,
// it needs to be the SAME number the backend tells Stripe to charge.
export const useCurrency = () => {
  const currency = { symbol: '$', rate: 1, code: 'USD' };
  const formatPrice = (baseUsdPrice) => `$${baseUsdPrice.toFixed(0)}`;
  return { currency, formatPrice };
};
