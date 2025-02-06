
"use client"
import React from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { useAppSelector } from '@/lib/store/hooks';





const stripePromise = loadStripe('pk_test_51QKzP2DLv6HKVjIVhV1NRimyNycyutic87ft6z18N2tA5Z8CuS1UrkImWfFH1FqTmgAz0JWreMpMqeJKC2RbM5f300XJyTzrBU');
export default function Checkoutpayment() {


    
    const clientSecret= useAppSelector((state)=>state.payment.clientsecret)

console.log("clientSecret.............",clientSecret);


   const option = { clientSecret }


  return (
    <div className='bg-gray-50'>
      <div className="m-auto max-w-3xl p-5 text-orange-900 pt-20 bg-gray-50">
        <h1 className="text-2xl py-3 text-center">Payment</h1>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={option}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>

  )
}
