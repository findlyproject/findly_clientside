'use client'
import api from "@/axiosInstance/api";
import { useState } from "react";
import { AxiosError } from "axios";
export default function ContactUsPage() {
  const [email,setEmail]=useState("")
  const[message,setMessage]=useState("")
  const [error,setError]=useState("")
  console.log("email",email,"message",message);

  const handleSend=async(e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
    e.preventDefault()
    try {
      const response=await api.post(`/api/user/emailus`,{email,message})
      console.log("response of emailus",response);
     
      if (response.status === 200) {
        setError("");
      }
     
      
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error", error);
        setError(error?.response?.data?.message || "Something went wrong, please try again.");
      }
      
    }
 
 
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
   
    if (e.target.name === "email") {
      setEmail(e.target.value);
      console.log(email);
      
      setError("");
    } else if (e.target.name === "message") {
      setMessage(e.target.value);

      setError("");
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 p-6 md:p-12">
     
      <div className="w-full md:w-1/2 h-[450px] md:h-auto bg-cover bg-center rounded-lg flex flex-col justify-between p-6 md:p-10 text-white"
        style={{ backgroundImage: 'url(https://i.pinimg.com/736x/0a/13/88/0a13881a956c896d35b06e61dc038ece.jpg)' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Contact us</h2>
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-lg text-white">
          <p className="flex items-center mb-2"><span className="mr-2">📞</span> 470-601-1911</p>
          <p className="flex items-center mb-2"><span className="mr-2">📧</span> findlyproject@gmail.com</p>
          <p className="flex items-center"><span className="mr-2">📍</span> 654 Sycamore Avenue, Meadowville, WA 76543</p>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 md:p-10 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-bold text-primary">Send Us A Email</h2>
        <form  onSubmit={handleSend}  className="mt-4 space-y-4">
          
          <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={email}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={handleInputChange}
           />
           {error && (
          <p className="text-red-600 mt-4 text-sm">{error}</p> // Display error below the form
        )}

          
          <textarea 
          placeholder="Message" 
          name="message"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={message}
          onChange={handleInputChange}
          >

          </textarea>
          {error && (
          <p className="text-red-600 mt-4 text-sm">{error}</p> // Display error below the form
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
