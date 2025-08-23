// pages/become-a-lender.js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const BecomeALender = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    cnic: '',
    cnicFront: null,
    cnicBack: null,
    profilePhoto: null,
    
    // Business Information
    businessName: '',
    businessType: '',
    businessAddress: '',
    city: '',
    
    // Bank Details
    bankName: '',
    accountTitle: '',
    accountNumber: '',
    iban: '',
    
    // Terms
    agreeToTerms: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/auth?redirect=/become-a-lender&type=lender');
    }
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user type to lender (pending approval)
      // In a real app, you would make an API call here
      console.log('Lender application submitted:', formData);
      
      // Show success message
      alert('Your lender application has been submitted successfully! We will review your application and contact you soon.');
      
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Become a Lender - Closet on Wheels</title>
        <meta name="description" content="Apply to become a lender on our platform" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2">Become a Lender</h1>
        <p className="text-gray-600 text-center mb-8">Complete the form below to start renting out your items</p>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <div className={`text-sm font-medium ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-500'}`}>Personal Info</div>
            <div className={`text-sm font-medium ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-500'}`}>Business Info</div>
            <div className={`text-sm font-medium ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-500'}`}>Bank Details</div>
            <div className={`text-sm font-medium ${currentStep >= 4 ? 'text-purple-600' : 'text-gray-500'}`}>Review</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="cnic" className="block text-sm font-medium text-gray-700 mb-1">CNIC Number *</label>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleInputChange}
                    required
                    placeholder="XXXXX-XXXXXXX-X"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cnicFront" className="block text-sm font-medium text-gray-700 mb-1">CNIC Front Photo *</label>
                  <input
                    type="file"
                    id="cnicFront"
                    name="cnicFront"
                    onChange={handleInputChange}
                    required
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="cnicBack" className="block text-sm font-medium text-gray-700 mb-1">CNIC Back Photo *</label>
                  <input
                    type="file"
                    id="cnicBack"
                    name="cnicBack"
                    onChange={handleInputChange}
                    required
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          )}
          
          {/* Step 2: Business Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Business Information</h2>
              
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border极速加速器-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Business Type</option>
                  <option value="individual">Individual</option>
                  <option value="partnership">Partnership</option>
                  <option value="corporation">Corporation</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-1">Business Address *</label>
                <textarea
                  id="businessAddress"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select City</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                  <option value="rawalpindi">Rawalpindi</option>
                  <option value="peshawar">Peshawar</option>
                  <option value="quetta">Quetta</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Step 3: Bank Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
              
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="accountTitle" className="block text-sm font-medium text-gray-700 mb-1">Account Title *</label>
                <input
                  type="text"
                  id="accountTitle"
                  name="accountTitle"
                  value={formData.accountTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">Account Number *</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="iban" className="block text-sm font-medium text-gray-700 mb-1">IBAN *</label>
                <input
                  type="text"
                  id="iban"
                  name="iban"
                  value={formData.iban}
                  onChange={handleInputChange}
                  required
                  placeholder="PKXX XXXX XXXX XXXX XXXX XXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          )}
          
          {/* Step 4: Review and Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">Personal Information</h3>
                <p><span className="text-gray-600">Name:</span> {formData.fullName}</p>
                <p><span className="text-gray-600">Email:</span> {formData.email}</p>
                <p><span className="text-gray-600">Phone:</span> {formData.phone}</p>
                <p><span className="text-gray-600">CNIC:</span> {formData.cnic}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">Business Information</h3>
                <p><span className="text-gray-600">Business Name:</span> {formData.businessName}</p>
                <p><span className="text-gray-600">Business Type:</span> {formData.businessType}</p>
                <p><span className="text-gray-600">Address:</span> {formData.businessAddress}</p>
                <p><span className="text-gray-600">City:</span> {formData.city}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">Bank Details</h3>
                <p><span className="text-gray-600">Bank Name:</span> {formData.bankName}</p>
                <p><span className="text-gray-600">Account Title:</span> {formData.accountTitle}</p>
                <p><span className="text-gray-600">Account Number:</span> {formData.accountNumber}</p>
                <p><span className="text-gray-600">IBAN:</span> {formData.iban}</p>
              </div>
              
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="text-purple-600 hover:text-purple-500">Terms and Conditions</a> and confirm that all information provided is accurate.
                </label>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeToTerms}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default BecomeALender;