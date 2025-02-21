"use client"
import React, { useState } from 'react'
import JobFiltersSidebar from './JobFiltersSidebar'
import AllJobs from './AllJobs'
import { RxCross2 } from 'react-icons/rx'
import { IoFilterSharp } from 'react-icons/io5'

function Jobelist() {
    const [page, setPage] = useState(1)
    const [togle, setTogle] = useState(false)

    return (
        <div className="w-full h-screen flex overflow-hidden">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-300 transition-transform duration-300 ease-in-out z-50
                ${togle ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:relative`}>
                
                {/* Close Button for Mobile */}
                <button
                    onClick={() => setTogle(false)}
                    className="block sm:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800">
                    <RxCross2 size={24} />
                </button>

                <JobFiltersSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header Navigation */}
                <div className="flex items-center border-b border-gray-300 p-3 bg-white shadow-sm">
                    {/* Filter Toggle Button for Mobile */}
                    <button
                        className="p-2 block sm:hidden"
                        onClick={() => setTogle(true)}>
                        <IoFilterSharp size={24} />
                    </button>

                    {/* Navigation Tabs */}
                    <div className="flex gap-4 ml-4">
                        <button
                            onClick={() => setPage(1)}
                            className={`text-lg font-medium transition-colors duration-200 ${page === 1 ? "font-bold text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                            All Jobs
                        </button>
                        <button
                            onClick={() => setPage(2)}
                            className={`text-lg font-medium transition-colors duration-200 ${page === 2 ? "font-bold text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                            Saved Jobs
                        </button>
                        <button
                            onClick={() => setPage(3)}
                            className={`text-lg font-medium transition-colors duration-200 ${page === 3 ? "font-bold text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                            Applied Jobs
                        </button>
                    </div>
                </div>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {page === 1 && <AllJobs />}
                    {page === 2 && <div className="text-center text-gray-600">No saved jobs yet.</div>}
                    {page === 3 && <div className="text-center text-gray-600">No applied jobs yet.</div>}
                </div>
            </div>
        </div>
    )
}

export default Jobelist
