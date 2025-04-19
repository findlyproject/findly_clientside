import React, { useState } from "react";
interface SectionProps  {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
 
};

interface FqProps{
  question:string;
  answer:string;
}
export default function TermsAndPolicy() {
  const [openSection, setOpenSection] = useState<string|null>(null);

  const toggleSection = (section:string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto rounded-2xl p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms and Policy</h1>

        <div className="space-y-4">
          {/* Terms of Service */}
          <Section 
            title="Terms of Service" 
            isOpen={openSection === "terms"} 
            toggle={() => toggleSection("terms")} 
          >
            <p>Welcome to Findly! By using our platform, you agree to our terms and conditions.</p>
            <ul className="mt-2 list-disc list-inside">
              <li>Users must provide accurate and truthful information.</li>
              <li>Accounts are personal and cannot be shared.</li>
              <li>Prohibited activities include fraud, harassment, and unauthorized data extraction.</li>
              <li>Employers must ensure job postings comply with all relevant regulations.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
            </ul>
          </Section>

          {/* Privacy Policy */}
          <Section 
            title="Privacy Policy" 
            isOpen={openSection === "privacy"} 
            toggle={() => toggleSection("privacy")} 
          >
            <p>We value your privacy. Findly collects and protects your personal data responsibly.</p>
            <ul className="mt-2 list-disc list-inside">
              <li>Data collected includes name, email, phone number, and employment details.</li>
              <li>Personal data is used solely for platform functionality and improving user experience.</li>
              <li>We implement industry-standard security measures to protect your data.</li>
              <li>Users can update or delete their personal information from profile settings.</li>
              <li>We do not sell or share personal data with third parties without user consent.</li>
            </ul>
          </Section>

          {/* Changes to Terms and Policy */}
          <Section 
            title="Changes to Terms and Policy" 
            isOpen={openSection === "changes"} 
            toggle={() => toggleSection("changes")} 
          >
            <p>Findly reserves the right to update these terms and policies at any time.</p>
            <ul className="mt-2 list-disc list-inside">
              <li>Changes will be communicated via email or platform alerts.</li>
              <li>It is the user’s responsibility to review updates regularly.</li>
              <li>Continued use of the platform signifies acceptance of updated terms and policies.</li>
              <li>Major updates will include a summary of key changes for better transparency.</li>
            </ul>
          </Section>

          {/* FAQ Section */}
          <Section 
            title="Frequently Asked Questions" 
            isOpen={openSection === "faq"} 
            toggle={() => toggleSection("faq")} 
          >
            <div className="space-y-4">
              <FAQItem 
                question="What is Findly?" 
                answer="Findly is a platform that connects job seekers with employers and streamlines job searching and hiring." 
              />
              <FAQItem 
                question="Can I share my account with someone else?" 
                answer="No, each account is personal and should not be shared." 
              />
              <FAQItem 
                question="What if I forget my password?" 
                answer="You can reset your password through the 'Forgot Password' option on the login page." 
              />
              <FAQItem 
                question="How do I delete my account?" 
                answer="Contact our support team or go to your profile settings to request account deletion." 
              />
            </div>
          </Section>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Findly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, isOpen, toggle, children }:SectionProps) {
  return (
    <div className="border rounded-lg shadow-sm">
      <button
        className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-semibold focus:outline-none"
        onClick={toggle}
      >
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && <div className="px-4 pb-4 text-gray-600">{children}</div>}
    </div>
  );
}

function FAQItem({ question, answer }:FqProps) {
  return (
    <div className="border-b pb-2">
      <p className="font-semibold text-gray-800">{question}</p>
      <p className="text-gray-600 text-sm">{answer}</p>
    </div>
  );
}
