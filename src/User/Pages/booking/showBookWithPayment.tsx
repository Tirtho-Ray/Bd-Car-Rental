import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PaymentInfo {
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentIntentId: string;
  status: string;
}

interface BookingWithPaymentProps {
  bookingId: string;
}

const BookingWithPayment: React.FC<BookingWithPaymentProps> = ({ bookingId }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000 /api/payment-info/${bookingId}`);
        setPaymentInfo(response.data);

        // Assuming you have a way to fetch user details based on the userId in the paymentInfo
        const userResponse = await axios.get(`/api/users/${response.data.userId}`);
        setUserEmail(userResponse.data.email);
        setUserName(userResponse.data.name);

      } catch (error) {
        console.error('Error fetching payment or user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!paymentInfo) {
    return <div>No payment information available.</div>;
  }

  return (
    <div>
      <h2>Payment Information</h2>
      <p><strong>Booking ID:</strong> {paymentInfo.bookingId}</p>
      <p><strong>User Email:</strong> {userEmail}</p>
      <p><strong>User Name:</strong> {userName}</p>
      <p><strong>Amount:</strong> ${paymentInfo.amount}</p>
      <p><strong>Currency:</strong> {paymentInfo.currency}</p>
      <p><strong>Status:</strong> {paymentInfo.status}</p>
    </div>
  );
};

export default BookingWithPayment;
