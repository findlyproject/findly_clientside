import React, { useState } from 'react';

export default function TermsAndPolicy() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 ">Terms and Policy</h1>

        <div className="space-y-4">
          {/* Terms of Service */}
          <div className="border rounded-lg shadow-sm">
            <button 
              className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-semibold focus:outline-none"
              onClick={() => toggleSection('terms')}
            >
              <span>Terms of Service</span>
              <svg
                className={`w-5 h-5 transition-transform ${openSection === 'terms' ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {openSection === 'terms' && (
              <div className="px-4 pb-4 text-gray-600">
                <p className="leading-relaxed">
                  Welcome to Findly! By using our platform, you agree to our terms and conditions. We provide a seamless experience for job seekers, employers, and administrators.
                </p>
                <p className="mt-2 leading-relaxed">
                  Ensure accuracy in your profile information and maintain account security. Misuse of the platform may result in account suspension.
                </p>
              </div>
            )}
          </div>

          {/* Privacy Policy */}
          <div className="border rounded-lg shadow-sm">
            <button 
              className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-semibold focus:outline-none"
              onClick={() => toggleSection('privacy')}
            >
              <span>Privacy Policy</span>
              <svg
                className={`w-5 h-5 transition-transform ${openSection === 'privacy' ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {openSection === 'privacy' && (
              <div className="px-4 pb-4 text-gray-600">
                <p className="leading-relaxed">
                  We value your privacy. Findly collects and protects your personal data responsibly. We only collect necessary information to provide our services effectively.
                </p>
                <p className="mt-2 leading-relaxed">
                  You have control over your data and can update your personal information at any time from your profile settings.
                </p>
              </div>
            )}
          </div>

          {/* Changes to Terms and Policy */}
          <div className="border rounded-lg shadow-sm">
            <button 
              className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-semibold focus:outline-none"
              onClick={() => toggleSection('changes')}
            >
              <span>Changes to Terms and Policy</span>
              <svg
                className={`w-5 h-5 transition-transform ${openSection === 'changes' ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {openSection === 'changes' && (
              <div className="px-4 pb-4 text-gray-600">
                <p className="leading-relaxed">
                  Findly reserves the right to update these terms and policies at any time. Users will be notified of significant changes.
                </p>
                <p className="mt-2 leading-relaxed">
                  Continued use of the platform signifies acceptance of the updated terms and policies.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Findly. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
