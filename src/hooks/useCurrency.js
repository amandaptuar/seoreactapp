import { useState, useEffect } from 'react';

export const useCurrency = () => {
  const [currency, setCurrency] = useState({ symbol: '$', rate: 1, code: 'USD' });

  useEffect(() => {
    const updateCurrency = () => {
      // Find the googtrans cookie
      const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
      let lang = 'en';
      if (match) {
        // match[2] usually looks like "/en/hi"
        lang = match[2].split('/').pop();
      }

      // Determine currency based on selected language
      switch (lang) {
        case 'hi':
          setCurrency({ symbol: '₹', rate: 83.5, code: 'INR' });
          break;
        case 'ha':
        case 'ig':
        case 'yo':
          setCurrency({ symbol: '₦', rate: 1500, code: 'NGN' }); // Nigerian Naira
          break;
        case 'pt':
        case 'fr':
          setCurrency({ symbol: '€', rate: 0.92, code: 'EUR' });
          break;
        default:
          setCurrency({ symbol: '$', rate: 1, code: 'USD' });
          break;
      }
    };

    // Initial check
    updateCurrency();

    // Set up polling since Google Translate doesn't emit a standard event we can easily listen to when lang changes
    const intervalId = setInterval(updateCurrency, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatPrice = (baseUsdPrice) => {
    const converted = baseUsdPrice * currency.rate;
    // Round based on the currency scale
    if (currency.code === 'USD' || currency.code === 'EUR') {
      return `${currency.symbol}${converted.toFixed(0)}`;
    } else if (currency.code === 'INR') {
      return `${currency.symbol}${Math.round(converted)}`;
    } else {
      // For NGN, thousands separator might be nice, but simple string is fine
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
  };

  return { currency, formatPrice };
};
