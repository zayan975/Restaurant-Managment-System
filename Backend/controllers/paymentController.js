const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; 

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

   const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(amount * 100),  
  currency: "pkr",
  payment_method_types: ["card"],
});

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);


    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("STRIPE ERROR:", error.message);
    return res.status(500).json({ message: "Stripe error", error: error.message });
  }
};
