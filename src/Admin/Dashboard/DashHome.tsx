import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar
} from 'recharts';

// Dummy Data
interface DataPoint {
  name: string;
  rentals?: number;
  revenue?: number;
  value?: number;
}

const rentalData: DataPoint[] = [
  { name: 'Jan', rentals: 400 },
  { name: 'Feb', rentals: 300 },
  { name: 'Mar', rentals: 500 },
  { name: 'Apr', rentals: 200 },
  { name: 'May', rentals: 350 },
];

const revenueData: DataPoint[] = [
  { name: 'Jan', revenue: 1000 },
  { name: 'Feb', revenue: 1500 },
  { name: 'Mar', revenue: 1200 },
  { name: 'Apr', revenue: 800 },
  { name: 'May', revenue: 1800 },
];

const carStatusData: DataPoint[] = [
  { name: 'Available', value: 70 },
  { name: 'Rented', value: 30 },
];

const customerDemographicsData: DataPoint[] = [
  { name: '18-25', value: 25 },
  { name: '26-35', value: 40 },
  { name: '36-45', value: 20 },
  { name: '46-60', value: 10 },
  { name: '60+', value: 5 },
];

const popularCarsData: DataPoint[] = [
  { name: 'Sedan', rentals: 400 },
  { name: 'SUV', rentals: 300 },
  { name: 'Truck', rentals: 200 },
  { name: 'Compact', rentals: 100 },
];

const COLORS = ['#0088FE', '#FFBB28', '#00C49F', '#FF8042'];

const DashHome: React.FC = () => {
  const [chartWidth, setChartWidth] = useState<number>(400);
  const [chartHeight, setChartHeight] = useState<number>(200);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth < 768 ? window.innerWidth - 40 : 400;
      const newHeight = window.innerWidth < 768 ? 180 : 200;
      setChartWidth(newWidth);
      setChartHeight(newHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Car Rental System</h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Rental Line Chart */}
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Rentals Overview</h2>
          <LineChart width={chartWidth} height={chartHeight} data={rentalData}>
            <Line type="monotone" dataKey="rentals" stroke="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
          </LineChart>
        </div>

        {/* Revenue Bar Chart */}
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <BarChart width={chartWidth} height={chartHeight} data={revenueData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Car Availability Pie Chart */}
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Car Availability</h2>
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie data={carStatusData} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
              {carStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Customer Demographics Radial Chart */}
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Customer Demographics</h2>
          <RadialBarChart
            width={chartWidth}
            height={chartHeight}
            innerRadius="20%"
            outerRadius="90%"
            data={customerDemographicsData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar minAngle={15} dataKey="value" fill="#82ca9d" />
            <Tooltip />
          </RadialBarChart>
        </div>

        {/* Popular Cars Bar Chart */}
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Most Rented Cars</h2>
          <BarChart width={chartWidth} height={chartHeight} data={popularCarsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rentals" fill="#FFBB28" />
          </BarChart>
        </div>

        {/* Reservation Duration Pie Chart */}
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Reservation Duration</h2>
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie data={rentalData} dataKey="rentals" cx="50%" cy="50%" outerRadius={60} fill="#00C49F">
              {rentalData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
