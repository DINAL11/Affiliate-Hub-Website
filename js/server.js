// server.js (requires: npm install express stripe)
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');

const app = express();

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.lineItems,
        mode: 'payment',
        success_url: 'https://yoursite.com/success',
        cancel_url: 'https://yoursite.com/cancel',
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
    });
    
    res.json({ id: session.id });
});

app.listen(4242);