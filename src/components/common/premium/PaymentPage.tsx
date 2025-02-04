// import React from 'react'
// import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js';
// export default function PaymentPage() {
//     const stripePromise=loadStripe("pk_test_51QnzBMFmYIl7zFnkgzw2z08zodJgkWCTnkihH3tkIhlCXFT1pVTgEajamceBypUnxIfl4uQKHL9saStgQNoW33XH001fSSOrzt")

//     // const option = { clientSecret };
//   return (
//     <div>
//       <h1 className="text-3xl py-2 text-center font-semibold">Payment</h1>
//         <EmbeddedCheckoutProvider
//           className="bg-gray-600 p-4 rounded-md"
//           stripe={stripePromise}
//         //   options={option}
//         >
//           <EmbeddedCheckout />
//         </EmbeddedCheckoutProvider>
//     </div>
//   )
// }
