import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PaymentModal from "./PaymentModal";
import "./PaymentModal";

interface Booking {
  carId: {
    name: string;
    image: string;
  };
  pickUp: string;
  dropOff: string;
  startDate: string;
  startTime: string;
  zipCode: string;
  insurance: string;
  NIDPassPort: string;
  DrivingLicense: string;
  totalCost: number;
  _id: string;
}

const MyBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [totalCost, setTotalCost] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User is not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/my-bookings", {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        const { bookings, grandTotal } = response.data.data;
        setBookings(bookings);
        setTotalCost(grandTotal);
      } catch (error) {
        setError("Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleContinueRent = () => {
    navigate("/cars");
  };

  const handleDelete = async (bookingId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this booking!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/my-bookings/${bookingId}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        Swal.fire("Deleted!", "Your booking has been deleted.", "success");
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      }
    } catch (error) {
      Swal.fire("Error!", "There was an error deleting your booking.", "error");
    }
  };

  const handleOpenPaymentModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setShowPaymentModal(true);
  };

  if (loading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!bookings.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4 p-4 bg-gray-900">
        <p className="text-gray-400 text-lg font-semibold">
          No bookings found!
        </p>
        <button
          onClick={handleContinueRent}
          className="px-6 py-2 bg-yellow-500 text-black rounded-lg shadow-lg hover:bg-yellow-600 transition"
        >
          Rent now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-[1400px] mx-auto p-6 bg-gray-800 flex flex-col md:flex-row gap-6 mt-0 md:mt-20">
      {/* Sticky Summary Section */}
      <div className="md:w-1/4 flex-none bg-gray-900 p-4 rounded-lg shadow-lg sticky top-20">
        <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
        <p className="text-lg font-medium text-white mb-4">
          Total Cost: ${totalCost.toFixed(2)}
        </p>
        <button
          onClick={() => {
            if (bookings.length > 0) {
              handleOpenPaymentModal(bookings[0]._id); // Open payment modal for the first booking or adapt this as needed
            }
          }}
          className="w-full px-1 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>
        <div className="mt-6">
          {showPaymentModal && selectedBookingId && (
            <div className="modal-overlay">
              <div className="modal-content">
                <PaymentModal
                  bookingId={selectedBookingId}
                  onClose={() => setShowPaymentModal(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Booking Cards Section */}
      <div className="md:w-3/4 flex-1 bg-gray-900 p-4 rounded-lg overflow-y-auto max-h-screen">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                className="h-48 w-full object-cover"
                src={booking.carId.image}
                alt={booking.carId.name}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {booking.carId.name}
                </h3>
                <p className="text-gray-600">
                  {booking.pickUp} - {booking.dropOff}
                </p>
                <p className="text-gray-600">
                  Total Cost: ${booking.totalCost.toFixed(2)}
                </p>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
                >
                  Delete Booking
                </button>
                {/* <button
                  onClick={() => handleOpenPaymentModal(booking._id)}
                  className="mt-4 ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  Pay Now
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
