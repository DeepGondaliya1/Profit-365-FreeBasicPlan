"use client";

import { useState, useRef, ReactNode } from "react";
import Image from "next/image";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import Mailcheck from "mailcheck";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface LoginFormProps {
  setSuccessPreferences: (preferences: string[]) => void;
}
interface mailSuggestion {
  full: string;
}
export default function LoginForm({ setSuccessPreferences }: LoginFormProps) {
  const customPhoneStyles = `
      .react-tel-input {
          margin-top: 4px !important;
      }

      .form-control {
          padding-top: 0.9rem !important;
          padding-bottom: 0.9rem !important;
          font-size: 16px !important;
          width: 100% !important;
          color: #ffffff !important;
          border: 1px solid #4b5563 !important;
          background-color: #2a2a2a !important;
          box-sizing: border-box !important;
          height: 42px !important;
      }

      .form-controt:focus {
          outline: none;
          box-shadow: 0 0 0 2px #f97316 !important;
      }


      .flag-dropdown {
          color: #ffffff !important;
          border: none !important;
          height: 38px !important;
          margin: auto 0 auto 2px !important;
          background-color: #2a2a2a !important;
      }

      .search-emoji {
          display: none;
      }

      .react-tel-input .country-list .search-box {
          width: 90%;
          padding: 5px;
      }

      .flag-dropdown,
      .form-control,
      .country-list,
      .search,
      .react-tel-input .flag-dropdown.open .selected-flag,
      .react-tel-input .selected-flag:hover {
          background: #2a2a2a !important;
      }


      .react-tel-input .country-list .country.highlight,
      .react-tel-input .country-list .country:hover,
      .react-tel-input .selected-flag:focus {
          background: #1E2939 !important;
      }

      .react-tel-input .country-list .country .dial-code {
          color: #c2c2c2ff
      }

      .country-list {
          scrollbar-width: none;
          -ms-overflow-style: none;
          overflow-y: auto;
      }

      .country-list::-webkit-scrollbar {
          display: none;
      }
`;

  const router = useRouter();
  const initialFormData = {
    preferredName: "",
    email: "",
    whatsappNumber: "",
    preferences: [] as string[],
    telegramId: "",
  };
  const popularEmailDomains = [
    // Google
    "gmail.com",
    "googlemail.com",

    // Yahoo
    "yahoo.com",
    "ymail.com",
    "rocketmail.com",

    // Microsoft
    "outlook.com",
    "hotmail.com",
    "live.com",
    "msn.com",

    // Apple
    "icloud.com",
    "me.com",
    "mac.com",
  ] as string[];

  const popularTopLevelDomains = [
    "com",
    "net",
    "org",
    "co",
    "io",
    "edu",
    "edu.in",
    "gov",
    "me",
    "in",
    "uk",
    "ru",
  ] as string[];

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | ReactNode | null>(null);
  const [emailSuggestion, setEmailSuggestion] = useState<{
    suggestionStr: string;
    suggestedMail: string;
  } | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmailTypo = async () => {
    const suggestion = await new Promise<string | null>((resolve) => {
      Mailcheck.run({
        email: formData.email,
        domains: popularEmailDomains,
        topLevelDomains: popularTopLevelDomains,
        suggested: (suggestion: mailSuggestion) => {
          resolve(suggestion.full);
        },
        empty: () => {
          resolve(null);
        },
      });
    });

    if (suggestion && suggestion !== formData.email) {
      setEmailSuggestion({
        suggestionStr: `Did you mean ${suggestion}?`,
        suggestedMail: suggestion,
      });
    } else {
      setEmailSuggestion(null);
    }
  };

  const handlePhoneChange = (value: string) => {
    const formattedNumber = value.startsWith("+") ? value : `+${value}`;
    setFormData((prev) => ({
      ...prev,
      whatsappNumber: formattedNumber,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const newPreferences = checked
          ? [...prev.preferences, value]
          : prev.preferences.filter((pref) => pref !== value);
        return { ...prev, preferences: newPreferences };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (type === "email") {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      debounceTimeout.current = setTimeout(() => {
        validateEmailTypo();
      }, 600);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSuccessPreferences([]);

    // Validate required fields
    if (!formData.email || !formData.whatsappNumber) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Validate preferences
    if (formData.preferences.length === 0) {
      setError("Please select at least one contact method.");
      setLoading(false);
      return;
    }

    // if (formData.preferences.includes("telegram") && !formData.telegramId) {
    //   setError("Telegram ID is required when Telegram is selected.");
    //   setLoading(false);
    //   return;
    // }

    // Determine channelPreference
    let channelPreference: "whatsapp" | "telegram" | "both";
    if (
      formData.preferences.includes("whatsapp") &&
      formData.preferences.includes("telegram")
    ) {
      channelPreference = "both";
    } else if (formData.preferences.includes("whatsapp")) {
      channelPreference = "whatsapp";
    } else if (formData.preferences.includes("telegram")) {
      channelPreference = "telegram";
    } else {
      setError("Invalid contact method selection.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriptions/free-plan-signup`,
        {
          preferredName: formData.preferredName,
          email: formData.email,
          phoneNumber: formData.whatsappNumber,
          channelPreference,
          telegramId:
            channelPreference !== "whatsapp" ? formData.telegramId : "",
        }
      );

      if (response.data.message === "Free subscription created successfully") {
        setSuccessPreferences(formData.preferences); // Store preferences for success message
        setFormData(initialFormData); // Reset form data
      } else {
        setError("Failed to create subscription. Please try again.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (
          err.response?.data?.message ===
          "A user with this email or phone number already exists. Please sign in to manage your subscription."
        ) {
          //Here I have To Render Error With Link TO Sign in
          setError(
            <span>
              A user with this email or phone number already exists.{" "}
              <a
                href="https://app.profit365.com/sign-in"
                className="text-white underline hover:text-emerald-400"
                target="_blank"
              >
                Sign in
              </a>{" "}
              to your dashboard.
            </span>
          );
          return;
        }
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{customPhoneStyles}</style>
      <div className="max-w-md w-full space-y-8 bg-[#1e1e1e] bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-2xl">
        <div className="flex justify-center">
          <Image
            src="/Profit-365-logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <h2 className="text-center text-3xl font-bold text-white">
          Join Our Community
        </h2>
        <p className="text-center text-sm text-gray-400">
          Sign up for our FREE private broadcast to get free trading insights
          via WhatsApp or Telegram
        </p>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="preferredName"
                className="block text-sm font-medium text-gray-300"
              >
                Preferred Name (Optional)
              </label>
              <input
                id="preferredName"
                name="preferredName"
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your preferred name"
                value={formData.preferredName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {emailSuggestion && (
                <p
                  className="text-sm text-red-400 mt-1 cursor-pointer"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      email: emailSuggestion.suggestedMail,
                    });
                    setEmailSuggestion(null);
                  }}
                >
                  {emailSuggestion.suggestionStr}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="whatsappNumber"
                className="block text-sm font-medium text-gray-300"
              >
                WhatsApp Number
              </label>
              <PhoneInput
                placeholder="Enter your WhatsApp number"
                value={formData.whatsappNumber}
                onChange={handlePhoneChange}
                enableSearch={true}
                countryCodeEditable={false}
                country="us"
                inputProps={{
                  name: "whatsappNumber",
                  id: "whatsappNumber", // Applies to internal <input>
                  required: true,
                  autoComplete: "tel",
                }}
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
                    checked={formData.preferences.includes("whatsapp")}
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
                    checked={formData.preferences.includes("telegram")}
                    onChange={handleChange}
                    className="form-checkbox text-orange-500 focus:ring-orange-500 h-6 w-6"
                  />
                  <FaTelegram className="text-blue-500 text-xl" />
                  <span className="text-gray-300">Telegram</span>
                </label>
              </div>
            </div>

            {/* {formData.preferences.includes("telegram") && (
              <div>
                <label
                  htmlFor="telegramId"
                  className="block text-sm font-medium text-gray-300"
                >
                  Telegram ID
                </label>
                <input
                  id="telegramId"
                  name="telegramId"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="@youruserId"
                  value={formData.telegramId}
                  onChange={handleChange}
                  required
                />
                <p className="mt-1 text-sm text-gray-400">
                  Need help finding your Telegram ID?{" "}
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
            )} */}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Join For Free"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
