// Utility to export bookings to CSV

export const exportBookingsToCSV = (bookings, filename = 'sahyadri_bookings_export.csv') => {
  if (!bookings || bookings.length === 0) {
    alert('No bookings available to export.');
    return;
  }

  const headers = [
    'PNR / Booking ID',
    'Travel Date',
    'Origin',
    'Destination',
    'Departure Time',
    'Bus Name',
    'Bus Number',
    'Primary Passenger',
    'Gender',
    'Age',
    'Mobile Number',
    'Email',
    'Seats',
    'Seat Count',
    'Total Fare (INR)',
    'Payment Method',
    'Payment Status',
    'Booking Status',
    'Booked At'
  ];

  const rows = bookings.map(b => [
    `"${b.pnr}"`,
    `"${b.travelDate}"`,
    `"${b.origin}"`,
    `"${b.destination}"`,
    `"${b.departureTime}"`,
    `"${b.busName}"`,
    `"${b.busNumber}"`,
    `"${b.passengerName}"`,
    `"${b.gender || 'Not specified'}"`,
    `"${b.age || '-'}"`,
    `"${b.mobile}"`,
    `"${b.email || 'N/A'}"`,
    `"${(b.selectedSeats || []).join(', ')}"`,
    (b.selectedSeats || []).length,
    b.totalFare,
    `"${b.paymentMethod || 'Simulated UPI'}"`,
    `"${b.paymentStatus || 'Paid'}"`,
    `"${b.status}"`,
    `"${b.bookedAt || new Date().toISOString()}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

