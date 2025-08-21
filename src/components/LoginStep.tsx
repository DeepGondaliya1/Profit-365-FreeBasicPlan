"use client";
import Image from "next/image";
import Link from "next/link";

export default function LoginStep() {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/contact.vcf";
        link.download = "contact.vcf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-md w-full mx-auto bg-[#1e1e1e] bg-opacity-80 backdrop-blur-lg p-8 rounded-xl shadow-2xl space-y-6">
            {/* Step 1 */}
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <Link href="/">
                        <Image
                            src="/Profit-365-logo copy.png"
                            alt="P365 Market Education Logo"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </Link>
                </div>
                <h2 className="text-3xl font-semibold text-white mb-4">Join Our Community</h2>
                <h3 className="text-2xl font-bold text-white mb-4">Step 1</h3>
                <div className="mb-4">
                    <span className="text-white text-sm font-medium">
                        Already have an account?{" "}
                    </span>
                    <a
                        href="https://app.p365marketeducation.com/signin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                    >
                        Log In
                    </a>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                    Sign up for our FREE private broadcast to get free trading insights via WhatsApp or Telegram
                </p>
                <p className="text-sm text-gray-400 mb-4">
                    Save <span className="text-green-400 font-bold">+1 365-9989-385</span> in your contact list to receive our broadcast messages OR click below to save instantly.
                </p>
                <button
                    onClick={handleDownload}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                    Click Me to Import Contact
                </button>
            </div>

            {/* Step 2 */}
            <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Step 2</h3>
                <p className="text-sm text-gray-400 mb-4">
                    Click below on your preferred channels (WhatsApp or Telegram).
                </p>
                <div className="flex flex-col lg:flex-row gap-5 justify-center">
                    <a
                        href="https://wa.me/+13659989385/?text=Hello. I would like to join your Free broadcast."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                        Join WhatsApp
                    </a>
                    <a
                        href="https://t.me/p365education_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Join Telegram
                    </a>
                </div>
            </div>

            {/* Note */}
            <div className="text-center">
                <p className="text-gray-300 text-sm">
                    <span className="text-red-500">Note:</span> If our number is not saved in your contact list, WhatsApp/Telegram will not allow you to receive our broadcast messages.
                </p>
            </div>
        </div>
    );
}