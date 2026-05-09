import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CardManager = ({ userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  // Fetch all cards
  const fetchCards = async () => {
    const response = await axios.get(`/api/cards/list-cards}`);
    setCards(response?.data?.cards?.data);
  };

  // Add a new card using Stripe Elements
  // const handleAddCard = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   // Get the CardElement data and create a token using Stripe
  //   const cardElement = elements.getElement(CardElement);
  //   const { token, error } = await stripe.createToken(cardElement, {
  //     name: "Arsan",
  //   });

  //   if (error) {
  //     console.error("Error creating token:", error);
  //     setLoading(false);
  //     return;
  //   }

  //   // Send the token to your backend to add the card to the customer
  //   try {
  //     const authToken =
  //       "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE5YWJmOWU3M2RjZjZmZGQ5Njk2MiIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJtdWhhbW1hZC5hcnNhbiswMEBvcHRpbXVzZm94LmNvbSIsImlhdCI6MTcyNjEzMTA3OCwiZXhwIjoxNzI2MjE3NDc4fQ.uJTc18mnNS2vt8ipfCoWcpVU6Koaaaot2PrXY5FIHRDdDlSpvx1DyBCHmTAtLefn";

  //     const response = await axios.post(
  //       "http://localhost:3000/api/user/card/add",
  //       {
  //         // userId,
  //         cardToken: token.id, // Pass the Stripe token to the backend
  //         nameOnCard: "TEst Name",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     if (response.data) {
  //       fetchCards(); // Refresh the list of cards
  //       alert("Card added successfully");
  //     } else {
  //       alert("Failed to add card");
  //     }
  //   } catch (error) {
  //     console.error("Error adding card:", error);
  //   }

  //   setLoading(false);
  // };

  // Delete a card
  const handleDeleteCard = async (cardId) => {
    try {
      await axios.delete("/api/cards/delete-card", {
        data: {
          // userId,
          cardId,
        },
      });
      //   fetchCards(); // Refresh the list of cards after deletion
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h3>Your Cards</h3>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            {card.brand} **** **** **** {card.last4}
            <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add a new card</h3>
      <form >
        <CardElement options={{ hidePostalCode: true }} />
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Adding..." : "Add Card"}
        </button>
      </form>
    </div>
  );
};

export default CardManager;
