import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import useAuth from "../../hooks/useAuth"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({price, cart}) => {
        const stripe = useStripe();
        const elements = useElements()
        const [cardError, setCardError] = useState('')
        const [clientSecret, setClientSecret] = useState("")
        const {user} = useAuth();
        const axiosSecure = useAxiosSecure();
        const navigate = useNavigate(); 

    useEffect(() => {
        if(typeof price !== 'number' || price < 1) {
            console.log("Price is not a number or less than 1")
            return; 
        }
         axiosSecure.post('/create-payment-intent', {price})
         .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
         })
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          console.log('[error]', error);
          setCardError(error.message);
        } else {
            setCardError("success")
        //    
        }

        const {paymentIntent, error:confirmError } = await stripe.confirmCardPayment(
            clientSecret ,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || "anonymous", 
                  email: user?.email || "unknown"
                },
              },
            },
          );
          if(confirmError) {
            console.log(confirmError);
          }
          console.log(paymentIntent)
          if(paymentIntent.status === "succeeded") {
            console.log(paymentIntent.id);
            setCardError(`Your transaction id is ${paymentIntent.id}`)
            const paymentInfo = {
                email: user.email,
                transactionId: paymentIntent.id,
                price,
                quantity: cart.length,
                status: "order pending",
                itemName: cart.map(item => item.name),
                cartItems: cart.map(item => item._id),
                productItems: cart.map(item => item._id)
            }
            console.log(paymentInfo);
            axiosSecure.post('/payments', paymentInfo)
            .then(res => {
                console.log(res.data);
                alert("Payment Successful!")
                navigate('/order')
            })
          }
    };
  return (
    <div className='flex flex-col sm:flex-row justify-start items-start gap-8 lg:mt-10 mt-5'>
      <div className='md:w-1/2 w-full space-y-3'>
            <h4 className='text-lg font-semibold'>Order Summary</h4>
            <p>Total Price: ${price}</p>
            <p>Number of Items: {cart.length}</p>
      </div>
      <div className='md:w-1/3 w-full space-y-5 card px-4 py-8 max-w-sm shrink-0 shadow-2xl'>
      <h4 className='text-lg font-semibold'>Process Your Payment!</h4>
      <p className='font-medium'>Credit/Debit Card</p>

      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe} className='btn btn-sm btn-primary w-full text-white border-0 my-5'>
        Pay
      </button>
      {
        cardError ? <p className='text-red italic text-xs'>{cardError}</p> : ""
      } 
    </form>
    <div className='text-center'>
        <hr />
        <button type="submit" disabled={!stripe} className='btn btn-sm bg-orange text-white border-0 mt-5'>
        <FontAwesomeIcon icon={faPaypal}/> Pay with Paypal
      </button>
      </div>
      </div>
    </div>
  )
}

export default CheckoutForm
