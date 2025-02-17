"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Camera } from 'lucide-react';
import Image from 'next/image';

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl  p-4 md:p-6 space-y-6">
        <div className="flex justify-center">
          <label className="relative cursor-pointer">
            <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden group hover:bg-gray-200 transition-colors">
              {previewImage ? (
                <Image
                  src={previewImage} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-gray-400 group-hover:text-gray-500" />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all flex items-center justify-center">
                <Camera className="w-8 h-8 md:w-10 md:h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Pagedone"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="pagedone123"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="mail@pagedone.com"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select className="p-2.5 border rounded-lg rounded-r-none border-r-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base min-w-[4rem]">
                  <option>IN</option>
                </select>
                <input
                  type="tel"
                  placeholder="00000 00000"
                  className="w-full p-2.5 border rounded-lg rounded-l-none focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                DOB <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                defaultValue="2001-11-26"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <select className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base">
                <option>India</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms of Services and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors text-sm md:text-base font-medium"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;