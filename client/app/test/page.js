"use client";
import axios from 'axios';
import { useState } from 'react';

const DonationComponent = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleDonation = () => {
    const data = {
      name: 'Donation',
      description: 'Thank you for your donation!',
      pricing_type: 'fixed_price',
      local_price: {
        amount: amount,
        currency: currency
      }
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.commerce.coinbase.com/charges',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CC-Api-Key': 'bc3adc16-715f-4042-8390-ea7dcea71485'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setPaymentUrl(response.data.data.hosted_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Donate with Coinbase Commerce</h1>
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        {/* Add other currencies as needed */}
      </select>
      <button className='btn btn1' onClick={handleDonation}>Donate</button>
      {paymentUrl && <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Complete Donation</a>}
    </div>
  );
};

export default DonationComponent;
