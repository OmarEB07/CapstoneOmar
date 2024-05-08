const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY); // Instantiate Stripe with your secret key

const router = express.Router();

router.post('/payment', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      payment_method_types: ['card'],
      description: 'Pixel Vault',
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
