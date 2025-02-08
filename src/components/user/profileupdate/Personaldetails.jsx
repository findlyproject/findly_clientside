import React from 'react'
import Image from 'next/image';
import { FaRegEdit } from "react-icons/fa";

function Personaldetails() {
  return (
    <div>
      <div className="py-2 relative">
                    <Image
                        src="/assets/loginbanner.jpg"
                        alt="banner image"
                        width={500}
                        height={50}
                        className="w-full h-44 object-cover rounded-lg"
                    />
                    <button>
                        <FaRegEdit className="absolute top-5 right-5 text-white bg-gray-800 p-2 rounded-full cursor-pointer text-4xl" />
                    </button>

                    {/* Profile Image Section */}
                    <div className="absolute top-24 left-5 flex flex-col items-center">
                        <Image
                            src="/assets/profile.png"
                            alt="profile image"
                            width={100}
                            height={100}
                            className="w-32 h-32 rounded-full shadow-xl border border-gray-300 object-cover"
                        />
                        <button>
                            <FaRegEdit className="absolute top-20 left-24 text-white bg-gray-800 p-2 rounded-full cursor-pointer text-3xl" />
                        </button>
                    </div>
                </div>

                {/* Personal Details Form */}
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-4 w-full">
                    <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className='grid gap-3'>
                            <label>FirstName</label>
                            <input type="text" name="firstName" placeholder="First Name" className="p-2 border rounded-md" />
                        </div>
                        <div className='grid gap-3'>
                            <label>LastName</label>
                            <input type="text" name="lastName" placeholder="Last Name" className="p-2 border rounded-md" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className='grid gap-3'>
                            <label>Email</label>
                            <input type="email" name="email" placeholder="email" className="p-2 border rounded-md" />
                        </div>
                        <div className='grid gap-3'>
                            <label>Phone Number</label>
                            <input type="text" name="phonenumber" placeholder="Phone Number" className="p-2 border rounded-md" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div className='grid gap-3'>
                            <label>Date of Birth</label>
                            <input type="date" name="dateofbirth" className="p-2 border rounded-md" />
                        </div>
                       
                    </div>
                    <div className='grid gap-3'>
                            <label>About</label>
                            <input name="about" placeholder="About Yourself" className="mt-4 w-full p-2 border rounded-md"></input>
                        </div>
                </div>
    </div>
  )
}

export default Personaldetails
