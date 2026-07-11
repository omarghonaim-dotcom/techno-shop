'use client';

import React, { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  orderNumber: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    orderNumber: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // TODO: Replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);

      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        orderNumber: '',
        message: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir="ltr" className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 pb-2 inline-block border-b-4 border-purple-600">
            Contact Us
          </h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-7">
          You can fill out the form below to ask your questions or submit an inquiry
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Order Number */}
            <div>
              <label htmlFor="orderNumber" className="block text-sm text-gray-700 mb-2">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {submitSuccess && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
              Your message has been sent successfully
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Address Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Address:</h2>
          <p className="text-gray-600 text-sm leading-6">
            Tehran, Valiasr Street, above Saei Park, No. 22, Unit 12
          </p>
        </div>

        {/* Map */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-sm">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=51.38%2C35.70%2C51.42%2C35.73&layer=mapnik"
            width="100%"
            height="250"
            style={{ border: 0 }}
            loading="lazy"
            title="Location Map"
          />
        </div>

        {/* After-Sales Service Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-3">After-Sales Service:</h2>
          <div className="text-gray-600 text-sm leading-7">
            <p>For product warranty inquiries and after-sales service, call us from 9 AM to 6 PM at</p>
            <p>021-12345678</p>
          </div>
        </div>

        {/* Response Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Support:</h2>
          <div className="text-gray-600 text-sm leading-7 space-y-1">
            <p>Our support and complaints team is available from 8 AM to 8 PM, every day of the week</p>
            <div className="flex flex-col gap-1">
              <span>021-98765432</span>
              <span>021-98765433</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}