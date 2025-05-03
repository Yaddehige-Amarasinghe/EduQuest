import React, { useState, useEffect } from 'react';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import "./payment.css";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState('');

 
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  
  useEffect(() => {
    const cardNumber = formData.cardNumber.replace(/\s+/g, '');
    
    if (/^4/.test(cardNumber)) {
      setCardType('visa');
    } else if (/^5[1-5]/.test(cardNumber)) {
      setCardType('mastercard');
    } else if (/^3[47]/.test(cardNumber)) {
      setCardType('amex');
    } else if (/^(6011|65|64[4-9])/.test(cardNumber)) {
      setCardType('discover');
    } else {
      setCardType('');
    }
  }, [formData.cardNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
   
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
   
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNumber = formData.cardNumber.replace(/\s+/g, '');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 1-12
    const currentYear = currentDate.getFullYear() % 100; // 2-digit year
    
    
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    
    if (formData.cardHolder.trim().length < 3) {
      newErrors.cardHolder = 'Please enter a valid name';
    }
    
    
    if (formData.expiryDate) {
      const [month, year] = formData.expiryDate.split('/');
      const expMonth = parseInt(month, 10);
      const expYear = parseInt(year, 10);
      
      if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
        newErrors.expiryDate = 'Invalid expiry date';
      } else if ((expYear < currentYear) || (expYear === currentYear && expMonth < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    } else {
      newErrors.expiryDate = 'Expiry date is required';
    }
    
    
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (type, message) => {
    setPopupType(type);
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber: formData.cardNumber.replace(/\s+/g, ''),
          cardHolderName: formData.cardHolder,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
          emailAddress: formData.email,
        })
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 200) {
        showNotification('success', 'Payment successfully processed!');
      
        setFormData({
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: '',
          email: ''
        });
      } else {
        showNotification('error', data.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      showNotification('error', 'Error connecting to payment server. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {showPopup && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
          popupType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {popupType === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{popupMessage}</span>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">Payment Details</h2>
          <div className="flex items-center text-indigo-100 text-sm">
            <Lock size={14} className="mr-1" />
            <span>Secure Payment Processing</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CreditCard size={24} className="text-gray-400 mr-2" />
              <span className="text-gray-600 font-medium">Credit Card Payment</span>
            </div>
            
          
            <div className="flex space-x-2">
              <div className={`w-12 h-8 rounded border flex items-center justify-center ${cardType === 'visa' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 opacity-50'}`}>
                <span className={`font-bold text-sm ${cardType === 'visa' ? 'text-blue-600' : 'text-gray-400'}`}>VISA</span>
              </div>
              <div className={`w-12 h-8 rounded border flex items-center justify-center ${cardType === 'mastercard' ? 'border-red-500 bg-red-50' : 'border-gray-200 opacity-50'}`}>
                <span className={`font-bold text-sm ${cardType === 'mastercard' ? 'text-red-600' : 'text-gray-400'}`}>MC</span>
              </div>
              <div className={`w-12 h-8 rounded border flex items-center justify-center ${cardType === 'amex' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 opacity-50'}`}>
                <span className={`font-bold text-xs ${cardType === 'amex' ? 'text-blue-600' : 'text-gray-400'}`}>AMEX</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.cardNumber ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                required
              />
              {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
            </div>
            
            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                placeholder="John Doe"
                value={formData.cardHolder}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.cardHolder ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                required
              />
              {errors.cardHolder && <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  maxLength="5"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                    errors.expiryDate ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  required
                />
                {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  placeholder="•••"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  maxLength="4"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                    errors.cvv ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  required
                />
                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </div>
              ) : 'Pay Now'}
            </button>
            
            <div className="text-center mt-4 text-sm text-gray-500 flex items-center justify-center">
              <Lock size={14} className="mr-1" />
              <span>Your payment information is secured with 256-bit encryption</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;