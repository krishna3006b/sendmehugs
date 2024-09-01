"use client";

import React, { useEffect, useState } from 'react'
import { RaisingState } from '@/interfaces';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';

function Page() {

  const { id } = useParams()
  const [amount, setAmount] = useState<string>('');
  const [chargeId, setChargeId] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [raising, setRaising] = useState<RaisingState>({
    title: '',
    walletAddress: '',
    description: '',
    thumbnail: '',
    images: [],
    totalAmount: 0,
    amountDonated: 0,
    id: '',
    role: 'Individual'
  })

  const handleDonation = () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    let data = {
      "name": "Donation",
      "description": "Thank you for your donation!",
      "pricing_type": "fixed_price",
      "local_price": {
        "amount": amount,
        "currency": currency
      },
      "metadata": {
        "customer_info": ["name", "email", "address"]
      },
      "redirect_url": `${process.env.NEXT_PUBLIC_SERVER_URL}/${raising.walletAddress}/success`,
      "cancel_url": `${process.env.NEXT_PUBLIC_SERVER_URL}/${raising.walletAddress}/failure`
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.commerce.coinbase.com/charges',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CC-Api-Key': process.env.NEXT_PUBLIC_X_CC_API_KEY,
        'X-CC-Version': '2018-03-22'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setChargeId(response.data.data.id);
        // console.log(response.data.data)
        window.open(response.data.data.hosted_url, '_blank');
        setTimeout(() => {
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.commerce.coinbase.com/charges/${response.data.data.id}`,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CC-Api-Key': process.env.NEXT_PUBLIC_X_CC_API_KEY,
              'X-CC-Version': '2018-03-22'
            }
          };

          axios.request(config)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }, 1000);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising/${id}`);
        setRaising(response.data.raising);
      } catch (error) {
        console.log('Error fetching raising data:', error);
      }
    })();
  }, [id]);

  return (
    <div className='pt-28 h-screen overflow-y-auto flex flex-col gap-3'>
      <div className="flex xl:flex-row flex-col justify-between gap-8 py-6 w-[90%] mx-auto">

        <div className="flex flex-col gap-6 xl:w-[50%]">

          {
            raising.thumbnail &&
            <>
              <h2 className="text-2xl font-semibold text-white">| {raising.title}</h2>

              <div className="w-[100%] h-[10rem] sm:w-[36rem] sm:h-[20rem] relative">
                <Image alt="raising thumbnail" src={raising.thumbnail} fill style={{ objectFit: 'cover' }} className='rounded-lg z-10' />
              </div>

              <p className="text- font- text-white"> {raising.description}</p>
            </>
          }
        </div>

        <div className="flex flex-col gap-6 xl:w-[50%] 2xl:w-[40%] py-14">

          <div className="flex flex-col gap-2 max-w-[32rem]">
            <div className="bg-gray-200 h-2 rounded-lg overflow-hidden">
              <div className="bg-[#059b8b] h-full" style={{ width: `${(raising.amountDonated / raising.totalAmount) * 100}%` }}></div>
            </div>
            <div className="flex justify-between items-center">
              <p>{raising.amountDonated}</p>
              <p>{raising.totalAmount}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="px-3 py-2 rounded-md bg-transparent" />
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-3 py-2 rounded-md bg-transparent">
                <option className='btn bg-[#092731]' value="USD">USD</option>
                <option className='btn bg-[#092731]' value="EUR">EUR</option>
              </select>
            </div>
            <button onClick={handleDonation} className="btn btn1">Donate Now</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Page
