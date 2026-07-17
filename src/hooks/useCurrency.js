import { useState, useEffect } from 'react';

const getInitialCurrency = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const offset = new Date().getTimezoneOffset();
    
    if (timeZone.includes('Kolkata') || timeZone.includes('Calcutta') || timeZone.includes('India') || offset === -330) {
      return { symbol: '₹', rate: 83.5, code: 'INR' };
    } else if (timeZone.includes('Lagos') || timeZone.includes('Africa') || offset === -60) {
      return { symbol: '₦', rate: 1500, code: 'NGN' };
    } else if (['Europe/Lisbon', 'Europe/Paris', 'Europe/Madrid', 'Europe/Berlin', 'Europe/Rome'].includes(timeZone)) {
      return { symbol: '€', rate: 0.92, code: 'EUR' };
    }
  } catch (error) {
    // Ignore error
  }
  return { symbol: '$', rate: 1, code: 'USD' };
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState(getInitialCurrency);

  useEffect(() => {
    const fetchRegionAndSetCurrency = async () => {
      try {
        // Try ipapi first
        let response = await fetch('https://ipapi.co/json/').catch(() => null);
        let data = response ? await response.json().catch(() => null) : null;
        
        // Try geojs as fallback
        if (!data || data.error) {
           response = await fetch('https://get.geojs.io/v1/ip/country.json').catch(() => null);
           data = response ? await response.json().catch(() => null) : null;
        }

        if (!data) return; // If all fail, keep initial timezone-based currency

        const countryCode = data.country_code || data.countryCode || data.country || '';
        
        if (countryCode === 'IN' || countryCode === 'IND' || countryCode === 'India') {
          setCurrency({ symbol: '₹', rate: 83.5, code: 'INR' });
        } else if (countryCode === 'NG' || countryCode === 'NGA' || countryCode === 'Nigeria') {
          setCurrency({ symbol: '₦', rate: 1500, code: 'NGN' });
        } else if (['PT', 'FR', 'ES', 'DE', 'IT'].includes(countryCode)) {
          setCurrency({ symbol: '€', rate: 0.92, code: 'EUR' });
        } else {
          setCurrency({ symbol: '$', rate: 1, code: 'USD' });
        }
      } catch (error) {
        // Fallback to timezone already handled by getInitialCurrency
      }
    };

    fetchRegionAndSetCurrency();
  }, []);

  const formatPrice = (baseUsdPrice) => {
    const converted = baseUsdPrice * currency.rate;
    if (currency.code === 'USD' || currency.code === 'EUR') {
      return `${currency.symbol}${converted.toFixed(0)}`;
    } else if (currency.code === 'INR') {
      return `${currency.symbol}${Math.round(converted)}`;
    } else {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
  };

  return { currency, formatPrice };
};
