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
                <div className="mb-4 flex items-center justify-center gap-2">
                    <span className="text-white text-sm font-medium">
                        Already have an account?{" "}
                    </span>
                    <a
                        href="https://app.p365marketeducation.com/signin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button
                            className="cursor-pointer relative inline-flex items-center justify-center rounded-[999px] text-white w-[90px] h-[30px] px-2 overflow-hidden before:absolute before:inset-0 before:rounded-full before:border before:border-white/30 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:pointer-events-none"
                            style={
                                {
                                    "--spread": "90deg",
                                    "--shimmer-color": "#ffffff",
                                    "--radius": "999px",
                                    "--speed": "2s",
                                    "--cut": "1px",
                                    "--bg": "linear-gradient(207deg, rgb(255, 90, 0) 20%, rgb(11, 20, 26) 100%)", // Matching orange-600
                                } as React.CSSProperties
                            }
                        >
                            {/* ROTATING BORDER BACKGROUND */}
                            <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
                                <div className="absolute inset-[-100%] rotate-gradient">
                                    <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] rounded-full"></div>
                                </div>
                            </div>

                            {/* BG layer inside the cut area */}
                            <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)] z-0"></div>

                            {/* CONTENT */}
                            <span className="z-10 text-sm h-max mb-1 p-0">Log In</span>
                        </button>
                    </a>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                    Sign up for our FREE private broadcast to get free market insights via WhatsApp or Telegram
                </p>
                <p className="text-sm text-gray-400 mb-4">
                    Save <span className="text-green-400 font-bold">+1 (365) 998-9385</span> in your contact list to receive our broadcast messages OR click below to save instantly.
                </p>
                <button
                    onClick={handleDownload}
                    className="cursor-pointer relative flex items-center justify-center rounded-[999px] text-white w-full py-2 px-4 overflow-hidden before:absolute before:inset-0 before:rounded-full before:border before:border-white/30 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:pointer-events-none"
                    style={
                        {
                            "--spread": "90deg",
                            "--shimmer-color": "#ffffff",
                            "--radius": "999px",
                            "--speed": "2s",
                            "--cut": "1px",
                            "--bg": "linear-gradient(207deg, rgb(16, 185, 129) 20%, rgb(11, 20, 26) 100%)", // Matching green-500
                        } as React.CSSProperties
                    }
                >
                    {/* ROTATING BORDER BACKGROUND */}
                    <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
                        <div className="absolute inset-[-100%] rotate-gradient">
                            <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] rounded-full"></div>
                        </div>
                    </div>

                    {/* BG layer inside the cut area */}
                    <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)] z-0"></div>

                    {/* CONTENT */}
                    <span className="z-10 text-sm font-medium">Click Me to Import Contact</span>
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
                    >
                        <button
                            className="cursor-pointer relative flex items-center justify-center rounded-[999px] text-white w-full   py-2 px-4 overflow-hidden before:absolute before:inset-0 before:rounded-full before:border before:border-white/30 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:pointer-events-none"
                            style={
                                {
                                    "--spread": "90deg",
                                    "--shimmer-color": "#ffffff",
                                    "--radius": "999px",
                                    "--speed": "2s",
                                    "--cut": "1px",
                                    "--bg": "linear-gradient(207deg, rgb(16, 185, 129) 20%, rgb(11, 20, 26) 100%)", // Matching green-500
                                } as React.CSSProperties
                            }
                        >
                            {/* ROTATING BORDER BACKGROUND */}
                            <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
                                <div className="absolute inset-[-100%] rotate-gradient">
                                    <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] rounded-full"></div>
                                </div>
                            </div>

                            {/* BG layer inside the cut area */}
                            <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)] z-0"></div>

                            {/* CONTENT */}
                            <span className="z-10 text-sm font-medium">Join WhatsApp</span>
                        </button>
                    </a>
                    <a
                        href="https://t.me/p365education_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button
                            className="cursor-pointer relative flex items-center justify-center rounded-[999px] text-white w-full  py-2 px-4 overflow-hidden before:absolute before:inset-0 before:rounded-full before:border before:border-white/30 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:pointer-events-none"
                            style={
                                {
                                    "--spread": "90deg",
                                    "--shimmer-color": "#ffffff",
                                    "--radius": "999px",
                                    "--speed": "2s",
                                    "--cut": "1px",
                                    "--bg": "linear-gradient(207deg, rgb(59, 130, 246) 20%, rgb(11, 20, 26) 100%)", // Matching blue-500
                                } as React.CSSProperties
                            }
                        >
                            {/* ROTATING BORDER BACKGROUND */}
                            <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
                                <div className="absolute inset-[-100%] rotate-gradient">
                                    <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] rounded-full"></div>
                                </div>
                            </div>

                            {/* BG layer inside the cut area */}
                            <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)] z-0"></div>

                            {/* CONTENT */}
                            <span className="z-10 text-sm font-medium">Join Telegram</span>
                        </button>
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