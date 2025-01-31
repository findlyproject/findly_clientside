
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "1. How do I create an account on Findly?",
    answer:
      "You can create an account by clicking on the Sign Up button, filling in your details, and verifying your email. Once registered, you can upload your resume and start applying for jobs.",
  },
  {
    question: "2. Is it free to apply for jobs?",
    answer:
      "Yes! Job seekers can browse and apply for jobs for free on Findly",
  },
  {
    question: "3. How can I upload my resume?",
    answer:
      "After logging in, go to Profile > Upload Resume, and choose a PDF or DOC file to upload.",
  },
  {
    question: "4. How do I track my job applications?",
    answer:
      "You can track your applications by visiting the My Applications section in your dashboard. You’ll see the status of each job you applied for.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col h-screen justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
        
          <div className="w-full lg:w-1/2">
            <img
              src="https://pagedone.io/asset/uploads/1696230182.png"
              alt="FAQ section"
              className="w-96 rounded-xl object-cover"
            />
          </div>

         
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-primarymb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  Looking for answers?
                </h2>
              </div>

       
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex justify-between items-center w-full text-left text-xl font-medium text-gray-700 hover:text-primary transition-all duration-300"
                    >
                      {faq.question}
                      <ChevronDown
                        size={22}
                        className={`transition-transform ${
                          openIndex === index ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <p className="text-base text-gray-600 mt-2">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
