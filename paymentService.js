const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
  });
  return paymentIntent.client_secret;
};

module.exports = { createPaymentIntent };