import { baseApi } from "../baseApi";

// Define the type for the request body
export interface BookingParams {

    pickUp:string;
    dropOff: string;
    startDate: string;
    startTime: string;
    returnDate: string | null;
    returnTime: string | null;
    fixedTime:number|null;
    user:string;
    carId: string;
    zipCode:string;
    insurance:string;
    NIDPassPort:string;
    DrivingLicense:string;
    totalCost: number;
  // Add other fields as necessary
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookingCar: builder.mutation<void, BookingParams>({
      query: (params) => ({
        url: '/booking',
        method: 'POST',
        body: params, // Use body for POST request data
      }),
    }),
  }),
});

export const { useBookingCarMutation } = authApi;
