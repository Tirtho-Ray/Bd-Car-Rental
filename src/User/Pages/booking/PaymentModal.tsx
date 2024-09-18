// src/components/PaymentModal.tsx
//
//
import React, { useState, useEffect } from "react";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51P0kprLOD0pcFdhKvgoX1KwVMiL1qpdtUUKePrORRQiVyVlK3uTybuNOj2tAcpgKAIGnOYte52CTyS01uAmGK98b00aU3zVIEK"
);

const PaymentForm: React.FC<{ clientSecret: string; onClose: () => void }> = ({
  clientSecret,
  onClose,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      }
    );

    if (error) {
      setError(error.message || "An error occurred.");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onClose();
      navigate("/"); // Redirect to home page on successful payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing..." : <p className="mt-2 border px-5 py-1 rounded-md bg-green-400">pay</p>}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

const PaymentModal: React.FC<{ bookingId: string; onClose: () => void }> = ({
  bookingId,
  onClose,
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await fetch(
          "http://localhost:5000/api/stripe/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ bookingId }),
          }
        );

        if (response.ok) {
          const { clientSecret } = await response.json();
          setClientSecret(clientSecret);
        } else {
          const errorText = await response.text();
          console.error("Failed to fetch client secret:", errorText);
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [bookingId]);

  return (
    <div className="modal-overlay">
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <PaymentForm clientSecret={clientSecret} onClose={onClose} />
        </Elements>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PaymentModal;
