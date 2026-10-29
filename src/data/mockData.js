// Master mock data for Sahyadri Royal Travels (Maharashtra, India)

export const CITIES = [
  {
    name: 'Pune',
    state: 'Maharashtra',
    popular: true,
    boardingPoints: [
      { name: 'Swargate Bus Stand - Sahyadri Lounge (Gate 2)', landmark: 'Near Natraj Hotel, Swargate' },
      { name: 'Wakdewadi / Shivaji Nagar - Main Boarding Terminal', landmark: 'Opposite TVS Showroom, Old Pune-Mumbai Hwy' },
      { name: 'Katraj Bypass - Wonder City Corner', landmark: 'Katraj Chowk, Service Road' },
      { name: 'Chandani Chowk - Highway Flyover Point', landmark: 'Below Paud Road Flyover' },
      { name: 'Viman Nagar - Hyatt Regency Stop', landmark: 'Pune-Ahmednagar Highway' }
    ],
    droppingPoints: [
      { name: 'Swargate Sahyadri Office', landmark: 'Swargate Flyover End' },
      { name: 'Shivaji Nagar ST Stand', landmark: 'Wakdewadi Terminal' },
      { name: 'Katraj Tunnel Point', landmark: 'Katraj-Dehu Bypass' },
      { name: 'Hadapsar Gadital', landmark: 'Pune-Solapur Highway' }
    ]
  },
  {
    name: 'Pandharpur',
    state: 'Maharashtra',
    popular: true,
    boardingPoints: [
      { name: 'Pandharpur New ST Bus Stand - Sahyadri Counter', landmark: 'Station Road, Pandharpur' },
      { name: 'Shivaji Chowk - Pilgrims Welcome Gate', landmark: 'Near Vitthal Rukmini Mandir Approach' },
      { name: 'Tanpure Maharaj Math Corner', landmark: 'Bhakta Niwas Road' }
    ],
    droppingPoints: [
      { name: 'Pandharpur New Bus Stand Terminal', landmark: 'Main Stand Road' },
      { name: 'Namdev Payatha Road (Near Vitthal Temple)', landmark: 'Pilgrim Drop Zone' },
      { name: 'Gopalpur Phata', landmark: 'Bypass Highway Circle' }
    ]
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    popular: true,
    boardingPoints: [
      { name: 'Dadar TT Circle - Pritam Hotel', landmark: 'Dr. Ambedkar Road, Dadar East' },
      { name: 'Sion Circle - Sahyadri Office', landmark: 'Opposite Guru Nanak College, Sion' },
      { name: 'Chembur Maitri Park', landmark: 'Sion-Trombay Highway' },
      { name: 'Vashi Plaza - Highway Underbridge', landmark: 'Sector 17, Navi Mumbai' },
      { name: 'Borivali West - Gokul Hotel', landmark: 'Near Borivali Railway Station' }
    ],
    droppingPoints: [
      { name: 'Dadar East - Swami Narayan Temple', landmark: 'Central Mumbai' },
      { name: 'Vashi Toll Plaza', landmark: 'Navi Mumbai Entry' },
      { name: 'Chembur Diamond Garden', landmark: 'Eastern Express Highway' },
      { name: 'Borivali West Express Flyover', landmark: 'Western Suburbs' }
    ]
  },
  {
    name: 'Kolhapur',
    state: 'Maharashtra',
    popular: true,
    boardingPoints: [
      { name: 'Kawala Naka - Sahyadri Royal Hub', landmark: 'Near Circuit House, Kolhapur' },
      { name: 'Central Bus Stand (CBS) - Platform 4', landmark: 'Station Road' },
      { name: 'Shiroli MIDC Phata', landmark: 'NH-4 Highway Corner' }
    ],
    droppingPoints: [
      { name: 'Kawala Naka Bus Terminal', landmark: 'Main Highway Point' },
      { name: 'Mahalaxmi Mandir Pilgrim Gate', landmark: 'Bhavani Mandap Road' },
      { name: 'Ujalaiwadi Highway Stop', landmark: 'Kolhapur South' }
    ]
  },
  {
    name: 'Shirdi',
    state: 'Maharashtra',
    popular: true,
    boardingPoints: [
      { name: 'Sai Baba Temple Gate No. 2 - Sahyadri Terminal', landmark: 'Near Bhakta Niwas, Shirdi' },
      { name: 'Hotel Goradia Terminal', landmark: 'Pimpalwadi Road' },
      { name: 'Shirdi Central ST Stand Corner', landmark: 'Manmad Highway' }
    ],
    droppingPoints: [
      { name: 'Sai Mandir Pilgrim Drop Plaza', landmark: 'Gate 2 Entrance' },
      { name: 'Sai Ashram Bhakta Niwas', landmark: 'Dindori Road' }
    ]
  },
  {
    name: 'Solapur',
    state: 'Maharashtra',
    popular: false,
    boardingPoints: [
      { name: 'Old Poona Naka - Sahyadri Travels Office', landmark: 'Near Samarth Sahakari Bank' },
      { name: 'Solapur Central Bus Stand', landmark: 'Station Road' },
      { name: 'Shivaji Chowk', landmark: 'City Center' }
    ],
    droppingPoints: [
      { name: 'Old Poona Naka Bypass', landmark: 'Pune-Solapur Highway' },
      { name: 'New Central Bus Station', landmark: 'Solapur' }
    ]
  },
  {
    name: 'Mahabaleshwar',
    state: 'Maharashtra',
    popular: true,
    boardingPoints: [
      { name: 'Mahabaleshwar ST Stand - Sahyadri Booking Counter', landmark: 'Market Road' },
      { name: 'Venna Lake Parking Terminal', landmark: 'Lake View Road' }
    ],
    droppingPoints: [
      { name: 'Mahabaleshwar Main Market', landmark: 'Near Bus Depot' },
      { name: 'Panchgani Drop Point', landmark: 'Panchgani Market' }
    ]
  },
  {
    name: 'Nashik',
    state: 'Maharashtra',
    popular: false,
    boardingPoints: [
      { name: 'Dwarka Circle - Sahyadri Lounge', landmark: 'Mumbai-Agra Highway' },
      { name: 'Mumbai Naka - Near City Centre', landmark: 'Trimbak Road' },
      { name: 'CBS (Central Bus Station)', landmark: 'Old CBS, Nashik' }
    ],
    droppingPoints: [
      { name: 'Dwarka Circle Hub', landmark: 'Nashik' },
      { name: 'CBS ST Depot', landmark: 'Central Nashik' }
    ]
  },
  {
    name: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    popular: false,
    boardingPoints: [
      { name: 'CIDCO Bus Stand - Sahyadri Office', landmark: 'Jalna Road' },
      { name: 'Baba Petrol Pump Corner', landmark: 'Railway Station Road' }
    ],
    droppingPoints: [
      { name: 'Central Bus Stand (CBS)', landmark: 'Sambhajinagar Central' },
      { name: 'CIDCO Flyover Drop Point', landmark: 'Jalna Road' }
    ]
  }
];

// Helper to generate a 40-seat coach blueprint
export const generate40SeatCoach = () => {
  const seats = [];
  
  // Rows 1 through 9 (2 + 2 layout with aisle = 36 seats)
  for (let r = 1; r <= 9; r++) {
    const baseNum = (r - 1) * 4;
    seats.push(
      { id: baseNum + 1, number: baseNum + 1, row: r, side: 'left', position: 'window', label: `W-${baseNum + 1}` },
      { id: baseNum + 2, number: baseNum + 2, row: r, side: 'left', position: 'aisle', label: `A-${baseNum + 2}` },
      { id: baseNum + 3, number: baseNum + 3, row: r, side: 'right', position: 'aisle', label: `A-${baseNum + 3}` },
      { id: baseNum + 4, number: baseNum + 4, row: r, side: 'right', position: 'window', label: `W-${baseNum + 4}` }
    );
  }
  
  // Row 10: Rear continuous 4-seat row (seats 37, 38, 39, 40)
  seats.push(
    { id: 37, number: 37, row: 10, side: 'rear', position: 'window', label: 'W-37' },
    { id: 38, number: 38, row: 10, side: 'rear', position: 'center', label: 'C-38' },
    { id: 39, number: 39, row: 10, side: 'rear', position: 'center', label: 'C-39' },
    { id: 40, number: 40, row: 10, side: 'rear', position: 'window', label: 'W-40' }
  );

  return seats;
};

export const COACH_40_SEATS = generate40SeatCoach();

export const INITIAL_BUSES = [
  // PUNE TO PANDHARPUR (Premier Pilgrimage Corridor)
  {
    id: 'SRT-PN-PD-01',
    busNumber: 'MH-12-RN-7842',
    busName: 'Shivneri Superfast AC Seater (2+2)',
    busType: 'AC 2+2 Semi-Sleeper',
    totalSeats: 40,
    origin: 'Pune',
    destination: 'Pandharpur',
    departureTime: '06:00',
    arrivalTime: '11:30',
    duration: '5h 30m',
    baseFare: 480,
    rating: 4.8,
    reviewsCount: 312,
    amenities: ['Air Conditioning', 'Pushback Recliner Seats', 'Fast USB Charging', 'Complimentary Water Bottle', 'Live GPS Tracking'],
    bookedSeats: [1, 2, 7, 8, 15, 16, 23, 24, 37, 38], // 10 pre-booked, 30 available
    driverName: 'Suresh More (14 yrs exp)',
    conductorContact: '+91 98220 11442'
  },
  {
    id: 'SRT-PN-PD-02',
    busNumber: 'MH-14-BT-1008',
    busName: 'Royal BharatBenz Luxury Air-Suspension',
    busType: 'AC 2+2 Air-Suspension',
    totalSeats: 40,
    origin: 'Pune',
    destination: 'Pandharpur',
    departureTime: '13:30',
    arrivalTime: '19:15',
    duration: '5h 45m',
    baseFare: 520,
    rating: 4.9,
    reviewsCount: 245,
    amenities: ['Air Conditioning', 'Air Suspension Ride', 'Individual Reading Lamps', 'Free Wi-Fi', 'USB Sockets', 'CCTV Security'],
    bookedSeats: [3, 4, 11, 12, 19, 20, 31, 32], // 8 pre-booked, 32 available
    driverName: 'Pandurang Patil (18 yrs exp)',
    conductorContact: '+91 98221 44558'
  },
  {
    id: 'SRT-PN-PD-03',
    busNumber: 'MH-12-QX-9009',
    busName: 'Pandharpur Vithoba Darshan Multi-Axle Volvo',
    busType: 'Volvo AC 2+2 Luxury Coach',
    totalSeats: 40,
    origin: 'Pune',
    destination: 'Pandharpur',
    departureTime: '22:30',
    arrivalTime: '04:30',
    duration: '6h 00m',
    baseFare: 650,
    rating: 4.95,
    reviewsCount: 520,
    amenities: ['Premium Volvo Multi-Axle', 'Individual AC Vents', 'Warm Sanitized Blanket', 'Mineral Water', 'Emergency Hammer & Exit', 'On-time Guarantee'],
    bookedSeats: [1, 4, 5, 8, 9, 12, 13, 16, 21, 24, 25, 28, 39, 40], // 14 booked, 26 available
    driverName: 'Dnyaneshwar Shinde (20 yrs exp)',
    conductorContact: '+91 98223 88991'
  },
  {
    id: 'SRT-PN-PD-04',
    busNumber: 'MH-11-AX-4521',
    busName: 'Sahyadri Night Express AC Coach',
    busType: 'AC 2+2 Pushback',
    totalSeats: 40,
    origin: 'Pune',
    destination: 'Pandharpur',
    departureTime: '23:45',
    arrivalTime: '05:45',
    duration: '6h 00m',
    baseFare: 590,
    rating: 4.7,
    reviewsCount: 180,
    amenities: ['Air Conditioning', 'Pushback Recliners', 'Deep Rest Lighting', 'USB Charging Port', 'First Aid Kit'],
    bookedSeats: [2, 6, 10, 14, 18, 22, 26, 30],
    driverName: 'Ramesh Jadhav',
    conductorContact: '+91 98225 66772'
  },

  // PANDHARPUR TO PUNE
  {
    id: 'SRT-PD-PN-01',
    busNumber: 'MH-12-RN-7843',
    busName: 'Morning Vithoba Express BharatBenz',
    busType: 'AC 2+2 Air-Suspension',
    totalSeats: 40,
    origin: 'Pandharpur',
    destination: 'Pune',
    departureTime: '07:00',
    arrivalTime: '12:30',
    duration: '5h 30m',
    baseFare: 480,
    rating: 4.8,
    reviewsCount: 290,
    amenities: ['Air Conditioning', 'Pushback Recliner Seats', 'Fast USB Charging', 'Complimentary Water Bottle'],
    bookedSeats: [5, 6, 17, 18, 29, 30],
    driverName: 'Ashok Chavan',
    conductorContact: '+91 98220 11443'
  },
  {
    id: 'SRT-PD-PN-02',
    busNumber: 'MH-14-BT-1009',
    busName: 'Afternoon Royal AC Pushback Coach',
    busType: 'AC 2+2 Semi-Sleeper',
    totalSeats: 40,
    origin: 'Pandharpur',
    destination: 'Pune',
    departureTime: '15:00',
    arrivalTime: '20:30',
    duration: '5h 30m',
    baseFare: 520,
    rating: 4.75,
    reviewsCount: 165,
    amenities: ['Air Conditioning', 'Comfort Headrests', 'USB Sockets', 'Clean Curtains'],
    bookedSeats: [1, 2, 3, 4, 13, 14],
    driverName: 'Gajanan Deshmukh',
    conductorContact: '+91 98221 44559'
  },
  {
    id: 'SRT-PD-PN-03',
    busNumber: 'MH-12-QX-9010',
    busName: 'Pandharpur Return Volvo Multi-Axle Star',
    busType: 'Volvo AC 2+2 Luxury Coach',
    totalSeats: 40,
    origin: 'Pandharpur',
    destination: 'Pune',
    departureTime: '21:30',
    arrivalTime: '03:30',
    duration: '6h 00m',
    baseFare: 650,
    rating: 4.9,
    reviewsCount: 410,
    amenities: ['Premium Volvo Multi-Axle', 'Sanitized Blankets', 'Live Tracking', 'Mineral Water Bottle'],
    bookedSeats: [9, 10, 11, 12, 21, 22, 33, 34, 37, 40],
    driverName: 'Santosh Gaikwad',
    conductorContact: '+91 98223 88992'
  },

  // MUMBAI TO PUNE
  {
    id: 'SRT-MB-PN-01',
    busNumber: 'MH-01-DR-5501',
    busName: 'Mumbai-Pune Expressway Scania Luxury',
    busType: 'Scania AC 2+2 Executive',
    totalSeats: 40,
    origin: 'Mumbai',
    destination: 'Pune',
    departureTime: '06:30',
    arrivalTime: '10:15',
    duration: '3h 45m',
    baseFare: 450,
    rating: 4.85,
    reviewsCount: 680,
    amenities: ['Expressway Non-Stop Express', 'Full AC', 'Ergonomic Leather Seats', 'Hi-Speed WiFi', 'Newspapers & Magazines'],
    bookedSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    driverName: 'Kailash Sawant',
    conductorContact: '+91 98200 44551'
  },
  {
    id: 'SRT-MB-PN-02',
    busNumber: 'MH-01-DR-5502',
    busName: 'Corporate Evening AC Express',
    busType: 'AC 2+2 Pushback',
    totalSeats: 40,
    origin: 'Mumbai',
    destination: 'Pune',
    departureTime: '17:30',
    arrivalTime: '21:15',
    duration: '3h 45m',
    baseFare: 490,
    rating: 4.75,
    reviewsCount: 420,
    amenities: ['Air Conditioning', 'Pushback Seats', 'Charging Ports', 'Live GPS Tracking'],
    bookedSeats: [13, 14, 15, 16, 25, 26, 27, 28],
    driverName: 'Milind Kulkarni',
    conductorContact: '+91 98200 44552'
  },

  // PUNE TO MUMBAI
  {
    id: 'SRT-PN-MB-01',
    busNumber: 'MH-12-KN-2201',
    busName: 'Pune-Mumbai Morning Star BharatBenz',
    busType: 'AC 2+2 Pushback',
    totalSeats: 40,
    origin: 'Pune',
    destination: 'Mumbai',
    departureTime: '06:15',
    arrivalTime: '10:00',
    duration: '3h 45m',
    baseFare: 450,
    rating: 4.8,
    reviewsCount: 510,
    amenities: ['Air Conditioning', 'Expressway Transit', 'Reclining Seats', 'Phone Charging Sockets'],
    bookedSeats: [1, 2, 9, 10, 21, 22],
    driverName: 'Pravin Rane',
    conductorContact: '+91 98224 55112'
  },

  // PUNE TO KOLHAPUR
  {
    id: 'SRT-PN-KL-01',
    busNumber: 'MH-09-CX-3311',
    busName: 'Mahalaxmi Super Express AC',
    busType: 'AC 2+2 Semi-Sleeper',
    totalSeats: 40,
    origin: 'Pune',
    destination: 'Kolhapur',
    departureTime: '07:30',
    arrivalTime: '12:30',
    duration: '5h 00m',
    baseFare: 500,
    rating: 4.82,
    reviewsCount: 380,
    amenities: ['Air Conditioning', 'NH-4 Fast Corridor', 'Comfort Legroom', 'Water Bottle', 'USB Charger'],
    bookedSeats: [3, 4, 7, 8, 19, 20],
    driverName: 'Tanaji Patil',
    conductorContact: '+91 98230 77881'
  },
  {
    id: 'SRT-PN-KL-02',
    busNumber: 'MH-09-CX-3312',
    busName: 'Kolhapur Night Rider Luxury Coach',
    busType: 'Volvo AC 2+2 Luxury Coach',
    totalSeats: 40,
    origin: 'Pune',
    destination: 'Kolhapur',
    departureTime: '23:15',
    arrivalTime: '04:45',
    duration: '5h 30m',
    baseFare: 580,
    rating: 4.9,
    reviewsCount: 295,
    amenities: ['Volvo Comfort', 'Blankets Provided', 'Air Conditioning', 'GPS Tracking', 'Emergency Assistance'],
    bookedSeats: [1, 2, 5, 6, 13, 14, 25, 26, 37, 38],
    driverName: 'Babanrao Kadam',
    conductorContact: '+91 98230 77882'
  },

  // PUNE TO SHIRDI
  {
    id: 'SRT-PN-SD-01',
    busNumber: 'MH-17-AH-8801',
    busName: 'Sai Shradha Pilgrim Express Volvo',
    busType: 'Volvo AC 2+2 Luxury Coach',
    totalSeats: 40,
    origin: 'Pune',
    destination: 'Shirdi',
    departureTime: '06:15',
    arrivalTime: '11:45',
    duration: '5h 30m',
    baseFare: 550,
    rating: 4.92,
    reviewsCount: 710,
    amenities: ['Pilgrim Dedicated Coach', 'Devotional Melodies', 'Air Conditioning', 'Sanitized Cabin', 'Free Water Bottle'],
    bookedSeats: [1, 4, 9, 12, 17, 20, 25, 28, 33, 36],
    driverName: 'Vijay Sonawane',
    conductorContact: '+91 98226 33994'
  },

  // MUMBAI TO MAHABALESHWAR
  {
    id: 'SRT-MB-MH-01',
    busNumber: 'MH-11-BV-6644',
    busName: 'Strawberry Hill Country Luxury Tourer',
    busType: 'AC 2+2 Pushback Recliner',
    totalSeats: 40,
    origin: 'Mumbai',
    destination: 'Mahabaleshwar',
    departureTime: '06:45',
    arrivalTime: '13:15',
    duration: '6h 30m',
    baseFare: 620,
    rating: 4.88,
    reviewsCount: 340,
    amenities: ['Panoramic Mountain Windows', 'Climate Controlled AC', 'Comfort Recliners', 'Luggage Space', 'Mineral Water'],
    bookedSeats: [1, 2, 3, 4, 5, 6, 7, 8, 21, 22],
    driverName: 'Sanjay Salvi',
    conductorContact: '+91 98205 11993'
  }
];

export const POPULAR_ROUTES = [
  {
    origin: 'Pune',
    destination: 'Pandharpur',
    tag: 'Pilgrimage Favorite (विठ्ठल दर्शन)',
    startingFare: 480,
    duration: '5h 30m',
    busesPerDay: 8,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  },
  {
    origin: 'Pandharpur',
    destination: 'Pune',
    tag: 'Return Pilgrims Corridor',
    startingFare: 480,
    duration: '5h 30m',
    busesPerDay: 7,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80'
  },
  {
    origin: 'Mumbai',
    destination: 'Pune',
    tag: 'Expressway Commuter Star',
    startingFare: 450,
    duration: '3h 45m',
    busesPerDay: 14,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  },
  {
    origin: 'Pune',
    destination: 'Kolhapur',
    tag: 'Heritage & Business Link',
    startingFare: 500,
    duration: '5h 00m',
    busesPerDay: 6,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80'
  },
  {
    origin: 'Pune',
    destination: 'Shirdi',
    tag: 'Sai Samadhi Darshan',
    startingFare: 550,
    duration: '5h 30m',
    busesPerDay: 5,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  },
  {
    origin: 'Mumbai',
    destination: 'Mahabaleshwar',
    tag: 'Weekend Hill Retreat',
    startingFare: 620,
    duration: '6h 30m',
    busesPerDay: 4,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_DEMO_BOOKINGS = [
  {
    pnr: 'SRT-MH-26781',
    busId: 'SRT-PN-PD-01',
    busName: 'Shivneri Superfast AC Seater (2+2)',
    busNumber: 'MH-12-RN-7842',
    origin: 'Pune',
    destination: 'Pandharpur',
    travelDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0], // Tomorrow
    departureTime: '06:00',
    arrivalTime: '11:30',
    boardingPoint: 'Swargate Bus Stand - Sahyadri Lounge (Gate 2)',
    droppingPoint: 'Pandharpur New Bus Stand Terminal',
    passengerName: 'Anil Kumar Kulkarni',
    gender: 'Male',
    age: 48,
    mobile: '9822019842',
    email: 'anil.kulkarni@example.com',
    selectedSeats: [1, 2],
    farePerSeat: 480,
    baseFare: 960,
    gst: 48,
    discount: 50,
    couponApplied: 'MAHA50',
    totalFare: 958,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid (Simulated)',
    status: 'CONFIRMED',
    bookedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString()
  },
  {
    pnr: 'SRT-MH-26514',
    busId: 'SRT-PN-SD-01',
    busName: 'Sai Shradha Pilgrim Express Volvo',
    busNumber: 'MH-17-AH-8801',
    origin: 'Pune',
    destination: 'Shirdi',
    travelDate: new Date(Date.now() - 24 * 3600 * 1000 * 3).toISOString().split('T')[0], // 3 days ago
    departureTime: '06:15',
    arrivalTime: '11:45',
    boardingPoint: 'Wakdewadi / Shivaji Nagar - Main Boarding Terminal',
    droppingPoint: 'Sai Baba Temple Gate No. 2 - Sahyadri Terminal',
    passengerName: 'Sunita Ravindra Patil',
    gender: 'Female',
    age: 42,
    mobile: '9850123456',
    email: 'sunita.patil@example.com',
    selectedSeats: [9],
    farePerSeat: 550,
    baseFare: 550,
    gst: 28,
    discount: 0,
    couponApplied: null,
    totalFare: 578,
    paymentMethod: 'Credit Card (RuPay)',
    paymentStatus: 'Paid (Simulated)',
    status: 'COMPLETED',
    bookedAt: new Date(Date.now() - 3600 * 1000 * 80).toISOString()
  }
];

export const VALID_COUPONS = {
  'MAHA50': { discount: 50, minFare: 400, desc: '₹50 flat discount on Maharashtra journeys' },
  'SHIVNERI10': { percentage: 10, maxDiscount: 120, desc: '10% discount up to ₹120 on luxury buses' },
  'PILGRIM100': { discount: 100, minFare: 900, desc: '₹100 flat discount for 2+ pilgrim bookings' },
  'FIRSTTRIP': { discount: 75, minFare: 450, desc: '₹75 welcome bonus on your first demo booking' }
};

