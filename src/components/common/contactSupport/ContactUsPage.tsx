"use client";
import api from "@/utils/api";
import { useState } from "react";
export default function ContactUsPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setemailError] = useState("");
  const [messageError, setmessageError] = useState("");
  console.log("email", email, "message", message);


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setemailError("email is required");
      isValid=false
    }else if (!validateEmail(email)) {
      setemailError("Please enter a valid email.");
      isValid = false;
    } else {
      setemailError(""); 
    }

    if (!message) {
      setmessageError("message is required");
      isValid=false
    }

    return isValid;
  };
  const handleSend = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post(`/api/user/emailus`, {
          email,
          message,
        });

        console.log("response of emailus", response);
        if(response.status===200){
          setEmail("")
          setMessage("")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 p-6 md:p-12">
      <div
        className="w-full md:w-1/2 h-[450px] md:h-auto bg-cover bg-center rounded-lg flex flex-col justify-between p-6 md:p-10 text-white"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/0a/13/88/0a13881a956c896d35b06e61dc038ece.jpg)",
        }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Contact us
        </h2>
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-lg text-white">
          <p className="flex items-center mb-2">
            <span className="mr-2">📞</span> 470-601-1911
          </p>
          <p className="flex items-center mb-2">
            <span className="mr-2">📧</span> findlyproject@gmail.com
          </p>
          <p className="flex items-center">
            <span className="mr-2">📍</span> 654 Sycamore Avenue, Meadowville,
            WA 76543
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 md:p-10 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-bold text-primary">
          Send Us A Email
        </h2>
        <form onSubmit={handleSend} className="mt-4 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            onFocus={() => setemailError("")}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-600 mt-4 text-sm">{emailError}</p> 
          )}

          <textarea
            placeholder="Message"
            name="message"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={message}
            onFocus={() => setmessageError("")}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {messageError && (
            <p className="text-red-600 mt-4 text-sm">{messageError}</p> 
          )}
          <button
            type="submit"
            className="w-full p-3 bg-primary text-white rounded-lg hover:bg-purple-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
