import React from "react"

// hardcoded amount (in US cents) to charge users
// you could set this variable dynamically to charge different amounts
const amount = 2500
const cardStyles = {
  display: "flex",
  margin: '3rem auto',
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "3rem",
  boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
  backgroundColor: "#fff",
  borderRadius: "6px",
  maxWidth: "600px",
}
const buttonStyles = {
  fontSize: "15px",
  width: '100px',
  fontFamily: 'sans-serif',
  fontWeight: "bold",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: ".8rem 1rem",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "green",
  borderRadius: "6px",
  letterSpacing: "1.5px",
  margin: '1rem',
}

const buttonFlex = {
    display: "flex",
    flexDirection: "row",
}

// Below is where the checkout component is defined.
// It has several functions and some default state variables.
const Checkout = class extends React.Component {
  state = {
    disabled: false,
    buttonText: "$25",
    paymentMessage: "",
  }

  resetButton() {
    this.setState({ disabled: false, buttonText: "$25" })
  }

  componentDidMount() {
    this.stripeHandler = window.StripeCheckout.configure({
      // You’ll need to add your own Stripe public key to the `checkout.js` file.
      // key: 'pk_test_STRIPE_PUBLISHABLE_KEY',
      key: "pk_test_kuhbxb0MMZsp6fj6aTNDnxUu",
      closed: () => {
        this.resetButton()
      },
    })
  }

  openStripeCheckout(event) {
    event.preventDefault()
    this.setState({ disabled: true, buttonText: "WAITING..." })
    this.stripeHandler.open({
      name: "The DLP Alpha Chapter Kickstart Campaign",
      amount: amount,
      description: "A donation well worth your time.",
      token: token => {
        fetch(`AWS_LAMBDA_URL`, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            token,
            amount,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then(res => {
            console.log("Transaction processed successfully")
            this.resetButton()
            this.setState({ paymentMessage: "Payment Successful!" })
            return res
          })
          .catch(error => {
            console.error("Error:", error)
            this.setState({ paymentMessage: "Payment Failed" })
          })
      },
    })
  }

  render() {
    return (
      <div style={cardStyles}>
        <h4>The Alpha Chapter Kickstart Campaign</h4>
        <p>
          Thanks again. You are so great. Lorem ipsum, et cetera.
        </p>
        <div style={buttonFlex}>
        <button
          style={buttonStyles}
          onClick={event => this.openStripeCheckout(event)}
          disabled={this.state.disabled}
        >
          {this.state.buttonText}
        </button>
        <button
          style={buttonStyles}
        >
          $50
        </button>
        <button
          style={buttonStyles}
        >
          $500
        </button>
        {this.state.paymentMessage}
        </div>
      </div>
    )
  }
}

export default Checkout