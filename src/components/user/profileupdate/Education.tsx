import {  Ieducation, setEducation, setRemoveEducation } from '@/lib/store/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

function Education() {
  const user = useAppSelector((state)=>state.user.activeuser)
  const dispatch= useAppDispatch()

      const [newEducation, setNewEducation] = useState<Ieducation>({
        qualification: "",
        startYear: "",
        endYear: "",
        college: "",
        Subject:"",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
      };
    
      const handleAddEducation = () => {
        if (newEducation.qualification && newEducation.startYear && newEducation.endYear && newEducation.college) {
          dispatch(setEducation(newEducation))
          setNewEducation({ qualification: "", startYear: "", endYear: "", college: "", Subject: ""});

        }
      };
    
      const handleRemoveEducation = (index:number) => {
        dispatch(setRemoveEducation(index))
      };
    
      
  return (
    <div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-4 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Education Details</h2>
      
            {/* Qualification Input */}
            <div className="grid grid-cols-2 gap-4 my-4">
                              <div className='grid gap-3'>
                              <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              value={newEducation.qualification}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            /></div>
                              <div className='grid gap-3'>
                              <input
              type="text"
              name="Subject"
              placeholder="Subject"
              value={newEducation.Subject}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            /> </div>
                          </div>
      
            {/* Start Year & End Year */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="startYear"
                placeholder="Start Year"
                value={newEducation.startYear}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="endYear"
                placeholder="End Year"
                value={newEducation.endYear}
                onChange={handleChange}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
      
            {/* College Input */}
            <input
              type="text"
              name="college"
              placeholder="College/University"
              value={newEducation.college}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
      
            {/* Add Education Button */}
            <button
              onClick={handleAddEducation}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-5"
              disabled={!newEducation.qualification || !newEducation.startYear || !newEducation.endYear || !newEducation.college}
            >
              Add Education
            </button>
      
            {/* Display Added Education */}
            {(user?.education?.length ?? 0) > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Added Education</h3>
                <ul className="mt-2">
                  {user?.education.map((edu, index) => (
                    <li key={index} className="bg-gray-200 p-3 rounded-md mb-2 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{edu.qualification}</p>
                        <p className="text-sm text-gray-600">{edu.startYear} - {edu.endYear}</p>
                        <p className="text-sm">{edu.college}</p>
                        <p className="text-sm">{edu.Subject}</p>
      
                      </div>
                      <button onClick={() => handleRemoveEducation(index)}>
                        <RxCross2 className="text-red-500 text-xl cursor-pointer" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
    </div>
  )
}

export default Education
