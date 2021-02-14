var braintree = require("braintree");

// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "8y8h6dd8sb78qhd9",
//   publicKey: "dj3vnsq2f5vx8phj",
//   privateKey: "9d370d21906dcc27576cbac7d50d88a0" 
// });


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "8y8h6dd8sb78qhd9",
  publicKey: "dj3vnsq2f5vx8phj",
  privateKey: "9d370d21906dcc27576cbac7d50d88a0",
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({},
    function (err, response) {
      if (err) {
        res.status(500).json(`here is the main problem ${err}`);
      } else {
        res.send(response);
      }
    }
);
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
