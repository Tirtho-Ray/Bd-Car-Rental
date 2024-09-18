// car.constant.ts (for enums and constants)
export type TCarTypes = "Van" | "4 Wheel drives" | "Electric vehicles" | "SUVs" | "Small cars";
export type TFuelType = "Petrol" | "Diesel" | "Octane" | "Ethanol";
export type TStatus = "available" | "unavailable";

// car.interface.ts

export interface ExtraDetails {
  age: number;
  seats: number;
  largeBags: number;
  smallBags: number;
  engineCapacity?: string;
  transmission?: string;
  fuelType: TFuelType;
  fuelConsumption?: string;
}

export interface TCars {
  _id?: string; // Optional: if you are using MongoDB or another database with auto-generated IDs
  name: string;
  image: string;
  carCode: string;
  featuresImage: string[];
  description: string;
  color: string;
  features: string[];
  carType: TCarTypes;
  pricePerHour: number;
  status: TStatus;
  isDeleted: boolean;
  extra: ExtraDetails[]; // Array of ExtraDetails
}
