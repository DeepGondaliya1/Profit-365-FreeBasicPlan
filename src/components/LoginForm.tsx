'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface LoginFormProps {
  setSuccessPreferences: (preferences: string[]) => void;
}

export default function LoginForm({ setSuccessPreferences }: LoginFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsappNumber: '',
    preferences: [] as string[],
    telegramId: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => {
        const newPreferences = checked
          ? [...prev.preferences, value]
          : prev.preferences.filter((pref) => pref !== value);
        return { ...prev, preferences: newPreferences };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccessPreferences([]);

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.whatsappNumber) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    // Validate preferences
    if (formData.preferences.length === 0) {
      setError('Please select at least one contact method.');
      setLoading(false);
      return;
    }

    if (formData.preferences.includes('telegram') && !formData.telegramId) {
      setError('Telegram ID is required when Telegram is selected.');
      setLoading(false);
      return;
    }

    // Determine channelPreference
    let channelPreference: 'whatsapp' | 'telegram' | 'both';
    if (formData.preferences.includes('whatsapp') && formData.preferences.includes('telegram')) {
      channelPreference = 'both';
    } else if (formData.preferences.includes('whatsapp')) {
      channelPreference = 'whatsapp';
    } else if (formData.preferences.includes('telegram')) {
      channelPreference = 'telegram';
    } else {
      setError('Invalid contact method selection.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/free-plan-signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.whatsappNumber,
        channelPreference,
        telegramId: channelPreference !== 'whatsapp' ? formData.telegramId : '',
      });

      if (response.data.message === 'Free subscription created successfully') {
        setSuccessPreferences(formData.preferences); // Store preferences for success message
      } else {
        setError('Failed to create subscription. Please try again.');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
      <div className="flex justify-center">
        <Image
          src="/Profit-365-logo.png"
          alt="Logo"
          width={80}
          height={70}
          className="object-contain"
        />
      </div>
      <h2 className="text-center text-3xl font-bold text-white">Join Our Community</h2>
      <p className="text-center text-sm text-gray-400">
        Sign up for our Monthly Basic plan to receive free trading signals via WhatsApp or Telegram
      </p>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-300">
              WhatsApp Number
            </label>
            <input
              id="whatsappNumber"
              name="whatsappNumber"
              type="tel"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your WhatsApp number"
              value={formData.whatsappNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Contact Method
            </span>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="preferences"
                  value="whatsapp"
                  checked={formData.preferences.includes('whatsapp')}
                  onChange={handleChange}
                  className="form-checkbox text-orange-500 focus:ring-orange-500 h-6 w-6"
                />
                <FaWhatsapp className="text-green-500 text-xl" />
                <span className="text-gray-300">WhatsApp</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="preferences"
                  value="telegram"
                  checked={formData.preferences.includes('telegram')}
                  onChange={handleChange}
                  className="form-checkbox text-orange-500 focus:ring-orange-500 h-6 w-6"
                />
                <FaTelegram className="text-blue-500 text-xl" />
                <span className="text-gray-300">Telegram</span>
              </label>
            </div>
          </div>
          {formData.preferences.includes('telegram') && (
            <div>
              <label htmlFor="telegramId" className="block text-sm font-medium text-gray-300">
                Telegram ID
              </label>
              <input
                id="telegramId"
                name="telegramId"
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="@youruserId"
                value={formData.telegramId}
                onChange={handleChange}
                required
              />
              <p className="mt-1 text-sm text-gray-400">
                Need help finding your Telegram ID?{' '}
                <a
                  href="https://medium.com/block-bastards/how-to-find-your-user-id-on-telegram-a27cb7b732d6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  Learn how
                </a>
              </p>
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Join Free Plan'}
          </button>
        </div>
      </form>
    </div>
  );
}