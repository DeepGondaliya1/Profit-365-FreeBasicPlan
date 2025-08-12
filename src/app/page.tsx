"use client";

import { useState, useEffect, useRef } from "react";
import LoginForm from "@/components/LoginForm";
import SuccessMessage from "@/components/SuccessMessage";

export default function Home() {
  const [successPreferences, setSuccessPreferences] = useState<string[]>([]);
  const successMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (successPreferences.length > 0 && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [successPreferences]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gap-3">
      <div className="w-full max-w-md relative z-10">
        <LoginForm setSuccessPreferences={setSuccessPreferences} />
      </div>
      <div
        className="w-full max-w-md mt-8 relative z-10"
        ref={successMessageRef}
        id="success-message"
      >
        <SuccessMessage preferences={successPreferences} />
      </div>
    </div>
  );
}
