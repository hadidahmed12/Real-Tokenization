import { useState } from "react";
import { CardVeIcon, GreaterIcons } from "../../components/Icons/Icons";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { serverRoutes } from "../../routes/serverRoutes";
import toast from "react-hot-toast";
import { api } from "../../config/axiosConfig";
import { Link } from "react-router-dom";
import { browserRoutes } from "../../routes/browserRoutes";
import Button from "../../components/Button/index";
import "./wallet.css";

const AddCard = () => {
  const { user } = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");

  const handleAddCard = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      toast.error("Stripe.js has not loaded yet. Please try again later.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found.");
      toast.error("CardElement is not loaded. Please try again.");
      setLoading(false);
      return;
    }

    const { token, error } = await stripe.createToken(cardElement, {
      name: nameOnCard,
    });

    if (error) {
      console.error("Error creating token:", error);
      setLoading(false);
      return;
    }

    try {
      const authToken = user?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await api.post(
        `${serverRoutes.ADD_CARD}`,
        {
          cardToken: token.id,
          nameOnCard: nameOnCard,
        },
        config
      );

      if (response.data) {
        // fetchCards();
        toast.success("Card added successfully");
      } else {
        toast.error("Failed to add card");
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid main-container">
      <div className="mt-5">
        <h2 className="main-title-09888 pt-4">
          <Link to={browserRoutes.WALLET} className="no-style">
            Wallet
            <span>
              <GreaterIcons />
            </span>
          </Link>
          <span className="walletsubheading-09">Add Card</span>
        </h2>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="mt-3 position-relative">
            <input
              className="card-input"
              type="text"
              placeholder="Eg. John Doe"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              name="nameOnCard"
            />
          </div>
          <div className="mt-3 position-relative">
            <label htmlFor="card-element" className="card-element-label">
              Card Details
            </label>
            <div className="card-element-wrapper">
              <CardElement
                id="card-element"
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#fa755a",
                    },
                  },
                }}
              />
            </div>
            <div className="walletcard-icon-position">
              <CardVeIcon />
            </div>
          </div>
          <Button
            disabled={loading}
            text={"Add Card"}
            className="walletbtn-0993 mt-4"
            onClick={handleAddCard}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCard;
