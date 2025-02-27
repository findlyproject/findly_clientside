"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
const ContactUs: React.FC = () => {
  const router=useRouter()
 const activeCompany = useAppSelector((state) => state.companyLogin.activeCompany)
    const route=activeCompany?"company":"user"
 
  return (
    
    <section className="w-full xl:py-24 lg:py-20 py-12  border-b border-gray-300 font-inter">
      <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-1 grid-cols-1 gap-x-16 xl:gap-x-24 gap-y-14 max-w-lg md:max-w-3xl lg:max-w-full mx-auto">
          
          <div>
            <h1 className="font-manrope text-gray-900 md:text-5xl text-4xl font-bold leading-tight mb-8 lg:text-left text-center">
              Contact Us
            </h1>
            <p className="text-gray-900 text-lg font-normal leading-7 lg:text-left text-center">
              We are here to assist you! Whether you have questions, feedback, or
              inquiries, our team is ready to help.
            </p>

            
            <div className="my-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-8 gap-y-8">
              
              <div 
              onClick={()=>router.push(`/contactus/contact`)}
              className="rounded-2xl border border-gray-200 bg-white p-7 group transition-all duration-500 hover:bg-primary">
                <Link
                  href="#"
                  className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-white cursor-pointer"
                >
                  <svg
                    className="fill-white transition-all duration-500 group-hover:fill-primary pl-1 pt-1"
                    width="40"
                    height="40"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.9239 2.78195C11.3641 1.89005 12.6359 1.89005 13.0761 2.78195L15.2475 7.18173C15.4223 7.5359 15.7602 7.78139 16.151 7.83818L21.0065 8.54372C21.9907 8.68674 22.3838 9.89631 21.6715 10.5905L18.1581 14.0153C17.8753 14.291 17.7462 14.6882 17.813 15.0775L18.6424 19.9133C18.8105 20.8936 17.7816 21.6411 16.9013 21.1783L12.5584 18.8951C12.2088 18.7113 11.7912 18.7113 11.4416 18.8951L7.09875 21.1783C6.21839 21.6411 5.18947 20.8936 5.3576 19.9133L6.18701 15.0775C6.25378 14.6882 6.12472 14.291 5.8419 14.0153L2.32846 10.5906C1.61624 9.89631 2.00925 8.68674 2.99352 8.54372L7.84897 7.83818C8.23982 7.78139 8.5777 7.5359 8.75249 7.18173L10.9239 2.78195Z" />
                  </svg>
                </Link>
                <h5 className="text-gray-900 text-xl font-semibold leading-8 mb-3 transition-all duration-500 group-hover:text-white">
                  Support
                </h5>
                <p className="text-gray-500 text-sm font-normal leading-5 transition-all duration-500 group-hover:text-white">
                  Need assistance? Our support team is here to help with any
                  questions or concerns regarding our services, transactions,
                  and technical issues.
                </p>
              </div>

             
              <div className="rounded-2xl border border-gray-200 bg-white p-7 group transition-all duration-500 hover:bg-primary">
                <Link
                  href="#"
                  className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-white cursor-pointer"
                >
                  <svg
                    className="stroke-primary  fill-white transition-all duration-500 group-hover:stroke-primary"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.5 10.25H15.25M8.5 15.25H21.5M10.6687 23.75C9.72032 23.75 9.24614 23.75 8.81368 23.916C7.17055 24.5465 4.98937 27.2387 3.24145 26.4602C2.5 26.13 2.5 24.9239 2.5 22.5116C2.5 20.6459 2.5 15.9678 2.5 11.7499C2.5 7.97876 2.5 6.09318 3.67157 4.92161C4.84314 3.75004 6.72865 3.75004 10.4997 3.75003C13.4302 3.75003 16.6564 3.75002 19.5037 3.75002C23.2725 3.75001 25.1568 3.75 26.3284 4.92158C27.5 6.09315 27.5 7.97875 27.5 11.7499C27.5 13.0803 27.5 14.4198 27.5 15.7501C27.5 19.5213 27.5 21.4069 26.3284 22.5785C25.1569 23.75 23.2712 23.75 19.5 23.75C16.5562 23.75 13.6125 23.75 10.6687 23.75Z" />
                  </svg>
                </Link>
                <h5 className="text-gray-900 text-xl font-semibold leading-8 mb-3 transition-all duration-500 group-hover:text-white">
                  Pagedone Blog
                </h5>
                <p className="text-gray-500 text-sm font-normal leading-5 transition-all duration-500 group-hover:text-white">
                  Stay updated with the latest industry trends, security
                  updates, and expert insights through our Pagedone Blog.
                  Explore informative articles and guides.
                </p>
              </div>
            
            
              <div 
              onClick={()=>router.push(`/contactus/faqs`)}
              className="rounded-2xl border border-gray-200 bg-white p-7 group transition-all duration-500 hover:bg-primary">
                <Link
                  href="#"
                  className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-white cursor-pointer"
                >
                  <svg
                    className="stroke-primary  fill-white transition-all duration-500 group-hover:stroke-primary pl-2 pt-1"
                    width="50"
                    height="50"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                </Link>
                <h5 className="text-gray-900 text-xl font-semibold leading-8 mb-3 transition-all duration-500 group-hover:text-white">
                  FAQs
                </h5>
                <p className="text-gray-500 text-sm font-normal leading-5 transition-all duration-500 group-hover:text-white">
                  Find quick answers to common questions about our services,
                  security measures, and processes in our Frequently Asked
                  Questions (FAQs) section.
                </p>
              </div>
              <div 
              onClick={()=>router.push(`${route}/rateus`)}
              className="rounded-2xl border border-gray-200 bg-white p-7 group transition-all duration-500 hover:bg-primary">
                <Link
                  href="#"
                  className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-white cursor-pointer pl-[10px] pt-1"
                >
                  <svg
                    className="stroke-primary  fill-white transition-all duration-500 group-hover:stroke-primary"
                    width="40"
                    height="40"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
                <h5 className="text-gray-900 text-xl font-semibold leading-8 mb-3 transition-all duration-500 group-hover:text-white">
                  Feedback Form
                </h5>
                <p className="text-gray-500 text-sm font-normal leading-5 transition-all duration-500 group-hover:text-white">
                  Your feedback helps us improve! Share your thoughts,
                  suggestions, or concerns through our feedback form to enhance
                  our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
