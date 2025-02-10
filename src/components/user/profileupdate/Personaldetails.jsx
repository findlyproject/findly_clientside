import React, { useState } from 'react'
import Image from 'next/image';
import { FaRegEdit } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setPersonalDetails } from '@/lib/store/features/userSlice';

function Personaldetails() {
    const user = useAppSelector((state) => state.user.activeuser)
    console.log(user.activeuser);
    const [banner, setBanner] = useState(user?.banner ? (user.banner):("/assets/loginbanner.jpg"));
    const [profile, setProfile] = useState("/assets/loginbanner.jpg");

    // Function to handle image selection
    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };
    const dispatch = useAppDispatch()
    const [input,setInput]=useState({
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        dateOfBirth:user.dateOfBirth,
        about:user.about,
    })
    const handilchange = (e)=>{
            const { name, value } = e.target;
            setInput((prev)=>({
                ...prev,
                [name]:value,
            }))
    }

    const handilsubmit = ()=>{
        dispatch(setPersonalDetails(input))
    }
    return (
        <div>
            <div className="py-2 relative">
            <Image
                src={banner}
                alt="banner image"
                width={500}
                height={50}
                className="w-full h-44 object-cover rounded-lg"
            />
            {/* Hidden Input for Banner Upload */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="bannerUpload"
                onChange={(e) => handleImageChange(e, setBanner)}
            />
            <button onClick={() => document.getElementById("bannerUpload").click()}>
                <FaRegEdit className="absolute top-5 right-5 text-white bg-gray-800 p-2 rounded-full cursor-pointer text-4xl" />
            </button>

            {/* Profile Image Section */}
            <div className="absolute top-24 left-5 flex flex-col items-center">
                <Image
                    src={profile}
                    alt="profile image"
                    width={100}
                    height={100}
                    className="w-32 h-32 rounded-full shadow-xl border border-gray-300 object-cover"
                />
                {/* Hidden Input for Profile Upload */}
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profileUpload"
                    onChange={(e) => handleImageChange(e, setProfile)}
                />
                <button onClick={() => document.getElementById("profileUpload").click()}>
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
                        <input type="text" 
                        name="firstName"
                        placeholder="First Name" 
                        value={input.firstName}
                        onChange={handilchange}
                        className="p-2 border rounded-md" 
                        />
                    </div>
                    <div className='grid gap-3'>
                        <label>LastName</label>
                        <input type="text"
                         name="lastName"
                          placeholder="Last Name"
                          value={input.lastName}
                          onChange={handilchange}
                          className="p-2 border rounded-md" 
                          />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 my-4">
                    <div className='grid gap-3'>
                        <label>Email</label>
                        <input type="email"
                         name="email"
                          placeholder="email"
                          value={input.email}
                          onChange={handilchange}
                           className="p-2 border rounded-md" 
                           />
                    </div>
                    <div className='grid gap-3'>
                        <label>Phone Number</label>
                        <input type="text"
                        name="phoneNumber" 
                        placeholder="Phone Number" 
                        value={input.phoneNumber}
                        onChange={handilchange}
                        className="p-2 border rounded-md" 
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-4">
                    <div className='grid gap-3'>
                        <label>Date of Birth</label>
                        <input type="date"
                        name="dateOfBirth"
                        value={input.dateOfBirth}
                        onChange={handilchange}
                        className="p-2 border rounded-md" 
                        />
                    </div>

                </div>
                <div className='grid gap-3'>
                    <label>About</label>
                    <input name="about"
                    placeholder="About Yourself"
                    value={input.about}
                    onChange={handilchange}
                    className="mt-4 w-full p-2 border rounded-md"
                    />
                </div>
                <div className='flex justify-end'>
                <button
                className='p-2 bg-green-500 rounded-lg text-xl mt-3 '
                onClick={handilsubmit}
                >save
                </button>
            </div>
            </div>
           
        </div> 
    )
}

export default Personaldetails
