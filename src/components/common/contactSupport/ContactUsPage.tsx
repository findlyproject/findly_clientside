"use client";
import { AdminProfile } from "@/lib/store/features/adminSlice";
import { UserProfile } from "@/lib/store/features/userSlice";
import { useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import { useState } from "react";

export default function ContactUsPage() {
  const user = useAppSelector((state) => state.user.activeuser as UserProfile);
  const admin=useAppSelector((state)=>state.admin.admin as AdminProfile)
  console.log("useruser", user.email);

  const [email, setEmail] = useState({
    email: user?.email || "",
  });
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
    if (!email.email) {
      setemailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email.email)) {
      setemailError("Please enter a valid email.");
      isValid = false;
    } else {
      setemailError("");
    }

    if (!message) {
      setmessageError("Message is required");
      isValid = false;
    } else {
      setmessageError("");
    }

    return isValid;
  };

  const handleSend = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post(`/user/emailus`, {
          email: email.email,
          message,
        });

        console.log("response of emailus", response);
        if (response.status === 200) {
          setEmail({ email: "" });
          setMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto min-h-[80vh]  p-4 md:p-8 ">
      <div
        className="w-full md:w-1/2 h-[300px] md:h-auto bg-cover bg-center rounded-lg flex flex-col justify-between p-6 text-white"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/0a/13/88/0a13881a956c896d35b06e61dc038ece.jpg)",
        }}
      >
        <h2 className="text-2xl font-bold text-white">Contact Us</h2>
        <div className="bg-white/20 backdrop-blur-lg p-4 rounded-lg text-white">
          <p className="flex items-center mb-2">
            <span className="mr-2">📞</span> {admin.phoneNumber}
          </p>
          <p className="flex items-center mb-2">
            <span className="mr-2">📧</span> {admin.email}
          </p>
          <p className="flex items-center">
            <span className="mr-2">📍</span> 654 Sycamore Avenue, Meadowville,
            WA 76543
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 md:p-8 flex flex-col justify-center mt-6 md:mt-0">
        <h2 className="text-xl font-bold text-primary">Send Us An Email</h2>
        <form onSubmit={handleSend} className="mt-4 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email.email}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            onFocus={() => setemailError("")}
            onChange={(e) =>
              setEmail((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          {emailError && (
            <p className="text-red-600 text-sm">{emailError}</p>
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
            <p className="text-red-600 text-sm">{messageError}</p>
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
