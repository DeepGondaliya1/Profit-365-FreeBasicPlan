import React from "react";

interface SuccessMessageProps {
  preferences: string[];
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ preferences }) => {
  if (preferences.length === 0) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/contact.vcf";
    link.download = "contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-md w-full bg-[#1e1e1e] bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-2xl">
      <h2 className="text-center text-2xl font-bold text-green-400 mb-6">
        Registration Successful!
      </h2>
      {preferences.includes("whatsapp") && (
        <div className="text-center text-gray-300">
          <p className="text-xl font-semibold my-4">Thank you!</p>
          <p className="text-md my-4">
            You have successfully connected with our free broadcast.
          </p>
          <p className="text-md my-4">
            We will share all trading insights from this number
          </p>
          <p className="text-xl font-bold text-green-400 my-4">
            +1 365-9989-385
          </p>
          <p className="text-md my-4">
            You can manually save this number
            <br></br>OR <br></br>
            <ol className="text-center">
              <li>download the contact.vcf file</li>
              <li>import the contact to your Phone contact </li>
              <li>(contact name: P365 Stocks & Crypto). </li>
            </ol>
          </p>
          <button
            onClick={handleDownload}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Click Me to Download Contact
          </button>
        </div>
      )}
      {preferences.includes("telegram") && (
        <div className="text-center text-gray-300">
          <p className="text-md my-4">
            Thank you! You have successfully connected with our free broadcast.
            We will share all trading insights via the link below. Join our
            Telegram group for trading insights
          </p>
          <a
            href="https://t.me/p365education_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Join Telegram Channel
          </a>
        </div>
      )}
    </div>
  );
};

export default SuccessMessage;
