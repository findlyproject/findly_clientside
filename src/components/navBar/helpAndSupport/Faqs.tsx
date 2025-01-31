
"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";


interface FAQItem{
    question:string,
    answer:string

}
const Faqs = () => {
    

const [openIndex, setOpenIndex] = useState<number|null>(null);
const faqs :FAQItem[] = [
    {
      question: "How can I reset my password?",
      answer:
        "To reset your password, go to the login page and click on the 'Forgot password' link. Enter the email address associated with your account, and you will receive an email with instructions on how to reset your password. Follow the instructions in the email to create a new password.",
    },
    { question: "Which is a safe investment?", answer: "Safe investments include bonds, index funds, and diversified portfolios." },
    { question: "Which is better, short term or long term?", answer: "It depends on your financial goals and risk tolerance." },
    { question: "How many percent return in long term?", answer: "Long-term investments generally yield 7-10% annually on average." },
    { question: "How many percent return in short term?", answer: "Short-term returns vary widely and depend on market conditions." },
    { question: "How do I delete my account?", answer: "To delete your account, go to settings and follow the account deletion process." },
  ];
  return (
<div className="max-w-4xl mx-auto p-6 h-full bg-white shadow-md rounded-lg">
      <h3 className="text-indigo-600 text-sm font-semibold">MOST ASKED QUESTIONS</h3>
      <h2 className="text-3xl font-bold mb-4">FAQs</h2>
      <p className="text-gray-600 mb-6">
        Trusted in more than 100 countries and 5 million customers. Transact easily and quickly with just one click.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/779/438/non_2x/website-faq-section-user-help-desk-customer-support-concept-illustration-flat-vector.jpg"
            alt="Business woman"
            className="rounded-lg"
          />
        </div>
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b py-3">
              <button
                className="w-full flex justify-between items-center text-left font-medium text-gray-800"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faqs
