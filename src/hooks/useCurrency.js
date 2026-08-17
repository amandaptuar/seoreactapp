// Price is ALWAYS shown in USD, matching exactly what the Stripe Checkout
// Session actually charges (see backend/src/routes/payment.routes.js —
// currency: 'usd', unit_amount: 1900, fixed).
//
// NOTE for whoever picks this up next: there was a parallel attempt here
// (geolocation via ipapi.co/geojs.io + a hardcoded per-currency `rate`,
// e.g. 83.5 for INR) that looked more correct than the old Google-Translate
// -cookie version it replaced, but has the SAME root bug: it computes a
// local-currency price on the frontend, independently from what Stripe
// actually charges. Stripe's own checkout page applies ITS live conversion
// rate plus a disclosed ~4% fee for non-USD cards — a frontend guess can
// never reliably match that number, accurate geolocation or not. That's
// exactly the ₹1587-vs-₹1889.21 mismatch that got flagged as a compliance
// issue on 12 Aug 2026.
//
// Do not reintroduce an independent client-side price estimate here. If
// real per-region pricing is wanted, it has to be done properly: the
// BACKEND decides the region + currency + exact amount, creates the Stripe
// Session in that currency (not always 'usd'), and the frontend displays
// that same backend-provided number — never its own calculation.
export const useCurrency = () => {
  const currency = { symbol: '$', rate: 1, code: 'USD' };
  const formatPrice = (baseUsdPrice) => `$${baseUsdPrice.toFixed(0)}`;
  return { currency, formatPrice };
};
