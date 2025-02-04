"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function QuestionPage() {
  const router = useRouter();

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/register/namepage/educationpage/questionpage/jobpage`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-gray-800 font-semibold text-2xl text-center mb-6">
          Are you looking for a job?
        </h1>

        <div className="w-full flex flex-col items-center">
          <form className="space-y-4 w-full max-w-md">
            <div className="flex items-center space-x-2 p-3 w-full border border-transparent rounded-md hover:border-primary hover:ring-2 hover:ring-primary transition duration-200">
              <input
                type="radio"
                id="radioOption1"
                name="radioGroup"
                className="w-5 h-5 text-primary border-gray-300"
              />
              <label htmlFor="radioOption1" className="text-gray-700 font-medium">
                Yes, I'm actively looking for a new job
              </label>
            </div>

            <div className="flex items-center space-x-2 p-3 w-full border border-transparent rounded-md hover:border-primary hover:ring-2 hover:ring-primary transition duration-200">
              <input
                type="radio"
                id="radioOption2"
                name="radioGroup"
                className="w-5 h-5 text-primary border-gray-300"
              />
              <label htmlFor="radioOption2" className="text-gray-700 font-medium">
                Not really, but would consider the right opportunity
              </label>
            </div>

            <div className="flex items-center space-x-2 p-3 w-full border border-transparent rounded-md hover:border-primary hover:ring-2 hover:ring-primary transition duration-200">
              <input
                type="radio"
                id="radioOption3"
                name="radioGroup"
                className="w-5 h-5 text-primary border-gray-300"
              />
              <label htmlFor="radioOption3" className="text-gray-700 font-medium">
                No, I'm not interested in any job opportunity
              </label>
            </div>

            <div className="w-full flex justify-center mt-4">
              <button
                className="w-full py-2 bg-primary text-white font-semibold rounded-full  focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
