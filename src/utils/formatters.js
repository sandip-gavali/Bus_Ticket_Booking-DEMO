// Helper formatters for Indian currency, dates, times, and phone numbers

export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDateIndian = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export const formatTime12h = (time24) => {
  if (!time24) return '';
  // handles format like "22:30" or "06:15"
  const [hourStr, minStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const minutes = minStr || '00';
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // 0 becomes 12
  return `${String(hour).padStart(2, '0')}:${minutes} ${ampm}`;
};

export const calculateDuration = (depTime, arrTime) => {
  if (!depTime || !arrTime) return '5h 30m';
  const [h1, m1] = depTime.split(':').map(Number);
  const [h2, m2] = arrTime.split(':').map(Number);
  
  let totalMin1 = h1 * 60 + m1;
  let totalMin2 = h2 * 60 + m2;
  
  if (totalMin2 < totalMin1) {
    // Crosses midnight
    totalMin2 += 24 * 60;
  }
  
  const diff = totalMin2 - totalMin1;
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  return `${hours}h ${mins > 0 ? mins + 'm' : '00m'}`;
};

// Generate realistic PNR / Booking ID
export const generatePNR = () => {
  const letters = 'SRT';
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${letters}-MH-${year % 100}${randomNum}`;
};

